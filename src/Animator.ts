import FPSGraph from './FpsGraph';
import FpsGraph from './FpsGraph';

export type FrameHandler<CTX> = (ctx: CTX, delta: number) => void;

export interface IAnimator<CTX> {
	ctx: CTX;
	clearFrame(): void;
}

export interface IFrame<CTX> {
	id: number;
	prevRender: number;
	prevFPSRender: number
	deltaRecord: number[];
	handler: FrameHandler<CTX>;
}

export default abstract class Animator<CTX> implements IAnimator<CTX> {
	public ctx: CTX;

	protected _state: 'running' | 'paused' | 'stopped' = 'stopped';

	protected _config = {
		showFps: true,
		fpsColor: '#000',
		throttleFrame: 30,
		clearFrame: true
	}

	protected _frame: IFrame<CTX> = {
		id: 0,
		prevRender: 0,
		prevFPSRender: 0,
		deltaRecord: [],
		handler: () => { },
	}

	private _fps: FPSGraph | null = null;

	abstract clearFrame(): void;

	constructor(ctx: CTX, handler: FrameHandler<CTX>) {
		this._frame.handler = handler;
		this.ctx = ctx;

		if (this._config.showFps) {
			this._fps = new FPSGraph((this.ctx as any).canvas);
		}

		window.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden' && this._state === 'running') {
				this.stop();
				this._state = 'paused';
			}

			if (document.visibilityState === 'visible' && this._state === 'paused') {
				this.start();
			}
		});
	}

	public start(): this {
		if (this._state === 'running') return this;
		this._state = 'running';

		this._frame.prevRender = performance.now();
		if (this._config.showFps) this._frame.prevFPSRender = performance.now();
		this.requestAnimationFrame();
		return this;
	}

	public stop(): this {
		if (this._state !== 'running') return this;
		this._state = 'stopped';

		cancelAnimationFrame(this._frame.id);
		return this;
	}

	private frame(ts: DOMHighResTimeStamp) {
		const delta = ts - this._frame.prevRender;
		this._frame.deltaRecord.push(delta);
		this._frame.prevRender = ts;

		if (this._config.clearFrame) this.clearFrame();
		this._frame.handler(this.ctx, delta);
		this.requestAnimationFrame();

		if (this._fps && (ts - this._frame.prevFPSRender > 800)) {
			this._frame.prevFPSRender = ts;
			const avgDelta = this._frame.deltaRecord.reduce((a, b) => a + b, 0) / this._frame.deltaRecord.length;
			this._frame.deltaRecord = [];
			this._fps.render(Math.round(1000 / avgDelta));
		}
	}

	private requestAnimationFrame() {
		this._frame.id = requestAnimationFrame(this.frame.bind(this));
	}
}