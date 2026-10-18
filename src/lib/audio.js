let ctx = null;

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  return ctx;
}

function resumeIfSuspended(ac) {
  if (ac.state === "suspended") void ac.resume();
}

export function blip(freq = 880, dur = 0.06, type = "square", gain = 0.06) {
  try {
    const ac = ensureCtx();
    if (!ac) return;
    resumeIfSuspended(ac);
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + dur);
  } catch {
    return;
  }
}

export function staticBurst(dur = 0.18) {
  try {
    const ac = ensureCtx();
    if (!ac) return;
    resumeIfSuspended(ac);
    const len = Math.floor(ac.sampleRate * dur);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.12;
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(ac.destination);
    src.start();
  } catch {
    return;
  }
}
