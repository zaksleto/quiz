"use client";

import { Module } from "./index";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { X } from "lucide-react";
import TextEditor from "./editors/text-editor";

interface EditorColumnProps {
  module: Module;
  onUpdate: (id: string, content: any) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function EditorColumn({
  module,
  onUpdate,
  onClose,
  onDelete,
}: EditorColumnProps) {
  return (
    <div className="col-span-4 bg-card rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Editar Módulo</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-9rem)]">
        <div className="p-4">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="w-full mb-6 bg-muted/30">
              <TabsTrigger
                value="settings"
                className="flex-1 data-[state=active]:bg-primary/10"
              >
                Configurações
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="flex-1 data-[state=active]:bg-primary/10"
              >
                Design
              </TabsTrigger>
            </TabsList>

            {module.type === "text" && (
              <TextEditor
                content={module.content}
                onUpdate={(content) => onUpdate(module.id, content)}
                onDelete={() => onDelete(module.id)}
              />
            )}
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}