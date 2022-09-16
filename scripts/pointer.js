class Pointer {
    constructor(elem) {
        this.elem = elem
        this.state = {
            position: { x: 0, y: 0 }
        };
    }
    initialize() {
        let self = this
        window.addEventListener("mousemove", (e) => {
            self.updatePosition(e);
        });
        this.div = document.createElement('div');
        this.div.id = 'pointer'
        document.body.appendChild(this.div)
    }
    updatePosition = (e) => {
        //if (e.target.tagName == "H1" || e.target.tagName == "H2" || e.target.tagName == "H3" || e.target.tagName == "H4" || e.target.tagName == "H5" || e.target.tagName == "H6" || e.target.tagName == "IMG" || e.target.tagName == "P" || e.target.tagName == "LI" || e.target.tagName == "SVG") {
        if (!(e.target.tagName == 'BODY' || e.target.tagName == "DIV")) {
            this.div.style.backgroundColor = 'green'
            this.div.style.scale = '1.2'
            this.div.style.opacity = '0.8'
        }
        else {
            this.div.style.backgroundColor = null
            this.div.style.scale = null
            this.div.style.opacity = null
        }

        var m = {
            x: null,
            y: null,
        };
        m.x = e.clientX;
        m.y = e.clientY;
        this.state.position.x = m.x ? m.x : 0;
        this.state.position.y = m.y ? m.y : 0;
        this.div.style.translate = `${this.state.position.x}px ${this.state.position.y}px`
    };
}
const pointer = new Pointer;
pointer.initialize()