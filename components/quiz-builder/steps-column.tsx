"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Step } from "./index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical, Trash } from "lucide-react";

interface StepsColumnProps {
  steps: Step[];
  selectedStep: number;
  onStepSelect: (id: number) => void;
  onAddStep: () => void;
  onDeleteStep?: (id: number) => void;
  onDuplicateStep?: (id: number) => void;
}

export default function StepsColumn({
  steps,
  selectedStep,
  onStepSelect,
  onAddStep,
  onDeleteStep,
  onDuplicateStep,
}: StepsColumnProps) {
  return (
    <div className="col-span-3 bg-card rounded-lg border">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2 mb-2">
              <Button
                variant={selectedStep === step.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onStepSelect(step.id)}
              >
                {step.title}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onDuplicateStep?.(step.id)}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" /> Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteStep?.(step.id)}
                    className="gap-2 text-destructive focus:text-destructive"
                  >
                    <Trash className="h-4 w-4" /> Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
          <Button onClick={onAddStep} className="w-full mt-4" variant="secondary">
            Adicionar Etapa
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}