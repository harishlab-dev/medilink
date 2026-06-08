"use client"

import {
  Calendar,
  Video,
  FileText,
  History,
  Shield,
  MessageSquare,
  CreditCard,
  Bell,
} from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"
const features = [
  {
    icon: Calendar,
    title: "Appointment Management",
    description:
      "Book, update, view, and cancel appointments while maintaining relationships between patients, doctors, and availability slots.",
  },

  {
    icon: FileText,
    title: "Prescription Management",
    description:
      "Create and manage prescriptions issued by doctors, including medicine details and dosage information through relational tables.",
  },

  {
    icon: History,
    title: "Patient Records",
    description:
      "Store and manage patient information in a centralized database with fast retrieval and consistent record management.",
  },

  {
    icon: Shield,
    title: "Data Integrity",
    description:
      "Primary keys, foreign keys, and normalized database design ensure consistency, accuracy, and reliable healthcare data management.",
  },

  {
    icon: MessageSquare,
    title: "Doctor & Hospital Management",
    description:
      "Maintain doctor profiles, hospital information, and their relationships through a structured database schema.",
  },

  {
    icon: CreditCard,
    title: "CRUD Operations",
    description:
      "Perform Create, Read, Update, and Delete operations across all healthcare entities through an interactive dashboard.",
  },

  {
    icon: Bell,
    title: "Reports & Analytics",
    description:
      "Generate analytical reports using SQL queries, aggregations, joins, and subqueries for meaningful healthcare insights.",
  },

  {
    icon: Video,
    title: "Database Visualization",
    description:
      "View real-time healthcare data through a modern dashboard connected to SQLite using Flask REST APIs.",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="py-16 lg:py-20 bg-gradient-to-b from-[#f8fafb] to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 z-10 relative">
          <AnimateIn delay={100}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-sm font-semibold mb-6">
              Features
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Everything You Need for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                Better Healthcare
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="text-lg text-slate-600 leading-relaxed">
              A comprehensive platform designed to streamline every aspect of your
              healthcare journey, from booking appointments to managing
              prescriptions.
            </p>
          </AnimateIn>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimateIn key={index} delay={index * 100}>
              <div
                className="h-full group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-6 shadow-md shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-[15px] leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}