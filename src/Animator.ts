export type FrameCallback = (ctx: CanvasRenderingContext2D, delta: number) => void;

export default class Animator {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public running = false;

	private frameId = 0;
	private lastFrame = 0;
	private delta = 0;
	private fps = 0;

	private _showFps = false;
	private _fpsColor = '#000';
	private _eachFrame: FrameCallback = () => { };

	constructor(canvas: HTMLCanvasElement | string) {
		if (typeof canvas === 'string') {
			const element = document.querySelector<HTMLCanvasElement>(canvas);

			if (!element)
				throw new Error(`Cannot find canvas with selector '${canvas}'`);

			canvas = element;
		}

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d')!;

		this.resizeCanvas();
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

	public eachFrame(callback: FrameCallback): Animator {
		this._eachFrame = callback;
		return this;
	}

	public showFps(color?: string): Animator {
		this._showFps = true;
		if (color) this._fpsColor = color;
		return this;
	}

	public resizeCanvas() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}

	private frame(ts: DOMHighResTimeStamp) {
		this.fps = 1000 / (ts - this.lastFrame);
		this.delta = 1 / this.fps;

		this.requestNewFrame();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this._eachFrame(this.ctx, this.delta);

		if (this._showFps) {
			const oldColor = this.ctx.fillStyle;
			this.ctx.fillStyle = this._fpsColor;
			this.ctx.fillText(`${Math.round(this.fps)}`, 10, 20);
			this.ctx.fillStyle = oldColor;
		}

		this.lastFrame = ts;
	}

	private requestNewFrame() {
		this.frameId = requestAnimationFrame(this.frame.bind(this));
	}
}