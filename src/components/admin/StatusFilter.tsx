import { Button } from '@/components/ui/button';

interface StatusFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export function StatusFilter({ filter, onFilterChange }: StatusFilterProps) {
  return (
    <div className="mb-4 flex gap-2">
      <Button
        variant={filter === 'all' ? 'default' : 'secondary'}
        onClick={() => onFilterChange('all')}
      >
        Alle
      </Button>
      <Button
        variant={filter === 'unreviewed' ? 'default' : 'secondary'}
        onClick={() => onFilterChange('unreviewed')}
      >
        Ungeprüft
      </Button>
      <Button
        variant={filter === 'disturbing' ? 'default' : 'secondary'}
        onClick={() => onFilterChange('disturbing')}
      >
        Störend
      </Button>
      <Button
        variant={filter === 'nearMiss' ? 'default' : 'secondary'}
        onClick={() => onFilterChange('nearMiss')}
      >
        Beinahe
      </Button>
      <Button
        variant={filter === 'incident' ? 'default' : 'secondary'}
        onClick={() => onFilterChange('incident')}
      >
        Ereignis
      </Button>
    </div>
  );
}