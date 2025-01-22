// app/routes/p5cube.tsx
import { useRef, useEffect } from "react";
import p5 from "p5";

export default function P5ShapesPage() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      const shapes = [
        { x: 100, y: 100, w: 80, h: 80, name: "Page1", url: "/page1" },
        { x: 300, y: 200, w: 100, h: 60, name: "Page2", url: "/page2" },
        { x: 200, y: 400, w: 120, h: 120, name: "Page3", url: "/page3" },
        { x: 500, y: 300, w: 70, h: 140, name: "Page4", url: "/page4" },
        { x: 400, y: 100, w: 90, h: 90, name: "Page5", url: "/page5" },
      ];

      const directions = shapes.map(() => ({ dx: p.random(-2, 2), dy: p.random(-2, 2) }));

      p.setup = () => {
        p.createCanvas(800, 600);
      };

      p.draw = () => {
        p.background(240);
        p.noStroke();

        shapes.forEach((shape, index) => {
          // Update position
          shape.x += directions[index].dx;
          shape.y += directions[index].dy;

          // Bounce off walls
          if (shape.x < 0 || shape.x + shape.w > p.width) directions[index].dx *= -1;
          if (shape.y < 0 || shape.y + shape.h > p.height) directions[index].dy *= -1;

          // Draw shape
          p.fill(100 + index * 30, 150, 200);
          if (index % 2 === 0) {
            p.ellipse(shape.x, shape.y, shape.w, shape.h);
          } else {
            p.rect(shape.x, shape.y, shape.w, shape.h);
          }

          // Display text
          p.fill(0);
          p.textSize(16);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(shape.name, shape.x + shape.w / 2, shape.y + shape.h / 2);
        });
      };

      p.mousePressed = () => {
        shapes.forEach((shape) => {
          const isInside =
            p.mouseX > shape.x &&
            p.mouseX < shape.x + shape.w &&
            p.mouseY > shape.y &&
            p.mouseY < shape.y + shape.h;

          if (isInside) {
            window.location.href = shape.url; // Navigate within Remix
          }
        });
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
}
