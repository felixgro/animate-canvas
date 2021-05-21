import Animator, { FrameCallback } from './Animator';

export const animate = (canvas: HTMLCanvasElement | string, eachFrame: FrameCallback) => {
   return new Animator(canvas).eachFrame(eachFrame);
};

export default Animator;