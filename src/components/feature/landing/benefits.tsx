"use client"
import { motion } from "framer-motion";
import { Clock, Target, Share2, FolderOpen } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Valuable Time",
    description: "Reduce hours of manual work to minutes. Teachers and administrators can focus on what matters most – education.",
    stat: "80%",
    statLabel: "Less Time Spent",
  },
  {
    icon: Target,
    title: "100% Accurate Calculations",
    description: "NEB-compliant GPA calculations every time. Eliminate human errors and ensure every student gets the right grade.",
    stat: "0",
    statLabel: "Calculation Errors",
  },
  {
    icon: Share2,
    title: "Easy Report Sharing",
    description: "Generate and share professional reports instantly. Email to parents, print for records, or export for archives.",
    stat: "1-Click",
    statLabel: "Export & Share",
  },
  {
    icon: FolderOpen,
    title: "Organized Data",
    description: "Keep all student information in one secure place. Search, filter, and access records instantly.",
    stat: "100%",
    statLabel: "Data Organized",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose EduFlow
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mt-4 mb-6">
            Benefits That Make a Real Difference
          </h2>
          <p className="text-lg text-body">
            Join hundreds of schools that have transformed their marks management 
            process with EduFlow.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-surface-elevated rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-coral-100 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-heading mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-body leading-relaxed mb-4">
                      {benefit.description}
                    </p>

                    {/* Stat */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {benefit.stat}
                      </span>
                      <span className="text-sm text-body">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
