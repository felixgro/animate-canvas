import Animator from './Animator';

export default class AnimatorWebGL extends Animator<WebGLRenderingContext> {
    clearFrame(): void {
        this.ctx.clearColor(0, 0, 0, 0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT || this.ctx.DEPTH_BUFFER_BIT);
    }
}