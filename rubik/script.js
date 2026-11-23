import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const canvas = document.querySelector("#cube-canvas");
const timerEl = document.querySelector("#timer");
const movesEl = document.querySelector("#moves");
const bestEl = document.querySelector("#best");
const toolbar = document.querySelector("#toolbar");
const startOverlay = document.querySelector("#start-overlay");
const solvedOverlay = document.querySelector("#solved-overlay");
const dragGuide = document.querySelector("#drag-guide");
const bestKey = "tolga-cube-best-ms";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(5.5, 4.6, 7.2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 5.6;
controls.maxDistance = 13;
controls.touches.ONE = THREE.TOUCH.ROTATE;
controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

scene.add(new THREE.HemisphereLight(0xd9edff, 0x10131b, 1.5));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
keyLight.position.set(5, 8, 7);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x52cfff, 1.1);
rimLight.position.set(-6, 1, -5);
scene.add(rimLight);

const floor = new THREE.Mesh(new THREE.CircleGeometry(5.8, 64), new THREE.ShadowMaterial({ opacity: 0.22 }));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.95;
floor.receiveShadow = true;
scene.add(floor);

const SIZE = 1;
const STEP = 1.07;
const COLORS = {
  right: { value: 0xd82f45, name: "red" },
  left: { value: 0xff8610, name: "orange" },
  up: { value: 0xf5f7f8, name: "white" },
  down: { value: 0xffd51c, name: "yellow" },
  front: { value: 0x11aa60, name: "green" },
  back: { value: 0x2460df, name: "blue" }
};

const cubeRoot = new THREE.Group();
scene.add(cubeRoot);
const cubies = [];
const hitTargets = [];
const bodyGeometry = new RoundedBoxGeometry(0.96, 0.96, 0.96, 5, 0.09);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x111319, roughness: 0.48, metalness: 0.13 });
const stickerGeometry = new RoundedBoxGeometry(0.78, 0.78, 0.026, 4, 0.06);

function sticker(color, normal) {
  const mesh = new THREE.Mesh(stickerGeometry, new THREE.MeshStandardMaterial({ color: color.value, roughness: 0.3 }));
  mesh.position.copy(normal.clone().multiplyScalar(SIZE / 2 + 0.016));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  mesh.userData.stickerColor = color.name;
  mesh.userData.localNormal = normal.clone();
  mesh.castShadow = false;
  hitTargets.push(mesh);
  return mesh;
}

function buildCube() {
  for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) {
    if (x === 0 && y === 0 && z === 0) continue;
    const cubie = new THREE.Group();
    cubie.position.set(x * STEP, y * STEP, z * STEP);
    cubie.userData.grid = new THREE.Vector3(x, y, z);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial.clone());
    body.castShadow = true;
    body.receiveShadow = true;
    cubie.add(body);
    if (x === 1) cubie.add(sticker(COLORS.right, new THREE.Vector3(1, 0, 0)));
    if (x === -1) cubie.add(sticker(COLORS.left, new THREE.Vector3(-1, 0, 0)));
    if (y === 1) cubie.add(sticker(COLORS.up, new THREE.Vector3(0, 1, 0)));
    if (y === -1) cubie.add(sticker(COLORS.down, new THREE.Vector3(0, -1, 0)));
    if (z === 1) cubie.add(sticker(COLORS.front, new THREE.Vector3(0, 0, 1)));
    if (z === -1) cubie.add(sticker(COLORS.back, new THREE.Vector3(0, 0, -1)));
    cubeRoot.add(cubie);
    cubies.push(cubie);
  }
}
buildCube();

let running = false;
let busy = false;
let moves = 0;
let timerStartedAt = null;
let timerFrame = 0;
let elapsed = 0;
let history = [];
let pointerState = null;

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const tenth = Math.floor((ms % 1000) / 100);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenth}`;
}

function loadBest() {
  const value = Number(localStorage.getItem(bestKey));
  bestEl.textContent = value > 0 ? formatTime(value) : "--:--.-";
}
loadBest();

function drawTimer() {
  if (timerStartedAt !== null) {
    elapsed = performance.now() - timerStartedAt;
    timerEl.textContent = formatTime(elapsed);
    timerFrame = requestAnimationFrame(drawTimer);
  }
}

function startTimer() {
  if (timerStartedAt !== null || !running) return;
  timerStartedAt = performance.now() - elapsed;
  drawTimer();
}

function stopTimer() {
  if (timerStartedAt !== null) elapsed = performance.now() - timerStartedAt;
  timerStartedAt = null;
  cancelAnimationFrame(timerFrame);
  timerEl.textContent = formatTime(elapsed);
}

function resetStats() {
  stopTimer();
  elapsed = 0;
  moves = 0;
  history = [];
  timerEl.textContent = "00:00.0";
  movesEl.textContent = "0";
}

const axisVector = index => [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)][index];
const axisName = index => ["x", "y", "z"][index];

function rotateGrid(vector, axis, direction) {
  const matrix = new THREE.Matrix4().makeRotationAxis(axisVector(axis), direction * Math.PI / 2);
  vector.applyMatrix4(matrix);
  vector.set(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z));
}

function animateLayer(axis, layer, direction, duration = 230) {
  return new Promise(resolve => {
    busy = true;
    controls.enabled = false;
    const selected = cubies.filter(c => Math.round(c.userData.grid.getComponent(axis)) === layer);
    const pivot = new THREE.Group();
    cubeRoot.add(pivot);
    selected.forEach(c => pivot.attach(c));
    const start = performance.now();
    const target = direction * Math.PI / 2;
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      pivot.rotation[axisName(axis)] = target * eased;
      if (p < 1) return requestAnimationFrame(frame);
      pivot.rotation[axisName(axis)] = target;
      pivot.updateMatrixWorld(true);
      selected.forEach(c => {
        cubeRoot.attach(c);
        rotateGrid(c.userData.grid, axis, direction);
        c.position.copy(c.userData.grid).multiplyScalar(STEP);
        c.position.set(Math.round(c.position.x * 1000) / 1000, Math.round(c.position.y * 1000) / 1000, Math.round(c.position.z * 1000) / 1000);
      });
      cubeRoot.remove(pivot);
      busy = false;
      controls.enabled = true;
      resolve();
    }
    requestAnimationFrame(frame);
  });
}

async function makeMove(axis, layer, direction, { user = false, record = true, duration = 230 } = {}) {
  if (busy) return;
  if (user) startTimer();
  await animateLayer(axis, layer, direction, duration);
  if (record) history.push({ axis, layer, direction });
  if (user) {
    moves += 1;
    movesEl.textContent = String(moves);
    if (isSolved()) finishGame();
  }
}

function stickerWorldNormal(mesh) {
  const normal = mesh.userData.localNormal.clone();
  const quaternion = new THREE.Quaternion();
  mesh.parent.getWorldQuaternion(quaternion);
  return normal.applyQuaternion(quaternion);
}

function isSolved() {
  cubeRoot.updateMatrixWorld(true);
  const directions = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1)];
  for (const direction of directions) {
    const colors = [];
    for (const mesh of hitTargets) if (stickerWorldNormal(mesh).dot(direction) > 0.99) colors.push(mesh.userData.stickerColor);
    if (colors.length !== 9 || colors.some(color => color !== colors[0])) return false;
  }
  return true;
}

async function scramble() {
  if (busy) return;
  stopTimer();
  resetStats();
  running = false;
  const sequence = [];
  let previousAxis = -1;
  for (let i = 0; i < 22; i += 1) {
    let axis;
    do axis = Math.floor(Math.random() * 3); while (axis === previousAxis);
    previousAxis = axis;
    sequence.push({ axis, layer: Math.random() < 0.5 ? -1 : 1, direction: Math.random() < 0.5 ? -1 : 1 });
  }
  for (const move of sequence) await makeMove(move.axis, move.layer, move.direction, { record: false, duration: 78 });
  history = [];
  running = true;
}

async function beginGame() {
  startOverlay.classList.add("hidden");
  solvedOverlay.classList.add("hidden");
  toolbar.classList.remove("hidden");
  await scramble();
}

async function undo() {
  if (busy || history.length === 0) return;
  const move = history.pop();
  await makeMove(move.axis, move.layer, -move.direction, { record: false });
  if (moves > 0) moves -= 1;
  movesEl.textContent = String(moves);
}

function finishGame() {
  stopTimer();
  running = false;
  const oldBest = Number(localStorage.getItem(bestKey)) || Infinity;
  if (elapsed < oldBest) localStorage.setItem(bestKey, String(Math.round(elapsed)));
  loadBest();
  document.querySelector("#solved-time").textContent = formatTime(elapsed);
  document.querySelector("#solved-summary").textContent = `${moves} hamle`;
  solvedOverlay.classList.remove("hidden");
  launchConfetti();
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function hitAt(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(hitTargets, false)[0] || null;
}

function worldAxisFromScreen(normal, dx, dy) {
  const candidates = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].filter(v => Math.abs(v.dot(normal)) < 0.1);
  const origin = new THREE.Vector3(0, 0, 0).project(camera);
  let best = null;
  let bestScore = -Infinity;
  for (const candidate of candidates) {
    for (const sign of [-1, 1]) {
      const projected = candidate.clone().multiplyScalar(sign).project(camera).sub(origin);
      const length = Math.hypot(projected.x, projected.y) || 1;
      const score = (projected.x / length) * dx + (-projected.y / length) * dy;
      if (score > bestScore) { bestScore = score; best = candidate.clone().multiplyScalar(sign); }
    }
  }
  return best;
}

function canonicalAxis(vector) {
  const values = [Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z)];
  const index = values.indexOf(Math.max(...values));
  return { index, sign: Math.sign(vector.getComponent(index)) || 1 };
}

canvas.addEventListener("pointerdown", event => {
  if (!running || busy || event.pointerType === "touch" && event.isPrimary === false) return;
  const hit = hitAt(event.clientX, event.clientY);
  if (!hit) return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  const normal = hit.object.userData.localNormal.clone();
  const quaternion = new THREE.Quaternion();
  hit.object.parent.getWorldQuaternion(quaternion);
  normal.applyQuaternion(quaternion);
  normal.set(Math.round(normal.x), Math.round(normal.y), Math.round(normal.z));
  pointerState = { id: event.pointerId, x: event.clientX, y: event.clientY, normal, cubie: hit.object.parent };
  controls.enabled = false;
});

canvas.addEventListener("pointermove", event => {
  if (!pointerState || event.pointerId !== pointerState.id) return;
  const dx = event.clientX - pointerState.x;
  const dy = event.clientY - pointerState.y;
  const length = Math.hypot(dx, dy);
  if (length < 5) { dragGuide.style.display = "none"; return; }
  dragGuide.style.display = "block";
  dragGuide.style.left = `${pointerState.x}px`;
  dragGuide.style.top = `${pointerState.y}px`;
  dragGuide.style.width = `${Math.min(length, 160)}px`;
  dragGuide.style.transform = `translateY(-50%) rotate(${Math.atan2(dy, dx)}rad)`;
});

async function endPointer(event) {
  if (!pointerState || event.pointerId !== pointerState.id) return;
  const state = pointerState;
  pointerState = null;
  dragGuide.style.display = "none";
  controls.enabled = true;
  const dx = event.clientX - state.x;
  const dy = event.clientY - state.y;
  if (Math.hypot(dx, dy) < 18) return;
  const dragAxis = worldAxisFromScreen(state.normal, dx, dy);
  if (!dragAxis) return;
  const rotation = canonicalAxis(state.normal.clone().cross(dragAxis));
  const grid = state.cubie.userData.grid;
  const layer = Math.round(grid.getComponent(rotation.index));
  await makeMove(rotation.index, layer, rotation.sign, { user: true });
}
canvas.addEventListener("pointerup", endPointer);
canvas.addEventListener("pointercancel", event => {
  if (pointerState && event.pointerId === pointerState.id) pointerState = null;
  dragGuide.style.display = "none";
  controls.enabled = true;
});

document.querySelector("#start-button").addEventListener("click", beginGame);
document.querySelector("#again-button").addEventListener("click", beginGame);
document.querySelector("#undo-button").addEventListener("click", undo);
document.querySelector("#scramble-button").addEventListener("click", scramble);

const helpDialog = document.querySelector("#help-dialog");
document.querySelector("#help-button").addEventListener("click", () => helpDialog.showModal());
document.querySelector("#help-close").addEventListener("click", () => helpDialog.close());
document.querySelector("#help-ok").addEventListener("click", () => helpDialog.close());
helpDialog.addEventListener("click", event => {
  const rect = helpDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) helpDialog.close();
});

function launchConfetti() {
  const confetti = document.querySelector("#confetti-canvas");
  const context = confetti.getContext("2d");
  confetti.width = innerWidth * devicePixelRatio;
  confetti.height = innerHeight * devicePixelRatio;
  context.scale(devicePixelRatio, devicePixelRatio);
  const palette = ["#4fd1ff", "#38e19a", "#ffd51c", "#ff8610", "#d82f45", "#fff"];
  const pieces = Array.from({ length: 90 }, () => ({ x: innerWidth / 2, y: innerHeight * 0.42, vx: (Math.random() - 0.5) * 14, vy: -4 - Math.random() * 10, size: 5 + Math.random() * 7, color: palette[Math.floor(Math.random() * palette.length)], spin: Math.random() * 6 }));
  const start = performance.now();
  function frame(now) {
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.spin += 0.16;
      context.save(); context.translate(p.x, p.y); context.rotate(p.spin); context.fillStyle = p.color; context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65); context.restore();
    }
    if (now - start < 3200) requestAnimationFrame(frame); else context.clearRect(0, 0, innerWidth, innerHeight);
  }
  requestAnimationFrame(frame);
}

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
}
addEventListener("resize", resize);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
