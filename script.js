let colr;


const container = document.getElementById('container');


for (let i = 1; i <= 64; i++) {
  const pixel = document.createElement("div");
  pixel.id = `px${i}`;
  pixel.classList.add("pixel");
  pixel.setAttribute("onclick", "setColor(this)");
  container.appendChild(pixel);
}

function setColor(element) {
  colr = document.getElementById('color').value
  element.style.backgroundColor = colr;
}