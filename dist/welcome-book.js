(() => {
  const welcome = document.getElementById("welcome-screen");
  const canvas = document.getElementById("welcome-canvas");
  if (!welcome || !canvas || !window.THREE) return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 7.2, 8.6);
    camera.lookAt(0, 0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene.add(new THREE.AmbientLight(0x9bb7d5, 1.15));

    const keyLight = new THREE.SpotLight(0xc5f7ff, 2.4, 24, Math.PI / 4, 0.62, 1.5);
    keyLight.position.set(-3.8, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 2.6, 12);
    cyanLight.position.set(3.5, 2.6, -2.2);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x2563eb, 1.7, 12);
    blueLight.position.set(-4, 1.8, 1);
    scene.add(blueLight);

    const book = new THREE.Group();
    scene.add(book);

    const pageMaterial = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.82
    });
    const pageBlock = new THREE.Mesh(new THREE.BoxGeometry(3.14, 0.28, 4.12), pageMaterial);
    pageBlock.position.y = -0.07;
    pageBlock.castShadow = true;
    pageBlock.receiveShadow = true;
    book.add(pageBlock);

    const coverCanvas = document.createElement("canvas");
    coverCanvas.width = 768;
    coverCanvas.height = 1024;
    const context = coverCanvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, 768, 1024);
    gradient.addColorStop(0, "#102e50");
    gradient.addColorStop(0.52, "#07182b");
    gradient.addColorStop(1, "#0b2340");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 768, 1024);

    context.strokeStyle = "rgba(34, 211, 238, 0.58)";
    context.lineWidth = 5;
    context.strokeRect(38, 38, 692, 948);
    context.strokeStyle = "rgba(226, 232, 240, 0.22)";
    context.lineWidth = 2;
    context.strokeRect(55, 55, 658, 914);

    context.textAlign = "center";
    context.fillStyle = "#22d3ee";
    context.font = "96px Segoe UI, sans-serif";
    context.fillText("∿", 384, 310);
    context.fillStyle = "#f8fafc";
    context.font = "700 50px Segoe UI, sans-serif";
    context.fillText("ML QUANTITATIVE", 384, 430);
    context.fillText("RESEARCHER", 384, 497);
    context.fillStyle = "#67e8f9";
    context.font = "500 22px Consolas, monospace";
    context.fillText("CUADERNO DE INVESTIGACIÓN", 384, 550);
    context.fillStyle = "rgba(226, 232, 240, 0.55)";
    context.font = "18px Consolas, monospace";
    context.fillText("VERSIÓN 2026.10.31", 384, 900);

    const coverTexture = new THREE.CanvasTexture(coverCanvas);
    coverTexture.encoding = THREE.sRGBEncoding;
    coverTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const coverMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x10233b, roughness: 0.52 }),
      new THREE.MeshStandardMaterial({ color: 0x10233b, roughness: 0.52 }),
      new THREE.MeshStandardMaterial({ map: coverTexture, roughness: 0.48, metalness: 0.12 }),
      new THREE.MeshStandardMaterial({ color: 0x07111f, roughness: 0.72 }),
      new THREE.MeshStandardMaterial({ color: 0x10233b, roughness: 0.52 }),
      new THREE.MeshStandardMaterial({ color: 0x10233b, roughness: 0.52 })
    ];
    const cover = new THREE.Mesh(new THREE.BoxGeometry(3.34, 0.16, 4.34), coverMaterials);
    cover.position.y = 0.11;
    cover.castShadow = true;
    cover.receiveShadow = true;
    book.add(cover);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x07111f, roughness: 0.92, metalness: 0.08 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.45;
    floor.receiveShadow = true;
    scene.add(floor);

    const dustCount = 100;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 13;
      dustPositions[i * 3 + 1] = Math.random() * 4.2 + 0.2;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.035, transparent: true, opacity: 0.65 })
    );
    scene.add(dust);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointerX = 0;
    let pointerY = 0;
    let frame;

    const resize = () => {
      const width = Math.max(1, welcome.clientWidth);
      const height = Math.max(1, welcome.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 10.4 : 8.6;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      if (welcome.hidden) return;
      if (!reducedMotion) {
        book.rotation.y += ((pointerX * 0.12) - book.rotation.y) * 0.025;
        book.rotation.x += ((-0.18 + pointerY * 0.055) - book.rotation.x) * 0.025;
        book.position.y = Math.sin(performance.now() * 0.00055) * 0.035;
        dust.rotation.y += 0.0004;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    welcome.addEventListener("pointermove", event => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    });
    resize();
    welcome.classList.add("webgl-ready");
    animate();

    window.addEventListener("pagehide", () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      coverTexture.dispose();
      dustGeometry.dispose();
    }, { once: true });
  } catch (error) {
    console.error("No se pudo inicializar la portada 3D.", error);
  }
})();
