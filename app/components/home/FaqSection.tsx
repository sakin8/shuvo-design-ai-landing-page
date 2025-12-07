"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


import { fadeUp } from "../lib/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const FaqSection: FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left illustration */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:block"
        >
          <div className="w-72 h-72 rounded-2xl bg-linear-to-tr from-[#001419]/50 to-[#001428]/30 border border-[#071018] shadow-lg flex items-center justify-center">
            <Image
              src="/ai-voice.jpg"
              alt="AI Robot"
              width={260}
              height={260}
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* FAQ Content */}
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently asked questions
          </h2>

          <div className="grid gap-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>
                  How fast can you deploy an AI agent?
                </AccordionTrigger>
                <AccordionContent>
                  Typical deployment for standard setups is 24–72 hours. Custom
                  integrations may take longer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Which businesses benefit most?
                </AccordionTrigger>
                <AccordionContent>
                  Dental clinics, salons, realtors, restaurants & any business
                  getting daily phone leads.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3">
                <AccordionTrigger>Do you support multiple languages?</AccordionTrigger>
                <AccordionContent>
                  Yes — English, Spanish and many more using advanced TTS/ASR
                  models.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
