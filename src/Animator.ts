import { toCanvasElement } from './helpers';

export type FrameCallback = (ctx: CanvasRenderingContext2D, delta: number) => void;

export default class Animator {
   public canvas: HTMLCanvasElement;
   public ctx: CanvasRenderingContext2D;
   public running = false;

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

   public start(): Animator {
      if (this.running) return this;
      this.running = true;
      this.lastFrame = performance.now();

      this.requestNewFrame();

      return this;
   }

   public stop(): Animator {
      if (!this.running) return this;

      cancelAnimationFrame(this.frameId);

      this.running = false;
      this.frameId = 0;

      return this;
   }

   public toggle(): Animator {
      return this.running ? this.stop() : this.start();
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