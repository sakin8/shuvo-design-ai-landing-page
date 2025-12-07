"use client";

import { motion } from "framer-motion";
import Magnet from "./home/Magnet";


const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function ValueProps() {
  const items = [
    { title: "Never Miss a Lead", text: "AI answers calls & chats instantly, 24/7." },
    { title: "Reduce Workload by 70%", text: "Auto booking, follow-ups & FAQ handling." },
    { title: "Boost Conversions", text: "Faster replies = higher close rates." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <Magnet key={i} padding={90} magnetStrength={12} wrapperClassName="block">
            <motion.div variants={fadeUp} className="bg-linear-to-b from-[#3b3e43] to-[#383845] border border-[#ffffff] p-6 rounded-2xl shadow-[0_8px_30px_rgba(3,9,24,0.6)] transition-all duration-300">
              <div className="inline-block px-3 py-2 rounded-xl bg-black/30 border border-[#151515] mb-3">
                <div className="h-2 w-14 rounded-full bg-linear-to-r from-[#00E1FF] to-[#00A8FF]" />
              </div>
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{it.text}</p>
            </motion.div>
          </Magnet>
        ))}
      </motion.div>
    </section>
  );
}
