'use client';

import React, { useRef, useEffect } from 'react';

type FallingLine = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
};

export const StarAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numLines = 150;
    let lines: FallingLine[] = [];
    const colors = [
      '#08c5ee77',
      '#08c5ee77',
      '#00ede577',
      '#74def977',
      '#74def977',
      '#74def977',
      '#93ddfd77',
      '#d6e9f877',
      '#414fe277',
      '#00b7f077',
      '#00b7f077',
      '#00f3e677',
    ];
    const moveAngle = (38 * Math.PI) / 180;

    const initLines = (): void => {
      lines = [];
      for (let i = 0; i < numLines; i++) {
        const w = Math.random() * 500 + 50;
        const h = Math.random() * 30 + 10;
        lines.push({
          x: Math.random() * width,
          y: Math.random() * height,
          width: w,
          height: h,
          speed: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initLines();

    let animationFrameId: number;

    const animate = (): void => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        line.x += line.speed * Math.cos(moveAngle);
        line.y -= line.speed * Math.sin(moveAngle);
        const shapeAngleDeg = 38;
        const shapeAngleRad = (shapeAngleDeg * Math.PI) / 180;
        const offset = line.height / Math.tan(shapeAngleRad);
        if (line.x > width || line.y < -(line.width + line.height)) {
          if (line.x > width) {
            line.x = -(line.width + offset);
            line.y = Math.random() * height;
          } else if (line.y < -(line.width + line.height)) {
            line.x = Math.random() * width;
            line.y = height + (line.width + line.height);
          }
          line.color = colors[Math.floor(Math.random() * colors.length)];
        }

        const centerX = line.x + (line.width + offset) / 2;
        const centerY = line.y + line.height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(-shapeAngleRad);
        ctx.beginPath();
        ctx.moveTo(line.x - centerX, line.y - centerY);
        ctx.lineTo(line.x + line.width - centerX, line.y - centerY);
        ctx.lineTo(line.x + line.width + offset - centerX, line.y + line.height - centerY);
        ctx.lineTo(line.x + offset - centerX, line.y + line.height - centerY);
        ctx.closePath();
        ctx.fillStyle = line.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = (): void => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initLines();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed left-0 top-0 -z-10" />;
};
