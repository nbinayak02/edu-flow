"use client";
import { motion } from "framer-motion";
import { Database, ClipboardList, PenLine, Calculator } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Comprehensive Data Entry",
    description:
      "Manage schools, subjects, classes, marks, and complete student information all in one place.",
    color: "bg-coral-100 text-primary",
  },
  {
    icon: ClipboardList,
    title: "Exam Creation & Management",
    description:
      "Create and organize exams effortlessly. Set up term exams, unit tests, and finals with ease.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: PenLine,
    title: "Exam-wise Marks Recording",
    description:
      "Record marks for each exam separately. Track student progress across different assessments.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Calculator,
    title: "Automated GPA Calculation",
    description:
      "Instant, accurate GPA calculations following NEB standards. No more manual errors.",
    color: "bg-purple-100 text-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-surface-subtle">
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
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mt-4 mb-6">
            Everything You Need to Manage Student Marks
          </h2>
          <p className="text-lg text-body">
            From data entry to report generation, EduFlow provides all the tools
            your school needs for efficient marks management.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group relative bg-white dark:bg-neutral-900 rounded-2xl p-6  transition-all duration-300 border border-border ${
                  index === 6 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-heading mb-2">
                  {feature.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
