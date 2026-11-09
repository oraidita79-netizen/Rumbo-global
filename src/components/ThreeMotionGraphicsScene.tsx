import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLOBAL_HUBS } from '../data/mockData';

interface ThreeMotionGraphicsSceneProps {
  selectedHubName?: string;
  onSelectHub?: (name: string) => void;
  interactive?: boolean;
}

export const ThreeMotionGraphicsScene: React.FC<ThreeMotionGraphicsSceneProps> = ({
  selectedHubName = 'Madrid',
  onSelectHub,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const waveMeshRef = useRef<THREE.Mesh | null>(null);
  const targetRotationRef = useRef({ x: 0.2, y: 0.5 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0B132B, 0.012);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 26);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f244a, 1.8);
    scene.add(ambientLight);

    const dirLightCyan = new THREE.DirectionalLight(0x00F5FF, 3.2);
    dirLightCyan.position.set(15, 20, 15);
    scene.add(dirLightCyan);

    const dirLightGold = new THREE.DirectionalLight(0xFFD700, 2.5);
    dirLightGold.position.set(-15, -10, 10);
    scene.add(dirLightGold);

    // 5. GLOBE HIERARCHY
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    globeGroup.position.set(0, 0.5, 0);
    scene.add(globeGroup);

    const globeRadius = 6.8;

    // Inner dark sphere core
    const coreGeo = new THREE.SphereGeometry(globeRadius * 0.98, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x070D1F,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Holographic wireframe rings
    const wireGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00B4D8,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Equatorial and orbital glowing rings
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.16, globeRadius * 1.18, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI * 0.45;
    orbitalRing.rotation.y = Math.PI * 0.15;
    globeGroup.add(orbitalRing);

    // Second tilted gold ring
    const ringGeo2 = new THREE.RingGeometry(globeRadius * 1.28, globeRadius * 1.29, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.x = -Math.PI * 0.35;
    orbitalRing2.rotation.y = Math.PI * 0.25;
    globeGroup.add(orbitalRing2);

    // 6. 3D Digital Landmass Dots (Procedural high-tech dot matrix)
    const pointsCount = 3400;
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);

    const cyanColor = new THREE.Color(0x00F5FF);
    const goldColor = new THREE.Color(0xFFD700);
    const blueColor = new THREE.Color(0x006699);

    const latLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Populate continent clusters on sphere
    const clusters = [
      { minLat: 36, maxLat: 60, minLng: -10, maxLng: 35 }, // Europe
      { minLat: 22, maxLat: 54, minLng: -125, maxLng: -68 }, // North America
      { minLat: -45, maxLat: 12, minLng: -78, maxLng: -38 }, // South America
      { minLat: -30, maxLat: 35, minLng: -16, maxLng: 50 }, // Africa
      { minLat: 10, maxLat: 60, minLng: 40, maxLng: 135 }, // Asia
      { minLat: -38, maxLat: -14, minLng: 114, maxLng: 152 }, // Australia
    ];

    let pIdx = 0;
    for (let i = 0; i < pointsCount; i++) {
      let lat = 0;
      let lng = 0;

      if (Math.random() > 0.35) {
        // Sample within continent cluster
        const cl = clusters[Math.floor(Math.random() * clusters.length)];
        lat = cl.minLat + Math.random() * (cl.maxLat - cl.minLat);
        lng = cl.minLng + Math.random() * (cl.maxLng - cl.minLng);
      } else {
        // Uniform background spherical grid
        lat = (Math.random() - 0.5) * 160;
        lng = (Math.random() - 0.5) * 360;
      }

      const v = latLngToVector3(lat, lng, globeRadius + 0.05);
      positions[pIdx * 3] = v.x;
      positions[pIdx * 3 + 1] = v.y;
      positions[pIdx * 3 + 2] = v.z;

      const col = Math.random() > 0.85 ? goldColor : Math.random() > 0.4 ? cyanColor : blueColor;
      colors[pIdx * 3] = col.r;
      colors[pIdx * 3 + 1] = col.g;
      colors[pIdx * 3 + 2] = col.b;
      pIdx++;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const globePoints = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(globePoints);

    // 7. 3D GLOBAL HUBS & BEACONS
    const hubsGroup = new THREE.Group();
    globeGroup.add(hubsGroup);

    const hubPositions: Record<string, THREE.Vector3> = {};

    GLOBAL_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius + 0.08);
      hubPositions[hub.name] = pos;

      const isMadrid = hub.name === 'Madrid';

      // Base marker sphere
      const hubGeo = new THREE.SphereGeometry(isMadrid ? 0.22 : 0.14, 16, 16);
      const hubMat = new THREE.MeshBasicMaterial({
        color: isMadrid ? 0xFFD700 : 0x00F5FF,
      });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.copy(pos);
      hubsGroup.add(hubMesh);

      // Vertical holographic light beam shooting up from hub
      const beamHeight = isMadrid ? 1.4 : 0.8;
      const beamGeo = new THREE.CylinderGeometry(0.02, 0.04, beamHeight, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: isMadrid ? 0xFFD700 : 0x00F5FF,
        transparent: true,
        opacity: 0.6,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      // Align cylinder normal to sphere surface
      const normal = pos.clone().normalize();
      beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      beamMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(beamHeight / 2)));
      hubsGroup.add(beamMesh);

      // Pulsing outer halo ring
      const haloGeo = new THREE.RingGeometry(isMadrid ? 0.32 : 0.22, isMadrid ? 0.36 : 0.25, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: isMadrid ? 0xFFD700 : 0x00F5FF,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      haloMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.02)));
      hubsGroup.add(haloMesh);
    });

    // 8. 3D ARCHED FLIGHT TRAJECTORY CORRIDORS TO MADRID
    const corridorsGroup = new THREE.Group();
    globeGroup.add(corridorsGroup);

    const corridorNames = ['Bogotá', 'Ciudad de México', 'Buenos Aires', 'Miami', 'Santiago', 'Lima', 'Londres'];
    const madridPos = hubPositions['Madrid'];

    const photonParticles: {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }[] = [];

    if (madridPos) {
      corridorNames.forEach((fromCity, i) => {
        const fromPos = hubPositions[fromCity];
        if (!fromPos) return;

        // Middle control point elevated above the sphere
        const midPoint = new THREE.Vector3().addVectors(fromPos, madridPos).multiplyScalar(0.5);
        const distance = fromPos.distanceTo(madridPos);
        const altitude = globeRadius + distance * 0.38;
        midPoint.normalize().multiplyScalar(altitude);

        const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, madridPos);
        const curvePoints = curve.getPoints(50);
        const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

        const curveMat = new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? 0x00F5FF : 0x00B4D8,
          transparent: true,
          opacity: 0.35,
        });
        const curveLine = new THREE.Line(curveGeo, curveMat);
        corridorsGroup.add(curveLine);

        // Animated photon packet traveling along the curve
        const photonGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const photonMat = new THREE.MeshBasicMaterial({
          color: 0x00F5FF,
        });
        const photonMesh = new THREE.Mesh(photonGeo, photonMat);
        corridorsGroup.add(photonMesh);

        photonParticles.push({
          curve,
          mesh: photonMesh,
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.003,
        });
      });
    }

    // 9. 3D UNDULATING MOTION GRAPHICS CYBER MESH WAVE
    // A beautiful, wavy geometric terrain plane floating underneath the globe
    const waveWidth = 45;
    const waveHeight = 35;
    const waveSegmentsW = 60;
    const waveSegmentsH = 45;
    const waveGeo = new THREE.PlaneGeometry(waveWidth, waveHeight, waveSegmentsW, waveSegmentsH);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI * 0.48;
    waveMesh.position.set(0, -7.5, -4);
    scene.add(waveMesh);
    waveMeshRef.current = waveMesh;

    // Keep initial positions for wave oscillation
    const wavePosAttr = waveGeo.attributes.position;
    const initialWaveZ = new Float32Array(wavePosAttr.count);
    for (let i = 0; i < wavePosAttr.count; i++) {
      initialWaveZ[i] = wavePosAttr.getZ(i);
    }

    // 10. Floating Ambient Starfield Dust (Depth particle matrix)
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.4,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 11. Interaction & Parallax Handlers
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Parallax mouse position
      mouseRef.current.x = (clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(clientY / window.innerHeight) * 2 + 1;

      if (!isDragging || !interactive) return;

      const deltaX = clientX - prevMouse.x;
      const deltaY = clientY - prevMouse.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x - deltaY * 0.004));

      prevMouse = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 12. ANIMATION & RENDER LOOP
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Auto-rotation when not dragging
      if (!isDragging) {
        targetRotationRef.current.y += 0.0018;
      }

      // Smooth damping interpolation for 3D globe rotation
      if (globeGroup) {
        globeGroup.rotation.y = THREE.MathUtils.damp(globeGroup.rotation.y, targetRotationRef.current.y, 4, 0.016);
        globeGroup.rotation.x = THREE.MathUtils.damp(globeGroup.rotation.x, targetRotationRef.current.x, 4, 0.016);
      }

      // Camera subtle parallax tracking
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseRef.current.x * 2.5, 2, 0.016);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 5 + mouseRef.current.y * 1.5, 2, 0.016);
      camera.lookAt(0, 0, 0);

      // Animate 3D flight photons
      photonParticles.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        const currentPos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(currentPos);
      });

      // Animate 3D undulating motion graphics wave mesh
      if (waveMesh) {
        const positions = waveMesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const u = positions.getX(i);
          const v = positions.getY(i);
          // Complex cyber harmonic wave math: sine + cosine interference
          const waveZ = Math.sin(u * 0.28 + elapsedTime * 1.8) * 1.2 +
                        Math.cos(v * 0.35 + elapsedTime * 1.4) * 0.9 +
                        Math.sin((u + v) * 0.2 + elapsedTime * 2.2) * 0.6;
          positions.setZ(i, waveZ);
        }
        positions.needsUpdate = true;
      }

      // Slow drift of background stars
      stars.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Clean disposal
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  // When selectedHubName changes, smoothly glide the globe to face that hub
  useEffect(() => {
    if (!globeGroupRef.current) return;
    const hub = GLOBAL_HUBS.find(h => h.name.toLowerCase() === selectedHubName.toLowerCase());
    if (hub) {
      // Calculate target Y rotation so hub faces camera (Z positive)
      const targetY = -((hub.lng + 180) * (Math.PI / 180)) + Math.PI / 2;
      const targetX = (hub.lat * (Math.PI / 180)) * 0.35;
      targetRotationRef.current = { x: targetX, y: targetY };
    }
  }, [selectedHubName]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-auto select-none overflow-hidden cursor-grab active:cursor-grabbing"
      aria-label="3D Motion Graphics Canvas Scene"
    />
  );
};
