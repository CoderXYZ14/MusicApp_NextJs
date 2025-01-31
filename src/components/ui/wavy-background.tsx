import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let w: number,
    h: number,
    nt: number = 0,
    i: number,
    x: number;
  let ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null;
  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  // Determine speed for wave animation
  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  // Initialize canvas
  const init = useCallback(() => {
    if (!canvasRef.current) return;
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    if (ctx) {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
      window.onresize = () => {
        if (ctx) {
          w = ctx.canvas.width = window.innerWidth;
          h = ctx.canvas.height = window.innerHeight;
          ctx.filter = `blur(${blur}px)`;
        }
      };
      render();
    }
  }, [blur]);

  // Draw wave
  const drawWave = (n: number) => {
    if (!ctx) return;
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  // Render wave animation
  let animationId: number = 0;
  const render = () => {
    if (!ctx) return;
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  // Start and cleanup animation on mount/unmount
  useEffect(() => {
    init();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [init]);

  // Detect Safari browser for specific styles
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
