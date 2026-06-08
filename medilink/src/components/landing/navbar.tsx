"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "Workflow" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((link) => link.href.substring(1))
      let current = ""

      for (const section of sections) {
        const element = document.getElementById(section)

        if (element) {
          const rect = element.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section
            break
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/medilink-logo.png"
                alt="MediLink"
                width={52}
                height={52}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                <span className="text-teal-600">Medi</span>
                <span className="text-slate-900">Link</span>
              </span>

              <span className="ml-3 hidden sm:inline-flex px-2 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100">
                DBMS Project
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.href.substring(1)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-teal-600"
                      : "text-slate-600 hover:text-teal-600"
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-teal-600 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                Log In
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Dashboard
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Get Started
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl py-6 px-4">
            <div className="flex flex-col gap-2">

              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href.substring(1)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "bg-teal-50 text-teal-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 px-2">

                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Log In
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-teal-200 text-teal-700"
                  >
                    Dashboard
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Get Started
                  </Button>
                </Link>

              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}