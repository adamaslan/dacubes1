//man names - links
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from '@remix-run/react';
import 'tailwindcss/tailwind.css';

const DaCubes4: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Manually defined cube names and links
        const cubeData = [
            { name: 'Home', link: '/home' },
            { name: 'About', link: '/about' },
            { name: 'Services', link: '/services' },
            { name: 'Contact', link: '/contact' },
            { name: 'Portfolio', link: '/portfolio' },
        ];

        const cubes: { mesh: THREE.Mesh; velocity: THREE.Vector3 }[] = [];
        cubeData.forEach((data, i) => {
            const size = (Math.random() * 1 + 0.5) * 4; // Larger cubes, size between 2 and 4
            const geometry = new THREE.DodecahedronGeometry(size); // Stranger shape
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
                emissive: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
                emissiveIntensity: 1,
            });

            const cube = new THREE.Mesh(geometry, material);

            // Add text to the cube
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = 512; // Larger canvas for larger cubes
                canvas.height = 512;
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.font = 'Bold 72px Arial';
                context.fillStyle = 'white';
                context.textAlign = 'center';
                context.fillText(data.name, canvas.width / 2, canvas.height / 2);

                const textTexture = new THREE.CanvasTexture(canvas);
                const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
                const textGeometry = new THREE.PlaneGeometry(size, size);
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(0, 0, size / 2 + 0.01);
                cube.add(textMesh);
            }

            // Random initial position
            cube.position.set(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            );

            // Set custom link path
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

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Set camera position
        camera.position.z = 20;

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
        const animate = () => {
            requestAnimationFrame(animate);

            // Update cube positions
            cubes.forEach(({ mesh, velocity }) => {
                mesh.position.add(velocity);

                // Reverse direction if the cube moves too far from the center
                if (
                    Math.abs(mesh.position.x) > 10 ||
                    Math.abs(mesh.position.y) > 10 ||
                    Math.abs(mesh.position.z) > 10
                ) {
                    velocity.negate();
                }
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
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [navigate]);

    return <div ref={mountRef} className="w-full h-screen bg-gray-900" />;
};

export default DaCubes4;
