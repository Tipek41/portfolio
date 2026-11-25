const PIECE_IMAGES = {
  wk: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23fff' stroke-linecap='butt' stroke-linejoin='miter' d='M15 12 L15 9 L16.5 9 C16.5 6.5 18.5 6.5 18.5 9 L20 9 L21.5 9 C21.5 6.5 23.5 6.5 23.5 9 L25 9 L26.5 9 C26.5 6.5 28.5 6.5 28.5 9 L30 9 L30 12 Z'/%3E%3Cpath fill='%23fff' stroke='%23000' stroke-linecap='butt' stroke-linejoin='miter' d='M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5'/%3E%3Cpath fill='%23fff' d='M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-5.5-13-2.5-16 3V27v-3.5c-3-5.5-12-8.5-16-3-3 6 5 10 5 10V37z'/%3E%3Cpath d='M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0'/%3E%3C/g%3E%3C/svg%3E",
  wq: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23fff' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M8 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M21.5 7a2 2 0 1 0 4 0 2 2 0 1 0-4 0M35 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M11 30.5h28l-3-12.5h-22z'/%3E%3Cpath stroke-linecap='butt' d='M11 30.5c0 5.5 6.5 6.5 14 6.5s14-1 14-6.5'/%3E%3Cpath d='M11.8 18c5.4-3 15.7-3 21.4 0M10 23c6.5-2.5 17.5-2.5 25 0'/%3E%3C/g%3E%3C/svg%3E",
  wr: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23fff' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath stroke-linejoin='miter' d='M9 39.5h27v-3H9v3zM12 36.5v-4h21v4zM11 14V9h4v2h5V9h5v2h5V9h4v5'/%3E%3Cpath d='M34 14l-3 22.5H14L11 14'/%3E%3Cpath stroke-linejoin='miter' d='M31 14h-5.5l-1-3h-4l-1 3H14M11 14h23'/%3E%3C/g%3E%3C/svg%3E",
  wb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23fff' d='M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z'/%3E%3Cpath fill='%23fff' d='M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4.5-2.5-4.5-5.5 1.5-6.5-2.5-7.5-3.5-1 1-2 5-7.5 3.5C12.5 25.5 10 27.5 10 30c0 0-.5.5 0 2z'/%3E%3Cpath fill='%23fff' d='M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z'/%3E%3Cpath d='M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5'/%3E%3C/g%3E%3C/svg%3E",
  wn: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23fff' d='M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21'/%3E%3Cpath fill='%23fff' d='M24 18c.38 2.91-5.55 7.37-8 9-3 2-6 .82-6.5-1.5-.66-2.97 3.42-7.03 6-9 2.91-2.25 7.13-1.65 8.5 1.5z'/%3E%3Cpath fill='%23fff' stroke-linejoin='miter' d='M9.5 25.5a.5.5 0 0 1-.5-1c0-1.5 3-5.4 7-5.4 1.5 0 2.5.5 3.5 1.5L24 18c-1.5-1-2.5-2-5.5-2-5 0-10 4.5-10 10.5a.5.5 0 0 1-1 0z'/%3E%3Cpath d='M24 18c.5.5 3.5 1.5 5 0M9.5 25.5C11 28 13.5 28 15 27s2-2.5 2-2.5'/%3E%3C/g%3E%3C/svg%3E",
  wp: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cpath fill='%23fff' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E",
  bk: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23000' stroke-linecap='butt' stroke-linejoin='miter' d='M15 12 L15 9 L16.5 9 C16.5 6.5 18.5 6.5 18.5 9 L20 9 L21.5 9 C21.5 6.5 23.5 6.5 23.5 9 L25 9 L26.5 9 C26.5 6.5 28.5 6.5 28.5 9 L30 9 L30 12 Z'/%3E%3Cpath fill='%23000' stroke='%23000' stroke-linecap='butt' stroke-linejoin='miter' d='M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5'/%3E%3Cpath fill='%23000' d='M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-5.5-13-2.5-16 3V27v-3.5c-3-5.5-12-8.5-16-3-3 6 5 10 5 10V37z'/%3E%3Cpath stroke='%23fff' d='M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0'/%3E%3C/g%3E%3C/svg%3E",
  bq: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23000' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M8 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M21.5 7a2 2 0 1 0 4 0 2 2 0 1 0-4 0M35 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M11 30.5h28l-3-12.5h-22z'/%3E%3Cpath stroke-linecap='butt' d='M11 30.5c0 5.5 6.5 6.5 14 6.5s14-1 14-6.5'/%3E%3Cpath stroke='%23fff' d='M11.8 18c5.4-3 15.7-3 21.4 0M10 23c6.5-2.5 17.5-2.5 25 0'/%3E%3C/g%3E%3C/svg%3E",
  br: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='%23000' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath stroke-linejoin='miter' d='M9 39.5h27v-3H9v3zM12 36.5v-4h21v4zM11 14V9h4v2h5V9h5v2h5V9h4v5'/%3E%3Cpath d='M34 14l-3 22.5H14L11 14'/%3E%3Cpath stroke-linejoin='miter' d='M31 14h-5.5l-1-3h-4l-1 3H14M11 14h23'/%3E%3C/g%3E%3C/svg%3E",
  bb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23000' d='M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z'/%3E%3Cpath fill='%23000' d='M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4.5-2.5-4.5-5.5 1.5-6.5-2.5-7.5-3.5-1 1-2 5-7.5 3.5C12.5 25.5 10 27.5 10 30c0 0-.5.5 0 2z'/%3E%3Cpath fill='%23000' d='M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z'/%3E%3Cpath stroke='%23fff' d='M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5'/%3E%3C/g%3E%3C/svg%3E",
  bn: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath fill='%23000' d='M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21'/%3E%3Cpath fill='%23000' d='M24 18c.38 2.91-5.55 7.37-8 9-3 2-6 .82-6.5-1.5-.66-2.97 3.42-7.03 6-9 2.91-2.25 7.13-1.65 8.5 1.5z'/%3E%3Cpath fill='%23000' stroke-linejoin='miter' d='M9.5 25.5a.5.5 0 0 1-.5-1c0-1.5 3-5.4 7-5.4 1.5 0 2.5.5 3.5 1.5L24 18c-1.5-1-2.5-2-5.5-2-5 0-10 4.5-10 10.5a.5.5 0 0 1-1 0z'/%3E%3Cpath stroke='%23fff' d='M24 18c.5.5 3.5 1.5 5 0M9.5 25.5C11 28 13.5 28 15 27s2-2.5 2-2.5'/%3E%3C/g%3E%3C/svg%3E",
  bp: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45 45'%3E%3Cpath fill='%23000' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E",
};

const FILES = "abcdefgh";
const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const PIECE_VALUE = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

let board = [];
let turn = "w";
let selected = null;
let lastMove = null;
let moveHistory = [];
let castling = { w: { k: true, q: true }, b: { k: true, q: true } };
let enPassant = null;
let halfmoveClock = 0;
let fullmoveNumber = 1;
let vsBot = false;
let botDifficulty = "medium";
let gameOver = false;
let gameResult = null;
let capturedBy = { w: [], b: [] };
let positionHistory = [];
let soundEnabled = true;
let pendingPromotion = null;
let darkMode = true;
let boardFlipped = false;

/** Convert a model row to the visual row after board flip. */
function viewR(r) {
  return boardFlipped ? 7 - r : r;
}
/** Convert a model column to the visual column after board flip. */
function viewC(c) {
  return boardFlipped ? 7 - c : c;
}
/** Convert a visual row back to the internal model row. */
function modelR(r) {
  return boardFlipped ? 7 - r : r;
}
/** Convert a visual column back to the internal model column. */
function modelC(c) {
  return boardFlipped ? 7 - c : c;
}

/**
 * Load a FEN string into the internal board state.
 * Validates structure and king count so invalid positions never start a game.
 */
function parseFen(fen) {
  if (typeof fen !== "string") return;
  const parts = fen.trim().split(/\s+/);
  if (parts.length < 6) return;
  const [placement, active, castlingRights, ep, half, full] = parts;
  if (!/^[1-8PNBRQKpnbrqk]+\/([1-8PNBRQKpnbrqk]+\/){6}[1-8PNBRQKpnbrqk]+$/.test(placement)) return;
  if (active !== "w" && active !== "b") return;
  if (!/^(-|K?Q?k?q?)$/.test(castlingRights)) return;
  if (ep !== "-" && !/^[a-h][36]$/.test(ep)) return;
  board = [];
  const rows = placement.split("/");
  if (rows.length !== 8) return;
  for (let r = 0; r < 8; r++) {
    const row = [];
    for (const ch of rows[r]) {
      if (/\d/.test(ch)) {
        for (let i = 0; i < parseInt(ch, 10); i++) row.push(null);
      } else {
        row.push({ type: ch.toLowerCase(), color: ch === ch.toUpperCase() ? "w" : "b" });
      }
    }
    if (row.length !== 8) return;
    board.push(row);
  }
  turn = active;
  castling = {
    w: { k: castlingRights.includes("K"), q: castlingRights.includes("Q") },
    b: { k: castlingRights.includes("k"), q: castlingRights.includes("q") },
  };
  enPassant = ep === "-" ? null : algebraicToRc(ep);
  // Validate exactly one king per side
  let whiteKings = 0, blackKings = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === "k") {
        if (p.color === "w") whiteKings++;
        else blackKings++;
      }
    }
  }
  if (whiteKings !== 1 || blackKings !== 1) {
    board = [];
    return;
  }
  halfmoveClock = Number.isFinite(parseInt(half, 10)) ? parseInt(half, 10) : 0;
  fullmoveNumber = Number.isFinite(parseInt(full, 10)) ? parseInt(full, 10) : 1;
  positionHistory = [];
  selected = null;
  lastMove = null;
  pendingPromotion = null;
  gameOver = false;
  gameResult = null;
  moveHistory = [];
  capturedBy = { w: [], b: [] };
  recordPosition();
  return getPositionKey();
}

/**
 * Convert algebraic notation (e.g. "e4") to internal row/column.
 * Keeps all move notation and FEN parsing in one place.
 */
function algebraicToRc(alg) {
  const c = FILES.indexOf(alg[0]);
  const r = 8 - parseInt(alg[1], 10);
  return { r, c };
}

/**
 * Convert internal row/column back to algebraic notation.
 * Used for FEN, SAN, and square labels.
 */
function rcToAlgebraic(r, c) {
  return FILES[c] + (8 - r);
}

/**
 * Build a FEN-like position key (without move counters) for repetition detection.
 */
function getPositionKey() {
  let placement = "";
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) {
        empty++;
      } else {
        if (empty) placement += empty;
        empty = 0;
        placement += p.color === "w" ? p.type.toUpperCase() : p.type;
      }
    }
    if (empty) placement += empty;
    if (r < 7) placement += "/";
  }
  const castlingStr =
    (castling.w.k ? "K" : "") +
    (castling.w.q ? "Q" : "") +
    (castling.b.k ? "k" : "") +
    (castling.b.q ? "q" : "") || "-";
  const epStr = enPassant ? rcToAlgebraic(enPassant.r, enPassant.c) : "-";
  return `${placement} ${turn} ${castlingStr} ${epStr}`;
}

/** Record the current position so we can detect threefold repetition later. */
function recordPosition() {
  const key = getPositionKey();
  positionHistory.push(key);
}

/** Check whether the same position has occurred three times (draw). */
function isThreefoldRepetition() {
  const key = getPositionKey();
  let count = 0;
  for (const k of positionHistory) {
    if (k === key) count++;
    if (count >= 3) return true;
  }
  return false;
}

/** Check the 50-move rule (100 half-moves without pawn move or capture). */
function isFiftyMoveRule() {
  return halfmoveClock >= 100;
}

/**
 * Determine whether the remaining material is theoretically insufficient to force mate.
 */
function isInsufficientMaterial() {
  const pieces = { w: [], b: [] };
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type !== "k") pieces[p.color].push({ type: p.type, r, c });
    }
  }
  for (const color of ["w", "b"]) {
    const hasPawn = pieces[color].some((p) => p.type === "p");
    const hasRook = pieces[color].some((p) => p.type === "r");
    const hasQueen = pieces[color].some((p) => p.type === "q");
    if (hasPawn || hasRook || hasQueen) return false;
  }
  const whiteMinor = pieces.w.filter((p) => p.type === "n" || p.type === "b");
  const blackMinor = pieces.b.filter((p) => p.type === "n" || p.type === "b");
  const totalMinor = whiteMinor.length + blackMinor.length;
  if (totalMinor === 0) return true;
  if (totalMinor === 1) return true;
  // K+B+B (same color) vs K — cannot force mate
  if (whiteMinor.length === 2 && blackMinor.length === 0) {
    const wBishops = whiteMinor.filter((p) => p.type === "b");
    if (wBishops.length === 2 && (wBishops[0].r + wBishops[0].c) % 2 === (wBishops[1].r + wBishops[1].c) % 2) return true;
  }
  if (blackMinor.length === 2 && whiteMinor.length === 0) {
    const bBishops = blackMinor.filter((p) => p.type === "b");
    if (bBishops.length === 2 && (bBishops[0].r + bBishops[0].c) % 2 === (bBishops[1].r + bBishops[1].c) % 2) return true;
  }
  if (whiteMinor.length === 1 && blackMinor.length === 1) {
    const wB = whiteMinor.find((p) => p.type === "b");
    const bB = blackMinor.find((p) => p.type === "b");
    if (wB && bB) {
      const wLight = (wB.r + wB.c) % 2 === 0;
      const bLight = (bB.r + bB.c) % 2 === 0;
      if (wLight === bLight) return true;
    }
    // K+N vs K+N — mate cannot be forced with a single knight each
    const wN = whiteMinor.find((p) => p.type === "n");
    const bN = blackMinor.find((p) => p.type === "n");
    if (wN && bN) return true;
  }
  return false;
}

/**
 * Render the entire UI: board, highlights, status, player bars, captured pieces,
 * move history, FEN, and promotion dialog. Guarded for test environments without DOM.
 */
function render() {
  if (typeof document === "undefined") return;
  const boardEl = document.getElementById("board");
  if (!boardEl) return;
  boardEl.innerHTML = "";

  const legalTargets = selected && !pendingPromotion ? new Set(getLegalTargets(selected).map(t => `${t.r},${t.c}`)) : new Set();

  for (let vr = 0; vr < 8; vr++) {
    for (let vc = 0; vc < 8; vc++) {
      const r = modelR(vr);
      const c = modelC(vc);
      const sq = document.createElement("div");
      const isLight = (r + c) % 2 === 0;
      sq.className = `square ${isLight ? "light" : "dark"}`;
      sq.dataset.r = r;
      sq.dataset.c = c;

      if (selected && selected.r === r && selected.c === c) {
        sq.classList.add("selected");
      }
      if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) {
        sq.classList.add("last-move");
      }

      const piece = board[r][c];
      if (piece) {
        const img = document.createElement("img");
        img.className = "piece";
        img.src = PIECE_IMAGES[piece.color + piece.type];
        img.alt = piece.color + piece.type;
        img.draggable = false;
        sq.appendChild(img);
      }

      const isTarget = legalTargets.has(`${r},${c}`);
      if (isTarget) {
        const targetPiece = board[r][c];
        const marker = document.createElement("div");
        marker.className = targetPiece ? "move-marker capture" : "move-marker";
        sq.appendChild(marker);
      }

      if (vc === 7) {
        const rank = document.createElement("span");
        rank.className = "coord rank";
        rank.textContent = boardFlipped ? vr + 1 : 8 - r;
        rank.style.color = isLight ? "var(--dark-square)" : "var(--light-square)";
        sq.appendChild(rank);
      }
      if (vr === 7) {
        const file = document.createElement("span");
        file.className = "coord file";
        file.textContent = boardFlipped ? FILES[7 - vc] : FILES[c];
        file.style.color = isLight ? "var(--dark-square)" : "var(--light-square)";
        sq.appendChild(file);
      }

      sq.setAttribute("role", "gridcell");
      sq.setAttribute("aria-label", `${FILES[c]}${8 - r}`);
      sq.addEventListener("click", () => onSquareClick(r, c));
      boardEl.appendChild(sq);
    }
  }

  highlightCheck();
  updateStatus();
  updatePlayerBars();
  renderCaptured();
  renderMoveHistory();
  renderFen();
  renderPromotionDialog();
}

/** Update player-bar visuals to show which side is currently to move. */
function updatePlayerBars() {
  const whiteActive = turn === "w";
  const wBar = document.querySelector(".white-bar");
  const bBar = document.querySelector(".black-bar");
  if (wBar) wBar.classList.toggle("active", whiteActive);
  if (bBar) bBar.classList.toggle("active", !whiteActive);
  const whiteBadge = document.getElementById("whiteTurn");
  const blackBadge = document.getElementById("blackTurn");
  if (whiteBadge) whiteBadge.textContent = whiteActive ? "Sıra sende" : "";
  if (blackBadge) blackBadge.textContent = !whiteActive ? "Sıra sende" : "";
}

/** Render the captured-piece pools for both sides. */
function renderCaptured() {
  const whiteEl = document.getElementById("whiteCaptured");
  const blackEl = document.getElementById("blackCaptured");

  if (whiteEl) {
    whiteEl.innerHTML = "";
    for (const type of capturedBy.w) {
      const img = document.createElement("img");
      img.src = PIECE_IMAGES["w" + type];
      img.alt = "Captured white " + type;
      whiteEl.appendChild(img);
    }
  }
  if (blackEl) {
    blackEl.innerHTML = "";
    for (const type of capturedBy.b) {
      const img = document.createElement("img");
      img.src = PIECE_IMAGES["b" + type];
      img.alt = "Captured black " + type;
      blackEl.appendChild(img);
    }
  }
}

/**
 * Find every square the piece at `from` can legally move to.
 * Used to draw move hints and validate user clicks.
 */
function getLegalTargets(from) {
  const targets = [];
  for (let tr = 0; tr < 8; tr++) {
    for (let tc = 0; tc < 8; tc++) {
      if (canMoveTo(from, { r: tr, c: tc }) && isLegalMove({ from, to: { r: tr, c: tc } })) {
        targets.push({ r: tr, c: tc });
      }
    }
  }
  return targets;
}

/**
 * Update the status text and trigger end-of-game handling when no legal moves
 * or a draw condition is reached.
 */
function updateStatus() {
  const status = document.getElementById("status");
  if (!status) return;
  if (gameOver && gameResult) {
    status.textContent = gameResult;
    showGameOverModal();
    return;
  }
  const inCheck = isKingInCheck(turn);
  const hasMoves = hasAnyLegalMove(turn);

  if (!hasMoves) {
    gameResult = inCheck ? `Checkmate! ${turn === "w" ? "Black" : "White"} wins.` : "Stalemate! Draw.";
    status.textContent = gameResult;
    gameOver = true;
    playSound("gameEnd");
    showGameOverModal();
  } else if (isThreefoldRepetition()) {
    gameResult = "Draw by repetition.";
    status.textContent = gameResult;
    gameOver = true;
    playSound("gameEnd");
    showGameOverModal();
  } else if (isFiftyMoveRule()) {
    gameResult = "Draw by 50-move rule.";
    status.textContent = gameResult;
    gameOver = true;
    playSound("gameEnd");
    showGameOverModal();
  } else if (isInsufficientMaterial()) {
    gameResult = "Draw by insufficient material.";
    status.textContent = gameResult;
    gameOver = true;
    playSound("gameEnd");
    showGameOverModal();
  } else {
    status.textContent = `${turn === "w" ? "White" : "Black"} to move${inCheck ? " (check)" : ""}`;
    if (!gameOver) {
      gameResult = null;
      hideGameOverModal();
    }
  }
}

/** Display the game-over modal with the correct winner, reason, and icon. */
function showGameOverModal() {
  if (typeof document === "undefined") return;
  const modal = document.getElementById("gameOverModal");
  const title = document.getElementById("modalTitle");
  const subtitle = document.getElementById("modalSubtitle");
  const icon = document.getElementById("modalIcon");
  if (!modal || !title || !subtitle || !icon) return;
  if (!gameResult) return;

  let winner = null;
  let reason = "";

  if (gameResult.startsWith("Checkmate")) {
    winner = gameResult.includes("White") ? "White" : "Black";
    reason = "Checkmate";
  } else if (gameResult.startsWith("Stalemate")) {
    winner = null;
    reason = "Stalemate";
  } else if (gameResult.includes("repetition")) {
    winner = null;
    reason = "Threefold repetition";
  } else if (gameResult.includes("50-move")) {
    winner = null;
    reason = "50-move rule";
  } else if (gameResult.includes("insufficient")) {
    winner = null;
    reason = "Insufficient material";
  } else if (gameResult.includes("resignation")) {
    winner = gameResult.includes("White") ? "White" : "Black";
    reason = "Resignation";
  }

  if (winner) {
    title.textContent = `${winner} wins!`;
    subtitle.textContent = reason;
    icon.textContent = winner === "White" ? "♔" : "♚";
  } else {
    title.textContent = "Draw!";
    subtitle.textContent = reason || "Game over";
    icon.textContent = "🤝";
  }

  modal.classList.remove("hidden");
}

/** Hide the game-over modal, e.g. when starting a new game or undoing. */
function hideGameOverModal() {
  if (typeof document === "undefined") return;
  const modal = document.getElementById("gameOverModal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Handle a click on any board square: select pieces, make moves, or trigger promotion.
 * Prevents interaction while the bot is thinking or a promotion is pending.
 */
function onSquareClick(r, c) {
  if (gameOver || pendingPromotion) return;
  if (vsBot && turn === "b") return;

  const piece = board[r][c];

  if (selected) {
    const move = { from: selected, to: { r, c } };
    if (isLegalMove(move)) {
      const movingPiece = board[selected.r][selected.c];
      if (movingPiece.type === "p" && (r === 0 || r === 7)) {
        pendingPromotion = move;
        render();
        return;
      }
      executeMove(move);
      selected = null;
      render();
      if (vsBot && !gameOver) setTimeout(botMove, 400);
      return;
    }
  }

  if (piece && piece.color === turn) {
    selected = { r, c };
    render();
  } else {
    selected = null;
    render();
  }
}

/**
 * Apply a move to the game state and play the appropriate sound.
 * Separated from UI logic so bot and hint paths can reuse it.
 */
function executeMove(move, promotionType = "q") {
  const piece = board[move.from.r][move.from.c];
  const target = board[move.to.r][move.to.c];
  const wasCapture = target || (piece.type === "p" && enPassant && enPassant.r === move.to.r && enPassant.c === move.to.c);

  makeMove(move, promotionType);
  playSound(wasCapture ? "capture" : "move");
}

/** Build and display the promotion piece selector when a pawn reaches the back rank. */
function renderPromotionDialog() {
  const existing = document.querySelector(".promotion-dialog");
  if (existing) existing.remove();
  if (!pendingPromotion) return;

  const color = turn;
  const choices = ["q", "r", "b", "n"];
  const dialog = document.createElement("div");
  dialog.className = "promotion-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Choose promotion piece");
  for (const type of choices) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "promotion-piece";
    btn.setAttribute("aria-label", `Promote to ${type}`);
    const img = document.createElement("img");
    img.src = PIECE_IMAGES[color + type];
    img.alt = color + type;
    btn.appendChild(img);
    btn.addEventListener("click", () => {
      const move = pendingPromotion;
      pendingPromotion = null;
      executeMove(move, type);
      render();
      if (vsBot && !gameOver) setTimeout(botMove, 400);
    });
    dialog.appendChild(btn);
  }
  document.body.appendChild(dialog);
}

function cancelPromotion() {
  if (!pendingPromotion) return;
  pendingPromotion = null;
  selected = null;
  render();
}

function isInside(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function pieceAt(r, c) {
  return isInside(r, c) ? board[r][c] : null;
}

function isAttacked(r, c, byColor) {
  if (!isInside(r, c)) return false;
  // Knight attacks
  const knightOffsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  for (const [dr, dc] of knightOffsets) {
    const sr = r + dr, sc = c + dc;
    if (isInside(sr, sc)) {
      const p = board[sr][sc];
      if (p && p.color === byColor && p.type === "n") return true;
    }
  }
  // Pawn attacks
  const pawnDir = byColor === "w" ? 1 : -1;
  for (const dc of [-1, 1]) {
    const sr = r + pawnDir, sc = c + dc;
    if (isInside(sr, sc)) {
      const p = board[sr][sc];
      if (p && p.color === byColor && p.type === "p") return true;
    }
  }
  // King attacks
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const sr = r + dr, sc = c + dc;
      if (isInside(sr, sc)) {
        const p = board[sr][sc];
        if (p && p.color === byColor && p.type === "k") return true;
      }
    }
  }
  // Sliding attacks (bishop, rook, queen)
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (const [dr, dc] of dirs) {
    let sr = r + dr, sc = c + dc;
    while (isInside(sr, sc)) {
      const p = board[sr][sc];
      if (p && p.color === byColor) {
        if (p.type === "q") return true;
        if (p.type === "b" && dr !== 0 && dc !== 0) return true;
        if (p.type === "r" && (dr === 0 || dc === 0)) return true;
        break;
      } else if (p) {
        break;
      }
      sr += dr;
      sc += dc;
    }
  }
  return false;
}



// O(1) single-target move validation — avoids generating all 64 pseudo-legal moves
function canMoveTo(from, to) {
  const piece = board[from.r][from.c];
  if (!piece) return false;
  const target = board[to.r][to.c];
  if (target && target.color === piece.color) return false;
  const dr = to.r - from.r;
  const dc = to.c - from.c;
  if (dr === 0 && dc === 0) return false;

  switch (piece.type) {
    case "p": {
      const dir = piece.color === "w" ? -1 : 1;
      const startRow = piece.color === "w" ? 6 : 1;
      if (dc === 0 && dr === dir && !target) return true;
      if (dc === 0 && dr === 2 * dir && from.r === startRow && !target && !board[from.r + dir][from.c]) return true;
      if (Math.abs(dc) === 1 && dr === dir) {
        if (target) return true;
        if (enPassant && enPassant.r === to.r && enPassant.c === to.c) return true;
      }
      return false;
    }
    case "n":
      return Math.abs(dr) * Math.abs(dc) === 2;
    case "b":
    case "r":
    case "q": {
      const absDr = Math.abs(dr);
      const absDc = Math.abs(dc);
      if (piece.type === "b" && absDr !== absDc) return false;
      if (piece.type === "r" && dr !== 0 && dc !== 0) return false;
      if (piece.type === "q" && !(dr === 0 || dc === 0 || absDr === absDc)) return false;
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;
      let cr = from.r + stepR;
      let cc = from.c + stepC;
      while (cr !== to.r || cc !== to.c) {
        if (board[cr][cc]) return false;
        cr += stepR;
        cc += stepC;
      }
      return true;
    }
    case "k": {
      if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1) return true;
      if (from.r === to.r && Math.abs(dc) === 2 && !isKingInCheck(piece.color)) {
        const side = dc > 0 ? "k" : "q";
        if (castling[piece.color][side]) {
          const rookC = side === "k" ? 7 : 0;
          const rook = pieceAt(from.r, rookC);
          if (rook && rook.type === "r" && rook.color === piece.color) {
            const step = side === "k" ? 1 : -1;
            let clear = true;
            for (let i = from.c + step; i !== rookC; i += step) {
              if (pieceAt(from.r, i)) clear = false;
            }
            if (clear) {
              const mid = { r: from.r, c: from.c + step };
              const end = { r: from.r, c: from.c + 2 * step };
              const enemy = piece.color === "w" ? "b" : "w";
              if (!isAttacked(mid.r, mid.c, enemy) && !isAttacked(end.r, end.c, enemy)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }
  }
  return false;
}

function isLegalMove(move) {
  const piece = board[move.from.r][move.from.c];
  if (!piece) return false;
  if (!canMoveTo(move.from, move.to)) return false;
  // Work on a copy so we don't mutate the caller's move object
  const testMove = { from: move.from, to: move.to };
  // Set en passant flag so applyMove handles the capture correctly
  if (piece.type === "p" && enPassant && enPassant.r === move.to.r && enPassant.c === move.to.c) {
    testMove.enPassant = enPassant;
  }

  const copy = cloneBoardState(board, turn);
  applyMove(copy, testMove);
  const king = findKing(copy.board, piece.color);
  if (!king) return false;
  if (isAttackedOnBoard(copy.board, king.r, king.c, piece.color === "w" ? "b" : "w")) return false;

  return true;
}

function getMoveNotation(move, promotionType) {
  const piece = board[move.from.r][move.from.c];
  if (!piece) return "?";
  const target = board[move.to.r][move.to.c];
  const isCapture = target || (piece.type === "p" && enPassant && enPassant.r === move.to.r && enPassant.c === move.to.c);
  const toSq = rcToAlgebraic(move.to.r, move.to.c);

  if (piece.type === "k" && Math.abs(move.to.c - move.from.c) === 2) {
    return move.to.c > move.from.c ? "O-O" : "O-O-O";
  }

  let notation = "";
  if (piece.type !== "p") {
    notation += piece.type.toUpperCase();
    // Disambiguation: check if another piece of the same type can also reach this square
    const allMoves = [];
    for (let sr = 0; sr < 8; sr++) {
      for (let sc = 0; sc < 8; sc++) {
        const p = board[sr][sc];
        if (!p || p.color !== piece.color || p.type !== piece.type) continue;
        if (sr === move.from.r && sc === move.from.c) continue;
        if (canMoveTo({ r: sr, c: sc }, move.to)) {
          const testMove = { from: { r: sr, c: sc }, to: move.to };
          if (isLegalMove(testMove)) allMoves.push({ r: sr, c: sc });
        }
      }
    }
    if (allMoves.length > 0) {
      const sameFile = allMoves.some((m) => m.c === move.from.c);
      const sameRank = allMoves.some((m) => m.r === move.from.r);
      if (!sameFile) {
        notation += FILES[move.from.c];
      } else if (!sameRank) {
        notation += (8 - move.from.r);
      } else {
        notation += FILES[move.from.c] + (8 - move.from.r);
      }
    }
  }
  if (isCapture) {
    if (piece.type === "p") notation += FILES[move.from.c];
    notation += "x";
  }
  notation += toSq;
  if (piece.type === "p" && (move.to.r === 0 || move.to.r === 7)) {
    notation += "=" + promotionType.toUpperCase();
  }

  const nextTurn = turn === "w" ? "b" : "w";
  const testState = cloneBoardState(board, turn);
  testState.castling = cloneCastling(castling);
  testState.enPassant = enPassant;
  applyMove(testState, move, promotionType);
  const king = findKing(testState.board, nextTurn);
  const inCheck = king && isAttackedOnBoard(testState.board, king.r, king.c, turn);
  const hasMoves = hasAnyLegalMoveOnBoard(testState.board, nextTurn, testState.castling, testState.enPassant);
  if (inCheck) notation += hasMoves ? "+" : "#";

  return notation;
}

function hasAnyLegalMoveOnBoard(b, color, rights, ep) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (!p || p.color !== color) continue;
      const pseudo = getPseudoLegalMovesOnBoard(b, { r, c }, ep, rights);
      for (const m of pseudo) {
        const copy = cloneBoardState(b, color, rights, ep);
        applyMove(copy, m);
        const king = findKing(copy.board, color);
        if (king && !isAttackedOnBoard(copy.board, king.r, king.c, color === "w" ? "b" : "w")) {
          return true;
        }
      }
    }
  }
  return false;
}

function makeMove(move, promotionType = "q") {
  const notation = getMoveNotation(move, promotionType);
  const state = {
    board: cloneBoard(),
    turn,
    castling: cloneCastling(castling),
    enPassant,
    lastMove,
    capturedBy: { w: [...capturedBy.w], b: [...capturedBy.b] },
    halfmoveClock,
    fullmoveNumber,
    notation,
  };
  moveHistory.push(state);

  const piece = board[move.from.r][move.from.c];
  const target = board[move.to.r][move.to.c];

  if (target) capturedBy[piece.color].push(target.type);

  if (piece.type === "k" && Math.abs(move.to.c - move.from.c) === 2) {
    const side = move.to.c > move.from.c ? "k" : "q";
    const rookFrom = side === "k" ? 7 : 0;
    const rookTo = side === "k" ? move.to.c - 1 : move.to.c + 1;
    board[move.to.r][rookTo] = board[move.from.r][rookFrom];
    board[move.from.r][rookFrom] = null;
  }

  if (piece.type === "p" && enPassant && enPassant.r === move.to.r && enPassant.c === move.to.c) {
    const epPiece = board[move.from.r][move.to.c];
    if (epPiece) capturedBy[piece.color].push(epPiece.type);
    board[move.from.r][move.to.c] = null;
  }

  board[move.to.r][move.to.c] = piece;
  board[move.from.r][move.from.c] = null;

  if (piece.type === "p" && (move.to.r === 0 || move.to.r === 7)) {
    board[move.to.r][move.to.c] = { type: promotionType, color: piece.color };
  }

  const dir = piece.color === "w" ? -1 : 1;
  if (piece.type === "p" && move.to.r - move.from.r === 2 * dir) {
    enPassant = { r: move.from.r + dir, c: move.from.c };
  } else {
    enPassant = null;
  }

  if (piece.type === "k") {
    castling[piece.color].k = false;
    castling[piece.color].q = false;
  }
  if (piece.type === "r") {
    const homeRow = piece.color === "w" ? 7 : 0;
    if (move.from.r === homeRow && move.from.c === 0) castling[piece.color].q = false;
    if (move.from.r === homeRow && move.from.c === 7) castling[piece.color].k = false;
  }
  if (target && target.type === "r") {
    const targetHomeRow = target.color === "w" ? 7 : 0;
    if (move.to.r === targetHomeRow && move.to.c === 0) castling[target.color].q = false;
    if (move.to.r === targetHomeRow && move.to.c === 7) castling[target.color].k = false;
  }

  if (piece.type === "p" || target) {
    halfmoveClock = 0;
  } else {
    halfmoveClock++;
  }

  if (turn === "b") fullmoveNumber++;

  lastMove = { from: { r: move.from.r, c: move.from.c }, to: { r: move.to.r, c: move.to.c } };
  turn = turn === "w" ? "b" : "w";
  recordPosition();
}

function cloneBoard() {
  return board.map((row) => row.map((p) => (p ? { ...p } : null)));
}

function cloneCastling(c) {
  return { w: { k: c.w.k, q: c.w.q }, b: { k: c.b.k, q: c.b.q } };
}

function cloneBoardState(b, t, rights, ep) {
  return {
    board: b.map((row) => row.map((p) => (p ? { ...p } : null))),
    turn: t,
    castling: cloneCastling(rights || castling),
    enPassant: ep !== undefined ? ep : enPassant,
  };
}

function applyMove(state, move, promotionType = "q") {
  const b = state.board;
  const piece = b[move.from.r][move.from.c];
  if (!piece) return;
  const target = b[move.to.r][move.to.c];

  if (piece.type === "k" && Math.abs(move.to.c - move.from.c) === 2) {
    const side = move.to.c > move.from.c ? "k" : "q";
    const rookFrom = side === "k" ? 7 : 0;
    const rookTo = side === "k" ? move.to.c - 1 : move.to.c + 1;
    b[move.to.r][rookTo] = b[move.from.r][rookFrom];
    b[move.from.r][rookFrom] = null;
  }

  if (piece.type === "p" && move.enPassant && move.enPassant.r === move.to.r && move.enPassant.c === move.to.c) {
    b[move.from.r][move.to.c] = null;
  }

  b[move.to.r][move.to.c] = piece;
  b[move.from.r][move.from.c] = null;

  if (piece.type === "p" && (move.to.r === 0 || move.to.r === 7)) {
    b[move.to.r][move.to.c] = { type: promotionType, color: piece.color };
  }

  const dir = piece.color === "w" ? -1 : 1;
  if (piece.type === "p" && move.to.r - move.from.r === 2 * dir) {
    state.enPassant = { r: move.from.r + dir, c: move.from.c };
  } else {
    state.enPassant = null;
  }

  if (piece.type === "k") {
    state.castling[piece.color].k = false;
    state.castling[piece.color].q = false;
  }
  if (piece.type === "r") {
    const homeRow = piece.color === "w" ? 7 : 0;
    if (move.from.r === homeRow && move.from.c === 0) state.castling[piece.color].q = false;
    if (move.from.r === homeRow && move.from.c === 7) state.castling[piece.color].k = false;
  }
  if (target && target.type === "r") {
    const targetHomeRow = target.color === "w" ? 7 : 0;
    if (move.to.r === targetHomeRow && move.to.c === 0) state.castling[target.color].q = false;
    if (move.to.r === targetHomeRow && move.to.c === 7) state.castling[target.color].k = false;
  }

  state.turn = state.turn === "w" ? "b" : "w";
}

function findKing(b, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (p && p.type === "k" && p.color === color) return { r, c };
    }
  }
  return null;
}

function isKingInCheck(color) {
  const king = findKing(board, color);
  if (!king) return false;
  return isAttacked(king.r, king.c, color === "w" ? "b" : "w");
}

function isAttackedOnBoard(b, r, c, byColor) {
  if (!isInside(r, c)) return false;
  // Knight attacks
  const knightOffsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  for (const [dr, dc] of knightOffsets) {
    const sr = r + dr, sc = c + dc;
    if (isInside(sr, sc)) {
      const p = b[sr][sc];
      if (p && p.color === byColor && p.type === "n") return true;
    }
  }
  // Pawn attacks
  const pawnDir = byColor === "w" ? 1 : -1;
  for (const dc of [-1, 1]) {
    const sr = r + pawnDir, sc = c + dc;
    if (isInside(sr, sc)) {
      const p = b[sr][sc];
      if (p && p.color === byColor && p.type === "p") return true;
    }
  }
  // King attacks
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const sr = r + dr, sc = c + dc;
      if (isInside(sr, sc)) {
        const p = b[sr][sc];
        if (p && p.color === byColor && p.type === "k") return true;
      }
    }
  }
  // Sliding attacks (bishop, rook, queen)
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (const [dr, dc] of dirs) {
    let sr = r + dr, sc = c + dc;
    while (isInside(sr, sc)) {
      const p = b[sr][sc];
      if (p && p.color === byColor) {
        if (p.type === "q") return true;
        if (p.type === "b" && dr !== 0 && dc !== 0) return true;
        if (p.type === "r" && (dr === 0 || dc === 0)) return true;
        break;
      } else if (p) {
        break;
      }
      sr += dr;
      sc += dc;
    }
  }
  return false;
}



function hasAnyLegalMove(color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p || p.color !== color) continue;
      // Try every target square with O(1) canMoveTo instead of generating all moves
      for (let tr = 0; tr < 8; tr++) {
        for (let tc = 0; tc < 8; tc++) {
          if (!canMoveTo({ r, c }, { r: tr, c: tc })) continue;
          const move = { from: { r, c }, to: { r: tr, c: tc } };
          if (p.type === "p" && enPassant && enPassant.r === tr && enPassant.c === tc) {
            move.enPassant = enPassant;
          }
          const copy = cloneBoardState(board, color);
          applyMove(copy, move);
          const king = findKing(copy.board, color);
          if (king && !isAttackedOnBoard(copy.board, king.r, king.c, color === "w" ? "b" : "w")) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function highlightCheck() {
  const king = findKing(board, turn);
  if (king && isKingInCheck(turn)) {
    const sq = document.querySelector(`.square[data-r="${king.r}"][data-c="${king.c}"]`);
    if (sq) sq.classList.add("check");
  }
}

function renderMoveHistory() {
  const el = document.getElementById("moveHistory");
  if (!el) return;
  el.innerHTML = "";

  const firstMoveIsBlack = moveHistory.length > 0 && moveHistory[0].turn === "b";
  let moveIndex = 0;
  let displayMoveNum = 1;

  while (moveIndex < moveHistory.length) {
    const row = document.createElement("div");
    row.className = "move-row";

    const num = document.createElement("span");
    num.className = "move-num";

    const white = document.createElement("span");
    white.className = "move-white";
    const black = document.createElement("span");
    black.className = "move-black";

    if (firstMoveIsBlack && moveIndex === 0) {
      num.textContent = displayMoveNum + "...";
      white.textContent = "";
      black.textContent = moveHistory[moveIndex].notation || "?";
      moveIndex++;
      displayMoveNum++;
    } else {
      num.textContent = displayMoveNum + ".";
      white.textContent = moveHistory[moveIndex] ? moveHistory[moveIndex].notation || "?" : "";
      black.textContent = moveHistory[moveIndex + 1] ? moveHistory[moveIndex + 1].notation || "?" : "";
      moveIndex += 2;
      displayMoveNum++;
    }

    row.append(num, white, black);
    el.appendChild(row);
  }
  el.scrollTop = el.scrollHeight;
}

function renderFen() {
  const input = document.getElementById("fenInput");
  if (input) input.value = getPositionKey() + ` ${halfmoveClock} ${fullmoveNumber}`;
}

function flipBoard() {
  boardFlipped = !boardFlipped;
  render();
}

function copyFen() {
  const fen = getPositionKey() + ` ${halfmoveClock} ${fullmoveNumber}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fen).catch(() => {});
  }
  const btn = document.getElementById("copyFenBtn");
  if (btn) {
    const original = btn.textContent;
    btn.textContent = "Kopyalandı!";
    setTimeout(() => (btn.textContent = original), 1200);
  }
}

function loadFen() {
  const input = document.getElementById("loadFenInput");
  if (!input) return;
  const fen = input.value.trim();
  if (!fen) return;
  const parts = fen.split(/\s+/);
  const minimal = parts.slice(0, 4).join(" ");
  if (!/^[1-8PNBRQKpnbrqk]+\/([1-8PNBRQKpnbrqk]+\/){6}[1-8PNBRQKpnbrqk]+\s+[wb]\s+[-KQkq]+\s+(-|[a-h][36])$/.test(minimal)) {
    alert("Geçersiz FEN konumu.");
    return;
  }
  parseFen(fen);
  // If parseFen rejected the FEN (e.g. invalid king count), re-initialize
  if (board.length === 0) {
    alert("Geçersiz konum: her tarafta bir şah olmalı.");
    parseFen(START_FEN);
    render();
    input.value = "";
    return;
  }
  moveHistory = [];
  capturedBy = { w: [], b: [] };
  selected = null;
  lastMove = null;
  gameOver = false;
  gameResult = null;
  pendingPromotion = null;
  hideGameOverModal();
  render();
  input.value = "";
}

function resign() {
  if (gameOver) return;
  const resigningColor = turn;
  gameOver = true;
  gameResult = `${resigningColor === "w" ? "Black" : "White"} wins by resignation.`;
  playSound("gameEnd");
  updateStatus();
}

function showHint() {
  if (gameOver || pendingPromotion) return;
  if (vsBot && turn === "b") return;
  const state = { board: cloneBoard(), turn, castling: cloneCastling(castling), enPassant };
  const moves = getAllLegalMovesOnBoard(state, turn);
  if (!moves.length) return;
  // Scores are from Black's perspective: high = good for Black, low = good for White
  const isBlack = turn === "b";
  let best = moves[0];
  let bestScore = isBlack ? -Infinity : Infinity;
  const depth = botDifficulty === "easy" ? 1 : botDifficulty === "medium" ? 2 : 3;
  for (const move of moves) {
    const score = evaluateMove(move, depth, -Infinity, Infinity, false, state);
    if (isBlack ? score > bestScore : score < bestScore) {
      bestScore = score;
      best = move;
    }
  }
  selected = { r: best.from.r, c: best.from.c };
  render();
  setTimeout(() => {
    selected = null;
    render();
  }, 900);
}

function resetGame() {
  parseFen(START_FEN);
  boardFlipped = false;
  hideGameOverModal();
  render();
}

function undoMove() {
  if (!moveHistory.length) return;
  const state = moveHistory.pop();
  if (!state || !state.board) return;
  board = state.board;
  turn = state.turn;
  castling = state.castling;
  enPassant = state.enPassant;
  lastMove = state.lastMove;
  capturedBy = state.capturedBy;
  halfmoveClock = state.halfmoveClock;
  fullmoveNumber = state.fullmoveNumber;
  positionHistory.pop();
  // In bot mode, if the most recent move was the bot's, undo both the bot's
  // and the human's moves so Undo returns to the human's turn.
  if (vsBot && moveHistory.length > 0) {
    const prev = moveHistory[moveHistory.length - 1];
    // The bot plays Black, so if the previous saved state has Black's turn
    // (meaning the state before the bot's move), we undo that too.
    if (prev && turn === "b") {
      const botState = moveHistory.pop();
      if (botState && botState.board) {
        board = botState.board;
        turn = botState.turn;
        castling = botState.castling;
        enPassant = botState.enPassant;
        lastMove = botState.lastMove;
        capturedBy = botState.capturedBy;
        halfmoveClock = botState.halfmoveClock;
        fullmoveNumber = botState.fullmoveNumber;
        positionHistory.pop();
      }
    }
  }
  selected = null;
  gameOver = false;
  gameResult = null;
  pendingPromotion = null;
  hideGameOverModal();
  render();
}

function updateBotButton() {
  const btn = document.getElementById("botBtn");
  if (!btn) return;
  btn.textContent = vsBot ? "İki kişi oyna" : "Bilgisayara karşı";
  btn.classList.toggle("secondary", !vsBot);
  btn.setAttribute("aria-pressed", String(vsBot));
}

function toggleBot() {
  vsBot = !vsBot;
  updateBotButton();
  if (vsBot && turn === "b" && !gameOver) setTimeout(botMove, 400);
}

function setDifficulty(level) {
  botDifficulty = level;
  const select = document.getElementById("difficultySelect");
  if (select) select.value = level;
}

function updateSoundButton() {
  const btn = document.getElementById("soundBtn");
  if (!btn) return;
  btn.textContent = soundEnabled ? "🔊 Ses açık" : "🔇 Sessiz";
  btn.setAttribute("aria-pressed", String(soundEnabled));
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundButton();
}

function setTheme(isDark) {
  darkMode = isDark;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  const toggle = document.getElementById("themeToggle");
  const label = document.querySelector(".theme-label");
  if (toggle) toggle.checked = isDark;
  if (label) label.textContent = isDark ? "Gece" : "Gündüz";
  try {
    localStorage.setItem("chess-theme", isDark ? "dark" : "light");
  } catch (e) {}
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("chess-theme");
  } catch (e) {}
  const valid = saved === "dark" || saved === "light";
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = valid ? saved === "dark" : prefersDark;
  setTheme(isDark);
}

function playSound(type) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "move") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "capture") {
    osc.type = "square";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "gameEnd") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.2);
    osc.frequency.setValueAtTime(783.99, now + 0.4);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.8);
    osc.start(now);
    osc.stop(now + 0.8);
  }
}

let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

function botMove() {
  if (gameOver || turn !== "b") return;

  const state = { board: cloneBoard(), turn, castling: cloneCastling(castling), enPassant };
  const moves = getAllLegalMovesOnBoard(state, "b");
  if (!moves.length) return;

  const depth = botDifficulty === "easy" ? 1 : botDifficulty === "medium" ? 2 : 3;
  let best = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const score = evaluateMove(move, depth, -Infinity, Infinity, false, state);
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }

  const promotionType = botChoosePromotion(best);
  executeMove(best, promotionType);
  render();
}

// Bot always promotes to queen (strongest piece)
function botChoosePromotion() {
  return "q";
}

function evaluateMove(move, depth, alpha, beta, maximizing, state) {
  const copy = cloneBoardState(state.board, state.turn, state.castling, state.enPassant);

  const piece = copy.board[move.from.r][move.from.c];
  const target = copy.board[move.to.r][move.to.c];
  // immediate score is from Black's perspective (positive = good for Black)
  let immediate = 0;
  const perspective = copy.turn === "b" ? 1 : -1;

  if (target) immediate += PIECE_VALUE[target.type] * 10 * perspective;
  if (piece && piece.type === "p" && (move.to.r === 0 || move.to.r === 7)) immediate += 80 * perspective;

  applyMove(copy, move);
  const botKing = findKing(copy.board, "b");
  if (botKing && isAttackedOnBoard(copy.board, botKing.r, botKing.c, "w")) immediate -= 50;
  const humanKing = findKing(copy.board, "w");
  if (humanKing && isAttackedOnBoard(copy.board, humanKing.r, humanKing.c, "b")) immediate += 30;

  if (depth <= 1) {
    return immediate + Math.random() * (botDifficulty === "easy" ? 20 : 8);
  }

  const nextColor = copy.turn;
  const nextMoves = getAllLegalMovesOnBoard(copy, nextColor);
  if (!nextMoves.length) {
    const inCheck = isKingInCheckOnBoard(copy.board, nextColor);
    // nextColor has no legal moves. If their king is in check, the player who
    // just moved (the one maximizing from Black's perspective) has checkmated.
    return maximizing ? (inCheck ? 10000 : 0) : (inCheck ? -10000 : 0);
  }

  if (maximizing) {
    let maxEval = -Infinity;
    for (const m of nextMoves) {
      const evalScore = evaluateMove(m, depth - 1, alpha, beta, false, copy);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return immediate + maxEval;
  } else {
    let minEval = Infinity;
    for (const m of nextMoves) {
      const evalScore = evaluateMove(m, depth - 1, alpha, beta, true, copy);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return immediate + minEval;
  }
}

function getAllLegalMovesOnBoard(state, color) {
  const legal = [];
  const b = state.board;
  const ep = state.enPassant || null;
  const castlingRights = state.castling || castling;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (!p || p.color !== color) continue;
      const pseudo = getPseudoLegalMovesOnBoard(b, { r, c }, ep, castlingRights);
      for (const m of pseudo) {
        const copy = cloneBoardState(b, color, castlingRights, ep);
        applyMove(copy, m);
        const king = findKing(copy.board, color);
        if (king && !isAttackedOnBoard(copy.board, king.r, king.c, color === "w" ? "b" : "w")) {
          legal.push(m);
        }
      }
    }
  }
  return legal;
}

function getPseudoLegalMovesOnBoard(b, from, ep = null, castlingRights = null) {
  const moves = [];
  const piece = b[from.r][from.c];
  if (!piece) return moves;
  const r0 = from.r, c0 = from.c;

  function addMove(tr, tc) {
    if (tr < 0 || tr > 7 || tc < 0 || tc > 7) return;
    const target = b[tr][tc];
    if (target && target.color === piece.color) return;
    const move = { from, to: { r: tr, c: tc } };
    if (piece.type === "p" && ep && ep.r === tr && ep.c === tc) move.enPassant = ep;
    moves.push(move);
  }

  switch (piece.type) {
    case "p": {
      const dir = piece.color === "w" ? -1 : 1;
      const startRow = piece.color === "w" ? 6 : 1;
      // Single push
      if (!b[r0 + dir][c0]) addMove(r0 + dir, c0);
      // Double push
      if (r0 === startRow && !b[r0 + dir][c0] && !b[r0 + 2 * dir][c0]) addMove(r0 + 2 * dir, c0);
      // Captures
      for (const dc of [-1, 1]) {
        const tr = r0 + dir, tc = c0 + dc;
        if (tr < 0 || tr > 7 || tc < 0 || tc > 7) continue;
        const target = b[tr][tc];
        if (target && target.color !== piece.color) addMove(tr, tc);
        if (ep && ep.r === tr && ep.c === tc) addMove(tr, tc);
      }
      break;
    }
    case "n": {
      const offsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      for (const [dr, dc] of offsets) addMove(r0 + dr, c0 + dc);
      break;
    }
    case "b":
    case "r":
    case "q": {
      const dirs = piece.type === "b" ? [[-1,-1],[-1,1],[1,-1],[1,1]]
        : piece.type === "r" ? [[-1,0],[1,0],[0,-1],[0,1]]
        : [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      for (const [dr, dc] of dirs) {
        let tr = r0 + dr, tc = c0 + dc;
        while (tr >= 0 && tr < 8 && tc >= 0 && tc < 8) {
          const target = b[tr][tc];
          if (target) {
            if (target.color !== piece.color) addMove(tr, tc);
            break;
          }
          addMove(tr, tc);
          tr += dr;
          tc += dc;
        }
      }
      break;
    }
    case "k": {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          addMove(r0 + dr, c0 + dc);
        }
      }
      // Castling
      if (!isKingInCheckOnBoard(b, piece.color)) {
        const rights = castlingRights || castling;
        for (const side of ["k", "q"]) {
          if (!rights[piece.color][side]) continue;
          const rookC = side === "k" ? 7 : 0;
          const rook = b[r0][rookC];
          if (!rook || rook.type !== "r" || rook.color !== piece.color) continue;
          const step = side === "k" ? 1 : -1;
          let clear = true;
          for (let i = c0 + step; i !== rookC; i += step) {
            if (b[r0][i]) { clear = false; break; }
          }
          if (!clear) continue;
          const enemy = piece.color === "w" ? "b" : "w";
          if (isAttackedOnBoard(b, r0, c0 + step, enemy)) continue;
          if (isAttackedOnBoard(b, r0, c0 + 2 * step, enemy)) continue;
          addMove(r0, c0 + 2 * step);
        }
      }
      break;
    }
  }
  return moves;
}

function isKingInCheckOnBoard(b, color) {
  const king = findKing(b, color);
  if (!king) return false;
  return isAttackedOnBoard(b, king.r, king.c, color === "w" ? "b" : "w");
}

function safeAddListener(id, event, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
}

// TEST-CUTOFF: DOM-only initialization below this line is stripped for unit tests.
safeAddListener("resetBtn", "click", resetGame);
safeAddListener("undoBtn", "click", undoMove);
safeAddListener("botBtn", "click", toggleBot);
safeAddListener("flipBtn", "click", flipBoard);
safeAddListener("hintBtn", "click", showHint);
safeAddListener("resignBtn", "click", resign);
safeAddListener("copyFenBtn", "click", copyFen);
safeAddListener("loadFenBtn", "click", loadFen);
safeAddListener("loadFenInput", "keydown", (e) => {
  if (e.key === "Enter") loadFen();
});

safeAddListener("difficultySelect", "change", (e) => {
  botDifficulty = e.target.value;
});

safeAddListener("soundBtn", "click", toggleSound);

safeAddListener("themeToggle", "change", (e) => {
  setTheme(e.target.checked);
});

safeAddListener("modalNewGame", "click", resetGame);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pendingPromotion) {
    cancelPromotion();
    return;
  }
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
  const key = e.key.toLowerCase();
  if (key === "n") resetGame();
  else if (key === "u") undoMove();
  else if (key === "b") toggleBot();
  else if (key === "f") flipBoard();
  else if (key === "h") showHint();
  else if (key === "m") toggleSound();
  else if (key === "t") setTheme(!darkMode);
});

document.addEventListener("click", (e) => {
  if (pendingPromotion && !e.target.closest(".promotion-dialog") && !e.target.closest(".square")) {
    cancelPromotion();
  }
});

document.addEventListener("dragstart", (e) => {
  if (e.target.closest(".board")) e.preventDefault();
});

function resumeAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
}
document.body.addEventListener("click", resumeAudio, { once: true });

initTheme();
updateBotButton();
updateSoundButton();
parseFen(START_FEN);
render();

// Localize visible game results without changing engine result tokens.
function translateChessText(text) { return text.replace(/White/g,"Beyaz").replace(/Black/g,"Siyah").replace(/Checkmate!/g,"Şah mat!").replace(/Stalemate! Draw\./g,"Pat! Beraberlik.").replace(/ wins by resignation\./g," terk sonucu kazandı.").replace(/ wins!?\.?/g," kazandı!").replace(/ to move/g," oynar").replace(/ \(check\)/g," (şah)").replace(/Draw by repetition\./g,"Konum tekrarı: beraberlik.").replace(/Draw by 50-move rule\./g,"50 hamle kuralı: beraberlik.").replace(/Draw by insufficient material\./g,"Yetersiz materyal: beraberlik.").replace(/Checkmate/g,"Şah mat").replace(/Resignation/g,"Terk").replace(/Draw!/g,"Beraberlik!").replace(/Game over/g,"Oyun bitti"); }
const resultObserver = new MutationObserver(() => { for (const id of ["status","modalTitle","modalSubtitle"]) { const node=document.getElementById(id); if(node){ const value=translateChessText(node.textContent); if(value!==node.textContent)node.textContent=value; } } });
for (const id of ["status","modalTitle","modalSubtitle"]) { const node=document.getElementById(id); if(node)resultObserver.observe(node,{childList:true,subtree:true,characterData:true}); }
updateStatus();
