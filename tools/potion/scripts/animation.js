let map = {};

document.querySelectorAll(".animatable").forEach(element => {
    console.log(element.offsetWidth);
    console.log(element.offsetHeight);
    let animate = document.createElement("canvas");
    animate.id = element.id;
    animate.className = element.className;
    animate.style.height = element.offsetHeight+"px";
    animate.width = element.offsetWidth;
    animate.height = element.offsetHeight;
    let context = animate.getContext('2d');

    context.msImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    
    map[element.id] = {
        "img": element,
        "direction": element.getAttribute("data-dir"),
        "type": element.getAttribute("data-type"),
        "speed": element.getAttribute("data-speed"),
        "targetColor": element.getAttribute("data-targetColor"),
        "context": context,
        "canvas": animate,
        "state": -.2,
        "animated": false
    };
    
    element.parentNode.replaceChild(animate, element);
    drawOverlay(element.id);
});

function drawOverlay(id) {
    let ctx = map[id].context;

    ctx.clearRect(0, 0, map[id].canvas.width, map[id].canvas.height);
    ctx.drawImage(map[id].img, 0, 0, map[id].canvas.offsetWidth, map[id].canvas.offsetHeight);
}

function draw(id) {
    drawOverlay(id);
    if(map[id].state >= 1) map[id].state = -.2;
    else if(map[id].animated) {map[id].state+=0.05;}

    let ctx = map[id].context;
    ctx.fillStyle = "#ffffff";
    if(map[id].direction == "up") {
        for (let y=map[id].canvas.height; y>0; y--) {
            for(let x=0; x<map[id].canvas.width; x++) {
                let d = ctx.getImageData(x, y, 1, 1).data;
                if(y < map[id].canvas.height - map[id].canvas.height*(map[id].state)) return;
                if(map[id].targetColor == rgbToHex(d[0], d[1], d[2])) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }else {
        for (let y=0; y<map[id].canvas.height*map[id].state; y++) {
            for(let x=0; x<map[id].canvas.width; x++) {
                let d = ctx.getImageData(x, y, 1, 1).data;
                if(map[id].targetColor == rgbToHex(d[0], d[1], d[2])) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}  

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setAnimated(id, bool) {
    map[id].animated = bool;
}

function clearState(id) {
    map[id].state = -.2;
    map[id].animated = false;
}