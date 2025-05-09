/* eslint-disable @typescript-eslint/no-unused-vars */
// @/app/page.tsx

"use client";
import React from "react";
import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import GlobeVisualization from "@/components/common/GlobeVisualization";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cloud, Layout } from "lucide-react";

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language].root.home;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Custom Software Development",
      description:
        "Tailored solutions engineered for your unique business challenges and growth objectives.",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Infrastructure",
      description:
        "Scalable, secure, and efficient cloud solutions to power your digital transformation.",
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Enterprise Systems",
      description:
        "Comprehensive ERP and dashboard solutions for streamlined business operations.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <Header />
      
      {/* Hero Section with Globe */}
      <main className="flex-grow">
        <section className="relative h-screen mb-20"> {/* Added margin-bottom */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start lg:items-center">
              <motion.div
                className="z-10 pt-32 sm:pt-20 lg:pt-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-left">
                  <span className="text-[#F76F53]">JirehGroup</span>
                  <span className="text-foreground"> Technologies</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mb-12 text-left">
                  Building tomorrow&apos;s digital infrastructure today.
                  Enterprise solutions that evolve with your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                  <button className="group bg-foreground text-background px-8 py-4 rounded-lg font-medium hover:bg-foreground/90 transition-all flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="border border-foreground/20 backdrop-blur-sm bg-background/30 text-foreground px-8 py-4 rounded-lg font-medium hover:bg-foreground/5 transition-colors">
                    View Our Work
                  </button>
                </div>
              </motion.div>
              
              {/* Globe Visualization */}
              <div className="relative h-full w-full flex items-start lg:items-center justify-center lg:justify-end pt-12 lg:pt-0">
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px]">
                  <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GlobeVisualization />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Removed top margin to prevent overlap */}
        <section className="py-20 relative clear-both"> {/* Reduced vertical padding and added clear-both */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" {...fadeInUp}> {/* Reduced bottom margin */}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Enterprise Solutions
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored for modern business
                needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-foreground mb-6">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70">{service.description}</p>
                  <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden"> {/* Reduced vertical padding */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-12">
                Join leading companies using JirehGroup&apos;s solutions to
                drive their success
              </p>
              <button className="group bg-foreground text-background px-8 py-4 rounded-lg font-medium hover:bg-foreground/90 transition-all flex items-center gap-2 mx-auto">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}