let colr;
let payload = "";
document.getElementById('color').value = "#FFFFFF";

const container = document.getElementById('container');

const options = {
  username: 'Daniel_Braun',  
  password: '31415926535Pi',
  clientId: 'mqtt_client_' + Math.random().toString(16).substr(2, 8), 
  clean: true               
};

const client = mqtt.connect('wss://xfa25392.ala.eu-central-1.emqxsl.com:8084/mqtt', options);

client.on('connect', () => {
  console.log('Mit dem MQTT-Broker verbunden');
  document.getElementById('connection').src = "wifi.png";
});

client.subscribe('Mpx', (err) => {
  if (err) {
     console.error('Abonnement-Fehler:', err);
  } else {
     console.log('Erfolgreich abonniert auf Topic: msg1');
  }
});

client.on('error', (error) => {
  console.error('Verbindungsfehler:', error);
  document.getElementById('connection').src = "no-wifi.png";
});

client.on('disconnect', () => {
  console.log('Vom Broker getrennt');
  document.getElementById('connection').src = "no-wifi.png";
});

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

  let input = element.id;
  let number = input.replace("px", "");
  sendMessage(number, colr);
}
function sendMessage(px, color) {
  
  let payloadObject = {
    px: px,
    color: color
  };

  payload = JSON.stringify(payloadObject);

  client.publish('Mpx', payload); 
  console.log('Nachricht gesendet:', payload);
}