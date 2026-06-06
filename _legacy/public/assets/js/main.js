const THEME_KEY = "knb:theme";
const CART_KEY = "knb:cart";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  let theme = getInitialTheme();
  applyTheme(theme);

  btn.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  });
}

initThemeToggle();

function setFooterYear() {
  const el = document.getElementById("year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

setFooterYear();

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const count = readCart().reduce((sum, item) => sum + (item.qty || 0), 0);
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

function addToCart({ id, name, price }) {
  const cart = readCart();
  const idx = cart.findIndex((x) => x.id === id);
  if (idx >= 0) cart[idx].qty = (cart[idx].qty || 0) + 1;
  else cart.push({ id, name, price, qty: 1 });
  writeCart(cart);
  updateCartBadge();
}

function initAddToCartButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target?.closest?.("[data-add-to-cart]");
    if (!btn) return;
    const id = btn.getAttribute("data-product-id") || "unknown";
    const name = btn.getAttribute("data-product-name") || "Product";
    const price = Number(btn.getAttribute("data-product-price") || "0");
    addToCart({ id, name, price });
  });
}

function initChatbot() {
  const openBtn = document.getElementById("chatOpen");
  const closeBtn = document.getElementById("chatClose");
  const panel = document.getElementById("chatPanel");
  if (!openBtn || !closeBtn || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("hidden", !open);
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  setOpen(false);
}

updateCartBadge();
initAddToCartButtons();
initChatbot();
