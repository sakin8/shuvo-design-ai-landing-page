import { motion, Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import DecryptedText from "../ui/DecryptedText";
import { Button } from "../ui/button";

interface HeroSectionProps {
  fadeUp: Variants;
}

const HeroSection: React.FC<HeroSectionProps> = ({ fadeUp }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <DecryptedText
            text="Convert Calls Into Customers —"
            animateOn="view"
            revealDirection="center"
            className="bg-clip-text text-[#00A8FF]"
            encryptedClassName="bg-clip-text text-transparent bg-linear-to-r from-[#00E1FF] via-[#00A8FF] to-[#FF4D9A]"
          />
          <br />
          <DecryptedText
            text="AI Voice & Chat Agents"
            animateOn="view"
            revealDirection="center"
            className="bg-clip-text text-transparent bg-linear-to-r from-[#00E1FF] via-[#00A8FF] to-[#FF4D9A]"
            encryptedClassName="bg-clip-text text-transparent bg-linear-to-r from-[#00E1FF] via-[#00A8FF] to-[#FF4D9A]"
          />
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl">
          Human-like AI assistants that answer calls, book appointments, and manage follow-ups — 24/7.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" className="rounded-2xl">
            Book a Free Demo <ArrowRight className="ml-2 h-5" />
          </Button>

          <Button variant="ghost" size="lg" className="rounded-2xl">
            <span className="text-[#00E1FF]">See Voice Sample</span>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-[#00E1FF]" />
            <div>
              <div className="text-sm font-semibold">24/7 Availability</div>
              <div className="text-xs text-gray-400">Never miss a call or booking.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-[#FF4D9A]" />
            <div>
              <div className="text-sm font-semibold">Multi-channel</div>
              <div className="text-xs text-gray-400">Website, WhatsApp & Phone</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-[#1a1a1a] shadow-2xl">
          <div className="aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/oXr_k1xNvoA?rel=0&modestbranding=1"
              title="AI demo"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
