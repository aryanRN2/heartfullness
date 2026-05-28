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

    // --- PARTICLE GENERATION ---
    const particleCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Store original heart positions and final dispersed positions
    const heartPositions: number[] = [];
    const dispersedPositions: number[] = [];
    const particleSpeeds: number[] = [];
    const randomOffsets: number[] = [];

    // Helper: Create a volumetric 3D heart parametric coordinate
    // Equation based on: 
    // x = 16 * sin^3(t)
    // y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
    // z = volumetric offset
    const getHeartPoint = (i: number) => {
      // Distribution parameters
      const t = Math.PI * 2 * Math.random();
      const p = Math.PI * (Math.random() - 0.5); // polar angle for 3D thickness

      // Parametric 2D heart projection
      const x2d = 16 * Math.pow(Math.sin(t), 3);
      const y2d = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      
      // Expand into a volumetric 3D shell
      const thickness = 4 * Math.sin(p);
      const scale = 0.85;

      // Adjust axis: x, y (inverted), z
      return {
        x: x2d * scale,
        y: y2d * scale * 0.95,
        z: thickness * scale * 1.5
      };
    };

    // Color gradients (Spiritual Pink/Indigo/Orange)
    const colorA = new THREE.Color('#ff0844'); // Bright Pink/Red
    const colorB = new THREE.Color('#8b5cf6'); // Mystical Purple
    const colorC = new THREE.Color('#ffbe3b'); // Warm Gold

    for (let i = 0; i < particleCount; i++) {
      // 1. Heart base positions
      const heartPt = getHeartPoint(i);
      // Offset heart up slightly to sit nicely as header logo
      const hX = heartPt.x;
      const hY = heartPt.y + 7; // Shift logo up
      const hZ = heartPt.z;
      
      heartPositions.push(hX, hY, hZ);

      // 2. Dispersed positions (Spread out everywhere across the viewport in 3D)
      // We distribute particles in a wide box covering the website sections
      const dX = (Math.random() - 0.5) * 80;
      // Spread vertically further down, as user scrolls down the page
      const dY = (Math.random() - 0.7) * 90;
      const dZ = (Math.random() - 0.5) * 60;
      dispersedPositions.push(dX, dY, dZ);

      // Set initial positions to heart shape
      positions[i * 3] = hX;
      positions[i * 3 + 1] = hY;
      positions[i * 3 + 2] = hZ;

      // 3. Set particle colors based on position
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color();
      if (mixRatio < 0.4) {
        mixedColor.copy(colorA).lerp(colorB, mixRatio / 0.4);
      } else {
        mixedColor.copy(colorB).lerp(colorC, (mixRatio - 0.4) / 0.6);
      }
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // 4. Animation properties
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
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 100, 200, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // --- MATERIAL SETUP ---
    const material = new THREE.PointsMaterial({
      size: 0.36,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
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
        
        // Base coordinate (Heart shape)
        const hX = heartPositions[i3];
        const hY = heartPositions[i3 + 1];
        const hZ = heartPositions[i3 + 2];

        // Dispersed coordinate (Scattered on scroll)
        const dX = dispersedPositions[i3];
        const dY = dispersedPositions[i3 + 1];
        const dZ = dispersedPositions[i3 + 2];

        // Linear interpolation based on smooth scroll ratio
        // We add some non-linearity (easing) to the dispersion
        // Easing: start slow, then speed up dispersion
        const easeRatio = Math.pow(currentScrollRatio, 1.5);
        
        let targetX = THREE.MathUtils.lerp(hX, dX, easeRatio);
        let targetY = THREE.MathUtils.lerp(hY, dY, easeRatio);
        let targetZ = THREE.MathUtils.lerp(hZ, dZ, easeRatio);

        // Add subtle floating turbulence / wind wave using Sine/Cosine noise
        const speed = particleSpeeds[i];
        const offset = randomOffsets[i];
        
        // When in heart shape, reduce turbulence to keep structure neat.
        // When dispersed, increase turbulent movement to create wind floating effect.
        const turbulenceFactor = 0.1 + easeRatio * 2.0; 
        
        const floatX = Math.sin(elapsedTime * speed + offset) * 0.15 * turbulenceFactor;
        const floatY = Math.cos(elapsedTime * speed * 0.8 + offset) * 0.15 * turbulenceFactor;
        const floatZ = Math.sin(elapsedTime * speed * 1.2 + offset) * 0.15 * turbulenceFactor;

        positionsAttr.setXYZ(
          i,
          targetX + floatX,
          targetY + floatY,
          targetZ + floatZ
        );
      }

      positionsAttr.needsUpdate = true;

      // 3. Subtle slow rotation of the whole system
      // Slowly rotate the heart when close to top, or swirl background when dispersed
      if (currentScrollRatio < 0.2) {
        // Slow heart floating tilt
        particleSystem.rotation.y = Math.sin(elapsedTime * 0.15) * 0.1;
        particleSystem.rotation.x = Math.cos(elapsedTime * 0.1) * 0.05;
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
        material.size = 0.36;
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
      style={{ zIndex: 1, mixBlendMode: 'screen' }}
    />
  );
}
