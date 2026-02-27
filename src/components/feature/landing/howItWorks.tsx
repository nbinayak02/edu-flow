"use client";
import { motion } from "framer-motion";
import { UserPlus, PenLine, FileOutput, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Enter Student & Exam Info",
    description:
      "Add your students, create exams, and set up subjects. Our intuitive interface makes setup a breeze.",
  },
  {
    number: "02",
    icon: PenLine,
    title: "Record Marks & Auto-Calculate",
    description:
      "Enter marks for each exam. EduFlow automatically calculates GPA using NEB standards – no manual work needed.",
  },
  {
    number: "03",
    icon: FileOutput,
    title: "Generate & Export Reports",
    description:
      "Print professional marksheets, generate ledgers, and export to PDF or Excel with a single click.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mt-4 mb-6">
            Get Started in 3 Easy Steps
          </h2>
          <p className="text-lg text-body">
            No complex setup. No steep learning curve. Start managing marks in
            minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-32 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-card border border-border text-center group hover:scale-103 transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-rose-100 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-heading mb-3">
                      {step.title}
                    </h3>
                    <p className="text-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Mobile/Tablet */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4 md:hidden">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
