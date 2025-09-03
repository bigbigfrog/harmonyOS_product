import React, { useRef, useEffect } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationId = useRef<number | null>(null);

  const easeFunc = (t: number) => {
    switch (easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-out':
        return t * (2 - t);
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tagName = (e.target as HTMLElement).tagName;
    if (
      tagName === 'BUTTON' ||
      tagName === 'INPUT' ||
      tagName === 'TEXTAREA'
    ) {
      return; // 不触发火花
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
    if (!animationId.current) {
      animationId.current = requestAnimationFrame(draw);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    let active = false;

    sparksRef.current = sparksRef.current.filter(spark => {
      const elapsed = now - spark.startTime;
      if (elapsed > duration) return false;

      active = true;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFunc(progress);

      const r = sparkRadius * eased * extraScale;
      const sx = spark.x + Math.cos(spark.angle) * r;
      const sy = spark.y + Math.sin(spark.angle) * r;

      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, sy, sparkSize * (1 - eased), 0, 2 * Math.PI);
      ctx.fillStyle = sparkColor;
      ctx.globalAlpha = 1 - eased;
      ctx.shadowColor = sparkColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      return true;
    });

    if (active) {
      animationId.current = requestAnimationFrame(draw);
    } else {
      animationId.current = null;
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
