import { animate } from '../src/index';

let x = 0;
let speed = 100;

const animator = animate('#canvas', (ctx, delta) => {
   if (x >= window.innerWidth || x < 0) speed *= -1;

   ctx.beginPath();
   ctx.ellipse(x += speed * delta, 50, 20, 20, 0, 0, Math.PI * 2);
   ctx.fill();
}).start();

document.onkeydown = e => {
   animator.toggle();
}