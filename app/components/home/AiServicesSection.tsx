"use client";

import { motion, Variants } from "framer-motion";
import ElectricBorder from "../ui/ElectricBorder";
import { Button } from "../ui/button";

export interface ServiceCard {
  title: string;
  desc: string;
  accent: string;
}


// === ANIMATIONS (TypeScript Safe) ===
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

// === DATA ===
const cards: ServiceCard[] = [
  {
    title: "AI Chatbot Development",
    desc: "Website, WhatsApp, Messenger & Instagram chatbots trained on your business data.",
    accent: "from-cyan-400 to-blue-400",
  },
  {
    title: "AI Voice Agent",
    desc: "Human-like voice assistant that answers calls, handles bookings & supports 24/7.",
    accent: "from-cyan-400 to-pink-400",
  },
  {
    title: "Automations & Integrations",
    desc: "CRM automation, follow-ups, scheduling, pipelines, workflows & advanced AI flows.",
    accent: "from-pink-400 to-red-400",
  },
];

export default function AiServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Our AI Services
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          High-performance solutions built with the latest AI technology.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 items-stretch"
      >
        {cards.map((card, idx) => (
          <motion.div key={idx} variants={fadeUp} className="h-full">
            <ElectricBorder
              color="#7df9ff"
              speed={1.2}
              chaos={0.8}
              thickness={2}
              className="rounded-2xl h-full"
              style={{ padding: "1px" }}
            >
              <div className="p-8 h-full flex flex-col justify-between transition-all">
                <div>
                  {/* ICON */}
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#ffffff0a] to-[#ffffff05] border border-white/10 flex items-center justify-center shadow-lg">
                    <div className={`h-8 w-8 rounded-full bg-linear-to-br ${card.accent}`} />
                  </div>

                  {/* TEXT */}
                  <h3 className="text-2xl font-semibold text-white mt-6">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 mt-3 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                  >
                    Learn more
                  </Button>

                  <Button
                    size="sm"
                    className="bg-linear-to-r from-cyan-500 to-pink-500 text-white hover:opacity-80 cursor-pointer"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
