
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 4000;
    const posArray = new Float32Array(particlesCount * 3);
    const initialPos = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      const val = (Math.random() - 0.5) * 20;
      posArray[i] = val;
      initialPos[i] = val;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.006,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Wireframe Neural Sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(1.8, 4);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Secondary Outer Ring
    const ringGeometry = new THREE.TorusGeometry(3, 0.01, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.05 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5);
      mouseY = (event.clientY / window.innerHeight - 0.5);
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.1;
      const scrollFactor = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      // Sphere dynamics
      const sphereScale = 1 + scrollFactor * 1.5;
      sphere.scale.set(sphereScale, sphereScale, sphereScale);
      sphere.rotation.y += 0.001 + scrollFactor * 0.01;
      sphere.rotation.x += 0.0005 + scrollFactor * 0.005;
      sphere.material.opacity = 0.03 + scrollFactor * 0.07;

      // Ring dynamics
      ring.rotation.z += 0.002;
      ring.scale.set(1 + scrollFactor, 1 + scrollFactor, 1 + scrollFactor);

      // Particle dynamics - they drift faster as you scroll
      const driftSpeed = 0.0002 + scrollFactor * 0.002;
      particlesMesh.rotation.y += driftSpeed;
      particlesMesh.rotation.z += driftSpeed * 0.5;

      // Camera parallax and "dive" effect
      const targetCamZ = 5 - scrollFactor * 3;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      
      const targetCamX = mouseX * 2;
      const targetCamY = -mouseY * 2 - (scrollFactor * 2);
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none" />;
};

export default Background3D;
