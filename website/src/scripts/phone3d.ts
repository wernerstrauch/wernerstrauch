/**
 * 3D Phone Model Viewer using Three.js
 * Renders GLTF phone models with optional screen textures
 */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Phone3DOptions {
  container: HTMLElement;
  modelPath: string;
  autoRotate?: boolean;
  screenImage?: string;
  screenImage2?: string;
}

interface Phone3DInstance {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  animationId: number;
  destroy: () => void;
}

const instances = new Map<HTMLElement, Phone3DInstance>();

export async function initPhone3D(
  options: Phone3DOptions
): Promise<Phone3DInstance | null> {
  const { container, modelPath, autoRotate = true, screenImage, screenImage2 } =
    options;

  // Check if already initialized
  if (instances.has(container)) {
    return instances.get(container)!;
  }

  // Create scene
  const scene = new THREE.Scene();

  // Get container dimensions
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Create camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 0, -5);
  scene.add(fillLight);

  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1;

  // Load model
  const loader = new GLTFLoader();

  try {
    const gltf = await loader.loadAsync(modelPath);
    const model = gltf.scene;

    // Center and scale the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.5 / maxDim;
    model.scale.setScalar(scale);

    scene.add(model);

    // Apply screen textures if provided
    if (screenImage || screenImage2) {
      const textureLoader = new THREE.TextureLoader();

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const name = child.name.toLowerCase();
          if (name.includes("screen") || name.includes("display")) {
            if (screenImage) {
              textureLoader.load(screenImage, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                if (child.material instanceof THREE.MeshStandardMaterial) {
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                }
              });
            }
          }
        }
      });
    }

    // Show container
    container.classList.add("loaded");
  } catch (error) {
    console.error("Failed to load 3D model:", error);
    return null;
  }

  // Animation loop
  let animationId: number;

  function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  function handleResize() {
    const newWidth = container.offsetWidth;
    const newHeight = container.offsetHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener("resize", handleResize);

  // Cleanup function
  function destroy() {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
    controls.dispose();
    renderer.dispose();

    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }

    instances.delete(container);
  }

  const instance: Phone3DInstance = {
    scene,
    camera,
    renderer,
    controls,
    animationId,
    destroy,
  };

  instances.set(container, instance);

  // Cleanup on page navigation
  document.addEventListener("astro:before-swap", destroy, { once: true });

  return instance;
}

export function destroyPhone3D(container: HTMLElement) {
  const instance = instances.get(container);
  if (instance) {
    instance.destroy();
  }
}
