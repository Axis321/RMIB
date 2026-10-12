const initial = { pulse: 72, temp: 368, sys: 118, dia: 76, oxygen: 98 };
const inputs = {
  pulse: document.querySelector('#pulse-slider'), temp: document.querySelector('#temp-slider'),
  sys: document.querySelector('#sys-slider'), dia: document.querySelector('#dia-slider'),
  oxygen: document.querySelector('#oxygen-slider')
};
const output = (id, value) => { document.querySelector(id).textContent = value; };

function renderReadings() {
  const pulse = Number(inputs.pulse.value);
  const temp = Number(inputs.temp.value) / 10;
  const sys = Number(inputs.sys.value);
  const dia = Number(inputs.dia.value);
  const oxygen = Number(inputs.oxygen.value);
  output('#pulse-reading', pulse);
  output('#temperature-reading', temp.toFixed(1));
  document.querySelector('#blood-pressure').innerHTML = `${sys}<span>/</span>${dia}`;
  output('#oxygen-reading', oxygen);
  output('#pulse-output', `${pulse} bpm`);
  output('#temp-output', `${temp.toFixed(1)} °C`);
  output('#sys-output', `${sys} mmHg`);
  output('#dia-output', `${dia} mmHg`);
  output('#oxygen-output', `${oxygen}%`);
  document.querySelector('#temp-indicator').style.left = `${Math.max(3, Math.min(94, ((temp - 35) / 5) * 100))}%`;
  const outOfDemoBand = pulse > 100 || pulse < 55 || temp >= 38 || sys >= 140 || dia >= 90 || oxygen < 94;
  document.querySelectorAll('.metric-state').forEach((dot) => { dot.style.color = outOfDemoBand ? '#ddbd83' : '#9fc278'; });
  document.querySelectorAll('.normal-label').forEach((label) => {
    label.textContent = outOfDemoBand ? '● Check value' : '● Demo range';
    label.style.color = outOfDemoBand ? '#ddbd83' : '';
  });
  document.querySelector('#status-copy').textContent = outOfDemoBand ? 'One or more demo values have changed.' : 'Your readings are ready to view.';
}
Object.values(inputs).forEach((input) => input.addEventListener('input', renderReadings));

document.querySelector('#reset-readings').addEventListener('click', () => {
  Object.entries(initial).forEach(([key, value]) => { inputs[key].value = value; });
  renderReadings();
});

document.querySelectorAll('.display-mode').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.display-mode').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const clinical = button.dataset.mode === 'clinical';
  document.querySelector('.monitor-content').classList.toggle('clinical-mode', clinical);
  output('#greeting-label', clinical ? 'CLINICIAN DISPLAY · DEMO PATIENT' : 'PATIENT DISPLAY');
  output('#greeting', clinical ? 'Patient 04 · Bedside' : 'Good morning, Alex');
  output('#status-copy', clinical ? 'Review simulated measurements and signals.' : 'Your readings are ready to view.');
}));

const signalSettings = {
  pulse: { note: 'Waveforms are illustrative. ECG and EEG require compatible clinical equipment and clinician oversight.', css: '' },
  ecg: { note: 'ECG preview selected. This simulated rhythm trace is not a medical reading.', css: 'ecg-alternate' },
  eeg: { note: 'EEG preview selected. Brain activity requires dedicated equipment and clinical interpretation.', css: 'eeg-alternate' }
};
document.querySelectorAll('.signal-button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.signal-button').forEach((item) => {
    item.classList.remove('active');
    item.querySelector('span').textContent = '○ OFF';
  });
  button.classList.add('active');
  button.querySelector('span').textContent = '● ON';
  const setting = signalSettings[button.dataset.signal];
  const wave = document.querySelector('.ecg-wave');
  wave.classList.remove('ecg-alternate', 'eeg-alternate');
  if (setting.css) wave.classList.add(setting.css);
  output('#signal-note', setting.note);
}));

function updateClock() {
  output('#clock', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
}
updateClock();
window.setInterval(updateClock, 30000);
renderReadings();
