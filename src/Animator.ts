import { toCanvasElement } from './helpers';

export type FrameCallback = (ctx: CanvasRenderingContext2D, delta: number) => void;

export default class Animator {
   public canvas: HTMLCanvasElement;
   public ctx: CanvasRenderingContext2D;

   private running = false;
   private frameId = 0;
   private lastFrame = 0;
   private delta = 0;
   private fps = 0;

   private callback: FrameCallback | undefined;

   constructor(canvas: HTMLCanvasElement | string) {
      this.canvas = toCanvasElement(canvas);
      this.ctx = this.canvas.getContext('2d')!;

      this.resizeCanvas();
   }

   public eachFrame(callback: FrameCallback): Animator {
      this.callback = callback;
      return this;
   }

   public start() {
      if (this.running) return;
      this.running = true;


      this.requestNewFrame();
   }

   public stop() {
      if (!this.running) return;
      this.running = false;
      this.frameId = 0;
      this.lastFrame = 0;
      this.delta = 0;
      this.fps = 0;

      cancelAnimationFrame(this.frameId);
   }

   public resizeCanvas() {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
   }

   private frame(ts: DOMHighResTimeStamp) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.fps = 1000 / (ts - this.lastFrame);
      this.delta = 1 / this.fps;

      this.requestNewFrame();
      if (this.callback) this.callback(this.ctx, this.delta);

      this.renderFPS();
      this.lastFrame = ts;
   }

   private requestNewFrame() {
      this.frameId = requestAnimationFrame(this.frame.bind(this));
   }

   private renderFPS() {
      this.ctx.fillText(`${Math.round(this.fps)}`, 10, 20);
   }
}