"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"

const benefits = [
  "SQLite Database",
  "Flask REST API",
  "CRUD Operations",
  "3NF Normalization",
]
export function CTA() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 p-10 md:p-16 lg:p-20 shadow-2xl shadow-teal-900/20">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 text-center">
              {/* Heading */}
              <AnimateIn delay={100}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  Ready to Explore

                  <br className="hidden sm:block" />
                  MediLink?
                </h2>
              </AnimateIn>

              {/* Description */}
              <AnimateIn delay={200}>
                <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Explore a complete Healthcare Database Management System
featuring normalized database design, CRUD operations,
SQL analytics, and real-time dashboard visualization.
                </p>
              </AnimateIn>

              {/* Benefits */}
              <AnimateIn delay={300}>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-200" />
                      <span className="text-sm font-medium tracking-wide">{benefit}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* Buttons */}
              <AnimateIn delay={400}>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Link href="/auth/login" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-teal-700 hover:bg-slate-50 text-lg px-8 py-6 h-auto gap-2 shadow-xl shadow-teal-900/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group font-bold"
                    >
                      Launch Dashboard
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="#features" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white text-lg px-8 py-6 h-auto bg-transparent transition-all duration-300"
                    >
                      View Features
                    </Button>
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}