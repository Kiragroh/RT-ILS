import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const cardVariants = cva(
  'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
  {
    variants: {
      hoverable: {
        true: 'transition-all hover:scale-105 hover:shadow-md',
      },
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ hoverable, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card, type CardProps };