"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    mount.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x100e0b);
    scene.fog = new THREE.FogExp2(0x100e0b, 0.04);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(6, 3.5, 8);
    camera.lookAt(0, 1.2, 0);

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0x1a1510, 1.2);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffe4a0, 1.8);
    sun.position.set(6, 10, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    scene.add(sun);

    const fillLight = new THREE.PointLight(0xc9a84c, 0.6, 15);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    /* ── Materials ── */
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x282420,
      metalness: 0.92,
      roughness: 0.18,
    });
    const louverMat = new THREE.MeshStandardMaterial({
      color: 0x302c28,
      metalness: 0.88,
      roughness: 0.22,
    });
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0e0c0a,
      roughness: 0.9,
    });

    /* ── Pergola dimensions ── */
    const PW = 7;   // width (X)
    const PD = 5;   // depth (Z)
    const PH = 2.8; // height (Y)

    /* ── Ground plane ── */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    /* ── Posts ── */
    const postGeo = new THREE.BoxGeometry(0.13, PH, 0.13);
    const corners: [number, number][] = [
      [-PW / 2, -PD / 2], [PW / 2, -PD / 2],
      [-PW / 2,  PD / 2], [PW / 2,  PD / 2],
    ];
    corners.forEach(([x, z]) => {
      const post = new THREE.Mesh(postGeo, metalMat);
      post.position.set(x, PH / 2, z);
      post.castShadow = true;
      scene.add(post);
    });

    /* ── Top frame beams ── */
    const hBeamGeo = new THREE.BoxGeometry(PW + 0.13, 0.09, 0.13);
    const vBeamGeo = new THREE.BoxGeometry(0.09, 0.09, PD + 0.13);
    [-PD / 2, PD / 2].forEach(z => {
      const b = new THREE.Mesh(hBeamGeo, metalMat);
      b.position.set(0, PH, z);
      b.castShadow = true;
      scene.add(b);
    });
    [-PW / 2, PW / 2].forEach(x => {
      const b = new THREE.Mesh(vBeamGeo, metalMat);
      b.position.set(x, PH, 0);
      b.castShadow = true;
      scene.add(b);
    });

    /* ── Louvers ── */
    const LOUVER_COUNT = 14;
    const louverGeo = new THREE.BoxGeometry(PW + 0.06, 0.026, 0.36);
    const louvers: THREE.Mesh[] = [];
    for (let i = 0; i < LOUVER_COUNT; i++) {
      const t = i / (LOUVER_COUNT - 1);
      const louver = new THREE.Mesh(louverGeo, louverMat);
      louver.position.set(0, PH - 0.04, -PD / 2 + t * PD);
      louver.castShadow = true;
      louver.receiveShadow = true;
      louvers.push(louver);
      scene.add(louver);
    }

    /* ── LED strip (emissive strip along beams) ── */
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.6,
    });
    const ledGeo = new THREE.BoxGeometry(PW - 0.2, 0.015, 0.05);
    [-PD / 2 + 0.07, PD / 2 - 0.07].forEach(z => {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, PH - 0.12, z);
      scene.add(led);
    });

    /* ── Ambient particles ── */
    const PARTICLE_COUNT = 400;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      pPositions[i] = (Math.random() - 0.5) * 16;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Animation ── */
    let raf: number;
    let time = 0;
    const pAttr = pGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.004;

      // Louver oscillation: slow breathe between 0.05 and 1.1 rad
      const angle = 0.05 + (Math.sin(time * 0.4) * 0.5 + 0.5) * 1.05;
      louvers.forEach(l => { l.rotation.x = angle; });

      // Drift particles upward
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3 + 1;
        (pAttr.array as Float32Array)[idx] += 0.004;
        if ((pAttr.array as Float32Array)[idx] > 5) {
          (pAttr.array as Float32Array)[idx] = -2;
        }
      }
      pAttr.needsUpdate = true;

      // Gentle camera sway
      camera.position.x = 6 + Math.sin(time * 0.15) * 0.3;
      camera.lookAt(0, 1.2, 0);

      // Fill light pulse
      fillLight.intensity = 0.5 + Math.sin(time * 0.8) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
