
-- ========================================================
-- DATA INTEGRITY CHECKS
-- ========================================================

-- Ensure Career duration and subject count are positive
ALTER TABLE "Career" ADD CONSTRAINT check_subject_count CHECK ("subjectCount" > 0);
ALTER TABLE "Career" ADD CONSTRAINT check_years CHECK ("years" > 0);

-- Ensure scores are between 1 and 5 for Professors
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT check_treatment_score CHECK ("treatmentScore" BETWEEN 1 AND 5);
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT check_explanation_score CHECK ("explanationScore" BETWEEN 1 AND 5);

-- Ensure scores are between 1 and 5 for Commissions (Subjects)
ALTER TABLE "ReviewCommissionDetail" ADD CONSTRAINT check_content_score CHECK ("contentScore" BETWEEN 1 AND 5);
ALTER TABLE "ReviewCommissionDetail" ADD CONSTRAINT check_difficulty_score CHECK ("difficultyScore" BETWEEN 1 AND 5);


-- ========================================================
-- PARTIAL UNIQUE INDEXES
-- ========================================================

-- Rule: A student can only write ONE review of type 'COMMISSION' per commission.
CREATE UNIQUE INDEX idx_unique_review_commission 
ON "Review"("studentId", "commissionId") 
WHERE "type" = 'COMMISSION';

-- ========================================================
-- FUNCTIONS & TRIGGERS
-- ========================================================

-- --------------------------------------------------------
-- CONTEXT VALIDATION
-- Ensure the professor actually taught in that commission
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION validate_professor_in_commission() RETURNS TRIGGER AS $$
DECLARE
    v_commission_id INT;
BEGIN
    -- Get the commissionId from the parent Review table
    SELECT "commissionId" INTO v_commission_id 
    FROM "Review" 
    WHERE id = NEW."reviewId";
    
    -- Check if the professor exists in CommissionProfessor for that commission
    IF NOT EXISTS (
        SELECT 1 FROM "CommissionProfessor" 
        WHERE "commissionId" = v_commission_id AND "professorId" = NEW."professorId"
    ) THEN
        RAISE EXCEPTION 'Error de integridad de datos: El profesor seleccionado no pertenece a la comisión especificada.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_professor_context
BEFORE INSERT ON "ReviewProfessorDetail"
FOR EACH ROW EXECUTE FUNCTION validate_professor_in_commission();


-- --------------------------------------------------------
-- HIERARCHY INTEGRITY
-- Ensure Child table matches Parent type
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION validate_review_hierarchy() RETURNS TRIGGER AS $$
DECLARE
    v_type "ReviewType";
BEGIN
    -- Get the type from the parent Review
    SELECT "type" INTO v_type FROM "Review" WHERE id = NEW."reviewId";
    
    -- Logic for Professor Detail
    IF (TG_TABLE_NAME = 'ReviewProfessorDetail' AND v_type <> 'PROFESSOR') THEN
        RAISE EXCEPTION 'Error de jerarquía: No se puede agregar un detalle de profesor a una reseña de tipo %', v_type;
    
    -- Logic for Commission Detail
    ELSIF (TG_TABLE_NAME = 'ReviewCommissionDetail' AND v_type <> 'COMMISSION') THEN
        RAISE EXCEPTION 'Error de jerarquía: No se puede agregar un detalle de comisión a una reseña de tipo %', v_type;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to Professor Detail
CREATE TRIGGER trg_check_hierarchy_professor
BEFORE INSERT ON "ReviewProfessorDetail"
FOR EACH ROW EXECUTE FUNCTION validate_review_hierarchy();

-- Apply to Commission Detail
CREATE TRIGGER trg_check_hierarchy_commission
BEFORE INSERT ON "ReviewCommissionDetail"
FOR EACH ROW EXECUTE FUNCTION validate_review_hierarchy();


-- --------------------------------------------------------
-- VOTE SYNCHRONIZATION
-- Updates likeCount and dislikeCount on the Review table
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION sync_vote_counts() RETURNS TRIGGER AS $$
BEGIN
    -- CASE 1: New Vote
    IF (TG_OP = 'INSERT') THEN
        IF NEW."isPositive" THEN
            UPDATE "Review" SET "likeCount" = "likeCount" + 1 WHERE id = NEW."reviewId";
        ELSE
            UPDATE "Review" SET "dislikeCount" = "dislikeCount" + 1 WHERE id = NEW."reviewId";
        END IF;

    -- CASE 2: Remove Vote
    ELSIF (TG_OP = 'DELETE') THEN
        IF OLD."isPositive" THEN
            UPDATE "Review" SET "likeCount" = "likeCount" - 1 WHERE id = OLD."reviewId";
        ELSE
            UPDATE "Review" SET "dislikeCount" = "dislikeCount" - 1 WHERE id = OLD."reviewId";
        END IF;

    -- CASE 3: Change Vote TODO: Esto existiria? o primero se lo borraria de like y desp agregaria a dislike
    ELSIF (TG_OP = 'UPDATE') THEN
        IF OLD."isPositive" <> NEW."isPositive" THEN
            IF NEW."isPositive" THEN
                -- Changed from Dislike to Like
                UPDATE "Review" 
                SET "likeCount" = "likeCount" + 1, 
                    "dislikeCount" = "dislikeCount" - 1 
                WHERE id = NEW."reviewId";
            ELSE
                -- Changed from Like to Dislike
                UPDATE "Review" 
                SET "dislikeCount" = "dislikeCount" + 1, 
                    "likeCount" = "likeCount" - 1 
                WHERE id = NEW."reviewId";
            END IF;
        END IF;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_votes
AFTER INSERT OR UPDATE OR DELETE ON "Vote"
FOR EACH ROW EXECUTE FUNCTION sync_vote_counts();


-- --------------------------------------------------------
-- AUTOMATIC AUDIT
-- Logs the banned review and censors the content
-- --------------------------------------------------------

CREATE OR REPLACE FUNCTION audit_banned_review() RETURNS TRIGGER AS $$
BEGIN
    -- Only trigger if status changes TO 'BANNED'
    IF (NEW.status = 'BANNED' AND OLD.status <> 'BANNED') THEN
        
        -- Create Audit Log
        INSERT INTO "ReviewAudit" ("reviewId", "date", "reason", "originalContent", "reporterId")
        VALUES (
            NEW.id, 
            NOW(), 
            'Baneo automático o manual', 
            OLD.content,
            NEW."reporterId"
        );
        
        -- Censor the original content
        NEW.content = 'Este comentario ha sido eliminado por infringir las normas.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_ban
BEFORE UPDATE ON "Review"
FOR EACH ROW EXECUTE FUNCTION audit_banned_review();