/* eslint-disable @typescript-eslint/no-unused-vars */
// @/app/page.tsx

"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { translations } from "@/translations";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Settings, Box, Sparkles, Search, Lock } from "lucide-react";
import { GlowingEffect } from "@/components/ui/aceternity/glowing-effect";
import { StickyScroll } from "@/components/ui/aceternity/sticky-scroll-reveal";
import { useLanguage } from "@/components/context/LanguageContext";
import GlobeVisualization from "@/components/common/GlobeVisualization";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GlowingEffectGrid: React.FC = () => {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
    </ul>
  );
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const content = [
  {
    title: "Custom Websites",
    description:
      "From simple landing pages to complex web platforms, we design and build websites tailored to your business needs, ensuring speed, accessibility, and a polished user experience. We use the latest tech stack available to deliver modern, scalable, and future-proof solutions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <Image
          src="/images/council.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Business Dashboards",
    description:
      "Turn your data into actionable insights. We build interactive dashboards that help teams monitor performance, visualize KPIs, and make smarter decisions—fast. Manage everything that runs in and around your business with centralized control and clarity.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image
          src="/images/dashboard.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Open Source Contributions",
    description:
      "We believe in building in the open. From internal tools to community-driven libraries, we regularly contribute to and maintain open source software that empowers developers.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image
          src="/images/.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "AI Research & Prototyping",
    description:
      "Exploring the future of technology through experimentation. We prototype AI tools, research machine learning techniques, and apply them to solve real-world problems creatively.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <Image
          src="/images/og-image.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language].root.home;

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section with Globe */}
      <main className="flex-grow">
        <section className="relative min-h-screen mb-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start lg:items-center">
              <motion.div
                className="z-10 pt-32 sm:pt-20 lg:pt-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-left">
                  <span className="italic font-serif text-[#F76F53] text-6xl">JirehGroup</span>{" "}
                  <span className="text-foreground">– Software, AI, and Innovation in Ethiopia</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 text-left">
                  JirehGroup is an Ethiopian tech company delivering world-class software development, AI solutions, and open-source research. We help organizations innovate with tailored digital systems and scalable platforms.
                </p>

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

        <section className="py-10 px-4">
          <GlowingEffectGrid />
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="w-full py-4">
            <StickyScroll content={content} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}