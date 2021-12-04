const lineWidth = 2;
const graphDetail = 80;

interface GraphPositon {
    pos: number;
    val: number;
}

export default class FPSGraph {
    private el: HTMLElement;

    private titleElement: HTMLElement;
    private graphElement: HTMLCanvasElement;
    private graphCtx: CanvasRenderingContext2D;

    private graph: GraphPositon[] = [];

    constructor(private parent: HTMLElement) {
        this.el = document.createElement('div');
        Object.assign(this.el.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100px',
            color: '#fff',
            'font-family': 'monospace',
            'font-size': '.6rem',
            display: 'grid',
            'grid-template-rows': '15px 1fr',
            'box-sizing': 'border-box',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '5px',
            zIndex: '999',
            pointerEvents: 'none',
        });

        this.titleElement = document.createElement('div');
        this.titleElement.innerText = 'FPS: 0';
        this.graphElement = document.createElement('canvas');

        Object.assign(this.graphElement.style, {
            width: '100%',
            height: '40px',
            border: 'none',
            position: 'relative',
            'box-sizing': 'border-box',
            'padding': '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        });

        this.el.appendChild(this.titleElement);
        this.el.appendChild(this.graphElement);
        document.body.appendChild(this.el);
        this.graphElement.height = this.graphElement.clientHeight;
        this.graphElement.width = this.graphElement.clientWidth;
        this.graphCtx = this.graphElement.getContext('2d')!;
        this.graphCtx.lineWidth = lineWidth;
        this.positionateElement();
        this.createGraph();
        this.drawGraph();

        window.addEventListener('resize', this.positionateElement.bind(this));
    }

    public render(fps: number) {
        this.titleElement.innerText = `FPS: ${fps}`;
        this.updateGraph(fps);
        this.drawGraph();
    }

    private positionateElement() {
        const { x, y } = this.parent.getBoundingClientRect();
        Object.assign(this.el.style, {
            top: `${y}px`,
            left: `${x}px`,
        });
    }

    private createGraph() {
        for (let i = 0; i < graphDetail; i++) {
            this.graph.push({
                pos: i,
                val: lineWidth,
            });
        }
    }

    private updateGraph(val: number) {
        this.graph = this.graph.map((graph, index) => {
            if (index === this.graph.length - 1) {
                return graph;
            }
            return {
                pos: graph.pos - 1,
                val: graph.val,
            };
        });

        this.graph.shift();
        this.graph.push({
            pos: graphDetail,
            val: val
        });
    }

    private drawGraph() {
        this.graphCtx.clearRect(0, 0, this.graphElement.width, this.graphElement.height);

        this.graphCtx.beginPath();
        this.graph.forEach(({ val }, index) => {
            let relHeight = val / 60;
            if (relHeight >= 1) {
                relHeight = 1 - lineWidth / 60;
            }
            const y = this.graphElement.height - this.graphElement.height * relHeight;
            this.graphCtx.lineTo(index * (this.graphElement.width / graphDetail), y);
        });
        this.graphCtx.strokeStyle = '#fff';
        this.graphCtx.stroke();
    }
}