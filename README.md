# Animate-Canvas

A minimal library for frame-independent Canvas2D or Webgl animations.

It's as simple as that:
```javascript
animateCanvas(canvas, '2d', (ctx, delta) => {
	// animation logic..
}).start();
```

## Features
- Works with WebGL as well as 2d canvas
- Visualize FPS-Rate
- Frame-independent animations with delta

## Getting Started
Install using NPM or Yarn:
```bash
npm install @felixgro/animate-canvas
```

Start animating:
```typescript
import { animateCanvas } from '@felixgro/animate-canvas';

// Pass a valid css selector or the canvas element itself..
const animation = animateCanvas(canvasElement, '2d' | 'webgl', frameHandler);

// Change playstate..
animation.start();
animation.stop();

// Access active rendering context
animation.ctx
```

You may chain playstate methods:
```typescript
const animation = animateCanvas(...).start();
```