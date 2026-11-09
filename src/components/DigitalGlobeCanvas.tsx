import React, { useEffect, useRef, useState } from 'react';
import { GLOBAL_HUBS } from '../data/mockData';

interface DigitalGlobeCanvasProps {
  interactive?: boolean;
}

export const DigitalGlobeCanvas: React.FC<DigitalGlobeCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeHub, setActiveHub] = useState<string | null>('Madrid');
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ rotX: 0.25, rotY: 0.6 });
  const autoRotateSpeed = useRef(0.0025);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Pre-generate continent point cluster on a sphere to look like high-tech digital landmasses
    const continentPoints: { lat: number; lng: number }[] = [];
    
    // Procedural distribution of points outlining continents & oceanic grids
    const regions = [
      // Europe
      { minLat: 36, maxLat: 58, minLng: -10, maxLng: 35, density: 160 },
      // North America
      { minLat: 22, maxLat: 54, minLng: -125, maxLng: -68, density: 220 },
      // South America
      { minLat: -48, maxLat: 12, minLng: -78, maxLng: -38, density: 200 },
      // Central America / Caribbean
      { minLat: 9, maxLat: 22, minLng: -98, maxLng: -62, density: 80 },
      // Africa
      { minLat: -34, maxLat: 35, minLng: -16, maxLng: 50, density: 200 },
      // Asia
      { minLat: 10, maxLat: 62, minLng: 40, maxLng: 140, density: 280 },
      // Australia
      { minLat: -38, maxLat: -14, minLng: 114, maxLng: 152, density: 90 },
    ];

    regions.forEach(reg => {
      for (let i = 0; i < reg.density; i++) {
        const lat = reg.minLat + Math.random() * (reg.maxLat - reg.minLat);
        const lng = reg.minLng + Math.random() * (reg.maxLng - reg.minLng);
        continentPoints.push({ lat, lng });
      }
    });

    // Add latitude/longitude background mesh grid points
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = -180; lng < 180; lng += 15) {
        continentPoints.push({ lat, lng });
      }
    }

    // Corridors to Madrid (Headquarters)
    const corridors = [
      { from: 'Bogotá', to: 'Madrid', color: '#00F5FF', speed: 0.007, progress: 0.2 },
      { from: 'Buenos Aires', to: 'Madrid', color: '#00F5FF', speed: 0.005, progress: 0.5 },
      { from: 'Ciudad de México', to: 'Madrid', color: '#00F5FF', speed: 0.006, progress: 0.8 },
      { from: 'Miami', to: 'Madrid', color: '#00F5FF', speed: 0.006, progress: 0.35 },
      { from: 'Santiago', to: 'Madrid', color: '#00B4D8', speed: 0.0045, progress: 0.7 },
      { from: 'Lima', to: 'Madrid', color: '#00B4D8', speed: 0.0055, progress: 0.1 },
      { from: 'Londres', to: 'Madrid', color: '#FFD700', speed: 0.009, progress: 0.4 },
      { from: 'Madrid', to: 'Barcelona', color: '#FFD700', speed: 0.012, progress: 0.9 },
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      if (!isDraggingRef.current) {
        rotationRef.current.rotY += autoRotateSpeed.current;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep space atmospheric background
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 80,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      bgGrad.addColorStop(0, '#0F1E42');
      bgGrad.addColorStop(0.5, '#0B132B');
      bgGrad.addColorStop(1, '#050A17');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cyan glow ring behind globe
      const globeRadius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      const aura = ctx.createRadialGradient(
        centerX, centerY, globeRadius * 0.85,
        centerX, centerY, globeRadius * 1.35
      );
      aura.addColorStop(0, 'rgba(0, 245, 255, 0.15)');
      aura.addColorStop(0.5, 'rgba(0, 180, 216, 0.06)');
      aura.addColorStop(1, 'rgba(11, 19, 43, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Outer delicate orbital ring
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 3D Projection math
      const rotX = rotationRef.current.rotX;
      const rotY = rotationRef.current.rotY;

      const project3D = (lat: number, lng: number, altitude = 1) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180) + rotY;

        // Spherical coordinates
        const r = globeRadius * altitude;
        let x = -r * Math.sin(phi) * Math.cos(theta);
        let z = r * Math.sin(phi) * Math.sin(theta);
        let y = r * Math.cos(phi);

        // Rotate around X axis
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;

        return {
          x: centerX + x,
          y: centerY - y2,
          z: z2,
          visible: z2 > -globeRadius * 0.15 // visible on front hemisphere
        };
      };

      // Draw globe latitude rings
      ctx.strokeStyle = 'rgba(0, 180, 216, 0.08)';
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 8) {
          const p = project3D(lat, lng);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Draw digital continent particles
      for (let i = 0; i < continentPoints.length; i++) {
        const pt = continentPoints[i];
        const proj = project3D(pt.lat, pt.lng);
        if (proj.visible) {
          const depthAlpha = Math.max(0.12, (proj.z + globeRadius * 0.15) / (globeRadius * 1.15));
          ctx.fillStyle = `rgba(0, 245, 255, ${depthAlpha * 0.55})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Find hub coordinates
      const hubMap = new Map<string, typeof GLOBAL_HUBS[0]>();
      GLOBAL_HUBS.forEach(h => hubMap.set(h.name, h));

      // Draw flight arcs / corridors
      corridors.forEach(corridor => {
        const fromHub = hubMap.get(corridor.from);
        const toHub = hubMap.get(corridor.to);
        if (!fromHub || !toHub) return;

        const p1 = project3D(fromHub.lat, fromHub.lng);
        const p2 = project3D(toHub.lat, toHub.lng);

        if (p1.visible || p2.visible) {
          const midLat = (fromHub.lat + toHub.lat) / 2;
          const midLng = (fromHub.lng + toHub.lng) / 2;
          // Curve arc altitude above surface
          const pMid = project3D(midLat, midLng, 1.22);

          // Draw bezier curve arc
          ctx.save();
          ctx.strokeStyle = 'rgba(0, 245, 255, 0.22)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(pMid.x, pMid.y, p2.x, p2.y);
          ctx.stroke();

          // Animated photon particle traversing the corridor
          corridor.progress = (corridor.progress + corridor.speed) % 1;
          const u = corridor.progress;
          // Quadratic bezier interpolation: B(u) = (1-u)^2 * P0 + 2(1-u)u * P1 + u^2 * P2
          const partX = Math.pow(1 - u, 2) * p1.x + 2 * (1 - u) * u * pMid.x + Math.pow(u, 2) * p2.x;
          const partY = Math.pow(1 - u, 2) * p1.y + 2 * (1 - u) * u * pMid.y + Math.pow(u, 2) * p2.y;

          // Glowing pulse head
          ctx.fillStyle = '#00F5FF';
          ctx.shadowColor = '#00F5FF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(partX, partY, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw global migration hubs
      GLOBAL_HUBS.forEach(hub => {
        const isMadrid = hub.name === 'Madrid';
        const proj = project3D(hub.lat, hub.lng);

        if (proj.visible) {
          const depthRatio = Math.max(0.2, (proj.z + globeRadius * 0.15) / (globeRadius * 1.15));
          const baseColor = isMadrid ? '#FFD700' : '#00F5FF';

          // Pulsing halo
          const pulse = (Math.sin(t * 3 + (isMadrid ? 1 : 0)) + 1) * 0.5;
          const haloRadius = (isMadrid ? 7 : 5) + pulse * 4;

          ctx.save();
          ctx.strokeStyle = isMadrid ? `rgba(255, 215, 0, ${0.4 * depthRatio})` : `rgba(0, 245, 255, ${0.35 * depthRatio})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, haloRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Center solid light node
          ctx.fillStyle = baseColor;
          ctx.shadowColor = baseColor;
          ctx.shadowBlur = isMadrid ? 12 : 8;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, isMadrid ? 3.8 : 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Hub Label (Subtle, crisp)
          if (depthRatio > 0.45) {
            ctx.font = isMadrid ? '600 11px Outfit, sans-serif' : '500 9px Outfit, sans-serif';
            ctx.fillStyle = isMadrid ? 'rgba(255, 215, 0, 0.95)' : 'rgba(240, 248, 255, 0.82)';
            ctx.fillText(hub.name, proj.x + 8, proj.y + 3);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag handlers to gently tilt and rotate
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;

      rotationRef.current.rotY += dx * 0.005;
      rotationRef.current.rotX = Math.max(-0.6, Math.min(0.6, rotationRef.current.rotX - dy * 0.003));

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [interactive]);

  return (
    <div className="absolute inset-0 pointer-events-auto select-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
};
