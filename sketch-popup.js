(function () {
    let angle = 0;
    let closebtn;

    function preload() {
        closebtn = loadModel('closebtn.obj');
    }

    function setup() {
        createCanvas(windowWidth, windowHeight, WEBGL);
        angleMode(DEGREES);
    }

    function draw() {
        background(255);
        orbitControl();

        noStroke();
        normalMaterial();
        //   ambientLight(0, 0, 255);
        //   directionalLight(255, 255, 255, 1, 1, 0);
        //   specularMaterial(255);

        // closebtn
        push();
        translate(0, 260, 0);
        // translate(frameCount * 1, frameCount * 0.5);
        // 適度なサイズに拡大
        scale(3);
        // そのままでは逆さなので上下を逆にする
        rotateZ(180);
        rotateY(angle * 3);
        // 描画
        model(closebtn);

        pop();

        angle += 1;
    }

    // mobile control settings

    document.oncontextmenu = function () {
        return false;
    };
    document.onmousedown = function () {
        return false;
    };

    p5.prototype.orbitControl = function (sensitivityX, sensitivityY, sensitivityZ) {
        this._assert3d('orbitControl');
        p5._validateParameters('orbitControl', arguments);

        // If the mouse is not in bounds of the canvas, disable all behaviors:
        const mouseInCanvas = this.mouseX < this.width && this.mouseX > 0 && this.mouseY < this.height && this.mouseY > 0;
        if (!mouseInCanvas) return;

        const cam = this._renderer._curCamera;

        if (typeof sensitivityX === 'undefined') {
            sensitivityX = 1;
        }
        if (typeof sensitivityY === 'undefined') {
            sensitivityY = sensitivityX;
        }
        if (typeof sensitivityZ === 'undefined') {
            sensitivityZ = 0.5;
        }

        // default right-mouse and mouse-wheel behaviors (context menu and scrolling,
        // respectively) are disabled here to allow use of those events for panning and
        // zooming

        // disable context menu for canvas element and add 'contextMenuDisabled'
        // flag to p5 instance
        if (this.contextMenuDisabled !== true) {
            this.canvas.oncontextmenu = () => false;
            this._setProperty('contextMenuDisabled', true);
        }

        // disable default scrolling behavior on the canvas element and add
        // 'wheelDefaultDisabled' flag to p5 instance
        if (this.wheelDefaultDisabled !== true) {
            this.canvas.onwheel = () => false;
            this._setProperty('wheelDefaultDisabled', true);
        }

        const scaleFactor = this.height < this.width ? this.height : this.width;

        // ZOOM if there is a change in mouseWheelDelta
        if (this._mouseWheelDeltaY !== this._pmouseWheelDeltaY) {
            // zoom according to direction of mouseWheelDeltaY rather than value
            if (this._mouseWheelDeltaY > 0) {
                this._renderer._curCamera._orbit(0, 0, sensitivityZ * scaleFactor);
            } else {
                this._renderer._curCamera._orbit(0, 0, -sensitivityZ * scaleFactor);
            }
        }

        if (this.mouseIsPressed) {
            const deltaTheta = (-sensitivityX * (this.mouseX - this.pmouseX)) / scaleFactor;
            const deltaPhi = (sensitivityY * (this.mouseY - this.pmouseY)) / scaleFactor;
            this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
        }
        return this;
    };
})();

(function () {
    const parent = document.querySelector('.content-list');
    const child = document.querySelector('.item-wrapper');
    if (window.innerWidth >= 768) {
        for (let i = 0; i <= 12; i++) {
            let clone = child.cloneNode(true);
            parent.appendChild(clone);
        }
    } else {
        return false;
    }
})();

(function () {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        location.href = '/';
    });
})();
