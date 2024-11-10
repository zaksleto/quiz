"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bold, Italic, Underline, Link2, AlignLeft, AlignCenter, AlignRight, TextQuote, X, Trash2 } from "lucide-react";

interface TextModuleProps {
  content: {
    headline: string;
    description: string;
    alignment: string;
    defaultAlignment: boolean;
  };
  onUpdate: (content: any) => void;
  onClose: () => void;
  onDelete: () => void;
}

export default function TextModule({ content, onUpdate, onClose, onDelete }: TextModuleProps) {
  const [text, setText] = useState(content);

  const handleUpdate = (updates: Partial<typeof text>) => {
    const newText = { ...text, ...updates };
    setText(newText);
    onUpdate(newText);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between bg-background sticky top-0 z-10">
        <h2 className="text-lg font-semibold">Editar Módulo de Texto</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="mb-8">
            <div className={`text-${text.alignment} mb-4`}>
              <h2 className="text-2xl font-bold">{text.headline}</h2>
              <p className="text-muted-foreground">{text.description}</p>
            </div>
          </div>

          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
              <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <Input
                  placeholder="Headline"
                  value={text.headline}
                  onChange={(e) => handleUpdate({ headline: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={text.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Desativar alinhamento padrão</span>
                  <Switch
                    checked={!text.defaultAlignment}
                    onCheckedChange={(checked) => handleUpdate({ defaultAlignment: !checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select defaultValue="sans-serif">
                      <SelectTrigger>
                        <SelectValue placeholder="Font Family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sans-serif">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Mono</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Font Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="icon">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <TextQuote className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}