"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  onUnlock: () => void;
}

const PASSWORD = "2323";

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (input.length === 4) {
      if (input === PASSWORD) {
        setIsExiting(true);
        setTimeout(() => {
          onUnlock();
          // Save to local storage
          localStorage.setItem("chan_portfolio_unlocked", "true");
        }, 800);
      } else {
        setError(true);
        setTimeout(() => {
          setInput("");
          setError(false);
        }, 600);
      }
    }
  }, [input, onUnlock]);

  const handleNumberClick = (num: string) => {
    if (input.length < 4 && !error) {
      setInput((prev) => prev + num);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isExiting) return;
    if (e.key >= "0" && e.key <= "9") {
      handleNumberClick(e.key);
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, isExiting]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden font-inter">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isExiting ? { opacity: 0, scale: 1.1, filter: "blur(20px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center"
      >
        {/* Lock Icon */}
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl"
        >
          <Lock className="w-8 h-8 text-white/50" />
        </motion.div>

        <h1 className="text-2xl font-medium text-white mb-2 tracking-tight">Enter Passcode</h1>
        <p className="text-white/40 text-sm mb-12">Please enter the security code to view the portfolio.</p>

        {/* Passcode Indicator Dots */}
        <div className="flex gap-6 mb-16">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={error && input.length === 0 ? { x: [-4, 4, -4, 4, 0] } : {}}
              className={`w-3.5 h-3.5 rounded-full border border-white/30 transition-all duration-300 ${
                input.length > i ? "bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[280px]">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"].map((key, index) => {
            if (key === "") return <div key={`empty-${index}`} />;
            if (key === "delete") {
              return (
                <button
                  key="delete"
                  onClick={() => setInput((prev) => prev.slice(0, -1))}
                  className="w-16 h-16 flex items-center justify-center text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
                >
                  Delete
                </button>
              );
            }
            return (
              <button
                key={key}
                onClick={() => handleNumberClick(key)}
                className="group relative w-16 h-16 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-white/5 border border-white/5 rounded-full group-active:bg-white/10 group-active:scale-95 transition-all duration-200" />
                <span className="relative text-2xl font-light text-white group-active:scale-90 transition-transform">{key}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Progress Overlay for Unlocking */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black z-50 pointer-events-none"
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        />
      )}
    </div>
  );
}
