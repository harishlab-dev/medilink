"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Database, Server, LayoutDashboard } from "lucide-react"

const footerLinks = {
  project: [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#how-it-works" },
    { label: "Project Highlights", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],

  database: [
    { label: "ER Diagram", href: "#" },
    { label: "Relational Schema", href: "#" },
    { label: "Normalization (3NF)", href: "#" },
    { label: "CRUD Operations", href: "#" },
  ],

  technology: [
    { label: "Next.js", href: "#" },
    { label: "Flask REST API", href: "#" },
    { label: "SQLite Database", href: "#" },
    { label: "Tailwind CSS", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-950 text-white border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand Section */}
          <div className="lg:col-span-2">

            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/medilink-logo.png"
                alt="MediLink"
                width={48}
                height={48}
                className="brightness-0 invert"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  MediLink
                </h2>

                <p className="text-xs text-teal-400">
                  Healthcare Database Management System
                </p>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-md mb-8">
              MediLink is a Healthcare Database Management System developed
              using SQLite, Flask, Next.js, and Tailwind CSS. The system
              demonstrates database design, normalization, CRUD operations,
              and healthcare analytics through an interactive dashboard.
            </p>

            {/* Contact */}
            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>group3@medilink.edu</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>DBMS Project Team</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>
                  National Sun Yat-sen University,
                  Kaohsiung, Taiwan
                </span>
              </div>

            </div>
          </div>

          {/* Project */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              Project
            </h3>

            <ul className="space-y-3">
              {footerLinks.project.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Database */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              Database
            </h3>

            <ul className="space-y-3">
              {footerLinks.database.map((link) => (
                <li key={link.label}>
                  <span className="text-slate-400">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Server className="w-4 h-4 text-teal-400" />
              Technology
            </h3>

            <ul className="space-y-3">
              {footerLinks.technology.map((link) => (
                <li key={link.label}>
                  <span className="text-slate-400">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 text-center">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} MediLink Healthcare Database Management System.
          </p>

          <p className="text-slate-600 text-xs mt-2">
            Academic DBMS Project • SQLite • Flask • Next.js • Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  )
}