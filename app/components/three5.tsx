
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from '@remix-run/react';
import 'tailwindcss/tailwind.css';

const DaShapes: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [hoveredShape, setHoveredShape] = useState<number | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Define specific pages for each shape
        const shapeData = [
            { label: 'Home', path: '/home', color: 0xff1493 },      // Deep Pink
            { label: 'Gallery', path: '/gallery', color: 0x00ff00 }, // Lime
            { label: 'Music', path: '/music', color: 0x4169e1 },     // Royal Blue
            { label: 'Blog', path: '/blog', color: 0xffa500 },       // Orange
            { label: 'Contact', path: '/contact', color: 0x9400d3 }  // Violet
        ];

        // Create quadrilaterals with specific properties
        const shapes: { mesh: THREE.Mesh; velocity: THREE.Vector3; originalVelocity: THREE.Vector3 }[] = [];
        
        shapeData.forEach((data, i) => {
            // Create geometries with varying quadrilateral shapes
            const geometries = [
                new THREE.PlaneGeometry(3, 1.5),  // Rectangle
                new THREE.PlaneGeometry(2.5, 2.5), // Square
                new THREE.PlaneGeometry(3.5, 1.8), // Elongated Rectangle
                new THREE.PlaneGeometry(2.2, 3.0), // Vertical Rectangle
                new THREE.PlaneGeometry(2.7, 2.2)  // Slightly Elongated Square
            ];

            const geometry = geometries[i % geometries.length];

            // Create material with both main color and emissive properties
            const material = new THREE.MeshStandardMaterial({
                color: data.color,
                emissive: data.color,
                emissiveIntensity: 0.5,
                metalness: 0.3,
                roughness: 0.4,
            });

            const shape = new THREE.Mesh(geometry, material);

            // Add text label
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = 256;
                canvas.height = 256;
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.font = 'Bold 48px Arial';
                context.fillStyle = 'white';
                context.textAlign = 'center';
                context.fillText(data.label, canvas.width / 2, canvas.height / 2);

                const textTexture = new THREE.CanvasTexture(canvas);
                const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
                const textGeometry = new THREE.PlaneGeometry(3, 1.5);
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(0, 0, 0.76); // Slightly offset to be on the front face
                shape.add(textMesh);
            }

            // Position shapes in a circular pattern
            const angle = (i / shapeData.length) * Math.PI * 2;
            const radius = 8;
            shape.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );

            // Store navigation path
            shape.userData = { 
                path: data.path,
                index: i
            };

            scene.add(shape);

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            );

            shapes.push({
                mesh: shape,
                velocity: velocity.clone(),
                originalVelocity: velocity.clone()
            });
        });

        // Create large background shapes
        const backgroundShapes: THREE.Mesh[] = [];
        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.PlaneGeometry(45, 45); // Fill 45% of the canvas
            const material = new THREE.MeshBasicMaterial({ color: 0x333333, opacity: 0.5, transparent: true });
            const shape = new THREE.Mesh(geometry, material);
            shape.position.set(
                (i - 1) * 15, // Spread the shapes horizontally
                0,
                -10 // Push them back
            );
            scene.add(shape);
            backgroundShapes.push(shape);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        const spotLight1 = new THREE.SpotLight(0xffffff, 1);
        const spotLight2 = new THREE.SpotLight(0xffffff, 1);
        const spotLight3 = new THREE.SpotLight(0xffffff, 1);

        spotLight1.position.set(10, 10, 10);
        spotLight2.position.set(-10, 10, 10);
        spotLight3.position.set(0, -10, 10);

        scene.add(spotLight1);
        scene.add(spotLight2);
        scene.add(spotLight3);

        camera.position.z = 25;

        // Handle window resize
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Handle mouse interactions
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(shapes.map(s => s.mesh));
            
            if (intersects.length > 0) {
                const hoveredIndex = intersects[0].object.userData.index;
                setHoveredShape(hoveredIndex);
                document.body.style.cursor = 'pointer';
            } else {
                setHoveredShape(null);
                document.body.style.cursor = 'default';
            }
        };

        const handleMouseClick = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(shapes.map(s => s.mesh));
            if (intersects.length > 0) {
                const { path } = intersects[0].object.userData;
                navigate(path);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleMouseClick);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            shapes.forEach((shape, index) => {
                if (hoveredShape === index) {
                    // Gradually slow down when hovered
                    shape.velocity.multiplyScalar(0.95);
                    
                    // Increase emissive intensity on hover
                    const material = shape.mesh.material as THREE.MeshStandardMaterial;
                    material.emissiveIntensity = 1.0;
                } else {
                    // Return to original velocity when not hovered
                    shape.velocity.lerp(shape.originalVelocity, 0.05);
                    
                    // Reset emissive intensity
                    const material = shape.mesh.material as THREE.MeshStandardMaterial;
                    material.emissiveIntensity = 0.5;
                }

                shape.mesh.position.add(shape.velocity);

                // Boundary checking
                if (Math.abs(shape.mesh.position.x) > 10 ||
                    Math.abs(shape.mesh.position.y) > 10 ||
                    Math.abs(shape.mesh.position.z) > 10) {
                    shape.velocity.negate();
                }

                // Add subtle rotation
                shape.mesh.rotation.x += 0.002;
                shape.mesh.rotation.y += 0.002;
            });
// Rotate spotlights to create a spotlight effect
spotLight1.position.x = 10 * Math.cos(Date.now() * 0.001);
spotLight1.position.z = 10 * Math.sin(Date.now() * 0.001);

spotLight2.position.x = -10 * Math.cos(Date.now() * 0.001);
spotLight2.position.z = 10 * Math.sin(Date.now() * 0.001);

spotLight3.position.x = 10 * Math.cos(Date.now() * 0.001);
spotLight3.position.z = -10 * Math.sin(Date.now() * 0.001);

renderer.render(scene, camera);
};

animate();

// Cleanup
return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleMouseClick);
    
    shapes.forEach(({ mesh }) => {
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
}, [navigate, hoveredShape]);

return <div ref={mountRef} className="w-full h-screen bg-gray-900" />;
};

export default DaShapes;

            