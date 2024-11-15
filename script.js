
const container = document.getElementById('container');


for (let i = 1; i <= 64; i++) {
  const pixel = document.createElement("div");
  pixel.id = `px${i}`;
  pixel.classList.add("pixel");
  container.appendChild(pixel);
}
