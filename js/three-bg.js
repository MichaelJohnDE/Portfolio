// three-bg.js - Interactive 3D Background using Three.js

document.addEventListener('DOMContentLoaded', () => {
    // Basic Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create a container
    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'webgl-container';
    document.body.prepend(canvasContainer);
    canvasContainer.appendChild(renderer.domElement);
    
    // Add Objects
    // 1. Particles (Stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles out further across the view
        posArray[i] = (Math.random() - 0.5) * 60; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x8b5cf6, // Secondary color from CSS
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    

    
    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
    scene.add(ambientLight);
    
    // Positioning
    camera.position.z = 10;
    
    // Mouse Interaction Setup
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });
    
    // Animation Loop
    const clock = new THREE.Clock();
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Target coordinates for smooth easing
        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;
        
        // Animate particles
        particlesMesh.rotation.y = elapsedTime * 0.05;
        // Mouse reactivity for particles
        particlesMesh.position.x += 0.05 * (targetX - particlesMesh.position.x);
        particlesMesh.position.y += 0.05 * (-targetY - particlesMesh.position.y);
        

        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Responsive Design Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
