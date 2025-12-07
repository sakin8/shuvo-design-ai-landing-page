"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";
import { Button } from "./components/ui/button";
import ElectricBorder from "./components/ui/ElectricBorder";
import ValueProps from "./components/ValueProps";
import VoiceDemoSection from "./components/home/VoiceDemoSection";
import HeroSection from "./components/home/HeroSection";
import type { Variants } from "framer-motion";
import AiServicesSection from "./components/home/AiServicesSection";
import PricingSection from "./components/home/PricingSection";
import LossSection from "./components/home/LossSection";
import FaqSection from "./components/home/FaqSection";

/**
 * Video:
 * YT ID: oXr_k1xNvoA
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function AiLandingUpdated() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#0b0b0d] to-[#0f1113] text-white overflow-x-hidden">
      {/* ambient orbs + subtle noise (positioned absolute) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 -top-12 w-72 h-72 rounded-full blur-3xl bg-linear-to-tr from-[#00E1FF]/20 to-[#00A8FF]/12" />
        <div className="absolute right-8 top-24 w-56 h-56 rounded-full blur-3xl bg-linear-to-tr from-[#FF4D9A]/18 to-[#FF2E5F]/10" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      </div>

      {/* HERO */}
      <HeroSection fadeUp={fadeUp} />
      {/* VALUE PROPS */}
      <ValueProps />
      {/* SERVICES - upgraded visual */}
      <AiServicesSection />
      {/* AI Voice Agent Audio Preview Section */}
      <VoiceDemoSection />
      {/* PRICING - upgraded visual */}
      <PricingSection />
      {/* LOSS / MONEY (lively cards) */}
      <LossSection />

      {/* MODERN FAQ */}
      <FaqSection />

      {/* FINAL CTA */}
      <section className="bg-linear-to-b from-[#071018] to-[#040505] py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to automate your calls & bookings?</h3>
          <p className="text-gray-400 mt-3">Book a free 15-minute demo and we’ll show what AI can do for your business.</p>
          <div className="mt-8">
            <Button size="lg">Book Free Demo</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
