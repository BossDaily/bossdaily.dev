"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.5, // Changed from 2.75 to show United States
  theta: 0.4,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [180 / 255, 105 / 255, 239 / 255],
  glowColor: [1, 1, 1],
  markers: [{ location: [32.7767, -96.797], size: 0.08 }],
  scale: 1.05,
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)';
  
  // Auto-rotation
  let phi = 0;

  // Framer Motion values for smooth animation
  const r = useMotionValue(0);
  const smoothR = useSpring(r, { 
    stiffness: 300, 
    damping: 40, 
    mass: 1 
  });

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        window.addEventListener('resize', onResize);
      }
    };
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Auto-rotate only when not being dragged
        if (!pointerInteracting.current) phi += 0.005;
        
        state.phi = 0.5 + phi + smoothR.get(); // Combined auto-rotation + drag
        state.theta = config.theta;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [smoothR, config]);

  return (
    <div className={cn("absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px]", className)}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          overflow: 'visible'
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1',
            maxWidth: 800,
            WebkitMaskImage: fadeMask,
            maskImage: fadeMask
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                r.set(delta / 200);
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                r.set(delta / 200);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              contain: 'layout paint size',
              cursor: 'grab',
              userSelect: 'none',
              opacity: 0,
              transition: 'opacity 500ms'
            }}
          />
        </div>
      </div>
    </div>
  );
}
