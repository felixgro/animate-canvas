import type { FrameHandler } from './Animator';
import Animator2D from './Animator2D';
import AnimatorWebGL from './AnimatorWebGL';

type AnimatorType = '2d' | 'webgl';

type ContextFactory<T extends AnimatorType> =
    T extends '2d' ? CanvasRenderingContext2D :
    T extends 'webgl' ? WebGLRenderingContext :
    never;

type AnimatorFactory<T extends AnimatorType> =
    T extends '2d' ? Animator2D :
    T extends 'webgl' ? AnimatorWebGL :
    never;

export const animateCanvas2D = (canvas: HTMLCanvasElement, handler: FrameHandler<CanvasRenderingContext2D>): Animator2D => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D context');
    }
    return new Animator2D(ctx, handler);
};

export const animateCanvasWebgl = (canvas: HTMLCanvasElement, handler: FrameHandler<WebGLRenderingContext>): AnimatorWebGL => {
    const ctx = canvas.getContext('webgl');
    if (!ctx) {
        throw new Error('Could not get WebGL context');
    }
    return new AnimatorWebGL(ctx, handler);
};

export const animateCanvas = <T extends AnimatorType>(canvas: HTMLCanvasElement, engine: T, handler: FrameHandler<ContextFactory<T>>): AnimatorFactory<T> => {
    let animator: unknown;

    switch (engine) {
        case '2d':
            animator = animateCanvas2D(canvas, handler as FrameHandler<CanvasRenderingContext2D>);
            break;
        case 'webgl':
            animator = animateCanvasWebgl(canvas, handler as FrameHandler<WebGLRenderingContext>);
            break;
        default: {
            throw new Error('unknown engine type');
        }
    }

    return animator as AnimatorFactory<T>;
}