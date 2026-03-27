"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎵 Fade-in autoplay logic
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let hasPlayed = false;

  const startMusic = () => {
    if (hasPlayed) return;

    audio.volume = 0;

    audio.play()
      .then(() => {
        hasPlayed = true;
        setIsPlaying(true);

        // 🎵 Smooth Fade-in
        let vol = 0;
        const fade = setInterval(() => {
          if (vol < 0.5) {
            vol += 0.02;
            audio.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 150);
      })
      .catch(() => {
        // Autoplay blocked (normal case)
      });
  };

  // Try autoplay immediately
  startMusic();

  // Fallback: first user interaction
  const events = ["click", "scroll", "touchstart"];

  events.forEach((event) => {
    window.addEventListener(event, startMusic);
  });

  return () => {
    events.forEach((event) => {
      window.removeEventListener(event, startMusic);
    });
  };
}, []);

  // 🎵 Toggle Play/Pause
  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const dates = [
    { src: "/6.jpeg", title: "Our First Call", date: "Feb 05, 2024" },
    { src: "/5.jpeg", title: "Our First Coffee", date: "Feb 14, 2026" },
    { src: "/4.jpeg", title: "Solo Panjokra Trip", date: "Feb 20, 2026" },
  ];

  return (
    <main className="min-h-screen bg-[#fffafa] text-[#5d4037] overflow-x-hidden">

      {/* 🎵 Audio */}
      <audio ref={audioRef} loop preload="auto">
  <source src="/romantic.mp3" type="audio/mpeg" />
</audio>

      {/* 🎵 Floating Music Button */}
      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-pink-300 hover:bg-pink-400 text-white px-4 py-3 rounded-full shadow-xl backdrop-blur-md"
      >
        {isPlaying ? "⏸ Pause" : "🎵 Play"}
      </motion.button>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif italic text-[#d48c8c] mb-4">
            Darpan
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-widest uppercase text-[#a08585]">
            My World, My Reflection, My Love
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-6 sm:bottom-10 text-2xl sm:text-3xl opacity-30"
        >
          ↓
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-10 sm:mb-14 md:mb-16 text-[#8d6e63]">
          Our Favorite Chapters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {dates.map((photo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-3 sm:p-4 shadow-xl border border-pink-50 rounded-lg"
            >
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 w-full mb-4 bg-gray-100 overflow-hidden rounded-md">
                <Image 
                  src={photo.src} 
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center">
                <p className="font-serif text-lg sm:text-xl text-[#795548]">
                  {photo.title}
                </p>
                <p className="text-xs sm:text-sm text-[#bcaba4]">
                  {photo.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Love Letter */}
      <section className="bg-[#fdeff4] py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 md:p-16 rounded-tl-[100px] rounded-br-[100px] shadow-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic mb-6">
              To my dearest Darpan,
            </h3>
            <p className="leading-relaxed text-[#6d4c41] text-sm sm:text-base md:text-lg">
              Just like your name suggests, you are the mirror that shows me the best version of myself. 
              Every moment with you feels magical, every memory a treasure. 
              You make my world complete.
            </p>
            <div className="mt-8 text-xl md:text-2xl font-serif text-[#d48c8c]">
              Forever yours.
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center text-[#bcaba4] text-sm">
        Made with ❤️ for Darpan By Mayank 
      </footer>
    </main>
  );
}