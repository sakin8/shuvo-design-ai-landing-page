"use client";

import { useEffect } from "react";

interface VideoCardProps {
  src: string;
  label: string;
  borderHover: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, label, borderHover }) => {
  return (
    <div
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl transition-all ${borderHover}`}
    >
      <div className="relative w-full rounded-xl overflow-hidden cursor-pointer">

        {/* PLAY ICON overlay (only before playing) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-all">
          <div className="bg-white/20 backdrop-blur-xl p-4 rounded-full">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* === VIDEO with auto-generated thumbnail === */}
        <video
          controls
          preload="metadata"
          className="rounded-xl w-full"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <p className="text-gray-300 mt-4">{label}</p>
    </div>
  );
};

export default function VoiceDemoSection() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>("video");

    const handlePlay = (e: Event) => {
      const current = e.target as HTMLVideoElement;
      videos.forEach((v) => {
        if (v !== current) v.pause();
      });
    };

    videos.forEach((v) => v.addEventListener("play", handlePlay));

    return () => {
      videos.forEach((v) => v.removeEventListener("play", handlePlay));
    };
  }, []);

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Listen to Our AI Voice Agents
        </h2>

        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Click any demo below to hear real client-ready AI voice agents in action.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
          <VideoCard
            src="/dr-smile-video.mp4"
            label="AI Voice Demo — Friendly Receptionist"
            borderHover="hover:border-cyan-400/40"
          />

          <VideoCard
            src="/dr-smile-video.mp4"
            label="AI Voice Demo — Booking Assistant"
            borderHover="hover:border-pink-400/40"
          />

          <VideoCard
            src="/dr-smile-video.mp4"
            label="AI Voice Demo — Customer Support Agent"
            borderHover="hover:border-blue-400/40"
          />
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px]" />
      </div>
    </section>
  );
}
