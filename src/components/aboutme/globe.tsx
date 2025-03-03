"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useSpring } from "react-spring";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 2.75,  // Fixed position
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
  let phi = 0;
  let width = 0;
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)';

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={cn("absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px]", className)}>
      <div className="w-full h-full flex items-center justify-center overflow-visible">
        <div
          className="w-full aspect-square max-w-[800px]"
          style={{
            WebkitMaskImage: fadeMask,
            maskImage: fadeMask
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full opacity-0 transition-opacity duration-500"
            style={{
              contain: 'layout paint size',
              cursor: 'auto',
              userSelect: 'none'
            }}
            onPointerDown={(e) =>
              updatePointerInteraction(
                e.clientX - pointerInteractionMovement.current,
              )
            }
            onPointerUp={() => updatePointerInteraction(null)}
            onPointerOut={() => updatePointerInteraction(null)}
            onMouseMove={(e) => updateMovement(e.clientX)}
            onTouchMove={(e) =>
              e.touches[0] && updateMovement(e.touches[0].clientX)
            }
          />
        </div>
      </div>
    </div>
  );
}
