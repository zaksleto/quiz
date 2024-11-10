"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Type,
  Mic,
  Timer,
  Image as ImageIcon,
  Video,
  AlignLeft,
  DollarSign,
  Gift,
  BarChart2,
  Star,
  PieChart,
  ChevronDown,
  ListTodo,
  FormInput,
  SlidersHorizontal,
  FileBarChart,
} from "lucide-react";

interface ModulesColumnProps {
  onModuleSelect: (moduleId: string) => void;
}

const modules = [
  { id: "text", icon: <Type />, title: "Texto" },
  { id: "audio", icon: <Mic />, title: "Áudio", badge: "Novo" },
  { id: "timer", icon: <Timer />, title: "Timer" },
  { id: "carousel", icon: <SlidersHorizontal />, title: "Carousel" },
  { id: "image", icon: <ImageIcon />, title: "Imagem" },
  { id: "video", icon: <Video />, title: "Vídeo" },
  { id: "spacer", icon: <AlignLeft />, title: "Espaçador" },
  { id: "accordion", icon: <ChevronDown />, title: "Accordion" },
  { id: "benefits", icon: <Gift />, title: "Benefícios" },
  { id: "price", icon: <DollarSign />, title: "Preço" },
  { id: "button", icon: <ListTodo />, title: "Botão" },
  { id: "questionnaire", icon: <FormInput />, title: "Questionário" },
  { id: "progress", icon: <BarChart2 />, title: "Progresso" },
  { id: "form", icon: <FormInput />, title: "Formulário" },
  { id: "feedback", icon: <Star />, title: "Feedback" },
  { id: "circle-chart", icon: <PieChart />, title: "Gráfico círculo" },
  { id: "chart", icon: <FileBarChart />, title: "Gráfico" },
];

export default function ModulesColumn({ onModuleSelect }: ModulesColumnProps) {
  return (
    <div className="col-span-3 bg-card rounded-lg border">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 grid grid-cols-2 gap-2">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onModuleSelect(module.id)}
            >
              {module.icon}
              <span className="text-sm">{module.title}</span>
              {module.badge && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {module.badge}
                </span>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}