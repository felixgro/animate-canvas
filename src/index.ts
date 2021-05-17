import Animator, { FrameCallback } from './Animator';

export default (canvas: HTMLCanvasElement | string, eachFrame: FrameCallback) => {
   return new Animator(canvas).eachFrame(eachFrame);
};