"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const material = (color, options = {}) => new THREE.MeshStandardMaterial({
  color,
  roughness: 0.72,
  metalness: 0.04,
  flatShading: false,
  ...options,
});

export default function GeoCharacter() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const character = new THREE.Group();
    character.position.y = -0.2;
    scene.add(character);

    const skin = material(0xf0b68f);
    const hair = material(0x3b241f);
    const dark = material(0x15151a);
    const teal = material(0x2cc7c1, { emissive: 0x092f30, emissiveIntensity: 0.3 });
    const pink = material(0xe95aa8, { emissive: 0x360b27, emissiveIntensity: 0.25 });
    const silver = material(0xbec7cf, { roughness: 0.34, metalness: 0.58 });
    const white = material(0xffffff, { roughness: 0.35 });

    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.9, 1.25, 8, 24), teal);
    body.position.y = -0.75;
    character.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(1.22, 48, 32), skin);
    head.scale.set(0.94, 1.04, 0.88);
    head.position.set(0, 1.05, 0.04);
    character.add(head);

    const hairBack = new THREE.Mesh(new THREE.SphereGeometry(1.3, 42, 28, 0, Math.PI * 2, 0, Math.PI * 0.76), hair);
    hairBack.scale.set(0.97, 1.18, 0.92);
    hairBack.position.set(0, 1.2, -0.13);
    character.add(hairBack);

    for (let i = -2; i <= 2; i += 1) {
      const bang = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.48 + Math.abs(i) * 0.05, 5, 12), hair);
      bang.position.set(i * 0.34, 1.72 - Math.abs(i) * 0.04, 0.94 - Math.abs(i) * 0.03);
      bang.rotation.z = i * -0.06;
      character.add(bang);
    }

    const eyes = [];
    [-0.4, 0.4].forEach((x) => {
      const eye = new THREE.Group();
      const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), white);
      eyeWhite.scale.y = 1.15;
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 12), dark);
      pupil.position.z = 0.17;
      eye.add(eyeWhite, pupil);
      eye.position.set(x, 1.1, 1.03);
      character.add(eye);
      eyes.push(eye);
    });

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), skin);
    nose.position.set(0, 0.88, 1.08);
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 8, 24, Math.PI), dark);
    smile.position.set(0, 0.64, 1.02);
    smile.rotation.z = Math.PI;
    character.add(nose, smile);

    const armGeometry = new THREE.CapsuleGeometry(0.19, 1.05, 6, 16);
    const leftArm = new THREE.Mesh(armGeometry, skin);
    leftArm.position.set(-0.94, -0.65, 0.4);
    leftArm.rotation.z = -0.5;
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.94;
    rightArm.rotation.z = 0.5;
    character.add(leftArm, rightArm);

    const laptop = new THREE.Group();
    const screen = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.35, 0.11), silver);
    screen.position.y = -0.63;
    screen.rotation.x = -0.05;
    const logo = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 24), teal);
    logo.position.set(0, -0.63, 0.07);
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.1, 0.82), silver);
    keyboard.position.set(0, -1.32, 0.38);
    keyboard.rotation.x = -0.18;
    laptop.add(screen, logo, keyboard);
    laptop.position.z = 1.17;
    character.add(laptop);

    const cake = new THREE.Group();
    const cakeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.3, 24, 1, false, 0, Math.PI), white);
    cakeBase.rotation.x = Math.PI / 2;
    const frosting = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.1, 24, 1, false, 0, Math.PI), pink);
    frosting.position.y = 0.18;
    frosting.rotation.x = Math.PI / 2;
    cake.add(cakeBase, frosting);
    cake.position.set(1.85, -1.5, 1.1);
    cake.rotation.y = -0.5;
    character.add(cake);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0x9c8bc2, transparent: true, opacity: 0.48 })
    );
    orbit.rotation.set(1.16, 0.24, -0.15);
    const satellite = new THREE.Mesh(new THREE.OctahedronGeometry(0.11), pink);
    character.add(orbit, satellite);

    const pin = new THREE.Group();
    const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14), teal);
    const pinTail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 16), teal);
    pinTail.position.y = -0.19;
    pin.add(pinHead, pinTail);
    pin.position.set(-2.05, 0.1, 0.2);
    character.add(pin);

    scene.add(new THREE.HemisphereLight(0xdffcff, 0x241225, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(4, 5, 6);
    const rim = new THREE.PointLight(0xe95aa8, 8, 14);
    rim.position.set(-4, 2, 3);
    scene.add(key, rim);

    let pointerX = 0;
    let pointerY = 0;
    const move = (event) => {
      const rect = mount.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", move);

    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      const t = clock.getElapsedTime();
      character.rotation.y += (pointerX * 0.28 - character.rotation.y) * 0.045;
      character.rotation.x += (-pointerY * 0.08 - character.rotation.x) * 0.045;
      character.position.y = -0.2 + Math.sin(t * 1.35) * 0.035;
      satellite.position.set(Math.cos(t * 0.7) * 2.8, Math.sin(t * 0.7) * 1.05, Math.sin(t * 0.7) * 2.2);
      const blink = Math.sin(t * 0.82) > 0.992 ? 0.08 : 1;
      eyes.forEach((eye) => { eye.scale.y = blink; });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", move);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose());
        else object.material?.dispose?.();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="geo-character" aria-label="Interactive Three.js character of Fern working on a laptop" />;
}
