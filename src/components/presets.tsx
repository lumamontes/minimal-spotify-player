"use client";
import React from "react";
import { presets } from "../constants/presets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { selectedPresetAtom } from "@/utils/atoms";
import { Button } from "@/components/button";
import { Icons } from "@/components/icons";

export function Presets() {
  const [selectedPreset, setSelectedPreset] = useAtom(selectedPresetAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
            <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {presets.map((preset) => (
          <DropdownMenuItem
            key={preset.name}
            onSelect={() => setSelectedPreset(preset.gradient)}
            className={cn("flex items-center gap-2 p-2", {
              "bg-popover-foreground": preset.gradient === selectedPreset,
            })}
          >
            <div className={cn("h-8 w-full rounded", preset.gradient)} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
