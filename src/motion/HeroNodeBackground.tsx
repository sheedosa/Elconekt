import { useEffect, useRef } from "react";
import HeroBackdrop from "./HeroBackdrop";

/**
 * HeroNodeBackground
 * ------------------
 * The breathing 2D node canvas (with WebGL hero point-field on desktop)
 * extracted so every page hero shares the same ambient backdrop.
 *
 * Pure ambient motion — independent of scroll position, pointer events,
 * and address-bar collapse.  See `Elconekt.tsx` for the original
 * implementation and the design rationale.
 */
export default function HeroNodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let lastInitW = 0, lastInitH = 0;
    let animId: number;
    const NODE_COUNT = 70;
    const MAX_DIST = 160;
    let nodes: {
      x: number; y: number; vx: number; vy: number;
      r: number; pulse: number; accent: boolean;
    }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      const newW = rect.width;
      const newH = rect.height;
      if (newW === W && newH === H) return;
      W = newW;
      H = newH;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6,
          pulse: Math.random() * Math.PI * 2,
          accent: Math.random() < 0.18,
        });
      }
      lastInitW = W;
      lastInitH = H;
    }

    function reflowNodes() {
      if (lastInitW === 0 || lastInitH === 0) return;
      const sx = W / lastInitW;
      const sy = H / lastInitH;
      for (const n of nodes) {
        n.x *= sx;
        n.y *= sy;
      }
      lastInitW = W;
      lastInitH = H;
    }

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.02;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.28;
            ctx!.strokeStyle = `rgba(7,27,70,${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        const breathe = 1 + Math.sin(n.pulse) * 0.3;
        if (n.accent) {
          ctx!.fillStyle = "rgba(30,99,255,0.95)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 1.6 * breathe, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = "rgba(30,99,255,0.15)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 5 * breathe, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          ctx!.fillStyle = "rgba(7,27,70,0.55)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * breathe, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      animId = requestAnimationFrame(tick);
    }

    resize();
    initNodes();
    animId = requestAnimationFrame(tick);

    const onResize = () => { resize(); reflowNodes(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className="hero__bg">
        <HeroBackdrop fallback={<canvas className="hero__canvas" ref={canvasRef} />} />
      </div>
      <div className="hero__grad" />
    </>
  );
}
