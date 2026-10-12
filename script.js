const scene = document.querySelector('.camera-scene');
const cameraButton = document.querySelector('#camera-toggle');
cameraButton.addEventListener('click', () => {
  const paused = document.body.classList.toggle('camera-paused');
  cameraButton.textContent = paused ? '▶' : 'Ⅱ';
  cameraButton.setAttribute('aria-label', paused ? 'Resume camera simulation' : 'Pause camera simulation');
});
document.querySelector('#recenter-camera').addEventListener('click', () => {
  scene.classList.remove('camera-recenter');
  void scene.offsetWidth;
  scene.classList.add('camera-recenter');
});

document.querySelector('#room-layout').addEventListener('change', (event) => {
  document.body.classList.remove('visitor-layout', 'obstacle-layout');
  if (event.target.value === 'visitor') document.body.classList.add('visitor-layout');
  if (event.target.value === 'obstacle') document.body.classList.add('obstacle-layout');
  document.querySelector('.map-route path').setAttribute('d', event.target.value === 'obstacle'
    ? 'M200 242 C160 216 160 193 203 177 S220 132 277 83'
    : 'M200 242 C205 205 190 183 207 155 S251 115 277 83');
  document.querySelector('#map-time').textContent = 'NOW';
});

document.querySelector('#toggle-detection').addEventListener('change', (event) => document.body.classList.toggle('detection-off', !event.target.checked));
document.querySelector('#toggle-depth').addEventListener('change', (event) => document.querySelector('.camera-overlay').classList.toggle('depth-off', !event.target.checked));
document.querySelector('#toggle-route').addEventListener('change', (event) => document.body.classList.toggle('route-off', !event.target.checked));

document.querySelector('#scan-room').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.classList.remove('scanning');
  document.body.classList.remove('scan-active');
  void button.offsetWidth;
  button.classList.add('scanning');
  document.body.classList.add('scan-active');
  document.querySelector('#map-time').textContent = 'SCANNING';
  window.setTimeout(() => {
    document.querySelector('#map-time').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.body.classList.remove('scan-active');
  }, 1500);
});

let movementAlert = false;
document.querySelector('#motion-demo').addEventListener('click', (event) => {
  movementAlert = !movementAlert;
  document.body.classList.toggle('motion-alert', movementAlert);
  event.currentTarget.textContent = movementAlert ? 'CLEAR' : 'SIMULATE';
  document.querySelector('#person-track-label').textContent = movementAlert ? 'P1 · UNUSUAL MOTION' : 'P1 · BODY TRACK';
  document.querySelector('#motion-status').textContent = movementAlert ? 'DISTRESS CUE · P1' : 'P1 MOTION';
  document.querySelector('#motion-detail').textContent = movementAlert ? 'Unusual movement · caregiver check-in' : 'Tracking body · check-in ready';
});

window.setInterval(() => {
  const accel = (0.01 + Math.random() * 0.04).toFixed(2);
  const gyro = (0.1 + Math.random() * 1.2).toFixed(1);
  const tof = (1.76 + Math.random() * 0.12).toFixed(2);
  document.querySelector('#accel-value').textContent = `${accel} g`;
  document.querySelector('#gyro-value').textContent = `${gyro} deg/s`;
  document.querySelector('#tof-value').textContent = `${tof} m`;
  document.querySelector('#tof-overlay').textContent = `${tof} m`;
}, 1800);
