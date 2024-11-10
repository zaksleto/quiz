"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  FileBarChart,
  SlidersHorizontal,
  Settings,
  Eye,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" className="gap-2">
          <ChevronDown className="h-4 w-4" />
          Editar funil
        </Button>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" className="gap-2">
            <FileBarChart className="h-4 w-4" />
            Resultados
          </Button>
          <Button variant="ghost" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Flow
          </Button>
          <Button variant="ghost" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Ver funil
          </Button>
        </div>
      </div>
    </header>
  );
}