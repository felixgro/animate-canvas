import { animate } from '../lib/index';

let x = 0, speed = 250;

animate('#canvas').showFps('green').eachFrame((ctx, delta) => {
    if (x > window.innerWidth - 50 || x < 0) speed *= -1;

    ctx.beginPath();
    ctx.rect(x, 100, 50, 50);
    ctx.fill();

    x += speed * delta;
}).start();