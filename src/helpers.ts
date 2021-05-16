export const toCanvasElement = (selector: string | HTMLCanvasElement): HTMLCanvasElement => {
   if (typeof selector !== 'string') return selector;

   const canvas = document.querySelector<HTMLCanvasElement>(selector);

   if (!canvas) throw new Error(`Cannot find canvas using selector '${selector}'`);

   return canvas;
}