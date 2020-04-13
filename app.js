const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  INITIAL_COLOR = "#2c2c2c";

canvas.width = "700";
canvas.height = "700";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5";
ctx.fillStyle = INITIAL_COLOR;

let painting = false,
  filling = false;

const colors = document.getElementsByClassName("jsColor"),
  range = document.querySelector("#jsRange"),
  modeBtn = document.querySelector("#jsMode"),
  saveBtn = document.querySelector("#jsSave");

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleClickColors(event) {
  clickedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = clickedColor;
  ctx.fillStyle = clickedColor;
}

function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
    canvas.addEventListener("mousedown", startPainting);
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
    canvas.removeEventListener("mousedown", startPainting);
  }
}

function handleClickCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const dataURL = canvas.toDataURL();
  const saveElement = document.createElement("a");
  saveElement.href = dataURL;
  saveElement.download = "paintJS";
  saveElement.click();
}

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClickCanvas);
    canvas.addEventListener("contextmenu", handleCM);

    Array.from(colors).forEach((color) =>
      color.addEventListener("click", handleClickColors)
    );

    if (range) {
      range.addEventListener("input", handleRangeChange);
    }

    if (modeBtn) {
      modeBtn.addEventListener("click", handleModeClick);
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", handleSaveClick);
    }
  }
}

init();
