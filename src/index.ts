import Animator from './Animator';

export const animate = (canvas: HTMLCanvasElement | string): Animator => new Animator(canvas);

export default Animator;