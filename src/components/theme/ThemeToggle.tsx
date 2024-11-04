import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-gray-800/90 dark:hover:bg-gray-800 hover:bg-gray-100 border border-gray-200 dark:border-gray-700"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-600" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-400" />
      <span className="sr-only">Theme umschalten</span>
    </Button>
  );
}