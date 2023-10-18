class Color_picker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        this.context = this.target.getContext("2d");
        this.listenForEvents();
        this.pickerCircle = {x: 10, y: 10, width: 7, height: 7}
    }

    draw() {
        this.build();
    }

    build() {
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.beginPath();
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
    }

    listenForEvents() {
        let isMouseDown = false;
        const onMouseDown = (e) => {
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;
            if (currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.width &&
                currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.width) {
                isMouseDown = true;
            } else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }
        const onMouseMove = (e) => {
            if (isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseUp = () => {
            isMouseDown = false;
        }

        this.target.addEventListener("mousedown", onMouseDown);
        this.target.addEventListener("mousemove", onMouseMove);
        this.target.addEventListener("mousemove", () => this.onChangeCallback(this.getPickedColor()))
        document.addEventListener("mouseup", onMouseUp);
    }

    getPickedColor() {
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        return {r: imageData.data[0], g: imageData.data[1], b: imageData.data[2]};
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }
}

function getInputs() {
    let obj = {}
    obj['h'] = parseFloat(document.getElementById('H').value)
    obj['hr'] = parseFloat(document.getElementById('HR').value)
    if (obj['h'] < 0 || obj['h'] > 360) {
        document.getElementById('H').value = 360
        obj['h'] = 360
    }
    obj['s'] = parseFloat(document.getElementById('S').value)
    obj['sr'] = parseFloat(document.getElementById('SR').value)
    if (obj['s'] < 0 || obj['s'] > 1) {
        document.getElementById('S').value = 1
        obj['s'] = 1
    }
    obj['v'] = parseFloat(document.getElementById('V').value)
    obj['vr'] = parseFloat(document.getElementById('VR').value)
    if (obj['v'] < 0 || obj['v'] > 1) {
        document.getElementById('V').value = 1
        obj['v'] = 1
    }
    obj['c'] = parseFloat(document.getElementById('C').value)
    obj['cr'] = parseFloat(document.getElementById('CR').value)
    if (obj['c'] < 0 || obj['c'] > 1) {
        document.getElementById('C').value = 1
        obj['c'] = 1
    }
    obj['m'] = parseFloat(document.getElementById('M').value)
    obj['mr'] = parseFloat(document.getElementById('MR').value)
    if (obj['m'] < 0 || obj['m'] > 1) {
        document.getElementById('M').value = 1
        obj['m'] = 1
    }
    obj['y'] = parseFloat(document.getElementById('Y').value)
    obj['yr'] = parseFloat(document.getElementById('YR').value)
    if (obj['y'] < 0 || obj['y'] > 1) {
        document.getElementById('Y').value = 1
        obj['y'] = 1
    }
    obj['k'] = parseFloat(document.getElementById('K').value)
    obj['kr'] = parseFloat(document.getElementById('KR').value)
    if (obj['k'] < 0 || obj['k'] > 1) {
        document.getElementById('K').value = 1
        obj['k'] = 1
    }
    obj['r'] = parseFloat(document.getElementById('R').value)
    obj['rr'] = parseFloat(document.getElementById('RR').value)
    if (obj['r'] < 0 || obj['r'] > 255) {
        document.getElementById('R').value = 255
        obj['r'] = 255
    }
    obj['g'] = parseFloat(document.getElementById('G').value)
    obj['gr'] = parseFloat(document.getElementById('GR').value)
    if (obj['g'] < 0 || obj['g'] > 255) {
        document.getElementById('G').value = 255
        obj['g'] = 255
    }
    obj['b'] = parseFloat(document.getElementById('B').value)
    obj['br'] = parseFloat(document.getElementById('BR').value)
    if (obj['b'] < 0 || obj['b'] > 255) {
        document.getElementById('B').value = 255
        obj['b'] = 255
    }


    return obj
}

function setInput(name, value, rangeOnly = false) {
    if (!rangeOnly) {
        document.getElementById(name.toUpperCase()).value = value
    }
    document.getElementById(name.toUpperCase() + 'R').value = value
}

function setInputR(name, value, rangeOnly = false) {
    document.getElementById(name[0].toUpperCase()).value = value
}

function makeCMYK(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    let k = Math.min(0.99999, 1 - Math.max(r, g, b))
    let c = (1 - r - k) / (1 - k)
    let m = (1 - g - k) / (1 - k)
    let y = (1 - b - k) / (1 - k)
    setInput('c', c)
    setInput('m', m)
    setInput('y', y)
    setInput('k', k)
}

function makeHSV(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    let cmax = Math.max(r, g, b, 0.001)
    let cmin = Math.max(Math.min(r, g, b), 0.001)
    let delta = Math.max((cmax - cmin), 0.001)
    let h, s, v
    if (delta === 0) {
        h = 0
    } else if (cmax === r) {
        h = 60 * (((g - b) / delta) % 6)
    } else if (cmax === g) {
        h = 60 * ((b - r) / delta + 2)
    } else {
        h = 60 * ((r - g) / delta + 4)
    }
    if (h < 0) {
        h += 360
    }
    if (cmax === 0) {
        s = 0
    } else {
        s = delta / cmax
    }
    v = cmax
    setInput('h', h)
    setInput('s', s)
    setInput('v', v)
}

function makeRGBFromCMYK(c, m, y, k) {
    let r, g, b
    r = 255 * (1 - c) * (1 - k)
    g = 255 * (1 - m) * (1 - k)
    b = 255 * (1 - y) * (1 - k)
    setInput('r', r)
    setInput('g', g)
    setInput('b', b)
}

function makeRGBFromHSV(h, s, v) {
    let c = v * s
    let x = c * (1 - Math.abs((h / 60) % 2 - 1))
    let m = v - c
    let r_, g_, b_
    if (h < 60) {
        r_ = c
        g_ = x
        b_ = 0
    } else if (h < 120) {
        r_ = x
        g_ = c
        b_ = 0
    } else if (h < 180) {
        r_ = 0
        g_ = c
        b_ = x
    } else if (h < 240) {
        r_ = 0
        g_ = x
        b_ = c
    } else if (h < 300) {
        r_ = x
        g_ = 0
        b_ = c
    } else {
        r_ = c
        g_ = 0
        b_ = x
    }
    let r, g, b
    r = (r_ + m) * 255
    g = (g_ + m) * 255
    b = (b_ + m) * 255
    setInput('r', r)
    setInput('g', g)
    setInput('b', b)
}


let picker = new Color_picker(document.getElementById("color-picker"), 350, 350)
setInterval(() => picker.draw(), 1);

picker.onChange((color) => {
    setInput("r", color.r);
    setInput("g", color.g);
    setInput("b", color.b);
    // setInput("rr", color.r);
    // setInput("gr", color.g);
    // setInput("br", color.b);
    let values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
})


document.getElementById('R').addEventListener('input', () => {
    let values = getInputs();
    setInput('r', values.r, true);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})

document.getElementById('RR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('rr', values.rr);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})

document.getElementById('G').addEventListener('input', () => {
    let values = getInputs();
    setInput('g', values.g, true);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})

document.getElementById('GR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('gr', values.gr);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})

document.getElementById('B').addEventListener('input', () => {
    let values = getInputs();
    setInput('b', values.b, true);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})


document.getElementById('BR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('br', values.br);
    makeCMYK(values.r, values.g, values.b);
    makeHSV(values.r, values.g, values.b);
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${values.r}, ${values.g}, ${values.b})`;
})

document.getElementById('C').addEventListener('input', () => {
    let values = getInputs();
    setInput('c', values.c, true);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('M').addEventListener('input', () => {
    let values = getInputs();
    setInput('m', values.m, true);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('Y').addEventListener('input', () => {
    let values = getInputs();
    setInput('y', values.y, true);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('K').addEventListener('input', () => {
    let values = getInputs();
    setInput('k', values.k, true);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('H').addEventListener('input', () => {
    let values = getInputs();
    setInput('h', values.h, true);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('S').addEventListener('input', () => {
    let values = getInputs();
    setInput('s', values.s, true);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('V').addEventListener('input', () => {
    let values = getInputs();
    setInput('v', values.v, true);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('CR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('cr', values.cr);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('MR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('mr', values.mr);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('YR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('yr', values.yr);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('KR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('kr', values.kr,);
    makeRGBFromCMYK(values.c, values.m, values.y, values.k);
    values = getInputs();
    makeHSV(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('HR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('hr', values.hr);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('SR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('sr', values.sr);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})

document.getElementById('VR').addEventListener('input', () => {
    let values = getInputs();
    setInputR('vr', values.vr);
    makeRGBFromHSV(values.h, values.s, values.v);
    values = getInputs();
    makeCMYK(values.r, values.g, values.b);
    let newValues = getInputs();
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${newValues.r}, ${newValues.g}, ${newValues.b})`;
})




