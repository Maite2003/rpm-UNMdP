'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Professor {
  id: string;
  name: string;
  department: string;
  rating: number;
  reviewCount: number;
}

interface ProfessorCarouselProps {
  title: string;
  professors: Professor[];
  variant?: 'best' | 'worst';
}

export function ProfessorCarousel({ title, professors, variant = 'best' }: ProfessorCarouselProps) {
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

  const Icon = variant === 'best' ? ThumbsUp : ThumbsDown;
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
        {professors.map((professor) => (
          <Card
            key={professor.id}
            className="min-w-[250px] max-w-[250px] snap-start cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-1">{professor.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{professor.department}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className={`h-4 w-4 ${variant === 'best' ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'}`} />
                    <span className="font-semibold">{professor.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {professor.reviewCount} reseñas
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
