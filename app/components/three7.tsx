import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from '@remix-run/react';
import 'tailwindcss/tailwind.css';

interface DaCubes4Props {}

const DaCubes4: React.FC<DaCubes4Props> = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        let isHovering = false;
        let hoveredMesh: THREE.Mesh | null = null;

        const labels = ['Home', 'About', 'Services', 'Contact', 'Portfolio'];
        const paths = ['/home', '/about', '/services', '/contact', '/portfolio'];

        // Define different geometries for each cube
        const geometries = [
            new THREE.DodecahedronGeometry(2),
            new THREE.IcosahedronGeometry(2),
            new THREE.OctahedronGeometry(2),
            new THREE.TetrahedronGeometry(2),
            new THREE.TorusKnotGeometry(1.5, 0.5, 64, 8)
        ];

        const cubes: { 
            mesh: THREE.Mesh; 
            velocity: THREE.Vector3; 
            rotationSpeed: THREE.Vector3;
            originalPosition: THREE.Vector3;
            originalScale: THREE.Vector3;
        }[] = [];

        // First loop: Create base shapes with materials
        for (let i = 0; i < labels.length; i++) {
            const geometry = geometries[i];
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
                emissive: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
                emissiveIntensity: 1,
                roughness: 0.5,
                metalness: 0.8,
            });

            const cube = new THREE.Mesh(geometry, material);
            const position = new THREE.Vector3(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            );
            cube.position.copy(position);

            cubes.push({
                mesh: cube,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.15,
                    (Math.random() - 0.5) * 0.15,
                    (Math.random() - 0.5) * 0.15
                ),
                rotationSpeed: new THREE.Vector3(
                    Math.random() * 0.03,
                    Math.random() * 0.03,
                    Math.random() * 0.03
                ),
                originalPosition: position.clone(),
                originalScale: new THREE.Vector3(1, 1, 1)
            });
        }

        // Second loop: Add text to shapes
        for (let i = 0; i < cubes.length; i++) {
            const cube = cubes[i];
            const size = cube.mesh.geometry.boundingSphere?.radius || 2;
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = 512;
                canvas.height = 512;
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#ff3366');
                gradient.addColorStop(1, '#00ffcc');
                
                context.font = 'Bold 72px "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
                context.fillStyle = gradient;
                context.strokeStyle = 'white';
                context.lineWidth = 2;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(labels[i], canvas.width / 2, canvas.height / 2);
                context.strokeText(labels[i], canvas.width / 2, canvas.height / 2);

                const textTexture = new THREE.CanvasTexture(canvas);
                const textMaterial = new THREE.MeshBasicMaterial({ 
                    map: textTexture,
                    transparent: true,
                    opacity: 0.9
                });
                const textGeometry = new THREE.PlaneGeometry(size * 2, size * 2);
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(0, 0, size + 0.01);
                cube.mesh.add(textMesh);
            }
        }

        // Third loop: Set paths and add to scene
        for (let i = 0; i < cubes.length; i++) {
            const cube = cubes[i];
            cube.mesh.userData = { path: paths[i] };
            scene.add(cube.mesh);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 20;

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(cubes.map(c => c.mesh));
            
            if (intersects.length > 0) {
                const intersectedMesh = intersects[0].object;
                if (!isHovering || hoveredMesh !== intersectedMesh) {
                    document.body.style.cursor = 'pointer';
                    isHovering = true;
                    hoveredMesh = intersectedMesh;
                    
                    // Scale up the hovered shape
                    intersectedMesh.scale.set(1.2, 1.2, 1.2);
                }
            } else if (isHovering) {
                document.body.style.cursor = 'default';
                isHovering = false;
                if (hoveredMesh) {
                    // Reset scale when not hovering
                    hoveredMesh.scale.set(1, 1, 1);
                }
                hoveredMesh = null;
            }
        };

        const handleMouseClick = (event: MouseEvent) => {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(cubes.map(c => c.mesh));
            if (intersects.length > 0) {
                const { path } = intersects[0].object.userData;
                if (path) navigate(path);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleMouseClick);

        const animate = () => {
            requestAnimationFrame(animate);

            cubes.forEach(({ mesh, velocity, rotationSpeed }) => {
                // Only animate if not hovering or if this isn't the hovered mesh
                if (!isHovering || mesh !== hoveredMesh) {
                    mesh.position.add(velocity);
                    mesh.rotation.x += rotationSpeed.x;
                    mesh.rotation.y += rotationSpeed.y;
                    mesh.rotation.z += rotationSpeed.z;

                    if (
                        Math.abs(mesh.position.x) > 10 ||
                        Math.abs(mesh.position.y) > 10 ||
                        Math.abs(mesh.position.z) > 10
                    ) {
                        velocity.negate();
                    }
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleMouseClick);
            document.body.style.cursor = 'default';
            
            cubes.forEach(({ mesh }) => {
                scene.remove(mesh);
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((mat) => mat.dispose());
                } else {
                    mesh.material.dispose();
                }
            });
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [navigate]);

    return <div ref={mountRef} className="w-full h-screen bg-gray-900" />;
};

export default DaCubes4;