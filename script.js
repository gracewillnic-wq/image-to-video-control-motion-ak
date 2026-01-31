const mediaWrap = document.getElementById('mediaWrap');
const img = document.getElementById('heroImg');
const vid = document.getElementById('heroVid');
let usingVideo = false;

// Mouse/device motion parallax
mediaWrap.addEventListener('mousemove', (e) => {
  const r = mediaWrap.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
  const y = (e.clientY - r.top) / r.height - 0.5;
  const tx = x * 18; // tweak intensity
  const ty = y * 12;
  img.style.transform = `translate(${tx}px, ${ty}px) scale(1.03)`;
  vid.style.transform = `translate(${tx / 1.5}px, ${ty / 1.5}px) scale(1.03)`;
});

// For mobile: device orientation (optional, if supported)
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (ev) => {
    const gamma = ev.gamma || 0; // left-right
    const beta = ev.beta || 0;   // front-back
    const tx = (gamma / 90) * 20;
    const ty = (beta / 180) * 12;
    img.style.transform = `translate(${tx}px, ${ty}px) scale(1.03)`;
    vid.style.transform = `translate(${tx / 1.5}px, ${ty / 1.5}px) scale(1.03)`;
  }, true);
}

// Hover / click to switch to video
function showVideo() {
  if (usingVideo) return;
  usingVideo = true;
  img.classList.add('hidden');
  vid.classList.remove('hidden');
  vid.classList.add('visible');
  vid.play().catch(() => {/* autoplay may be blocked; muted should allow it */});
}
function hideVideo() {
  if (!usingVideo) return;
  usingVideo = false;
  vid.pause();
  vid.classList.remove('visible');
  vid.classList.add('hidden');
  img.classList.remove('hidden');
}

// mouse enter/leave
mediaWrap.addEventListener('pointerenter', showVideo);
mediaWrap.addEventListener('pointerleave', hideVideo);

// for touch devices: toggle on tap
mediaWrap.addEventListener('click', () => {
  if (usingVideo) hideVideo(); else showVideo();
});
