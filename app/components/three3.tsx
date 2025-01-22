//manual names and links

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from '@remix-run/react';
import 'tailwindcss/tailwind.css';

const DaCubes: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true; // Enable shadows
        mountRef.current.appendChild(renderer.domElement);

        // Add a background plane with shapes
        const bgGeometry = new THREE.PlaneGeometry(100, 100);
        const bgMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            side: THREE.DoubleSide,
        });
        const backgroundPlane = new THREE.Mesh(bgGeometry, bgMaterial);
        backgroundPlane.receiveShadow = true;
        backgroundPlane.rotation.x = -Math.PI / 2;
        backgroundPlane.position.y = -10;
        scene.add(backgroundPlane);

        // Create cubes with text
        const cubeData = [
            { name: 'Cube One', link: '/page1' },
            { name: 'Cube Two', link: '/page2' },
            { name: 'Cube Three', link: '/page3' },
            { name: 'Cube Four', link: '/page4' },
            { name: 'Cube Five', link: '/page5' },
        ];

        const cubes: { mesh: THREE.Mesh; velocity: THREE.Vector3 }[] = [];
        cubeData.forEach((data, i) => {
            const size = (Math.random() * 1 + 0.5) * 4;
            const geometry = new THREE.DodecahedronGeometry(size);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
                emissive: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 20%)`),
                emissiveIntensity: 0.5,
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;

            // Create and add text
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = 512;
                canvas.height = 512;
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.font = 'Bold 48px Arial';
                context.fillStyle = 'white';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(data.name, canvas.width / 2, canvas.height / 2);

                const textTexture = new THREE.CanvasTexture(canvas);
                const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
                const textGeometry = new THREE.PlaneGeometry(size, size);
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(0, 0, size / 2 + 0.1);
                cube.add(textMesh);
            }

            cube.position.set(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            );

            cube.userData = { path: data.link };
            scene.add(cube);

            cubes.push({
                mesh: cube,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
            });
        });

        // Add dynamic background shapes
        const backgroundShapes: THREE.Mesh[] = [];
        for (let i = 0; i < 20; i++) {
            const size = Math.random() * 2 + 1;
            const shapeGeometry = new THREE.SphereGeometry(size, 16, 16);
            const shapeMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`),
                transparent: true,
                opacity: 0.8,
            });

            const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
            shape.position.set(
                Math.random() * 50 - 25,
                Math.random() * 10 - 5,
                Math.random() * 50 - 25
            );
            shape.castShadow = true;
            scene.add(shape);
            backgroundShapes.push(shape);
        }

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const rotatingLight = new THREE.PointLight(0xffaa00, 1, 100);
        rotatingLight.castShadow = true;
        scene.add(rotatingLight);

        // Set camera position
        camera.position.z = 30;

        // Handle window resize
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Handle cube clicks
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const handleMouseClick = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(cubes.map(c => c.mesh));
            if (intersects.length > 0) {
                const { path } = intersects[0].object.userData;
                if (path) navigate(path);
            }
        };
        window.addEventListener('click', handleMouseClick);

        // Animation loop
        let angle = 0;
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate light
            angle += 0.01;
            rotatingLight.position.set(20 * Math.cos(angle), 10, 20 * Math.sin(angle));

            // Update cube positions
            cubes.forEach(({ mesh, velocity }) => {
                mesh.position.add(velocity);
                if (
                    Math.abs(mesh.position.x) > 10 ||
                    Math.abs(mesh.position.y) > 10 ||
                    Math.abs(mesh.position.z) > 10
                ) {
                    velocity.negate();
                }
            });

            // Slowly rotate background shapes
            backgroundShapes.forEach((shape) => {
                shape.rotation.x += 0.002;
                shape.rotation.y += 0.002;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleMouseClick);
            cubes.forEach(({ mesh }) => {
                scene.remove(mesh);
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((mat) => mat.dispose());
                } else {
                    mesh.material.dispose();
                }
            });
            backgroundShapes.forEach((shape) => {
                scene.remove(shape);
                shape.geometry.dispose();
                shape.material.dispose();
            });
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [navigate]);

    return <div ref={mountRef} className="w-full h-screen bg-gray-900" />;
};

export default DaCubes;
