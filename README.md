# Animate-Canvas

A minimal library for frame-independent Canvas2D or WebGL animations.

It's as simple as that:
```javascript
animateCanvas(canvas, '2d', (ctx, delta) => {
	// animation logic..
}).start();
```

## Features
- 2d and WebGL Support
- FPS-Graph
- Frame-Independent animations
- Auto-Pause when invisible

## Getting Started
Install using NPM or Yarn:
```bash
npm install @felixgro/animate-canvas
```

Start animating:
```typescript
import { animateCanvas } from '@felixgro/animate-canvas';

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