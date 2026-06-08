"use client"

import {
  UserPlus,
  Search,
  CalendarCheck,
  FileText,
} from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Manage Healthcare Records",
    description:
      "Add and maintain patient, doctor, hospital, and medicine information through a centralized healthcare database.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    number: "02",
    icon: Search,
    title: "Maintain Relationships",
    description:
      "Link patients, doctors, hospitals, appointments, and prescriptions using primary keys and foreign key relationships.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Perform CRUD Operations",
    description:
      "Create, read, update, and delete records through an interactive dashboard connected to the SQLite database.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    number: "04",
    icon: FileText,
    title: "Generate Reports & Analytics",
    description:
      "Use SQL joins, aggregations, and subqueries to generate meaningful healthcare reports and analytical insights.",
    color: "from-emerald-500 to-teal-600",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#f8fafb]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
          <AnimateIn delay={100}>
            <div className="inline-flex px-5 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-semibold text-sm mb-6">
              System Workflow
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Database Management in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                Four Simple Steps
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              MediLink streamlines healthcare data management by combining
              database design, CRUD operations, SQL analytics, and real-time
              visualization through a modern web platform.
            </p>
          </AnimateIn>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-teal-100 via-teal-200 to-teal-100"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <AnimateIn key={index} delay={index * 150}>
                <div className="text-center relative group">
                  {/* Icon Box */}
                  <div className="relative inline-block mb-8">
                    <div
                      className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl shadow-teal-900/10 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 relative z-10`}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-md z-20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm font-bold text-teal-700">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px] max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}