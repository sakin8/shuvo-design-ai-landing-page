"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { fadeUp } from "../lib/animations";

export interface LossItem {
  color: string;
  title: string;
  description: string;
}


const items: LossItem[] = [
  {
    color: "#00E1FF",
    title: "Missed Calls",
    description: "~37% of leads never callback after a missed call.",
  },
  {
    color: "#FF4D9A",
    title: "Slow Replies",
    description: "A slow reply reduces conversion significantly.",
  },
];

export default function LossSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT TEXT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            You’re Losing Money Every Day Without AI.
          </h2>

          <p className="text-gray-400 mt-4 max-w-lg">
            Missed calls, slow replies and no automation cause real revenue loss.
            Automate and recover bookings instantly.
          </p>

          <ul className="mt-6 space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1" style={{ color: item.color }}>
                  ●
                </span>
                <div>
                  <div className="text-white font-semibold">{item.title}</div>
                  <div className="text-gray-400 text-sm">{item.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-linear-to-tr from-[#03121a]/40 via-[#001427]/30 to-[#071016]/40 
          border border-[#0b2b35] shadow-[0_20px_60px_rgba(0,162,255,0.06)]"
        >
          <div className="text-sm text-gray-400">Estimated Loss</div>

          <div className="text-3xl font-extrabold text-[#FF5B6C] mt-2">
            $1,200 – $7,500 / month
          </div>

          <div className="text-gray-400 mt-2 text-sm">
            Based on missed calls, slow replies and missed bookings.
          </div>

          <div className="mt-6">
            <Button size="lg" className="w-full">
              Calculate My Loss
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
