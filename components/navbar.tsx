"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, TestTube, Bug, TrendingUp, MessageCircle, Cloud, Sprout, Wheat } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/hooks/use-translation"

const navItems = [
  { href: "/", label: "home", icon: Home },
  { href: "/chatbot", label: "chatbot", icon: MessageCircle },
  { href: "/weather", label: "weather", icon: Cloud },
  { href: "/crop-advisory", label: "cropAdvisory", icon: Sprout },
  { href: "/soil-health", label: "soilHealth", icon: TestTube },
  { href: "/pest-detection", label: "pestDetection", icon: Bug },
  { href: "/market-prices", label: "marketPrices", icon: TrendingUp },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Wheat className="h-8 w-8 text-primary animate-grow" />
              <div className="absolute inset-0 rounded-full animate-pulse-green" />
            </div>
            <span className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
              Kisan Mitra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent hover:text-accent-foreground hover:scale-105"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">
                      {t(item.label as keyof typeof import("@/lib/i18n").translations.en)}
                    </span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <Wheat className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-primary">Kisan Mitra</span>
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start space-x-3 h-12 ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{t(item.label as keyof typeof import("@/lib/i18n").translations.en)}</span>
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
