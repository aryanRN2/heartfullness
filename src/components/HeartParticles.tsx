'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeartParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // --- SCROLL TRACKING WITH SMOOTH LERP ---
    let scrollY = 0;
    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollRatio = docHeight > 0 ? scrollY / docHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- BEZIER SPLINES FOR OFFICIAL HEARTFULNESS LOGO ---
    // The logo contains:
    // 1. Head (circular ring at the top)
    // 2. Left Wing swoosh
    // 3. Central Swirl loop
    // 4. Right Wing and torso sweep down to the base
    // 5. Left Lotus Leg bottom loop
    // 6. Right Lotus Leg bottom loop
    
    // Y offsets shift the center of the logo to fit beautifully
    const yShift = 3.5;

    const leftWingCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 4.2 + yShift, 0),
      new THREE.Vector3(-5.5, 9.0 + yShift, 0),
      new THREE.Vector3(-7.5, 1.0 + yShift, 0),
      new THREE.Vector3(-6.2, -1.2 + yShift, 0)
    );

    const centerLoopCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.1, 4.2 + yShift, 0),
      new THREE.Vector3(-1.8, -1.8 + yShift, 0),
      new THREE.Vector3(-3.2, 2.0 + yShift, 0),
      new THREE.Vector3(0.1, 4.2 + yShift, 0)
    );

    const rightWingCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.1, 4.2 + yShift, 0),
      new THREE.Vector3(5.5, 9.0 + yShift, 0),
      new THREE.Vector3(7.5, 1.0 + yShift, 0),
      new THREE.Vector3(0, -6.5 + yShift, 0)
    );

    const leftLotusCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -6.5 + yShift, 0),
      new THREE.Vector3(-7.0, -10.5 + yShift, 0),
      new THREE.Vector3(-15.0, -7.5 + yShift, 0),
      new THREE.Vector3(-5.0, -5.5 + yShift, 0)
    );

    const rightLotusCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -6.5 + yShift, 0),
      new THREE.Vector3(7.0, -10.5 + yShift, 0),
      new THREE.Vector3(15.0, -7.5 + yShift, 0),
      new THREE.Vector3(5.0, -5.5 + yShift, 0)
    );

    // --- PARTICLE GENERATION ---
    const particleCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Store original logo positions and final dispersed positions
    const basePositions: number[] = [];
    const dispersedPositions: number[] = [];
    const particleSpeeds: number[] = [];
    const randomOffsets: number[] = [];

    // Colors mapping to replicate the logo exactly:
    const colorHead = new THREE.Color('#00a4df');      // Bright Ocean Blue for the head
    const colorTeal = new THREE.Color('#46c3b6');      // Turquoise teal for top torso
    const colorGreen = new THREE.Color('#a5d796');     // Soft spring green for torso bottom
    const colorBottom = new THREE.Color('#2ea3b2');    // Deep teal-cyan for crossed leg loops

    for (let i = 0; i < particleCount; i++) {
      let bX = 0, bY = 0, bZ = 0;
      let pColor = new THREE.Color();

      // Spray spread around the bezier lines for volumetric floating stroke effect
      const sprayRadius = 0.38;
      const sprayX = (Math.random() - 0.5) * sprayRadius;
      const sprayY = (Math.random() - 0.5) * sprayRadius;
      // Slightly thicker depth for 3D parallax
      const sprayZ = (Math.random() - 0.5) * sprayRadius * 2.2;

      // Split particles into the logo sections
      if (i < 600) {
        // 1. HEAD RING (Ocean Blue)
        const t = (i / 600) * Math.PI * 2;
        const radius = 2.0;
        bX = radius * Math.cos(t) + sprayX;
        bY = radius * Math.sin(t) + 9.5 + yShift + sprayY;
        bZ = sprayZ;
        pColor.copy(colorHead);
      } else if (i < 1400) {
        // 2. LEFT HEART WING
        const u = (i - 600) / 800;
        const pt = leftWingCurve.getPoint(u);
        bX = pt.x + sprayX;
        bY = pt.y + sprayY;
        bZ = sprayZ;
        // Blends from turquoise top to light green bottom
        pColor.copy(colorTeal).lerp(colorGreen, u);
      } else if (i < 2200) {
        // 3. CENTRAL SWIRL LOOP
        const u = (i - 1400) / 800;
        const pt = centerLoopCurve.getPoint(u);
        bX = pt.x + sprayX;
        bY = pt.y + sprayY;
        bZ = sprayZ;
        // Blends from turquoise to light green
        pColor.copy(colorTeal).lerp(colorGreen, u);
      } else if (i < 3200) {
        // 4. RIGHT HEART WING & TORSO
        const u = (i - 2200) / 1000;
        const pt = rightWingCurve.getPoint(u);
        bX = pt.x + sprayX;
        bY = pt.y + sprayY;
        bZ = sprayZ;
        // Blends all the way down to base
        pColor.copy(colorTeal).lerp(colorGreen, u);
      } else if (i < 3850) {
        // 5. LEFT LOTUS LEG
        const u = (i - 3200) / 650;
        const pt = leftLotusCurve.getPoint(u);
        bX = pt.x + sprayX;
        bY = pt.y + sprayY;
        bZ = sprayZ;
        // Blends from green at center to turquoise at outer loop
        pColor.copy(colorGreen).lerp(colorBottom, u);
      } else {
        // 6. RIGHT LOTUS LEG
        const u = (i - 3850) / 650;
        const pt = rightLotusCurve.getPoint(u);
        bX = pt.x + sprayX;
        bY = pt.y + sprayY;
        bZ = sprayZ;
        // Blends from green at center to turquoise at outer loop
        pColor.copy(colorGreen).lerp(colorBottom, u);
      }

      basePositions.push(bX, bY, bZ);

      // Dispersed positions (Spread across screen on scroll)
      const dX = (Math.random() - 0.5) * 85;
      const dY = (Math.random() - 0.75) * 95;
      const dZ = (Math.random() - 0.5) * 60;
      dispersedPositions.push(dX, dY, dZ);

      // Set initial positions to logo coordinates
      positions[i * 3] = bX;
      positions[i * 3 + 1] = bY;
      positions[i * 3 + 2] = bZ;

      // Assign custom mapped logo color values
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      particleSpeeds.push(0.5 + Math.random() * 1.5);
      randomOffsets.push(Math.random() * 100);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // --- CREATE SHARP, GLOWING PARTICLE TEXTURE DYNAMICALLY ---
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Outer faint glow
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // --- MATERIAL SETUP ---
    const material = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      opacity: 0.88,
      map: createCircleTexture(),
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // 1. Lerp scroll ratio for buttery smooth transitions
      currentScrollRatio = THREE.MathUtils.lerp(
        currentScrollRatio,
        targetScrollRatio,
        0.06 // Lerping speed factor
      );

      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      
      // 2. Animate and interpolate each particle
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Base coordinate (Logo shape)
        const bX = basePositions[i3];
        const bY = basePositions[i3 + 1];
        const bZ = basePositions[i3 + 2];

        // Dispersed coordinate (Scattered on scroll)
        const dX = dispersedPositions[i3];
        const dY = dispersedPositions[i3 + 1];
        const dZ = dispersedPositions[i3 + 2];

        // Easing factor to create smooth velocity shifts during dispersion
        const easeRatio = Math.pow(currentScrollRatio, 1.5);
        
        let targetX = THREE.MathUtils.lerp(bX, dX, easeRatio);
        let targetY = THREE.MathUtils.lerp(bY, dY, easeRatio);
        let targetZ = THREE.MathUtils.lerp(bZ, dZ, easeRatio);

        // Add subtle floating turbulence / wind wave using Sine/Cosine noise
        const speed = particleSpeeds[i];
        const offset = randomOffsets[i];
        
        const turbulenceFactor = 0.1 + easeRatio * 2.2; 
        
        const floatX = Math.sin(elapsedTime * speed + offset) * 0.14 * turbulenceFactor;
        const floatY = Math.cos(elapsedTime * speed * 0.8 + offset) * 0.14 * turbulenceFactor;
        const floatZ = Math.sin(elapsedTime * speed * 1.2 + offset) * 0.14 * turbulenceFactor;

        positionsAttr.setXYZ(
          i,
          targetX + floatX,
          targetY + floatY,
          targetZ + floatZ
        );
      }

      positionsAttr.needsUpdate = true;

      // 3. Subtle slow rotation of the whole system
      if (currentScrollRatio < 0.2) {
        // Slow heart floating tilt
        particleSystem.rotation.y = Math.sin(elapsedTime * 0.12) * 0.08;
        particleSystem.rotation.x = Math.cos(elapsedTime * 0.08) * 0.04;
      } else {
        // Drift background points
        particleSystem.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- HANDLE RESIZE ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Adjust particle size on smaller screens
      if (window.innerWidth < 768) {
        material.size = 0.55; // Slightly larger for mobile visibility
        camera.position.z = 45; // Move camera back
      } else {
        material.size = 0.38;
        camera.position.z = 35;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // trigger once initially

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
