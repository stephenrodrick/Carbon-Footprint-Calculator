"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, Info, Lightbulb, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: "/", label: "Calculator", icon: <Leaf className="mr-2 h-4 w-4" /> },
    { href: "/tips", label: "Tips", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
    { href: "/about", label: "About", icon: <Info className="mr-2 h-4 w-4" /> },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">EcoCalc</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"} asChild>
              <Link href={item.href} className="flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                className="justify-start"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={item.href} className="flex items-center">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
