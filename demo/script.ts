import { animateCanvas } from '../src';

(() => {
    const canvas = document.getElementById('canvas2d') as HTMLCanvasElement;
    const amount = 3000;
    const size = 10;
    const points = [];

    const generateRandomHexColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    for (let i = 0; i < amount / 2; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 0.001 * (Math.random() < 0.5 ? -1 : 1),
            vy: Math.random() * 0.1 * (Math.random() < 0.5 ? -1 : 1),
            color: generateRandomHexColor()
        });
    }

    for (let i = 0; i < amount / 2; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 0.1 * (Math.random() < 0.5 ? -1 : 1),
            vy: Math.random() * 0.001 * (Math.random() < 0.5 ? -1 : 1),
            color: generateRandomHexColor()
        });
    }

    animateCanvas(canvas, '2d', (ctx, delta) => {
        points.forEach((point, i) => {
            point.x += point.vx * delta;
            point.y += point.vy * delta;
            if (point.x > canvas.width) {
                point.x = -size;
            } else if (point.x + size < 0) {
                point.x = canvas.width;
            }
            if (point.y > canvas.height) {
                point.y = -size;
            } else if (point.y + size < 0) {
                point.y = canvas.height;
            }

            ctx.fillStyle = point.color;
            ctx.fillRect(point.x, point.y, size, size);
        });
    }).start();
})();

/*
(() => {
    const canvasWebgl = document.getElementById('canvaswebgl') as HTMLCanvasElement;
    const vel = 0.001;
    let goUp = true;
    let v = 0;

    const animation = animateCanvas(canvasWebgl, 'webgl', (gl, delta) => {
        v = v + (vel * (goUp ? 1 : -1) * delta);
        gl.clearColor(1, v, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

        if (v >= 1) {
            goUp = false;
        } else if (v <= 0) {
            goUp = true;
        }
    });

    animation.start();
})();
*/