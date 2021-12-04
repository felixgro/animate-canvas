import Animator from './Animator';

export default class Animator2D extends Animator<CanvasRenderingContext2D> {
    clearFrame(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}