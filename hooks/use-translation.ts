"use client"

import { useState, useEffect } from "react"
import { type Language, getCurrentLanguage, getTranslation, type translations } from "@/lib/i18n"

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const t = (key: keyof typeof translations.en): string => {
    return getTranslation(currentLang, key)
  }

  return { t, currentLang, setCurrentLang }
}
