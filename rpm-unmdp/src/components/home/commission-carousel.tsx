'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Users, Award, AlertTriangle } from 'lucide-react';

interface Commission {
  id: string;
  name: string;
  subject: string;
  professor: string;
  rating: number;
  reviewCount: number;
}

interface CommissionCarouselProps {
  title: string;
  commissions: Commission[];
  variant?: 'best' | 'worst';
}

export function CommissionCarousel({ title, commissions, variant = 'best' }: CommissionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const Icon = variant === 'best' ? Award : AlertTriangle;
  const iconColor = variant === 'best' ? 'text-accent' : 'text-destructive';

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {commissions.map((commission) => (
          <Card
            key={commission.id}
            className="min-w-[280px] max-w-[280px] snap-start cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-foreground">{commission.name}</h3>
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">{commission.subject}</p>
                  <p className="text-xs text-muted-foreground">{commission.professor}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className={`h-4 w-4 ${variant === 'best' ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'}`} />
                    <span className="font-semibold">{commission.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {commission.reviewCount} reseñas
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
