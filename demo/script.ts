import Animator from '../src/index';

let speed = 100;
let x = 0;

new Animator('#canvas').eachFrame((ctx, delta) => {
   if (x > window.innerWidth || x < 0) speed *= -1;

   ctx.beginPath();
   ctx.ellipse(x += speed * delta, 50, 10, 10, 0, 0, Math.PI * 2);
   ctx.fill();
}).start();