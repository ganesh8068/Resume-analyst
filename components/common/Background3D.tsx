
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

    // Particle Field (Stars/Dust)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Grid Floor for Depth
    const gridHelper = new THREE.GridHelper(40, 40, 0x4f46e5, 0x0a0a0f);
    gridHelper.position.y = -4;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.05;
    scene.add(gridHelper);

    // Floating Data Points
    const sphereGeometry = new THREE.IcosahedronGeometry(2, 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x94d2bd,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

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
      scrollY += (targetScrollY - scrollY) * 0.1;
      const scrollFactor = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.0005;
      sphere.scale.set(1 + scrollFactor * 0.5, 1 + scrollFactor * 0.5, 1 + scrollFactor * 0.5);

      particlesMesh.rotation.y += 0.0002;
      
      const targetCamX = mouseX * 1.5;
      const targetCamY = -mouseY * 1.5 - (scrollFactor * 2);
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
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#020203]">
      <div ref={containerRef} className="absolute inset-0" />
      {/* Symbolic Overlay to mimic user's reference image */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen select-none font-mono text-[10px] flex flex-wrap gap-4 p-4 overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <span key={i} className="animate-pulse" style={{ animationDelay: `${Math.random() * 5}s` }}>
            {['Φ', 'Δ', 'Ω', 'Σ', 'λ', 'μ', 'π', '0', '1', 'β', 'γ', 'ε', 'θ', 'κ', 'ρ', 'τ', 'ψ', 'ζ'].sort(() => Math.random() - 0.5)[0]}
            {Math.random() > 0.5 ? '+' : '-'}
            {Math.random().toString(36).substring(2, 4).toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Background3D;
