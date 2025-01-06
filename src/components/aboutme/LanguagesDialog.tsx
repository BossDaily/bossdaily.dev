"use client";

import { config } from "../../../config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LanguagesDialogProps {
  trigger: React.ReactNode;
}

export const LanguagesDialog: React.FC<LanguagesDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl bg-BlackRussian ">
        <DialogHeader>
          <DialogTitle className="text-white">Tech Stack</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={config.languages[0].type} className="w-full">
          <TabsList className="w-full justify-start gap-2 bg-BlackRussian text-zinc-400">
            {config.languages.map((category) => (
              <TabsTrigger
                key={category.type}
                value={category.type}
                className="data-[state=active]:bg-Windsor"
              >
                {category.type}
              </TabsTrigger>
            ))}
          </TabsList>
          {config.languages.map((category) => (
            <TabsContent key={category.type} value={category.type}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
                {category.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-BlackRussian hover:bg-Windsor/20 transition-colors"
                  >
                    <img
                      src={lang.img}
                      alt={lang.name}
                      className="w-12 h-12 mb-2"
                    />
                    <span className="text-sm text-center text-white">{lang.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagesDialog;
