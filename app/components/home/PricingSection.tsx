"use client";

type PricingCardProps = {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  buttonGradient: string;
  borderColor?: string;
  tag?: string;
};

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 bg-black overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-pink-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Simple, Transparent{" "}
            <span className="text-cyan-400">Pricing</span>
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Choose the perfect plan for your website, business, or brand.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          <PricingCard
            title="Starter"
            subtitle="For small creators & personal brands"
            price="$49/mo"
            features={[
              "✔ 1 AI Landing Page",
              "✔ Basic Chatbot",
              "✔ Mobile Responsive",
              "✔ 3 Revisions",
            ]}
            buttonGradient="from-cyan-500 to-blue-500"
          />

          <PricingCard
            title="Business Pro"
            subtitle="For agencies, influencers & teams"
            price="$149/mo"
            features={[
              "✔ Everything in Starter",
              "✔ Premium AI Assistant",
              "✔ Advanced Automation",
              "✔ Full Branding Pack",
              "✔ Priority Support",
            ]}
            highlighted
            tag="MOST POPULAR"
            borderColor="border-cyan-400"
            buttonGradient="from-cyan-500 to-pink-500"
          />

          <PricingCard
            title="Enterprise"
            subtitle="For companies & large brands"
            price="$299/mo"
            features={[
              "✔ Everything in Pro",
              "✔ Custom AI Voice Agent",
              "✔ API & CRM Integration",
              "✔ Dedicated Manager",
            ]}
            buttonGradient="from-pink-500 to-red-500"
          />
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   PRICING CARD COMPONENT
=========================================================== */
function PricingCard({
  title,
  subtitle,
  price,
  features,
  highlighted = false,
  buttonGradient,
  borderColor,
  tag,
}: PricingCardProps) {
  return (
    <div
      className={`relative p-8 rounded-2xl backdrop-blur-xl transition-all group 
        ${highlighted
          ? `bg-white/10 shadow-2xl scale-105 border ${borderColor || "border-cyan-400"}`
          : "bg-white/5 border border-white/10 hover:border-cyan-400/40"
        }`}
    >
      {/* Tag for Popular */}
      {tag && (
        <div className="absolute -top-3 right-5 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
          {tag}
        </div>
      )}

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{subtitle}</p>

      <p className="text-4xl font-bold text-white mb-6">
        {price}
      </p>

      <ul className="space-y-4 text-gray-300">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`mt-8 w-full py-3 rounded-xl bg-linear-to-r ${buttonGradient} 
          text-white font-semibold shadow-lg hover:opacity-90 transition cursor-pointer`}
      >
        Get Started
      </button>
    </div>
  );
}
