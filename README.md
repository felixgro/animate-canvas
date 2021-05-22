# Animate-Canvas

A minimal library for frame-independent Canvas2D animations.

It's as simple as that:
```javascript
animate('#canvas').eachFrame((ctx, delta) => {
	// animation logic..
}).start();
```

## Getting Started
Install using Yarn or NPM:
```bash
yarn add @felixgro/animate-canvas

npm install @felixgro/animate-canvas
```

Start animating:
```typescript
import { animate } from '@felixgro/animate-canvas';

// Pass a valid css selector or the canvas element itself..
const animation = animate(canvasElement);

// Define a callback for each frame..
animation.eachFrame((ctx, delta) => {});

// Change playstate..
animation.start();
animation.stop();
animation.toggle();

// Render current framerate in canvas..
animation.showFps();

// Access canvas element & it's rendering context..
animation.canvas
animation.ctx
```

You may chain methods as well:
```typescript
const animation = animate('#canvas')
    .eachFrame(doSomething)
    .showFps()
    .start();
```