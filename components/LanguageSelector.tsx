"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/translations";

export function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "en", label: t.language.english, flag: "🇬🇧" },
    { value: "hi", label: t.language.hindi, flag: "🇮🇳" },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative"
          aria-label="Select language"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="absolute -bottom-1 -right-1 text-xs">
            {currentLanguage?.flag}
          </span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={`cursor-pointer ${
              language === lang.value ? "bg-accent" : ""
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
