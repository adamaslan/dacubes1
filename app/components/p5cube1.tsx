import React, { useRef, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import p5 from "p5";
import CoolFont4 from '../../PressStart2P-Regular.ttf';

export default function P5ShapesPage() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sketch = (p) => {
      let coolFont;
      const shapes = [
        { x: 100, y: 100, w: 100, h: 80, name: "Page1", route: "/page1" },
        { x: 300, y: 200, w: 150, h: 60, name: "Page2", route: "/page2" },
        { x: 200, y: 400, w: 100, h: 120, name: "Page3", route: "/page3" },
        { x: 500, y: 300, w: 200, h: 140, name: "Page4", route: "/page4" },
        { x: 400, y: 100, w: 110, h: 90, name: "Page5", route: "/page5" },
      ];

      const directions = shapes.map(() => ({ dx: p.random(-2, 2), dy: p.random(-2, 2) }));
      const particles = Array.from({ length: 100 }, () => ({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(2, 9),
        speedX: p.random(-0.5, 0.5),
        speedY: p.random(-0.5, 0.5),
        color: [p.random(255), p.random(255), p.random(255)],
        opacity: p.random(100, 200),
      }));

      // Additional ASCII Characters with randomized colors and font sizes
      const asciiChars = Array.from({ length: 100 }, () => ({
        char: String.fromCharCode(p.random(33, 126)),
        x: p.random(p.width),
        y: p.random(p.height),
        speedX: p.random(-1, 1),
        speedY: p.random(-1, 1),
        color: [p.random(255), p.random(255), p.random(255)],
        fontSize: p.random(8, 24),
      }));

      p.preload = () => {
        coolFont = p.loadFont(CoolFont4);
      };

      p.setup = () => {
        p.createCanvas(800, 600);
        p.textFont(coolFont);
      };

      p.draw = () => {
        p.background(20, 20, 40);

        particles.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1;

          p.fill(...particle.color, particle.opacity);
          p.noStroke();
          p.circle(particle.x, particle.y, particle.size);

          for (let i = 1; i < 5; i++) {
            p.fill(...particle.color, particle.opacity / (i * 2));
            p.circle(particle.x - i * particle.speedX, particle.y - i * particle.speedY, particle.size);
          }
        });

        shapes.forEach((shape, index) => {
          shape.x += directions[index].dx;
          shape.y += directions[index].dy;

          if (shape.x < 0 || shape.x + shape.w > p.width) directions[index].dx *= -1;
          if (shape.y < 0 || shape.y + shape.h > p.height) directions[index].dy *= -1;

          const neonColors = [
            [255, 50, 50],
            [50, 255, 50],
            [50, 50, 255],
            [255, 255, 50],
            [255, 50, 255],
          ];
          p.fill(...neonColors[index], 200);
          p.stroke(255);
          p.strokeWeight(2);

          if (index % 2 === 0) {
            p.ellipse(shape.x + shape.w / 2, shape.y + shape.h / 2, shape.w, shape.h);
          } else {
            p.rect(shape.x, shape.y, shape.w, shape.h, 10);
          }

          p.fill(255);
          p.noStroke();
          p.textSize(16);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(shape.name, shape.x + shape.w / 2, shape.y + shape.h / 2);
        });

        asciiChars.forEach((char) => {
          char.x += char.speedX;
          char.y += char.speedY;

          if (char.x < 0 || char.x > p.width) char.speedX *= -1;
          if (char.y < 0 || char.y > p.height) char.speedY *= -1;

          p.fill(...char.color);
          p.textSize(char.fontSize);
          p.text(char.char, char.x, char.y);
        });
      };

      p.mousePressed = () => {
        shapes.forEach((shape) => {
          const isInside = p.mouseX > shape.x && p.mouseX < shape.x + shape.w && p.mouseY > shape.x && p.mouseY < shape.h;
          if (isInside) {
            navigate(shape.route);
          }
        });
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);
    return () => {
      p5Instance.remove();
    };
  }, [navigate]);

  return <div ref={sketchRef}></div>;
}
