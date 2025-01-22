import React from "react";
import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

const sketch: Sketch = (p) => {
  let video: p5.Element;

  p.setup = () => {
    p.createCanvas(640, 480);
    video = p.createCapture(p.VIDEO);
    video.size(640, 480);
    video.hide();
  };

  p.draw = () => {
    p.background(0);
    p.image(video, 0, 0, 640, 480);

    // Process pixels for a pixelated effect
    p.loadPixels();
    for (let y = 0; y < p.height; y += 10) {
      for (let x = 0; x < p.width; x += 10) {
        const index = (x + y * p.width) * 4;
        const r = p.pixels[index];
        const g = p.pixels[index + 1];
        const b = p.pixels[index + 2];
        p.fill(r, g, b);
        p.noStroke();
        p.rect(x, y, 10, 10);
      }
    }
  };
};

const Cam = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};

export default Cam;
