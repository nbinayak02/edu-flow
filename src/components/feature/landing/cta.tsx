"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  // const trustIndicators = [
  //   "500+ Schools Using EduFlow",
  //   "50,000+ Reports Generated",
  //   "100% NEB Compliant",
  // ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-rose-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your School's Marks Management?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Trusted platform for accurate,
            efficient, and NEB-compliant marks management.
          </p>

          {/* Trust Indicators */}
          {/* <div className="flex flex-wrap justify-center gap-6 mb-10">
            {trustIndicators.map((indicator) => (
              <motion.div
                key={indicator}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-primary-foreground/90"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{indicator}</span>
              </motion.div>
            ))}
          </div> */}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/auth/signup">Get Started Free</Link>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* No Credit Card Note
          <p className="text-primary-foreground/70 text-sm mt-6">
            No credit card required · Free forever for small schools
          </p> */}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
