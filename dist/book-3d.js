/**
 * ENTROPÍA — MOTOR 3D DEL CUADERNO CIENTÍFICO (THREE.JS & WEBGL)
 * Manejo de la escena tridimensional, iluminación de estudio, materiales PBR,
 * bisagra física de apertura de la portada y transición cinematográfica de cámara.
 */

class Book3DViewer {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.canvas = document.getElementById('book-canvas');
    this.isOpen = false;
    this.isAnimating = false;
    this.openProgress = 0; // 0: cerrado, 1: abierto
    
    // Estado del libro
    this.targetCameraPos = { x: 0, y: 5.0, z: 3.6 };
    this.targetCameraLook = { x: 0, y: 0.1, z: 0 };
    this.currentCameraPos = { ...this.targetCameraPos };
    this.currentCameraLook = { ...this.targetCameraLook };
    
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (!window.THREE) {
      console.warn('Three.js no detectado, activando modo plano accesible.');
      document.body.classList.add('fallback-mode');
      return;
    }

    try {
      // 1. ESCENA Y RENDERIZADOR
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x020204);
      this.scene.fog = new THREE.FogExp2(0x020204, 0.08);

      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
      this.camera.position.set(this.currentCameraPos.x, this.currentCameraPos.y, this.currentCameraPos.z);
      this.camera.lookAt(this.currentCameraLook.x, this.currentCameraLook.y, this.currentCameraLook.z);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 2. ILUMINACIÓN CINEMATOGRÁFICA DE LABORATORIO
      this.setupLighting();

      // 3. CONSTRUCCIÓN DEL MODELO FÍSICO DEL CUADERNO
      this.createBookMesh();

      // 4. MESA / ESCENARIO DE APOYO
      this.createDeskStage();

      // 5. EVENTOS
      window.addEventListener('resize', () => this.onResize());
      this.setupInteraction();

      // 6. BUCLE DE RENDER
      this.clock = new THREE.Clock();
      this.animate();

    } catch (e) {
      console.error('Error inicializando WebGL:', e);
      document.body.classList.add('fallback-mode');
    }
  }

  setupLighting() {
    // Luz ambiental suave para sombras profundas
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    this.scene.add(ambientLight);

    // Luz principal cenital suave (Key light)
    this.mainLight = new THREE.SpotLight(0xf8fafc, 3.2);
    this.mainLight.position.set(0, 6.5, 3.5);
    this.mainLight.angle = Math.PI / 4.5;
    this.mainLight.penumbra = 0.6;
    this.mainLight.decay = 1.8;
    this.mainLight.distance = 20;
    this.mainLight.castShadow = true;
    this.mainLight.shadow.mapSize.width = 2048;
    this.mainLight.shadow.mapSize.height = 2048;
    this.mainLight.shadow.camera.near = 1;
    this.mainLight.shadow.camera.far = 12;
    this.mainLight.shadow.bias = -0.0005;
    this.scene.add(this.mainLight);

    // Luz de acento en cian cuántico (Rim light)
    this.rimLight = new THREE.PointLight(0x22d3ee, 2.4, 8);
    this.rimLight.position.set(-3.5, 2.2, 1.5);
    this.scene.add(this.rimLight);

    // Luz de relleno en azul cobalto (Fill light)
    this.fillLight = new THREE.PointLight(0x3b82f6, 1.8, 10);
    this.fillLight.position.set(4, 2.5, -1.5);
    this.scene.add(this.fillLight);
  }

  createBookMesh() {
    this.bookGroup = new THREE.Group();
    this.bookGroup.position.set(0, 0.05, 0);

    const bookW = 2.4; // Ancho de página
    const bookH = 3.2; // Alto de página
    const bookThick = 0.22; // Grosor del bloque de hojas

    // Textura generada para portada de cuero oscuro
    const leatherCanvas = document.createElement('canvas');
    leatherCanvas.width = 512;
    leatherCanvas.height = 512;
    const lctx = leatherCanvas.getContext('2d');
    lctx.fillStyle = '#060a12';
    lctx.fillRect(0, 0, 512, 512);
    
    // Grano fino sutil
    for (let i = 0; i < 4000; i++) {
      lctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.06)';
      lctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    
    // Marco dorado geométrico
    lctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
    lctx.lineWidth = 4;
    lctx.strokeRect(30, 30, 452, 452);
    lctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    lctx.lineWidth = 1;
    lctx.strokeRect(38, 38, 436, 436);

    // Tipografía grabada
    lctx.fillStyle = '#ffffff';
    lctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    lctx.textAlign = 'center';
    lctx.fillText('ENTROPÍA', 256, 210);

    lctx.fillStyle = '#22d3ee';
    lctx.font = '500 13px "JetBrains Mono", monospace';
    lctx.fillText('LABORATORIO DE ECONOFÍSICA', 256, 245);

    // Símbolo onda
    lctx.font = '54px "Plus Jakarta Sans"';
    lctx.fillText('∿', 256, 150);

    lctx.fillStyle = 'rgba(255,255,255,0.4)';
    lctx.font = '11px "JetBrains Mono", monospace';
    lctx.fillText('ARCHIVUM EXPERIMENTALE · 2026', 256, 440);

    const leatherTexture = new THREE.CanvasTexture(leatherCanvas);

    // Material de la cubierta (Cuero azul/negro técnico con brillo metálico)
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x080f1a,
      roughness: 0.35,
      metalness: 0.15,
      map: leatherTexture
    });

    const plainCoverMaterial = new THREE.MeshStandardMaterial({
      color: 0x070c16,
      roughness: 0.45,
      metalness: 0.1
    });

    // Material de bordes de hojas (papel apilado con tono cálido sutil)
    const pageEdgesMaterial = new THREE.MeshStandardMaterial({
      color: 0x141e2e,
      roughness: 0.85,
      metalness: 0.05
    });

    // 1. CONTRAPORTADA (Tapa trasera fija)
    const backCoverGeo = new THREE.BoxGeometry(bookW, bookThick * 0.15, bookH);
    this.backCover = new THREE.Mesh(backCoverGeo, plainCoverMaterial);
    this.backCover.position.set(0, 0, 0);
    this.backCover.receiveShadow = true;
    this.bookGroup.add(this.backCover);

    // 2. BLOQUE DE HOJAS APILADAS
    const pagesBlockGeo = new THREE.BoxGeometry(bookW * 0.96, bookThick * 0.75, bookH * 0.96);
    this.pagesBlock = new THREE.Mesh(pagesBlockGeo, pageEdgesMaterial);
    this.pagesBlock.position.set(0, bookThick * 0.4, 0);
    this.pagesBlock.castShadow = true;
    this.pagesBlock.receiveShadow = true;
    this.bookGroup.add(this.pagesBlock);

    // 3. BISAGRA Y PORTADA DELANTERA INTERACTIVA
    // Punto de pivote en el lomo izquierdo: x = -bookW / 2
    this.hingeGroup = new THREE.Group();
    this.hingeGroup.position.set(-bookW / 2, bookThick * 0.8, 0);

    const frontCoverGeo = new THREE.BoxGeometry(bookW, bookThick * 0.15, bookH);
    // Desplazamos la geometría para que pivote desde su borde izquierdo
    frontCoverGeo.translate(bookW / 2, 0, 0);

    // Materiales múltiples para la portada (frente con textura grabada, lomo y laterales)
    const coverMaterials = [
      plainCoverMaterial, // right
      plainCoverMaterial, // left
      coverMaterial,      // top (frente)
      plainCoverMaterial, // bottom (interior)
      plainCoverMaterial, // front
      plainCoverMaterial  // back
    ];

    this.frontCover = new THREE.Mesh(frontCoverGeo, coverMaterials);
    this.frontCover.castShadow = true;
    this.frontCover.receiveShadow = true;
    this.hingeGroup.add(this.frontCover);

    // Cinta marcapáginas dorada sobresaliendo del bloque
    const ribbonGeo = new THREE.BoxGeometry(0.08, 0.02, 0.5);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      roughness: 0.2,
      metalness: 0.8
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.4, bookThick * 0.4, bookH * 0.52);
    this.bookGroup.add(ribbon);

    this.bookGroup.add(this.hingeGroup);
    this.scene.add(this.bookGroup);
  }

  createDeskStage() {
    // Escenario de mesa de laboratorio científico oscuro con reflejo suave
    const deskGeo = new THREE.PlaneGeometry(16, 16);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x03060c,
      roughness: 0.65,
      metalness: 0.2
    });
    this.desk = new THREE.Mesh(deskGeo, deskMat);
    this.desk.rotation.x = -Math.PI / 2;
    this.desk.position.y = -0.02;
    this.desk.receiveShadow = true;
    this.scene.add(this.desk);

    // Partículas de polvo ambiental en suspensión (halo cuántico)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);
  }

  setupInteraction() {
    // Raycaster para detectar clics en la portada cerrada
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const handleClick = (e) => {
      if (this.isOpen || this.isAnimating) return;

      const rect = this.canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.mouse.set(x, y);
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects([this.frontCover, this.pagesBlock, this.backCover], true);
      if (intersects.length > 0) {
        this.openBook();
      }
    };

    this.canvas.addEventListener('click', handleClick);

    // Botón / llamada a la acción flotante
    const openBtn = document.getElementById('btn-open-book');
    if (openBtn) {
      openBtn.addEventListener('click', () => this.openBook());
    }

    // Tecla Enter o Espacio cuando el cuaderno cerrado tiene el foco
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen && (e.code === 'Space' || e.code === 'Enter')) {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          this.openBook();
        }
      }
    });
  }

  openBook() {
    if (this.isOpen || this.isAnimating) return;
    this.isAnimating = true;

    // Disparar audio inmersivo procedural (solo efectos físicos)
    if (window.bookAudio) {
      window.bookAudio.initContext();
      window.bookAudio.playCoverOpen();
    }

    // Ocultar invitación flotante
    const invite = document.getElementById('book-invite');
    if (invite) invite.classList.add('hidden');

    // Estado objetivo de la bisagra y la cámara
    // Apertura suave de 178 grados (evita solapamiento plano perfecto)
    const targetAngle = -Math.PI * 0.98;
    const startAngle = this.hingeGroup.rotation.y;

    // Transición cinematográfica: cámara se posiciona cenitalmente sobre el libro abierto
    const startCamPos = { ...this.camera.position };
    const endCamPos = { x: 0, y: 4.25, z: 0.15 };

    const startCamLook = { ...this.currentCameraLook };
    const endCamLook = { x: 0, y: 0.05, z: 0 };

    const duration = this.reducedMotion ? 200 : 1300;
    const startTime = performance.now();

    const animateOpen = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      // Curva de aceleración/deceleración cúbica natural
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      this.hingeGroup.rotation.y = startAngle + (targetAngle - startAngle) * ease;

      // Desplazamiento sutil del cuaderno para centrar la doble página abierta
      this.bookGroup.position.x = 0.65 * ease;

      // Movimiento suave de la cámara
      this.camera.position.x = startCamPos.x + (endCamPos.x - startCamPos.x) * ease;
      this.camera.position.y = startCamPos.y + (endCamPos.y - startCamPos.y) * ease;
      this.camera.position.z = startCamPos.z + (endCamPos.z - startCamPos.z) * ease;

      const currentLookX = startCamLook.x + (endCamLook.x - startCamLook.x) * ease;
      const currentLookY = startCamLook.y + (endCamLook.y - startCamLook.y) * ease;
      const currentLookZ = startCamLook.z + (endCamLook.z - startCamLook.z) * ease;
      this.camera.lookAt(currentLookX, currentLookY, currentLookZ);

      if (p < 1) {
        requestAnimationFrame(animateOpen);
      } else {
        this.isOpen = true;
        this.isAnimating = false;
        document.body.classList.add('book-is-open');

        // Notificar al motor de aprendizaje que el libro se ha abierto
        if (window.learningEngine) {
          window.learningEngine.onBookOpened();
        }
      }
    };

    requestAnimationFrame(animateOpen);
  }

  closeBook() {
    if (!this.isOpen || this.isAnimating) return;
    this.isAnimating = true;

    if (window.bookAudio) {
      window.bookAudio.playCoverOpen();
    }

    document.body.classList.remove('book-is-open');

    const startAngle = this.hingeGroup.rotation.y;
    const targetAngle = 0;

    const startCamPos = { ...this.camera.position };
    const endCamPos = { x: 0, y: 5.0, z: 3.6 };

    const startCamLook = { x: 0, y: 0.05, z: 0 };
    const endCamLook = { x: 0, y: 0.1, z: 0 };

    const duration = this.reducedMotion ? 200 : 1100;
    const startTime = performance.now();

    const animateClose = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      this.hingeGroup.rotation.y = startAngle + (targetAngle - startAngle) * ease;
      this.bookGroup.position.x = 0.65 * (1 - ease);

      this.camera.position.x = startCamPos.x + (endCamPos.x - startCamPos.x) * ease;
      this.camera.position.y = startCamPos.y + (endCamPos.y - startCamPos.y) * ease;
      this.camera.position.z = startCamPos.z + (endCamPos.z - startCamPos.z) * ease;

      const currentLookX = startCamLook.x + (endCamLook.x - startCamLook.x) * ease;
      const currentLookY = startCamLook.y + (endCamLook.y - startCamLook.y) * ease;
      const currentLookZ = startCamLook.z + (endCamLook.z - startCamLook.z) * ease;
      this.camera.lookAt(currentLookX, currentLookY, currentLookZ);

      if (p < 1) {
        requestAnimationFrame(animateClose);
      } else {
        this.isOpen = false;
        this.isAnimating = false;
        const invite = document.getElementById('book-invite');
        if (invite) invite.classList.remove('hidden');
      }
    };

    requestAnimationFrame(animateClose);
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Rotación sutil de partículas
    if (this.particles) {
      this.particles.rotation.y += delta * 0.03;
    }

    // Respiración lumínica cuando el libro está cerrado
    if (!this.isOpen && this.mainLight && !this.reducedMotion) {
      const time = this.clock.getElapsedTime();
      this.mainLight.intensity = 3.2 + Math.sin(time * 1.5) * 0.25;
      
      // Balanceo sutil de la cámara
      this.camera.position.x = Math.sin(time * 0.5) * 0.08;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.book3D = new Book3DViewer();
