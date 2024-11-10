"use client";

import { Module } from "./index";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface PreviewColumnProps {
  modules: Module[];
  activeModule: Module | undefined;
  onModuleSelect: (id: string) => void;
}

export default function PreviewColumn({
  modules,
  activeModule,
  onModuleSelect,
}: PreviewColumnProps) {
  return (
    <div className="col-span-7 bg-card rounded-lg border">
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-6">
          {modules.length > 0 ? (
            <div className="space-y-6">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`p-6 cursor-pointer transition-colors hover:bg-accent/50 ${
                    activeModule?.id === module.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => onModuleSelect(module.id)}
                >
                  {module.type === "text" && (
                    <div
                      className={`space-y-2 text-${module.content.alignment}`}
                      style={{
                        fontFamily: module.content.fontFamily,
                        fontSize: getFontSize(module.content.fontSize),
                      }}
                    >
                      <h3
                        className={`font-semibold ${
                          module.content.textStyle?.includes("bold")
                            ? "font-bold"
                            : ""
                        } ${
                          module.content.textStyle?.includes("italic")
                            ? "italic"
                            : ""
                        } ${
                          module.content.textStyle?.includes("underline")
                            ? "underline"
                            : ""
                        }`}
                      >
                        {module.content.headline}
                      </h3>
                      <p className="text-muted-foreground">
                        {module.content.description}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              👆 Adicione os módulos
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function getFontSize(size: string): string {
  switch (size) {
    case "huge":
      return "2rem";
    case "large":
      return "1.5rem";
    case "medium":
      return "1rem";
    case "small":
      return "0.875rem";
    default:
      return "1rem";
  }
}