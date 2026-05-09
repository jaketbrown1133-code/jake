"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type SceneMode = "morning" | "afternoon" | "evening";

interface Props {
  louverAngle: number; // 0-1
  mode: SceneMode;
}

const SCENE_CONFIGS = {
  morning: {
    bg: 0x1e1208,
    fog: 0x1e1208,
    sunColor: 0xff9944,
    sunIntensity: 1.6,
    sunPos: [8, 6, 3] as [number, number, number],
    ambientColor: 0x261a08,
    ambientIntensity: 1.4,
    fillColor: 0xc9a84c,
    fillIntensity: 0.5,
  },
  afternoon: {
    bg: 0x0c1018,
    fog: 0x0c1018,
    sunColor: 0xfff0d0,
    sunIntensity: 2.2,
    sunPos: [4, 12, 2] as [number, number, number],
    ambientColor: 0x10182a,
    ambientIntensity: 1.6,
    fillColor: 0x4488cc,
    fillIntensity: 0.4,
  },
  evening: {
    bg: 0x0a0612,
    fog: 0x0a0612,
    sunColor: 0xff5533,
    sunIntensity: 0.4,
    sunPos: [10, 2, 5] as [number, number, number],
    ambientColor: 0x0a0410,
    ambientIntensity: 0.8,
    fillColor: 0xffaa44,
    fillIntensity: 1.2,
  },
};

export default function InteractiveScene({ louverAngle, mode }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    louvers: [] as THREE.Mesh[],
    sun: null as THREE.DirectionalLight | null,
    ambient: null as THREE.AmbientLight | null,
    fill: null as THREE.PointLight | null,
    scene: null as THREE.Scene | null,
    stringLights: [] as THREE.PointLight[],
    renderer: null as THREE.WebGLRenderer | null,
  });

  // Build scene once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    try {
      const testC = document.createElement("canvas");
      const gl = testC.getContext("webgl") || testC.getContext("experimental-webgl");
      if (!gl) return;
    } catch { return; }

    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const cfg = SCENE_CONFIGS[mode];

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    /* Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(cfg.bg);
    scene.fog = new THREE.FogExp2(cfg.fog, 0.035);
    stateRef.current.scene = scene;

    /* Camera */
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(6, 3.5, 8);
    camera.lookAt(0, 1.4, 0);

    /* Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 1.4, 0);
    controls.minDistance = 4;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.autoRotate = false;

    /* Lights */
    const ambient = new THREE.AmbientLight(cfg.ambientColor, cfg.ambientIntensity);
    scene.add(ambient);
    stateRef.current.ambient = ambient;

    const sun = new THREE.DirectionalLight(cfg.sunColor, cfg.sunIntensity);
    sun.position.set(...cfg.sunPos);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    scene.add(sun);
    stateRef.current.sun = sun;

    const fill = new THREE.PointLight(cfg.fillColor, cfg.fillIntensity, 18);
    fill.position.set(-3, 3.5, 3);
    scene.add(fill);
    stateRef.current.fill = fill;

    /* Materials */
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x252220, metalness: 0.92, roughness: 0.18 });
    const louverMat = new THREE.MeshStandardMaterial({ color: 0x2e2a26, metalness: 0.88, roughness: 0.22 });
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x111010, roughness: 0.95 });
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      emissive: 0xc9a84c,
      emissiveIntensity: mode === "evening" ? 1.5 : 0.6,
    });

    /* Ground */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    /* Deck surface */
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x1c1710, roughness: 0.9 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.05, 7), deckMat);
    deck.position.set(0, 0.025, 0);
    deck.receiveShadow = true;
    scene.add(deck);

    const PW = 7, PD = 5, PH = 2.9;

    /* Posts */
    const postGeo = new THREE.BoxGeometry(0.14, PH, 0.14);
    [[-PW / 2, -PD / 2], [PW / 2, -PD / 2], [-PW / 2, PD / 2], [PW / 2, PD / 2]].forEach(([x, z]) => {
      const p = new THREE.Mesh(postGeo, metalMat);
      p.position.set(x, PH / 2, z);
      p.castShadow = true;
      scene.add(p);
    });

    /* Frame beams */
    const hBeam = new THREE.BoxGeometry(PW + 0.14, 0.1, 0.14);
    const vBeam = new THREE.BoxGeometry(0.1, 0.1, PD + 0.14);
    [-PD / 2, PD / 2].forEach(z => {
      const b = new THREE.Mesh(hBeam, metalMat);
      b.position.set(0, PH, z); b.castShadow = true; scene.add(b);
    });
    [-PW / 2, PW / 2].forEach(x => {
      const b = new THREE.Mesh(vBeam, metalMat);
      b.position.set(x, PH, 0); b.castShadow = true; scene.add(b);
    });

    /* Louvers */
    const LOUVER_COUNT = 14;
    const louverGeo = new THREE.BoxGeometry(PW + 0.06, 0.026, 0.37);
    const louvers: THREE.Mesh[] = [];
    for (let i = 0; i < LOUVER_COUNT; i++) {
      const t = i / (LOUVER_COUNT - 1);
      const l = new THREE.Mesh(louverGeo, louverMat);
      l.position.set(0, PH - 0.04, -PD / 2 + t * PD);
      l.rotation.x = louverAngle * Math.PI * 0.45;
      l.castShadow = true;
      l.receiveShadow = true;
      louvers.push(l);
      scene.add(l);
    }
    stateRef.current.louvers = louvers;

    /* LED strip */
    const ledGeo = new THREE.BoxGeometry(PW - 0.2, 0.015, 0.055);
    [-PD / 2 + 0.07, PD / 2 - 0.07].forEach(z => {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, PH - 0.13, z);
      scene.add(led);
    });

    /* Evening string lights */
    const stringLights: THREE.PointLight[] = [];
    if (mode === "evening") {
      for (let i = 0; i < 5; i++) {
        const sl = new THREE.PointLight(0xffcc66, 0.7, 4);
        sl.position.set(-PW / 2 + (i / 4) * PW, PH - 0.3, 0);
        scene.add(sl);
        stringLights.push(sl);

        /* Bulb mesh */
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xffcc66, emissive: 0xffcc66, emissiveIntensity: 2 })
        );
        bulb.position.copy(sl.position);
        scene.add(bulb);
      }
    }
    stateRef.current.stringLights = stringLights;

    /* Particles */
    const PC = 300;
    const pPos = new Float32Array(PC * 3);
    for (let i = 0; i < PC * 3; i++) pPos[i] = (Math.random() - 0.5) * 14;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xc9a84c, size: 0.02, transparent: true, opacity: 0.35 });
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);

    /* Animation */
    let raf: number;
    let t = 0;
    const pAttr = pGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.003;
      controls.update();

      /* Particle drift */
      for (let i = 0; i < PC; i++) {
        const idx = i * 3 + 1;
        (pAttr.array as Float32Array)[idx] += 0.003;
        if ((pAttr.array as Float32Array)[idx] > 4) (pAttr.array as Float32Array)[idx] = -1.5;
      }
      pAttr.needsUpdate = true;

      /* Evening light flicker */
      stringLights.forEach((sl, j) => {
        sl.intensity = 0.6 + Math.sin(t * 2 + j * 1.3) * 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* Resize */
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      controls.dispose();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update louver angle reactively
  useEffect(() => {
    const angle = louverAngle * Math.PI * 0.45;
    stateRef.current.louvers.forEach(l => { l.rotation.x = angle; });
  }, [louverAngle]);

  // Update scene mode reactively
  useEffect(() => {
    const cfg = SCENE_CONFIGS[mode];
    const { scene, sun, ambient, fill, renderer } = stateRef.current;
    if (!scene || !sun || !ambient || !fill || !renderer) return;
    scene.background = new THREE.Color(cfg.bg);
    (scene.fog as THREE.FogExp2).color = new THREE.Color(cfg.fog);
    sun.color = new THREE.Color(cfg.sunColor);
    sun.intensity = cfg.sunIntensity;
    sun.position.set(...cfg.sunPos);
    ambient.color = new THREE.Color(cfg.ambientColor);
    ambient.intensity = cfg.ambientIntensity;
    fill.color = new THREE.Color(cfg.fillColor);
    fill.intensity = cfg.fillIntensity;
  }, [mode]);

  return <div ref={mountRef} className="w-full h-full" />;
}
