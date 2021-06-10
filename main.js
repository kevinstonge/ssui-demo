const status = {};

const setStatus = () => {
    status.handle = document.querySelector("#handle");
    status.handleContainer = document.querySelector("#control-box");
    status.active = false;
    status.currentX = 0;
    status.currentY = 0;
    status.initialX = 0;
    status.initialY = 0;
    status.xOffset = 0;
    status.yOffset = 0;
    status.containerRect = status.handleContainer.getBoundingClientRect(),
    status.containerTop = status.containerRect.top;
    status.containerLeft = status.containerRect.left;
    status.containerWidth = status.containerRect.width;
    status.containerHeight = status.containerRect.height;
    setTranslate(status.currentX, status.currentY, handle);
    setPoints(status.currentX, status.currentY);
}

const dragStart = (e) => {
    e.preventDefault();
    status.initialX = e.clientX - status.xOffset;
    status.initialY = e.clientY - status.yOffset;
    if (e.target === handle) {
        status.active = true;
    }
}

const dragEnd = (e) => {
    status.initialX = status.currentX;
    status.initialY = status.currentY;
    status.active = false;
}

const drag = (e) => {
    if (status.active) {
        e.preventDefault();
        if (e.clientX < status.containerLeft) {
            status.currentX = status.containerWidth / -2;
        }
        else if (e.clientX > status.containerLeft + status.containerWidth) {
            status.currentX = status.containerWidth/2;
        }
        else {
            status.currentX = e.clientX - status.initialX;
        }
        
        if (e.clientY < status.containerTop) {
            status.currentY = status.containerHeight / -2;
        }
        else if (e.clientY > status.containerTop + status.containerHeight) {
            status.currentY = status.containerHeight / 2;
        }
        else {
            status.currentY = e.clientY - status.initialY;
        }
        
        status.xOffset = status.currentX;
        status.yOffset = status.currentY;
        setTranslate(status.currentX, status.currentY, handle);
        setPoints(status.currentX, status.currentY);
    }
}

const setTranslate = (xPos, yPos, el) => {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

const setPoints = (x, y) => {
    const w = status.containerWidth;
    const h = status.containerHeight;
    const xPercent = ((x + w/2)/w);
    const yPercent = ((y + h/2)/h);
    const box1 = Math.round(100 * (1-xPercent) * (1-yPercent));
    const box2 = Math.round(100 * xPercent * (1-yPercent));
    const box3 = Math.round(100 * (1-xPercent) * yPercent);
    const box4 = Math.round(100 * xPercent * yPercent);
    document.querySelector("#box1-points").innerText = (box1 >= 0) ? box1 : 0;
    document.querySelector("#box2-points").innerText = (box2 >= 0) ? box2 : 0;
    document.querySelector("#box3-points").innerText = (box3 >= 0) ? box3 : 0;
    document.querySelector("#box4-points").innerText = (box4 >= 0) ? box4 : 0;
}

setStatus();
status.handleContainer.addEventListener("mousedown", dragStart, false);
window.addEventListener("mouseup", dragEnd, false);
window.addEventListener("mousemove", drag, false);
window.addEventListener("resize", setStatus, false);