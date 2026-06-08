"use client"

import { Star, Quote } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"

const testimonials = [
  {
    name: "Normalized Database",
    role: "3NF Design",
    avatar: "DB",
    rating: 5,
    content:
      "The database is normalized to Third Normal Form, reducing redundancy and maintaining consistency across all healthcare entities.",
  },
  {
    name: "CRUD Operations",
    role: "System Functionality",
    avatar: "CR",
    rating: 5,
    content:
      "Supports Create, Read, Update, and Delete operations for patients, doctors, hospitals, appointments, prescriptions, and medicines.",
  },
  {
    name: "Flask REST API",
    role: "Backend Integration",
    avatar: "API",
    rating: 5,
    content:
      "The frontend communicates with SQLite through Flask REST APIs, enabling real-time data retrieval and management.",
  },
  {
    name: "Relational Database",
    role: "Data Integrity",
    avatar: "SQL",
    rating: 5,
    content:
      "Primary keys and foreign keys maintain strong relationships between hospitals, doctors, patients, appointments, and prescriptions.",
  },
  {
    name: "SQL Analytics",
    role: "Reporting",
    avatar: "AN",
    rating: 5,
    content:
      "Advanced SQL queries including joins, aggregations, and nested subqueries generate meaningful healthcare reports.",
  },
  {
    name: "Modern Dashboard",
    role: "Visualization",
    avatar: "UI",
    rating: 5,
    content:
      "A responsive dashboard built with Next.js and Tailwind CSS provides an intuitive interface for database management.",
  },
]
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#f8fafb] to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <AnimateIn delay={100}>
            <div className="inline-flex px-5 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-semibold text-sm mb-6">
              Testimonials
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Trusted by Thousands
              <br className="hidden sm:block" />
              of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Patients & Doctors</span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              See what our community has to say about their experience with
              MediLink.
            </p>
          </AnimateIn>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimateIn key={index} delay={index * 150}>
              <div
                className="h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-2 transition-all duration-300 flex flex-col relative group"
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-teal-50 opacity-50 group-hover:text-teal-100 group-hover:scale-110 transition-all duration-300" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-relaxed text-lg mb-8 flex-grow italic relative z-10">
                  "{testimonial.content}"
                </p>

                {/* User */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 relative z-10 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-inner border border-teal-200/50">
                    <span className="font-bold text-teal-700 text-lg">
                      {testimonial.avatar}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-lg capitalize">
                      {testimonial.name}
                    </h4>

                    <p className="text-teal-600 font-medium text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}