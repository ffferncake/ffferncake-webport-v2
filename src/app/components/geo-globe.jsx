"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GeoGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 5.4;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.16;
    scene.add(group);
    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 5),
      new THREE.MeshPhongMaterial({ color: 0x071b2c, emissive: 0x063b43, emissiveIntensity: 0.45, shininess: 72, transparent: true, opacity: 0.94 })
    );
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.575, 4)),
      new THREE.LineBasicMaterial({ color: 0x38f3cd, transparent: true, opacity: 0.23 })
    );
    group.add(globe, wire);
    const latitudes = [-0.72, 0, 0.72].map((y) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(Math.sqrt(1.58 ** 2 - y ** 2), 0.006, 8, 128),
        new THREE.MeshBasicMaterial({ color: 0x49b9ff, transparent: true, opacity: 0.45 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      group.add(ring);
      return ring;
    });
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.62 })
    );
    orbit.rotation.set(1.08, 0.28, 0.22);
    const satellite = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0xffbe6a }));
    group.add(orbit, satellite);

    const starsGeometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 150; i += 1) positions.push((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 2 - 1);
    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.018, transparent: true, opacity: 0.62 }));
    scene.add(stars, new THREE.AmbientLight(0x8fe9ff, 1.2));
    const light = new THREE.PointLight(0x6fffe0, 9, 14);
    light.position.set(3, 2, 4);
    const violet = new THREE.PointLight(0x795cff, 7, 12);
    violet.position.set(-3, -2, 2);
    scene.add(light, violet);

    let pointerX = 0, pointerY = 0, dragX = 0, dragging = false, previousX = 0;
    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    const move = (event) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
      if (dragging) { dragX += (event.clientX - previousX) * 0.008; previousX = event.clientX; }
    };
    const down = (event) => { dragging = true; previousX = event.clientX; mount.setPointerCapture?.(event.pointerId); };
    const up = () => { dragging = false; };
    resize();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", move);
    mount.addEventListener("pointerdown", down);
    mount.addEventListener("pointerup", up);
    mount.addEventListener("pointerleave", up);

    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      if (!dragging) group.rotation.y += 0.0022;
      group.rotation.y += (pointerX + dragX - group.rotation.y * 0.03) * 0.006;
      group.rotation.x += (-0.16 + pointerY - group.rotation.x) * 0.035;
      satellite.position.set(Math.cos(t * 0.65) * 2.05, Math.sin(t * 0.65) * 0.9, Math.sin(t * 0.65) * 1.7);
      stars.rotation.z = t * 0.01;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      [["pointermove", move], ["pointerdown", down], ["pointerup", up], ["pointerleave", up]].forEach(([name, fn]) => mount.removeEventListener(name, fn));
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="geo-globe" aria-label="Interactive 3D geospatial globe" />;
}
