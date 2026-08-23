"use client";

import { useEffect, useRef } from "react";
import type { VoiceSessionState } from "@/types/voice";

interface VoiceOrbProps {
  state: VoiceSessionState;
  microphoneLevel: number;
  speakerLevel: number;
}

export function VoiceOrb({ state, microphoneLevel, speakerLevel }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const baseRadius = size * 0.3;

    let phase = 0;

    const getStateColor = () => {
      const prefersDark = document.documentElement.classList.contains("dark");
      switch (state) {
        case "listening":
          return { primary: "#3b82f6", secondary: "#60a5fa" };
        case "user_speaking":
          return { primary: "#22c55e", secondary: "#4ade80" };
        case "assistant_processing":
          return { primary: "#f59e0b", secondary: "#fbbf24" };
        case "assistant_speaking":
          return { primary: "#8b5cf6", secondary: "#a78bfa" };
        case "connecting":
        case "reconnecting":
          return { primary: "#6b7280", secondary: "#9ca3af" };
        case "error":
          return { primary: "#ef4444", secondary: "#f87171" };
        default:
          return prefersDark
            ? { primary: "#737373", secondary: "#a3a3a3" }
            : { primary: "#4b5563", secondary: "#6b7280" };
      }
    };

    const getAmplitude = () => {
      if (state === "user_speaking") return microphoneLevel;
      if (state === "assistant_speaking") return speakerLevel;
      return 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const colors = getStateColor();
      const amplitude = getAmplitude();
      const isActive = [
        "listening",
        "user_speaking",
        "assistant_processing",
        "assistant_speaking",
      ].includes(state);

      if (prefersReducedMotion.current) {
        const gradient = ctx.createRadialGradient(
          center,
          center,
          0,
          center,
          center,
          baseRadius
        );
        gradient.addColorStop(0, colors.primary);
        gradient.addColorStop(1, colors.secondary);

        ctx.beginPath();
        ctx.arc(center, center, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        phase += 0.02;

        const pulseScale =
          state === "assistant_processing"
            ? 1 + Math.sin(phase * 2) * 0.1
            : 1 + amplitude * 0.3;

        const radius = baseRadius * pulseScale;

        const gradient = ctx.createRadialGradient(
          center,
          center,
          0,
          center,
          center,
          radius * 1.2
        );
        gradient.addColorStop(0, colors.primary + "ff");
        gradient.addColorStop(0.7, colors.secondary + "cc");
        gradient.addColorStop(1, colors.secondary + "00");

        ctx.beginPath();
        ctx.arc(center, center, radius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (isActive && amplitude > 0.1) {
          const waveCount = 8;
          for (let i = 0; i < waveCount; i++) {
            const angle = (i / waveCount) * Math.PI * 2 + phase;
            const waveAmplitude = amplitude * 20;
            const x = center + Math.cos(angle) * (radius + waveAmplitude);
            const y = center + Math.sin(angle) * (radius + waveAmplitude);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = colors.primary + "88";
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [state, microphoneLevel, speakerLevel]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]"
        aria-hidden="true"
      />
    </div>
  );
}
