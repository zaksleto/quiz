"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  TextQuote,
  Trash2,
} from "lucide-react";

interface TextEditorProps {
  content: {
    headline: string;
    description: string;
    alignment: string;
    defaultAlignment: boolean;
    fontSize: string;
    fontFamily: string;
    textStyle: string[];
  };
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export default function TextEditor({
  content,
  onUpdate,
  onDelete,
}: TextEditorProps) {
  const toggleTextStyle = (style: string) => {
    const currentStyles = content.textStyle || [];
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter((s) => s !== style)
      : [...currentStyles, style];
    onUpdate({ ...content, textStyle: newStyles });
  };

  return (
    <>
      <TabsContent value="settings" className="space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Headline"
            value={content.headline}
            onChange={(e) => onUpdate({ ...content, headline: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={content.description}
            onChange={(e) =>
              onUpdate({ ...content, description: e.target.value })
            }
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">Desativar alinhamento padrão</span>
            <Switch
              checked={!content.defaultAlignment}
              onCheckedChange={(checked) =>
                onUpdate({ ...content, defaultAlignment: !checked })
              }
            />
          </div>
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Excluir módulo
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="design" className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              value={content.fontFamily}
              onValueChange={(value) =>
                onUpdate({ ...content, fontFamily: value })
              }
            >
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
            <Select
              value={content.fontSize}
              onValueChange={(value) =>
                onUpdate({ ...content, fontSize: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="huge">Huge</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="small">Small</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={
              content.textStyle?.includes("bold") ? "secondary" : "outline"
            }
            size="icon"
            onClick={() => toggleTextStyle("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={
              content.textStyle?.includes("italic") ? "secondary" : "outline"
            }
            size="icon"
            onClick={() => toggleTextStyle("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={
              content.textStyle?.includes("underline") ? "secondary" : "outline"
            }
            size="icon"
            onClick={() => toggleTextStyle("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            variant={content.alignment === "left" ? "secondary" : "outline"}
            size="icon"
            onClick={() => onUpdate({ ...content, alignment: "left" })}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={content.alignment === "center" ? "secondary" : "outline"}
            size="icon"
            onClick={() => onUpdate({ ...content, alignment: "center" })}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={content.alignment === "right" ? "secondary" : "outline"}
            size="icon"
            onClick={() => onUpdate({ ...content, alignment: "right" })}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <TextQuote className="h-4 w-4" />
          </Button>
        </div>
      </TabsContent>
    </>
  );
}