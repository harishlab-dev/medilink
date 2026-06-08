"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Video, FileText, Shield, ArrowRight, Play } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"

const stats = [
  { value: "8+", label: "Database Tables" },
  { value: "100%", label: "3NF Design" },
  { value: "CRUD", label: "Operations" },
  { value: "SQL", label: "Analytics" },
]

const floatingFeatures = [
  { icon: Calendar, label: "Appointments", color: "bg-teal-600" },
  { icon: FileText, label: "Prescriptions", color: "bg-green-500" },
  { icon: Shield, label: "Normalized DB", color: "bg-teal-600" },
  { icon: Video, label: "SQL Reports", color: "bg-green-500" },
]

export function Hero() {
  return (
<section className="relative min-h-[85vh] ...">      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] bg-teal-100/40 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <AnimateIn delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100/50 text-teal-700 text-sm font-medium mb-8 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Healthcare Database Management System
              </div>
            </AnimateIn>

            <AnimateIn delay={200}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
                Smart Healthcare <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                  Made Simple
                </span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={300}>
              <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A centralized healthcare database platform for managing patients, doctors,
hospitals, appointments, prescriptions, medicines, and analytical reports
using SQLite, Flask, and Next.js.
              </p>
            </AnimateIn>

            <AnimateIn delay={400} className="w-full">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14 w-full sm:w-auto">
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-base lg:text-lg px-8 py-6 h-auto gap-2 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-1 transition-all duration-300">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-slate-700 hover:text-teal-700 hover:bg-teal-50 border-slate-200 hover:border-teal-200 text-base lg:text-lg px-8 py-6 h-auto gap-2 transition-all duration-300">
                  <Play className="w-5 h-5" />
                  GROUP #3 DEMO 
                </Button>
              </div>
            </AnimateIn>

            {/* Stats */}
            <AnimateIn delay={500} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200/60 w-full">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className="relative z-10 lg:ml-8 mt-8 lg:mt-0">
            <AnimateIn delay={400}>
              {/* Main Dashboard Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-teal-900/5 border border-white p-6 lg:p-8">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
  MediLink Dashboard
</h3>

<p className="text-sm font-medium text-slate-500">
  Healthcare Data Overview
</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100">
                    <span className="text-teal-700 font-bold text-lg">3</span>
                  </div>
                </div>

                {/* Upcoming Appointment Card */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 rounded-2xl p-5 mb-6 border border-teal-100/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center border border-teal-100">
                      <span className="text-teal-600 text-lg font-bold">DR</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Appointments Module</h4>
                      <p className="text-sm font-medium text-slate-600">Patient & Doctor Records</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm font-bold text-teal-600 mb-0.5">CRUD Operations</div>
                      <div className="text-sm font-medium text-slate-500">SQL Analytics</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white flex-1 h-11 rounded-xl shadow-sm transition-all hover:shadow-md">
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                    <Button variant="outline" className="flex-1 h-11 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50">
                      Reschedule
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Calendar, label: "Book", color: "text-teal-600", bg: "bg-teal-50" },
                    { icon: FileText, label: "Records", color: "text-emerald-600", bg: "bg-emerald-50" },
                    { icon: Video, label: "Consult", color: "text-cyan-600", bg: "bg-cyan-50" },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all hover:-translate-y-1"
                    >
                      <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Floating Feature Cards */}
            {floatingFeatures.map((feature, index) => (
              <div
                key={index}
                className={`absolute hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 animate-float ${
                  index === 0 ? "-top-6 -left-12" :
                  index === 1 ? "top-1/4 -right-16" :
                  index === 2 ? "bottom-1/4 -left-20" :
                  "-bottom-6 right-8"
                }`}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center shadow-inner`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-800 whitespace-nowrap">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
