// const API_BASE_URL =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1"
//     ? "http://localhost:3000"
//     : "https://api.varalabs.in";
const API_BASE_URL = "https://api.varalabs.in";
const PROPERTY_SLUG = "anudina-kuteera";
const GUEST_JWT_KEY = "anudina_guest_jwt";
const GUEST_USER_KEY = "anudina_guest_user";
/**
 * Public GIS client id — must match Vara GOOGLE_CLIENT_ID / GUEST_GOOGLE_CLIENT_ID.
 * Use the shared villa Web client that already lists anudinakuteera.com origins.
 */
const GOOGLE_CLIENT_ID =
  "237703802735-daoeopf7qskj1g7ei2jc5eqdm4e0mu5u.apps.googleusercontent.com";

const bookingForm = document.getElementById("bookingForm");
const guestNameInput = document.getElementById("guestName");
const guestEmailInput = document.getElementById("guestEmail");
const guestPhoneInput = document.getElementById("guestPhone");
const roomSelect = document.getElementById("roomSelect");
const checkInInput = document.getElementById("checkInDate");
const checkOutInput = document.getElementById("checkOutDate");
const adultCountInput = document.getElementById("adultCount");
const childCountInput = document.getElementById("childCount");
const summaryList = document.getElementById("summaryList");
const totalPriceDisplay = document.getElementById("totalPrice");
const depositPriceDisplay = document.getElementById("depositPrice");
const formErrors = document.getElementById("formErrors");
const nightCountDisplay = document.getElementById("nightCount");
const availabilityIndicator = document.getElementById("availabilityIndicator");
const roomGrid = document.getElementById("roomGrid");

const authStatus = document.getElementById("authStatus");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const headerCartBtn = document.getElementById("headerCartBtn");
const headerCartCount = document.getElementById("headerCartCount");
const openAuthModalBtn = document.getElementById("openAuthModalBtn");
const authEntryItem = document.getElementById("authEntryItem");
const accountMenuWrap = document.getElementById("accountMenuWrap");
const accountMenuBtn = document.getElementById("accountMenuBtn");
const accountMenu = document.getElementById("accountMenu");
const accountMenuName = document.getElementById("accountMenuName");
const accountMenuEmail = document.getElementById("accountMenuEmail");
const menuMyBookingsBtn = document.getElementById("menuMyBookingsBtn");
const menuLogoutBtn = document.getElementById("menuLogoutBtn");
const addToCartBtn = document.getElementById("addToCartBtn");
const cartItemsList = document.getElementById("cartItemsList");
const bookingsList = document.getElementById("bookingsList");
let googleSignInReady = false;

const authModal = document.getElementById("authModal");
const authModalBackdrop = document.getElementById("authModalBackdrop");
const authModalCloseBtn = document.getElementById("authModalCloseBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartDrawerBackdrop = document.getElementById("cartDrawerBackdrop");
const cartDrawerCloseBtn = document.getElementById("cartDrawerCloseBtn");
const cartCheckoutNameInput = document.getElementById("cartCheckoutName");
const cartCheckoutEmailInput = document.getElementById("cartCheckoutEmail");
const cartCheckoutPhoneInput = document.getElementById("cartCheckoutPhone");
const cartCheckoutStatus = document.getElementById("cartCheckoutStatus");
const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");
const cartPaymentOptionsContainer = document.getElementById("cartPaymentOptions");
const cartTermsModal = document.getElementById("cartTermsModal");
const cartTermsModalBackdrop = document.getElementById("cartTermsModalBackdrop");
const cartTermsModalCloseBtn = document.getElementById("cartTermsModalCloseBtn");
const cartTermsCheckbox = document.getElementById("cartTermsCheckbox");
const cartTermsNotice = document.getElementById("cartTermsNotice");
const cartTermsProceedBtn = document.getElementById("cartTermsProceedBtn");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const cartPriceBreakdownToggleBtn = document.getElementById(
  "cartPriceBreakdownToggleBtn",
);
const cartPriceBreakdownPanel = document.getElementById("cartPriceBreakdownPanel");
const bookingsModal = document.getElementById("bookingsModal");
const bookingsModalBackdrop = document.getElementById("bookingsModalBackdrop");
const bookingsModalCloseBtn = document.getElementById("bookingsModalCloseBtn");
const bookingsNotice = document.getElementById("bookingsNotice");
const PREFERRED_PREPAID_KEY = "anudina_preferred_prepaid";
const roomCartModal = document.getElementById("roomCartModal");
const roomCartModalBackdrop = document.getElementById("roomCartModalBackdrop");
const roomCartModalCloseBtn = document.getElementById("roomCartModalCloseBtn");
const roomCartModalTitle = document.getElementById("roomCartModalTitle");
const roomCartCheckInInput = document.getElementById("roomCartCheckIn");
const roomCartCheckOutInput = document.getElementById("roomCartCheckOut");
const roomCartAdultsInput = document.getElementById("roomCartAdults");
const roomCartChildrenInput = document.getElementById("roomCartChildren");
const roomCartQuoteStatus = document.getElementById("roomCartQuoteStatus");
const roomCartConfirmBtn = document.getElementById("roomCartConfirmBtn");
const roomPhotosViewer = document.getElementById("roomPhotosViewer");
const roomPhotosBackdrop = document.getElementById("roomPhotosBackdrop");
const roomViewerImage = document.getElementById("roomViewerImage");
const roomViewerCaption = document.getElementById("roomViewerCaption");
const roomViewerCloseBtn = document.getElementById("roomViewerCloseBtn");
const roomViewerPrevBtn = document.getElementById("roomViewerPrevBtn");
const roomViewerNextBtn = document.getElementById("roomViewerNextBtn");

const termsModal = document.getElementById("termsModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const termsAgreeBtn = document.getElementById("termsAgreeBtn");
const modalCloseBtn = document.querySelector("[data-close-modal]");
const paymentOptionsContainer = document.getElementById("paymentOptions");

let rooms = [];
let roomsById = new Map();
let selectedRoomId = "";
let lastQuote = null;
let lastPricing = null;
let selectedPrepaidId = null;
let cartSelectedPrepaidId = null;
let cartLastPricing = null;
let pendingPaymentData = null;
let siteGalleryImages = [];
let currentRoomPhotos = [];
let currentRoomPhotoIndex = 0;
let currentRoomTitle = "";
let roomCartSelectedRoomId = "";
let roomCartQuoteDebounce = null;
let currentCartItems = [];
let currentCartPayload = null;
let galleryCarouselInterval = null;
let galleryCarouselIndex = 0;
let galleryCarouselCount = 0;
let lockedScrollY = 0;

const ROOM_BANNER_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23ece5dc'/><stop offset='100%' stop-color='%23d9c9b6'/></linearGradient></defs><rect width='640' height='360' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b5a49' font-family='Arial, sans-serif' font-size='24'>Room image coming soon</text></svg>",
  );
const SITE_GALLERY_PLACEHOLDER = "./assets/Background.jpeg";

function parseDateOnly(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function calculateNights(checkIn, checkOut) {
  return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
}

function toDateOnlyText(value) {
  if (!value) return "";
  if (typeof value === "string" && value.length >= 10) return value.slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return formatDate(parsed);
}

function normalizeImageUrl(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().replace(/^['"]+|['"]+$/g, "");
  if (!trimmed) return "";
  const safe = trimmed.replace(/\s/g, "%20");
  if (safe.startsWith("//")) return `https:${safe}`;
  if (safe.startsWith("http://")) return safe.replace("http://", "https://");
  return safe;
}

function getGuestToken() {
  return localStorage.getItem(GUEST_JWT_KEY) || "";
}

function getGuestUser() {
  try {
    const raw = localStorage.getItem(GUEST_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearGuestAuth() {
  localStorage.removeItem(GUEST_JWT_KEY);
  localStorage.removeItem(GUEST_USER_KEY);
}

async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = `Bearer ${getGuestToken()}`;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }
  if (response.status === 401 && auth) {
    clearGuestAuth();
    updateAuthStateUI();
    throw new Error("Session expired. Please sign in again.");
  }
  if (!response.ok) {
    const error = new Error(
      payload.message || `Request failed (${response.status})`,
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return { payload, status: response.status };
}

function savePreferredPrepaid(option) {
  if (!option?.id) return;
  try {
    sessionStorage.setItem(
      PREFERRED_PREPAID_KEY,
      JSON.stringify({
        id: option.id,
        percent: Number(option.percent || 0) || undefined,
      }),
    );
  } catch {
    /* ignore storage errors */
  }
}

function getPreferredPrepaid() {
  try {
    const raw = sessionStorage.getItem(PREFERRED_PREPAID_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function formatExpiresAt(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function bookingStatusLabel(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "requested") return "Requested";
  if (normalized === "approved") return "Approved";
  if (normalized === "confirmed") return "Confirmed";
  if (normalized === "rejected") return "Declined";
  if (normalized === "cancelled") return "Cancelled";
  return status || "Pending";
}

function bookingStatusMessage(booking) {
  const status = String(booking?.status || "").toLowerCase();
  if (status === "requested") {
    return "Request pending — waiting for property confirmation.";
  }
  if (status === "approved") {
    const deadline = formatExpiresAt(booking.expiresAt);
    return deadline
      ? `Approved — complete payment by ${deadline}.`
      : "Approved — complete payment to confirm your stay.";
  }
  if (status === "confirmed") {
    return "Booking confirmed.";
  }
  if (status === "rejected") {
    const reason = booking.rejectionReason
      ? ` ${booking.rejectionReason}`
      : "";
    return `Request declined.${reason}`;
  }
  if (status === "cancelled") {
    return "This booking was cancelled.";
  }
  return "";
}

function isPaymentWindowExpired(booking) {
  if (!booking?.expiresAt) return false;
  const expires = new Date(booking.expiresAt).getTime();
  if (Number.isNaN(expires)) return false;
  return Date.now() > expires;
}

function showError(message) {
  const popupVisible = roomCartModal && !roomCartModal.classList.contains("hidden");
  if (popupVisible && roomCartQuoteStatus) {
    roomCartQuoteStatus.textContent = message;
    return;
  }
  if (!formErrors) return;
  formErrors.textContent = message;
  formErrors.classList.remove("hidden");
}

function hideError() {
  if (roomCartQuoteStatus) {
    roomCartQuoteStatus.textContent = "";
  }
  if (!formErrors) return;
  formErrors.classList.add("hidden");
}

function setRoomCartQuoteStatus(message, tone = "neutral") {
  if (!roomCartQuoteStatus) return;
  roomCartQuoteStatus.textContent = message;
  roomCartQuoteStatus.classList.remove(
    "room-cart-quote-status-available",
    "room-cart-quote-status-unavailable",
  );
  if (tone === "available") {
    roomCartQuoteStatus.classList.add("room-cart-quote-status-available");
  } else if (tone === "unavailable") {
    roomCartQuoteStatus.classList.add("room-cart-quote-status-unavailable");
  }
}

function setAvailabilityState(type, message) {
  if (!availabilityIndicator) return;
  if (!type) {
    availabilityIndicator.className = "availability-indicator hidden";
    availabilityIndicator.textContent = "";
    return;
  }
  availabilityIndicator.className = `availability-indicator ${type}`;
  availabilityIndicator.textContent = message;
}

function getSelectedRoom() {
  return roomsById.get(selectedRoomId) || null;
}

function normalizePricingData(rawQuote, fallbackRoomName = "Room") {
  if (!rawQuote || typeof rawQuote !== "object") return null;
  const roomInfo = Array.isArray(rawQuote.roomInfo) ? rawQuote.roomInfo : [];

  // Preferred shape for cart: backend already returns cart-level payable totals.
  const hasCartTotals =
    Number.isFinite(Number(rawQuote.lowerPayableTotal)) &&
    Number.isFinite(Number(rawQuote.upperPayableTotal));
  if (hasCartTotals) {
    const roomOptions = roomInfo.flatMap((room) =>
      Array.isArray(room.prepaidOptions) ? room.prepaidOptions : [],
    );
    const optionMetaByPercent = new Map();
    roomOptions.forEach((option) => {
      const percent = Number(option.percent || 0);
      if (!percent || optionMetaByPercent.has(percent)) return;
      optionMetaByPercent.set(percent, {
        label: option.label || `${percent}% Advance`,
        refundAvailable: Boolean(option.refundAvailable),
        isPrimary: Boolean(option.isPrimary),
      });
    });

    const lowerPercent = Number(rawQuote.lowerPercent || 0);
    const upperPercent = Number(rawQuote.upperPercent || 0);
    const prepaidOptions = [];

    if (lowerPercent > 0) {
      const meta = optionMetaByPercent.get(lowerPercent) || {};
      prepaidOptions.push({
        id: "standard",
        label: meta.label || "Standard",
        percent: lowerPercent,
        prepaidAmount: Number(rawQuote.lowerPayableTotal || 0),
        refundAvailable: Boolean(meta.refundAvailable),
        isPrimary: Boolean(meta.isPrimary),
      });
    }

    if (upperPercent > 0) {
      const meta = optionMetaByPercent.get(upperPercent) || {};
      prepaidOptions.push({
        id: "primary",
        label: meta.label || "Primary",
        percent: upperPercent,
        prepaidAmount: Number(rawQuote.upperPayableTotal || 0),
        refundAvailable:
          meta.refundAvailable === undefined ? true : Boolean(meta.refundAvailable),
        isPrimary: meta.isPrimary === undefined ? true : Boolean(meta.isPrimary),
      });
    }

    const primary =
      prepaidOptions.find((option) => option.isPrimary) ||
      prepaidOptions[0] ||
      null;

    return {
      totalPrice: Number(rawQuote.totalPrice || 0),
      roomNames: roomInfo.map((room) => room.roomName || room.roomId || fallbackRoomName),
      prepaidOptions,
      primaryPrepaidId: primary?.id || null,
    };
  }

  // New shape: roomInfo[] with prepaid options per room
  if (roomInfo.length) {
    const totalsByOptionId = new Map();
    roomInfo.forEach((room) => {
      const roomOptions = Array.isArray(room.prepaidOptions) ? room.prepaidOptions : [];
      roomOptions.forEach((option) => {
        const id = String(option.id || "");
        if (!id) return;
        const existing = totalsByOptionId.get(id) || {
          id,
          label: option.label || id,
          percent: Number(option.percent || 0),
          prepaidAmount: 0,
          refundAvailable: true,
          isPrimary: false,
        };
        existing.prepaidAmount += Number(option.prepaidAmount || 0);
        existing.refundAvailable = existing.refundAvailable && Boolean(option.refundAvailable);
        existing.isPrimary = existing.isPrimary || Boolean(option.isPrimary);
        if (!existing.label && option.label) existing.label = option.label;
        if (!existing.percent && option.percent) existing.percent = Number(option.percent);
        totalsByOptionId.set(id, existing);
      });
    });

    const prepaidOptions = Array.from(totalsByOptionId.values());
    const primary =
      prepaidOptions.find((option) => option.isPrimary) ||
      prepaidOptions[0] ||
      null;

    return {
      totalPrice:
        Number(rawQuote.totalPrice || 0) ||
        roomInfo.reduce((sum, room) => sum + Number(room.price || 0), 0),
      roomNames: roomInfo.map((room) => room.roomName || room.roomId || fallbackRoomName),
      prepaidOptions,
      primaryPrepaidId: primary?.id || null,
    };
  }

  // Legacy shape: single quote with top-level prepaidOptions
  const legacyOptions = Array.isArray(rawQuote.prepaidOptions) ? rawQuote.prepaidOptions : [];
  const legacyPrimary =
    legacyOptions.find((option) => option.id === rawQuote.primaryPrepaidOptionId) ||
    legacyOptions[0] ||
    null;
  return {
    totalPrice: Number(rawQuote.totalPrice || 0),
    roomNames: [fallbackRoomName],
    prepaidOptions: legacyOptions.map((option) => ({
      id: option.id,
      label: option.label || option.id,
      percent: Number(option.percent || 0),
      prepaidAmount: Number(option.prepaidAmount || 0),
      refundAvailable: Boolean(option.refundAvailable),
      isPrimary: option.id === rawQuote.primaryPrepaidOptionId || Boolean(option.isPrimary),
    })),
    primaryPrepaidId: legacyPrimary?.id || null,
  };
}

function updateTermsDepositFromSelection() {
  const depositEl = document.getElementById("termsDepositPrice");
  if (!depositEl || !lastPricing) return;
  const selected =
    lastPricing.prepaidOptions.find((option) => option.id === selectedPrepaidId) ||
    lastPricing.prepaidOptions[0];
  const payable = Number(selected?.prepaidAmount || 0);
  depositEl.textContent = `₹${payable.toLocaleString("en-IN")}`;
}

function renderPaymentOptions(pricing) {
  if (!paymentOptionsContainer) return;
  paymentOptionsContainer.innerHTML = "";
  if (!pricing?.prepaidOptions?.length) {
    paymentOptionsContainer.innerHTML = "<p class=\"notice\">No payment options available.</p>";
    selectedPrepaidId = null;
    return;
  }

  if (!selectedPrepaidId) {
    selectedPrepaidId = pricing.primaryPrepaidId || pricing.prepaidOptions[0]?.id || null;
  }

  pricing.prepaidOptions.forEach((option) => {
    const card = document.createElement("div");
    card.className = "payment-option-card";
    if (option.id === selectedPrepaidId) card.classList.add("selected");

    card.innerHTML = `
      <p class="payment-option-title">
        Pay ₹${Number(option.prepaidAmount || 0).toLocaleString("en-IN")} (${Number(option.percent || 0)}%)
        ${option.isPrimary ? '<span class="payment-option-badge">Recommended</span>' : ""}
      </p>
      <p class="payment-option-meta ${option.refundAvailable ? "refundable" : "non-refundable"}">
        ${option.refundAvailable ? "Refundable" : "Non-refundable"}
      </p>
    `;

    card.addEventListener("click", () => {
      selectedPrepaidId = option.id;
      savePreferredPrepaid(option);
      paymentOptionsContainer
        .querySelectorAll(".payment-option-card")
        .forEach((node) => node.classList.remove("selected"));
      card.classList.add("selected");
      updateTermsDepositFromSelection();
    });

    paymentOptionsContainer.appendChild(card);
  });

  updateTermsDepositFromSelection();
  const selectedTermsOption =
    pricing.prepaidOptions.find((row) => row.id === selectedPrepaidId) ||
    pricing.prepaidOptions[0];
  if (selectedTermsOption) savePreferredPrepaid(selectedTermsOption);
}

function renderCartPaymentOptions(pricing) {
  if (!cartPaymentOptionsContainer) return;
  cartPaymentOptionsContainer.innerHTML = "";
  if (!pricing?.prepaidOptions?.length) {
    cartPaymentOptionsContainer.innerHTML =
      "<p class=\"notice\">No payment options available.</p>";
    cartSelectedPrepaidId = null;
    return;
  }

  if (!cartSelectedPrepaidId) {
    cartSelectedPrepaidId = pricing.primaryPrepaidId || pricing.prepaidOptions[0]?.id || null;
  }

  pricing.prepaidOptions.forEach((option) => {
    const card = document.createElement("div");
    card.className = "payment-option-card";
    if (option.id === cartSelectedPrepaidId) card.classList.add("selected");
    card.innerHTML = `
      <p class="payment-option-title">
        Pay ₹${Number(option.prepaidAmount || 0).toLocaleString("en-IN")} (${Number(option.percent || 0)}%)
        ${option.isPrimary ? '<span class="payment-option-badge">Recommended</span>' : ""}
      </p>
      <p class="payment-option-meta ${option.refundAvailable ? "refundable" : "non-refundable"}">
        ${option.refundAvailable ? "Refundable" : "Non-refundable"}
      </p>
    `;
    card.addEventListener("click", () => {
      cartSelectedPrepaidId = option.id;
      savePreferredPrepaid(option);
      cartPaymentOptionsContainer
        .querySelectorAll(".payment-option-card")
        .forEach((node) => node.classList.remove("selected"));
      card.classList.add("selected");
    });
    cartPaymentOptionsContainer.appendChild(card);
  });

  const selected =
    pricing.prepaidOptions.find((row) => row.id === cartSelectedPrepaidId) ||
    pricing.prepaidOptions[0];
  if (selected) savePreferredPrepaid(selected);
}

async function refreshCartPaymentOptions() {
  if (!cartPaymentOptionsContainer) return;
  cartPaymentOptionsContainer.innerHTML = "";
  cartSelectedPrepaidId = null;
  cartLastPricing = null;
  if (!currentCartItems.length || !currentCartPayload) return;
  const firstItem = currentCartItems[0];
  cartLastPricing = normalizePricingData(
    currentCartPayload,
    firstItem.roomName || firstItem.roomId || "Room",
  );
  renderCartPaymentOptions(cartLastPricing);
}

function getRoomGallery(room) {
  const gallery = Array.isArray(room?.images?.gallery) ? room.images.gallery : [];
  if (room?.images?.banner) return [room.images.banner, ...gallery];
  return gallery;
}

function renderRooms() {
  if (!roomGrid) return;
  roomGrid.innerHTML = "";
  if (!rooms.length) {
    roomGrid.innerHTML = "<p>No rooms available right now.</p>";
    return;
  }

  rooms.forEach((room) => {
    const card = document.createElement("article");
    card.className = "room-card";
    card.dataset.roomId = room.roomId;
    const hasBanner = Boolean(room.images?.banner);
    const banner = hasBanner ? room.images.banner : ROOM_BANNER_PLACEHOLDER;
    const numericPrice = Number(room.price);
    const hasValidPrice =
      Number.isFinite(numericPrice) && numericPrice > 0;
    const roomPriceText = hasValidPrice
      ? `₹${numericPrice.toLocaleString("en-IN")} / night`
      : "Price unavailable";
    card.innerHTML = `
      <div class="room-media">
        <img src="${banner}" alt="${room.name}" loading="lazy" decoding="async" />
        ${hasBanner ? "" : '<span class="room-media-badge">Placeholder</span>'}
      </div>
      <div class="room-body">
        <h3>${room.name}</h3>
        <p>${room.description || "Comfortable stay with curated amenities."}</p>
        <p class="room-price${hasValidPrice ? "" : " room-price-unavailable"}">${roomPriceText}</p>
        <button type="button" class="btn outline block room-card-cart-btn" data-room-cart-add>
          Add To Cart
        </button>
      </div>
    `;
    card.addEventListener("click", () => openRoomPhotosModal(room.roomId));
    card.querySelector("[data-room-cart-add]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      openRoomCartModal(room.roomId);
    });
    roomGrid.appendChild(card);
  });
}

function renderRoomSelect() {
  if (!roomSelect) return;
  roomSelect.innerHTML = rooms
    .map((room) => `<option value="${room.roomId}">${room.name}</option>`)
    .join("");
  if (!selectedRoomId && rooms.length) selectedRoomId = rooms[0].roomId;
  roomSelect.value = selectedRoomId;
}

async function loadRooms() {
  const { payload } = await apiRequest(
    `/api/public/properties/${PROPERTY_SLUG}/rooms`,
  );
  if (payload.success !== true || !Array.isArray(payload.rooms)) {
    throw new Error("Invalid rooms response.");
  }
  rooms = payload.rooms.map((room) => ({
    ...room,
    roomId: room.roomId || `R${room.id}`,
  }));
  roomsById = new Map(rooms.map((room) => [room.roomId, room]));
  selectedRoomId = rooms[0]?.roomId || "";
  siteGalleryImages = Array.isArray(payload.siteGallery?.images)
    ? payload.siteGallery.images
        .map((src) => normalizeImageUrl(src))
        .filter(Boolean)
    : [];
  renderRooms();
  renderRoomSelect();
  renderSiteGalleryCarousel();
}

async function quoteRoom(checkIn, checkOut) {
  const normalizedCheckIn = toDateOnlyText(checkIn);
  const normalizedCheckOut = toDateOnlyText(checkOut);
  const tokenExists = Boolean(getGuestToken());
  const route = tokenExists
    ? "/api/guest/bookings/quote"
    : `/api/public/properties/${PROPERTY_SLUG}/quote`;
  const { payload } = await apiRequest(route, {
    method: "POST",
    auth: tokenExists,
    body: {
      roomId: selectedRoomId,
      checkIn: normalizedCheckIn,
      checkOut: normalizedCheckOut,
    },
  });
  return payload;
}

async function quoteRoomById(roomId, checkIn, checkOut) {
  const normalizedCheckIn = toDateOnlyText(checkIn);
  const normalizedCheckOut = toDateOnlyText(checkOut);
  const tokenExists = Boolean(getGuestToken());
  const route = tokenExists
    ? "/api/guest/bookings/quote"
    : `/api/public/properties/${PROPERTY_SLUG}/quote`;
  const { payload } = await apiRequest(route, {
    method: "POST",
    auth: tokenExists,
    body: {
      roomId,
      checkIn: normalizedCheckIn,
      checkOut: normalizedCheckOut,
    },
  });
  return payload;
}

function setAccountMenuOpen(isOpen) {
  if (!accountMenu || !accountMenuBtn) return;
  accountMenu.classList.toggle("hidden", !isOpen);
  accountMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function updateAuthStateUI() {
  const guest = getGuestUser();
  if (guest) {
    authEntryItem?.classList.add("hidden");
    accountMenuWrap?.classList.remove("hidden");
    if (accountMenuName) {
      accountMenuName.textContent = guest.name || "Guest";
    }
    if (accountMenuEmail) {
      accountMenuEmail.textContent = guest.email || "";
    }
    if (accountMenuBtn) {
      accountMenuBtn.replaceChildren();
      const avatarUrl = String(guest.avatar || "").trim();
      if (avatarUrl) {
        const img = document.createElement("img");
        img.src = avatarUrl;
        img.alt = guest.name || guest.email || "Account";
        img.className = "account-avatar-img";
        img.referrerPolicy = "no-referrer";
        img.onerror = () => {
          accountMenuBtn.replaceChildren();
          accountMenuBtn.textContent = (
            guest.name ||
            guest.email ||
            "G"
          )
            .charAt(0)
            .toUpperCase();
        };
        accountMenuBtn.appendChild(img);
      } else {
        accountMenuBtn.textContent = (
          guest.name ||
          guest.email ||
          "G"
        )
          .charAt(0)
          .toUpperCase();
      }
    }
  } else {
    authEntryItem?.classList.remove("hidden");
    accountMenuWrap?.classList.add("hidden");
    setAccountMenuOpen(false);
    if (accountMenuBtn) accountMenuBtn.replaceChildren();
    if (accountMenuName) accountMenuName.textContent = "";
    if (accountMenuEmail) accountMenuEmail.textContent = "";
  }
}

function logoutGuest() {
  clearGuestAuth();
  currentCartItems = [];
  currentCartPayload = null;
  if (headerCartCount) headerCartCount.textContent = "0";
  renderCartItems([]);
  if (bookingsList) bookingsList.innerHTML = "<li>Signed out.</li>";
  if (bookingsNotice) bookingsNotice.textContent = "";
  if (cartCheckoutNameInput) cartCheckoutNameInput.value = "";
  if (cartCheckoutEmailInput) cartCheckoutEmailInput.value = "";
  if (cartCheckoutPhoneInput) cartCheckoutPhoneInput.value = "";
  if (cartCheckoutStatus) cartCheckoutStatus.textContent = "";
  setAccountMenuOpen(false);
  updateAuthStateUI();
  hideError();
}

function renderCartItems(items) {
  if (!cartItemsList) return;
  cartItemsList.innerHTML = "";
  if (!items.length) {
    cartItemsList.innerHTML = "<li>Cart is empty.</li>";
    return;
  }
  items.forEach((item) => {
    const checkInText = toDateOnlyText(item.checkIn);
    const checkOutText = toDateOnlyText(item.checkOut);
    const li = document.createElement("li");
    li.className = "cart-item-row";
    li.innerHTML = `
      <span>${item.roomName || item.roomId} · ${checkInText} to ${checkOutText}</span>
      <button type="button" class="btn outline" data-cart-remove>Remove</button>
    `;
    li.querySelector("[data-cart-remove]")?.addEventListener("click", async () => {
      try {
        await apiRequest("/api/guest/bookings/cart/items", {
          method: "DELETE",
          auth: true,
          body: {
            roomId: item.roomId,
            checkIn: toDateOnlyText(item.checkIn),
            checkOut: toDateOnlyText(item.checkOut),
          },
        });
        await loadCart();
      } catch (error) {
        showError(error.message);
      }
    });
    cartItemsList.appendChild(li);
  });
}

function renderCartPricingSummary(payload) {
  if (!cartTotalPrice || !cartPriceBreakdownPanel || !cartPriceBreakdownToggleBtn) return;
  const roomInfo = Array.isArray(payload?.roomInfo) ? payload.roomInfo : [];
  const total = Number(payload?.totalPrice || 0);
  cartTotalPrice.textContent = `₹${total.toLocaleString("en-IN")}`;
  cartPriceBreakdownPanel.classList.add("hidden");
  cartPriceBreakdownToggleBtn.textContent = "View Price Breakdown";

  if (!roomInfo.length) {
    cartPriceBreakdownPanel.innerHTML = "";
    cartPriceBreakdownToggleBtn.disabled = true;
    return;
  }

  cartPriceBreakdownToggleBtn.disabled = false;
  const roomSections = roomInfo
    .map((room) => {
      const roomName = room.roomName || room.roomId || "Room";
      const roomPrice = Number(room.price || 0);
      const rows = Array.isArray(room.priceBreakdown) ? room.priceBreakdown : [];
      const breakdownRows = rows.length
        ? rows
            .map((row) => {
              const dateText = toDateOnlyText(row.date);
              const price = Number(row.price || 0).toLocaleString("en-IN");
              const reason = row.reason ? ` (${row.reason})` : "";
              return `<li>${dateText}: ₹${price}${reason}</li>`;
            })
            .join("")
        : "<li>No daily breakdown provided.</li>";
      return `
        <div class="cart-breakdown-room">
          <p class="cart-breakdown-room-title">
            <strong>${roomName}</strong> - ₹${roomPrice.toLocaleString("en-IN")}
          </p>
          <ul class="cart-breakdown-list">${breakdownRows}</ul>
        </div>
      `;
    })
    .join("");

  cartPriceBreakdownPanel.innerHTML = roomSections;
}

async function loadCart() {
  if (!getGuestToken()) {
    if (headerCartCount) headerCartCount.textContent = "0";
    currentCartItems = [];
    currentCartPayload = null;
    renderCartItems([]);
    renderCartPricingSummary(null);
    return;
  }
  const { payload } = await apiRequest("/api/guest/bookings/cart", { auth: true });
  const roomInfo = Array.isArray(payload.roomInfo)
    ? payload.roomInfo
    : Array.isArray(payload.message)
      ? payload.message
      : [];
  currentCartPayload = payload;
  currentCartItems = roomInfo;
  if (headerCartCount) headerCartCount.textContent = String(roomInfo.length);
  renderCartItems(roomInfo);
  renderCartPricingSummary(payload);
}

async function addCurrentSelectionToCart() {
  if (!getGuestToken()) {
    requireGuestSignIn("Sign in with Google first to add items to cart.");
  }
  if (!checkInInput.value || !checkOutInput.value) {
    throw new Error("Select check-in and check-out dates first.");
  }
  await apiRequest("/api/guest/bookings/cart/items", {
    method: "POST",
    auth: true,
    body: {
      roomId: selectedRoomId,
      checkIn: toDateOnlyText(checkInInput.value),
      checkOut: toDateOnlyText(checkOutInput.value),
      adults: Number(adultCountInput.value || 1),
      children: Number(childCountInput.value || 0),
    },
  });
  await loadCart();
}

async function loadBookings() {
  if (!getGuestToken()) {
    bookingsList.innerHTML = "<li>Sign in to view bookings.</li>";
    return;
  }
  const { payload } = await apiRequest("/api/guest/bookings", { auth: true });
  const rows = Array.isArray(payload.data) ? payload.data : [];
  bookingsList.innerHTML = "";
  if (!rows.length) {
    bookingsList.innerHTML = "<li>No bookings found.</li>";
    return;
  }
  rows.forEach((booking) => {
    const firstRoom = booking.rooms?.[0];
    const status = String(booking.status || "pending").toLowerCase();
    const roomLabel =
      firstRoom?.roomName || firstRoom?.roomId || "Room";
    const amount = Number(booking.totalAmount || 0).toLocaleString("en-IN");
    const checkIn = toDateOnlyText(
      firstRoom?.checkIn || booking.checkIn || "",
    );
    const checkOut = toDateOnlyText(
      firstRoom?.checkOut || booking.checkOut || "",
    );
    const dateLabel =
      checkIn && checkOut ? `${checkIn} → ${checkOut}` : "";
    const li = document.createElement("li");
    li.className = "booking-row guest-booking-row";
    li.dataset.bookingId = booking._id || booking.id || "";
    li.dataset.bookingStatus = status;

    const canPay =
      status === "approved" && !isPaymentWindowExpired(booking);
    const expiredApproved =
      status === "approved" && isPaymentWindowExpired(booking);
    const statusMsg = expiredApproved
      ? "Payment window expired. Submit a new booking request to continue."
      : bookingStatusMessage(booking);

    const main = document.createElement("div");
    main.className = "booking-main";

    const badge = document.createElement("span");
    badge.className = `status-badge ${status}`;
    badge.textContent = bookingStatusLabel(status);
    main.appendChild(badge);

    const title = document.createElement("p");
    title.className = "guest-booking-title";
    title.textContent = `${roomLabel} · ₹${amount}`;
    main.appendChild(title);

    if (dateLabel) {
      const dates = document.createElement("p");
      dates.className = "guest-booking-meta";
      dates.textContent = dateLabel;
      main.appendChild(dates);
    }

    if (statusMsg) {
      const meta = document.createElement("p");
      meta.className = "guest-booking-meta";
      meta.textContent = statusMsg;
      main.appendChild(meta);
    }

    const actions = document.createElement("div");
    actions.className = "row-actions";

    if (canPay) {
      const payBtn = document.createElement("button");
      payBtn.type = "button";
      payBtn.className = "btn primary";
      payBtn.textContent = "Pay now";
      payBtn.addEventListener("click", async () => {
        payBtn.disabled = true;
        if (bookingsNotice) bookingsNotice.textContent = "Opening payment...";
        try {
          await payApprovedBooking(booking);
          if (bookingsNotice) bookingsNotice.textContent = "";
        } catch (error) {
          if (bookingsNotice) {
            bookingsNotice.textContent =
              error.message || "Unable to start payment.";
          }
          payBtn.disabled = false;
        }
      });
      actions.appendChild(payBtn);
    } else if (expiredApproved) {
      const hint = document.createElement("p");
      hint.className = "guest-booking-meta";
      hint.textContent = "Pay is unavailable — request again from your cart.";
      actions.appendChild(hint);
    }

    li.appendChild(main);
    li.appendChild(actions);
    bookingsList.appendChild(li);
  });
}

async function refreshBookingsIfOpen() {
  if (!getGuestToken()) return;
  if (!bookingsModal || bookingsModal.classList.contains("hidden")) return;
  try {
    await loadBookings();
  } catch {
    /* ignore background refresh errors */
  }
}

async function updateBookingSummary() {
  if (
    !checkInInput ||
    !checkOutInput ||
    !summaryList ||
    !totalPriceDisplay ||
    !depositPriceDisplay ||
    !nightCountDisplay ||
    !adultCountInput ||
    !childCountInput
  ) {
    return;
  }
  hideError();
  const checkIn = checkInInput.value;
  const checkOut = checkOutInput.value;
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    summaryList.innerHTML = "<li>Select check-in and check-out dates</li>";
    totalPriceDisplay.textContent = "₹0";
    depositPriceDisplay.textContent = "₹0";
    setAvailabilityState(null);
    return;
  }

  const nights = calculateNights(parseDateOnly(checkIn), parseDateOnly(checkOut));
  nightCountDisplay.textContent = `${nights} night${nights !== 1 ? "s" : ""}`;
  setAvailabilityState("loading", "Checking availability...");
  try {
    const quote = await quoteRoom(checkIn, checkOut);
    lastQuote = quote;
    const room = getSelectedRoom();
    lastPricing = normalizePricingData(quote, room?.name || selectedRoomId);
    if (!lastPricing) throw new Error("Invalid pricing response.");
    selectedPrepaidId = lastPricing.primaryPrepaidId;
    const fallbackTotalPrice = Number(room?.price || 0) * nights;
    const totalPrice = Number(lastPricing.totalPrice || fallbackTotalPrice || 0);
    const option =
      lastPricing.prepaidOptions.find((row) => row.id === selectedPrepaidId) ||
      lastPricing.prepaidOptions[0];
    const prepaidAmount = Number(option?.prepaidAmount || 0);

    summaryList.innerHTML = `
      <li><strong>Room:</strong> ${lastPricing.roomNames.join(", ")}</li>
      <li><strong>Check-in:</strong> ${checkIn}</li>
      <li><strong>Check-out:</strong> ${checkOut}</li>
      <li><strong>Guests:</strong> ${Number(adultCountInput.value || 1)} adult(s), ${Number(childCountInput.value || 0)} child(ren)</li>
      <li><strong>Plan:</strong> ${option?.label || "Prepaid"}</li>
    `;
    totalPriceDisplay.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;
    depositPriceDisplay.textContent = `₹${prepaidAmount.toLocaleString("en-IN")}`;
    setAvailabilityState("success", "Dates available.");
  } catch (error) {
    lastQuote = null;
    lastPricing = null;
    selectedPrepaidId = null;
    totalPriceDisplay.textContent = "₹0";
    depositPriceDisplay.textContent = "₹0";
    summaryList.innerHTML = "<li>Unable to fetch quote for selected dates.</li>";
    setAvailabilityState("error", error.message || "Dates not available.");
  }
}

function validateBookingForm() {
  const guestName = guestNameInput.value.trim();
  const guestEmail = guestEmailInput.value.trim();
  const guestPhone = guestPhoneInput.value.trim();
  if (!guestName || !guestEmail || !guestPhone) {
    throw new Error("Please fill in guest details.");
  }
  if (!selectedRoomId) {
    throw new Error("Please select a room.");
  }
  if (!checkInInput.value || !checkOutInput.value) {
    throw new Error("Please select check-in and check-out dates.");
  }
  if (!lastPricing || !Array.isArray(lastPricing.prepaidOptions) || !lastPricing.prepaidOptions.length) {
    throw new Error("Quote is not available for selected dates.");
  }
}

function showTermsModal() {
  const totalEl = document.getElementById("termsTotalPrice");
  const rulesEl = document.getElementById("termsAppliedRules");
  totalEl.textContent = totalPriceDisplay.textContent;
  if (rulesEl) rulesEl.classList.add("hidden");
  renderPaymentOptions(lastPricing);
  termsModal.classList.remove("hidden");
  modalBackdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function hideTermsModal() {
  termsModal.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
  document.body.style.overflow = "";
}

function renderSiteGalleryCarousel() {
  const track = document.getElementById("adminShotsTrack");
  if (!track) return;
  const images = siteGalleryImages.length
    ? siteGalleryImages
    : [SITE_GALLERY_PLACEHOLDER];
  track.innerHTML = images
    .map(
      (src, idx) => `
      <div class="admin-shots-slide">
        <img src="${src}" alt="Site gallery image ${idx + 1}" loading="lazy" decoding="async" />
      </div>
    `,
    )
    .join("");

  track.querySelectorAll(".admin-shots-slide img").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        if (img.dataset.fallbackApplied === "1") return;
        img.dataset.fallbackApplied = "1";
        img.src = SITE_GALLERY_PLACEHOLDER;
      },
      { once: true },
    );
  });

  initAdminShotsCarousel();
}

function showRoomViewerImage(index) {
  if (!currentRoomPhotos.length || !roomViewerImage || !roomViewerPrevBtn || !roomViewerNextBtn) return;
  currentRoomPhotoIndex =
    (index + currentRoomPhotos.length) % currentRoomPhotos.length;
  roomViewerImage.src = currentRoomPhotos[currentRoomPhotoIndex];
  roomViewerImage.alt = currentRoomTitle;
  roomViewerImage.classList.remove("hidden");
  roomViewerPrevBtn.classList.toggle("hidden", currentRoomPhotos.length <= 1);
  roomViewerNextBtn.classList.toggle("hidden", currentRoomPhotos.length <= 1);
}

function openRoomPhotosModal(roomId) {
  const room = roomsById.get(roomId);
  if (!room || !roomPhotosViewer || !roomPhotosBackdrop || !roomViewerCaption || !roomViewerImage) return;
  const gallery = Array.isArray(room.images?.gallery) ? room.images.gallery : [];
  const banner = room.images?.banner ? [room.images.banner] : [];
  currentRoomPhotos = [...banner, ...gallery];
  currentRoomTitle = room.name || room.roomId || "Room";
  currentRoomPhotoIndex = 0;

  if (currentRoomPhotos.length > 0) {
    roomViewerCaption.classList.add("hidden");
    showRoomViewerImage(0);
  } else {
    roomViewerImage.src = "";
    roomViewerImage.alt = "";
    roomViewerImage.classList.add("hidden");
    roomViewerCaption.textContent =
      "Room gallery will appear here when images are added.";
    roomViewerCaption.classList.remove("hidden");
    roomViewerPrevBtn?.classList.add("hidden");
    roomViewerNextBtn?.classList.add("hidden");
  }

  roomPhotosViewer.classList.remove("hidden");
  roomPhotosBackdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeRoomPhotosModal() {
  if (!roomPhotosViewer || !roomPhotosBackdrop) return;
  roomPhotosViewer.classList.add("hidden");
  roomPhotosBackdrop.classList.add("hidden");
  document.body.style.overflow = "";
}

function setRoomCartMinDates() {
  if (!roomCartCheckInInput || !roomCartCheckOutInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  roomCartCheckInInput.min = formatDate(tomorrow);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  roomCartCheckOutInput.min = formatDate(dayAfterTomorrow);
}

function openRoomCartModal(roomId) {
  const room = roomsById.get(roomId);
  roomCartSelectedRoomId = roomId;
  if (roomCartModalTitle) {
    roomCartModalTitle.textContent = `Add ${room?.name || roomId} To Cart`;
  }
  if (roomCartCheckInInput) roomCartCheckInInput.value = "";
  if (roomCartCheckOutInput) roomCartCheckOutInput.value = "";
  if (roomCartAdultsInput) roomCartAdultsInput.value = "2";
  if (roomCartChildrenInput) roomCartChildrenInput.value = "0";
  if (roomCartQuoteStatus) {
    setRoomCartQuoteStatus("Choose dates to check availability.");
  }
  setRoomCartMinDates();
  openModal(roomCartModal, roomCartModalBackdrop);
}

function scheduleRoomCartQuoteCheck() {
  clearTimeout(roomCartQuoteDebounce);
  roomCartQuoteDebounce = setTimeout(async () => {
    const checkIn = roomCartCheckInInput?.value;
    const checkOut = roomCartCheckOutInput?.value;
    if (!roomCartSelectedRoomId || !checkIn || !checkOut || checkOut <= checkIn) {
      if (roomCartQuoteStatus) {
        setRoomCartQuoteStatus("Choose valid dates to check availability.");
      }
      return;
    }

    if (roomCartQuoteStatus) {
      setRoomCartQuoteStatus("Checking availability and quote...");
    }
    try {
      const quote = await quoteRoomById(roomCartSelectedRoomId, checkIn, checkOut);
      const quoteOptions = Array.isArray(quote.prepaidOptions) ? quote.prepaidOptions : [];
      const quoteRoomInfo = Array.isArray(quote.roomInfo) ? quote.roomInfo : [];
      const firstRoom = quoteRoomInfo[0] || {};
      const backendReservePercent = Number(
        quote.lowerPercent ||
          firstRoom.lowerPercent ||
          quote.lowerPrepaidPercent ||
          firstRoom.lowerPrepaidPercent ||
          0,
      );
      let backendReserveAmount = Number(
        quote.lowerPayableTotal ||
          quote.lowerPrepaidAmount ||
          firstRoom.lowerPayableTotal ||
          firstRoom.lowerPrepaidAmount ||
          0,
      );
      if (!(backendReservePercent > 0 && backendReserveAmount > 0)) {
        const roomOptions = Array.isArray(firstRoom.prepaidOptions)
          ? firstRoom.prepaidOptions
          : [];
        const reserveOption =
          [...quoteOptions, ...roomOptions]
            .filter((row) => Number(row?.percent || 0) > 0)
            .sort((a, b) => Number(a.percent || 0) - Number(b.percent || 0))[0] ||
          null;
        backendReserveAmount = Number(
          quote.lowerPayableTotal ||
            quote.lowerPrepaidAmount ||
            firstRoom.lowerPayableTotal ||
            firstRoom.lowerPrepaidAmount ||
            reserveOption?.prepaidAmount ||
            0,
        );
        const fallbackPercent = Number(reserveOption?.percent || 0);
        if (!(backendReservePercent > 0) && fallbackPercent > 0) {
          // Keep same variable name usage below while only fixing missing lower-tier data.
          setRoomCartQuoteStatus(
            backendReserveAmount > 0
              ? `Available. Reserve now at ₹${backendReserveAmount.toLocaleString("en-IN")} (${fallbackPercent}% advance).`
              : "Available for selected dates.",
            "available",
          );
          return;
        }
      }
      if (roomCartQuoteStatus) {
        setRoomCartQuoteStatus(
          backendReservePercent > 0
            ? `Available. Reserve now at ₹${backendReserveAmount.toLocaleString("en-IN")} (${backendReservePercent}% advance).`
            : "Available for selected dates.",
          "available",
        );
      }
    } catch (error) {
      if (roomCartQuoteStatus) {
        setRoomCartQuoteStatus(
          error.message || "Not available for selected dates.",
          "unavailable",
        );
      }
    }
  }, 350);
}

async function confirmRoomCartAdd() {
  if (!getGuestToken()) {
    requireGuestSignIn("Sign in with Google first to add room to cart.");
  }
  const checkIn = roomCartCheckInInput?.value;
  const checkOut = roomCartCheckOutInput?.value;
  if (!roomCartSelectedRoomId || !checkIn || !checkOut || checkOut <= checkIn) {
    throw new Error("Please select valid check-in and check-out dates.");
  }

  await quoteRoomById(roomCartSelectedRoomId, checkIn, checkOut);
  await apiRequest("/api/guest/bookings/cart/items", {
    method: "POST",
    auth: true,
    body: {
      roomId: roomCartSelectedRoomId,
      checkIn: toDateOnlyText(checkIn),
      checkOut: toDateOnlyText(checkOut),
      adults: Number(roomCartAdultsInput?.value || 1),
      children: Number(roomCartChildrenInput?.value || 0),
    },
  });
  await loadCart();
}

function initAdminShotsCarousel() {
  const track = document.getElementById("adminShotsTrack");
  const prevBtn = document.querySelector(".admin-shots-prev");
  const nextBtn = document.querySelector(".admin-shots-next");
  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll(".admin-shots-slide"));
  if (!slides.length) return;

  galleryCarouselCount = slides.length;
  galleryCarouselIndex = 0;
  track.style.width = "100%";
  track.style.transition = "transform 0.6s ease";
  track.style.transform = "translateX(0)";

  slides.forEach((slide) => {
    slide.style.flex = "0 0 100%";
  });

  function moveTo(index) {
    galleryCarouselIndex =
      (index + galleryCarouselCount) % galleryCarouselCount;
    track.style.transform = `translateX(-${galleryCarouselIndex * 100}%)`;
  }

  function next() {
    moveTo(galleryCarouselIndex + 1);
    restartAuto();
  }

  function prev() {
    moveTo(galleryCarouselIndex - 1);
    restartAuto();
  }

  function restartAuto() {
    if (galleryCarouselInterval) clearInterval(galleryCarouselInterval);
    galleryCarouselInterval = setInterval(() => {
      moveTo(galleryCarouselIndex + 1);
    }, 3500);
  }

  prevBtn.onclick = prev;
  nextBtn.onclick = next;
  restartAuto();
}

function updateBodyScrollLock() {
  const hasOpenModal = Boolean(document.querySelector(".modal:not(.hidden)"));
  const roomViewerOpen = roomPhotosViewer && !roomPhotosViewer.classList.contains("hidden");
  const shouldLock = hasOpenModal || roomViewerOpen;
  const htmlEl = document.documentElement;
  const bodyEl = document.body;

  if (shouldLock) {
    if (!bodyEl.classList.contains("modal-open")) {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      bodyEl.style.position = "fixed";
      bodyEl.style.top = `-${lockedScrollY}px`;
      bodyEl.style.left = "0";
      bodyEl.style.right = "0";
      bodyEl.style.width = "100%";
    }
    bodyEl.classList.add("modal-open");
    htmlEl.classList.add("modal-open");
    return;
  }

  if (bodyEl.classList.contains("modal-open")) {
    bodyEl.style.position = "";
    bodyEl.style.top = "";
    bodyEl.style.left = "";
    bodyEl.style.right = "";
    bodyEl.style.width = "";
    window.scrollTo(0, lockedScrollY);
  }
  bodyEl.classList.remove("modal-open");
  htmlEl.classList.remove("modal-open");
}

function openModal(modal, backdrop) {
  modal?.classList.remove("hidden");
  backdrop?.classList.remove("hidden");
  if (modal?.id === "cartDrawer") {
    document.body.classList.add("cart-modal-open");
  }
  updateBodyScrollLock();
}

function closeModal(modal, backdrop) {
  modal?.classList.add("hidden");
  backdrop?.classList.add("hidden");
  if (modal?.id === "cartDrawer") {
    document.body.classList.remove("cart-modal-open");
  }
  updateBodyScrollLock();
}

function setAuthStatus(message) {
  if (authStatus) authStatus.textContent = message || "";
}

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[data-google-gsi="1"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Sign-In.")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleGsi = "1";
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Sign-In."));
    document.head.appendChild(script);
  });
}

function decodeJwtPayload(token) {
  try {
    const part = String(token || "").split(".")[1];
    if (!part) return null;
    const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

async function completeGuestSignIn(payload, googleCredential = "") {
  if (!payload?.success || !payload?.token || !payload?.guest) {
    throw new Error("Invalid Google sign-in response.");
  }

  const guest = { ...payload.guest };
  if (!guest.avatar && googleCredential) {
    const googlePayload = decodeJwtPayload(googleCredential);
    if (googlePayload?.picture) guest.avatar = String(googlePayload.picture);
  }

  localStorage.setItem(GUEST_JWT_KEY, payload.token);
  localStorage.setItem(GUEST_USER_KEY, JSON.stringify(guest));
  updateAuthStateUI();
  setAuthStatus("");
  closeModal(authModal, authModalBackdrop);

  if (cartCheckoutNameInput && !cartCheckoutNameInput.value) {
    cartCheckoutNameInput.value = guest.name || "";
  }
  if (cartCheckoutEmailInput && !cartCheckoutEmailInput.value) {
    cartCheckoutEmailInput.value = guest.email || "";
  }

  try {
    await loadCart();
    await loadBookings();
  } catch (error) {
    showError(
      error.message ||
        "Signed in, but bookings are temporarily unavailable.",
    );
  }
}

async function handleGoogleCredentialResponse(response) {
  try {
    setAuthStatus("Signing you in...");
    const credential = response?.credential;
    if (!credential) {
      throw new Error("Google did not return a credential.");
    }
    const { payload } = await apiRequest("/api/guest-auth/google", {
      method: "POST",
      body: {
        propertySlug: PROPERTY_SLUG,
        credential,
      },
    });
    await completeGuestSignIn(payload, credential);
  } catch (error) {
    setAuthStatus(error.message || "Google sign-in failed.");
  }
}

async function initGoogleSignIn() {
  if (!googleSignInBtn) return;
  if (!GOOGLE_CLIENT_ID) {
    setAuthStatus("Google sign-in is not configured.");
    return;
  }
  await loadGoogleIdentityScript();
  if (!window.google?.accounts?.id) {
    throw new Error("Google Sign-In failed to initialize.");
  }
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredentialResponse,
    auto_select: false,
    ux_mode: "popup",
    context: "signin",
  });
  googleSignInBtn.innerHTML = "";
  window.google.accounts.id.renderButton(googleSignInBtn, {
    theme: "outline",
    size: "large",
    text: "signin_with",
    shape: "rectangular",
    width: 320,
    logo_alignment: "left",
  });
  googleSignInReady = true;
}

async function openGuestAuthModal() {
  setAuthStatus("");
  openModal(authModal, authModalBackdrop);
  try {
    if (!googleSignInReady) {
      setAuthStatus("Loading Google Sign-In...");
      await initGoogleSignIn();
      setAuthStatus("");
    } else if (window.google?.accounts?.id && googleSignInBtn) {
      googleSignInBtn.innerHTML = "";
      window.google.accounts.id.renderButton(googleSignInBtn, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 320,
        logo_alignment: "left",
      });
    }
  } catch (error) {
    setAuthStatus(error.message || "Unable to load Google Sign-In.");
  }
}

function requireGuestSignIn(message) {
  openGuestAuthModal();
  throw new Error(message || "Sign in with Google to continue.");
}

function setMinDates() {
  if (!checkInInput || !checkOutInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  checkInInput.min = formatDate(tomorrow);
  const maxAdvance = new Date();
  maxAdvance.setMonth(maxAdvance.getMonth() + 3);
  checkInInput.max = formatDate(maxAdvance);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  checkOutInput.min = formatDate(dayAfterTomorrow);
}

async function createBookingRequest({ name, email, phone }) {
  const { payload } = await apiRequest("/api/guest/bookings/requests", {
    method: "POST",
    auth: true,
    body: { name, email, phone },
  });
  return payload;
}

async function createPaymentOrder({
  bookingId,
  prepaidOptionId,
  prepaidPercent,
}) {
  if (!bookingId) {
    throw new Error("Missing booking to pay for.");
  }
  const body = { bookingId };
  if (prepaidOptionId) body.prepaidOptionId = prepaidOptionId;
  if (
    prepaidPercent !== undefined &&
    prepaidPercent !== null &&
    prepaidPercent !== ""
  ) {
    body.prepaidPercent = Number(prepaidPercent);
  }

  try {
    const { payload } = await apiRequest("/api/guest/payments/order", {
      method: "POST",
      auth: true,
      body,
    });
    if (!payload?.data?.razorpayOrderId || !payload?.data?.key) {
      throw new Error("Payment order response missing razorpayOrderId/key.");
    }
    return payload;
  } catch (error) {
    if (error.status === 410) {
      throw new Error(
        "Payment window expired. Please submit a new booking request.",
      );
    }
    if (error.status === 400) {
      throw new Error(
        error.message ||
          "This booking is not payable yet. Wait for property confirmation.",
      );
    }
    throw error;
  }
}

async function verifyPaymentWithBackend(paymentResponse) {
  const { payload } = await apiRequest("/api/guest/payments/verify", {
    method: "POST",
    auth: true,
    body: {
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,
    },
  });
  return payload.success === true;
}

function launchRazorpay(orderPayload, prefill = {}, description = "Room booking") {
  const data = orderPayload.data;
  const amount = Number(
    data.expectedPrepaidAmount ?? data.totalAmount ?? 0,
  );
  const razorpayAmount = Math.max(0, Math.round(amount * 100));
  const options = {
    key: data.key,
    amount: razorpayAmount,
    currency: "INR",
    name: "Anudina Kuteera",
    description,
    order_id: data.razorpayOrderId,
    prefill: {
      name: prefill.name || "",
      email: prefill.email || "",
      contact: prefill.phone || "",
    },
    handler: async function (response) {
      try {
        const ok = await verifyPaymentWithBackend(response);
        if (!ok) throw new Error("Payment verification failed.");
        window.location.href = "/?payment=success";
      } catch (error) {
        showError(error.message || "Payment verification failed.");
      }
    },
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

function resolvePrepaidForPayment(booking) {
  const preferred = getPreferredPrepaid();
  const bookingOptions = Array.isArray(booking?.prepaidOptions)
    ? booking.prepaidOptions
    : [];
  if (preferred?.id) {
    const match = bookingOptions.find(
      (option) => String(option.id) === String(preferred.id),
    );
    if (match || !bookingOptions.length) {
      return {
        prepaidOptionId: preferred.id,
        prepaidPercent: preferred.percent,
      };
    }
  }
  const primary =
    bookingOptions.find((option) => option.isPrimary) || bookingOptions[0];
  if (primary?.id) {
    return {
      prepaidOptionId: primary.id,
      prepaidPercent: Number(primary.percent || 0) || undefined,
    };
  }
  if (preferred?.percent) {
    return { prepaidPercent: preferred.percent };
  }
  return {};
}

async function payApprovedBooking(booking) {
  const bookingId = booking?._id || booking?.id;
  if (!bookingId) throw new Error("Missing booking id.");
  if (String(booking.status || "").toLowerCase() !== "approved") {
    throw new Error("Only approved bookings can be paid.");
  }
  if (isPaymentWindowExpired(booking)) {
    throw new Error(
      "Payment window expired. Please submit a new booking request.",
    );
  }

  const prepaid = resolvePrepaidForPayment(booking);
  const order = await createPaymentOrder({
    bookingId,
    ...prepaid,
  });
  const guest = getGuestUser() || {};
  const roomName =
    booking.rooms?.[0]?.roomName || booking.rooms?.[0]?.roomId || "Room";
  launchRazorpay(
    order,
    {
      name: guest.name || "",
      email: guest.email || "",
      phone: guest.phone || "",
    },
    `${roomName} booking`,
  );
}

async function handleFormSubmit(e) {
  e.preventDefault();
  hideError();
  try {
    validateBookingForm();
    pendingPaymentData = {
      roomId: selectedRoomId,
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
    };
    showTermsModal();
  } catch (error) {
    showError(error.message);
  }
}

async function proceedWithBooking() {
  hideTermsModal();
  try {
    if (!getGuestToken()) {
      requireGuestSignIn("Sign in with Google first to submit a booking request.");
    }
    if (selectedPrepaidId && lastPricing?.prepaidOptions?.length) {
      const option =
        lastPricing.prepaidOptions.find((row) => row.id === selectedPrepaidId) ||
        lastPricing.prepaidOptions[0];
      if (option) savePreferredPrepaid(option);
    }
    await addCurrentSelectionToCart();
    const guest = getGuestUser() || {};
    const guestName = guestNameInput?.value?.trim() || guest.name || "";
    const guestEmail = guestEmailInput?.value?.trim() || guest.email || "";
    const guestPhone = guestPhoneInput?.value?.trim() || "";
    if (!guestName || !guestEmail || !guestPhone) {
      throw new Error("Please fill name, email, and phone.");
    }
    await createBookingRequest({
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
    });
    await loadCart();
    if (bookingsNotice) {
      bookingsNotice.textContent =
        "Request submitted. Waiting for property confirmation.";
    }
    await loadBookings();
    openModal(bookingsModal, bookingsModalBackdrop);
  } catch (error) {
    showError(error.message || "Unable to submit booking request.");
  }
}

function validateCartCheckoutDetails() {
  const name = cartCheckoutNameInput?.value?.trim() || "";
  const email = cartCheckoutEmailInput?.value?.trim() || "";
  const phone = cartCheckoutPhoneInput?.value?.trim() || "";
  if (!name || !email || !phone) {
    throw new Error("Please fill name, email, and phone.");
  }
  return { name, email, phone };
}

async function proceedCartCheckout() {
  if (!getGuestToken()) {
    requireGuestSignIn("Sign in with Google to proceed.");
  }
  if (!currentCartItems.length) {
    throw new Error("Your cart is empty.");
  }
  const details = validateCartCheckoutDetails();
  if (cartSelectedPrepaidId && cartLastPricing?.prepaidOptions?.length) {
    const option =
      cartLastPricing.prepaidOptions.find(
        (row) => row.id === cartSelectedPrepaidId,
      ) || cartLastPricing.prepaidOptions[0];
    if (option) savePreferredPrepaid(option);
  }
  await createBookingRequest(details);
  await loadCart();
  if (cartCheckoutStatus) {
    cartCheckoutStatus.textContent =
      "Request submitted. Waiting for property confirmation.";
  }
  if (bookingsNotice) {
    bookingsNotice.textContent =
      "Request submitted. Waiting for property confirmation.";
  }
  closeModal(cartDrawer, cartDrawerBackdrop);
  await loadBookings();
  openModal(bookingsModal, bookingsModalBackdrop);
}

function openCartTermsModal() {
  if (cartTermsCheckbox) cartTermsCheckbox.checked = false;
  if (cartTermsNotice) cartTermsNotice.textContent = "";
  openModal(cartTermsModal, cartTermsModalBackdrop);
}

function setupEvents() {
  bookingForm?.addEventListener("submit", handleFormSubmit);
  termsAgreeBtn?.addEventListener("click", proceedWithBooking);
  modalCloseBtn?.addEventListener("click", hideTermsModal);
  modalBackdrop?.addEventListener("click", hideTermsModal);
  roomSelect?.addEventListener("change", () => {
    selectedRoomId = roomSelect.value;
    updateBookingSummary();
  });
  checkInInput?.addEventListener("change", () => {
    if (checkInInput.value && checkOutInput) {
      const checkIn = parseDateOnly(checkInInput.value);
      const minCheckOut = new Date(checkIn);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      checkOutInput.min = formatDate(minCheckOut);
    }
    updateBookingSummary();
  });
  checkOutInput?.addEventListener("change", updateBookingSummary);
  adultCountInput?.addEventListener("change", updateBookingSummary);
  childCountInput?.addEventListener("change", updateBookingSummary);
  menuLogoutBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    logoutGuest();
  });
  addToCartBtn?.addEventListener("click", async () => {
    hideError();
    try {
      await addCurrentSelectionToCart();
      showError("Added to cart.");
    } catch (error) {
      showError(error.message);
    }
  });
  menuMyBookingsBtn?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    hideError();
    setAccountMenuOpen(false);
    try {
      if (bookingsNotice) bookingsNotice.textContent = "";
      await loadBookings();
      openModal(bookingsModal, bookingsModalBackdrop);
    } catch (error) {
      showError(error.message);
    }
  });
  headerCartBtn?.addEventListener("click", async () => {
    hideError();
    try {
      await loadCart();
      const guest = getGuestUser() || {};
      if (cartCheckoutNameInput && !cartCheckoutNameInput.value) {
        cartCheckoutNameInput.value = guest.name || "";
      }
      if (cartCheckoutEmailInput && !cartCheckoutEmailInput.value) {
        cartCheckoutEmailInput.value = guest.email || "";
      }
      await refreshCartPaymentOptions();
      openModal(cartDrawer, cartDrawerBackdrop);
    } catch (error) {
      showError(error.message);
    }
  });
  openAuthModalBtn?.addEventListener("click", () => {
    openGuestAuthModal();
  });
  accountMenuBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const willOpen = accountMenu?.classList.contains("hidden");
    setAccountMenuOpen(Boolean(willOpen));
  });
  document.addEventListener("click", (event) => {
    if (!accountMenuWrap || accountMenu?.classList.contains("hidden")) return;
    if (!accountMenuWrap.contains(event.target)) {
      setAccountMenuOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setAccountMenuOpen(false);
  });
  authModalCloseBtn?.addEventListener("click", () => closeModal(authModal, authModalBackdrop));
  authModalBackdrop?.addEventListener("click", () => closeModal(authModal, authModalBackdrop));
  cartDrawerCloseBtn?.addEventListener("click", () => closeModal(cartDrawer, cartDrawerBackdrop));
  cartDrawerBackdrop?.addEventListener("click", () => closeModal(cartDrawer, cartDrawerBackdrop));
  cartTermsModalCloseBtn?.addEventListener("click", () =>
    closeModal(cartTermsModal, cartTermsModalBackdrop),
  );
  cartTermsModalBackdrop?.addEventListener("click", () =>
    closeModal(cartTermsModal, cartTermsModalBackdrop),
  );
  bookingsModalCloseBtn?.addEventListener("click", () =>
    closeModal(bookingsModal, bookingsModalBackdrop),
  );
  bookingsModalBackdrop?.addEventListener("click", () =>
    closeModal(bookingsModal, bookingsModalBackdrop),
  );
  roomViewerCloseBtn?.addEventListener("click", closeRoomPhotosModal);
  roomPhotosBackdrop?.addEventListener("click", closeRoomPhotosModal);
  roomViewerPrevBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    showRoomViewerImage(currentRoomPhotoIndex - 1);
  });
  roomViewerNextBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    showRoomViewerImage(currentRoomPhotoIndex + 1);
  });
  roomCartModalCloseBtn?.addEventListener("click", () =>
    closeModal(roomCartModal, roomCartModalBackdrop),
  );
  roomCartModalBackdrop?.addEventListener("click", () =>
    closeModal(roomCartModal, roomCartModalBackdrop),
  );
  roomCartCheckInInput?.addEventListener("change", () => {
    if (roomCartCheckInInput.value && roomCartCheckOutInput) {
      const checkIn = parseDateOnly(roomCartCheckInInput.value);
      const minCheckOut = new Date(checkIn);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      roomCartCheckOutInput.min = formatDate(minCheckOut);
      if (
        roomCartCheckOutInput.value &&
        parseDateOnly(roomCartCheckOutInput.value) <= checkIn
      ) {
        roomCartCheckOutInput.value = "";
      }
    }
    scheduleRoomCartQuoteCheck();
  });
  roomCartCheckOutInput?.addEventListener("change", scheduleRoomCartQuoteCheck);
  roomCartAdultsInput?.addEventListener("change", scheduleRoomCartQuoteCheck);
  roomCartChildrenInput?.addEventListener("change", scheduleRoomCartQuoteCheck);
  roomCartConfirmBtn?.addEventListener("click", async () => {
    hideError();
    try {
      roomCartConfirmBtn.disabled = true;
      await confirmRoomCartAdd();
      if (roomCartQuoteStatus) {
        roomCartQuoteStatus.textContent = "Item added to cart successfully.";
      }
      setTimeout(() => {
        closeModal(roomCartModal, roomCartModalBackdrop);
      }, 900);
    } catch (error) {
      if (roomCartQuoteStatus) {
        roomCartQuoteStatus.textContent =
          error.message || "Failed to add room to cart.";
      }
    } finally {
      roomCartConfirmBtn.disabled = false;
    }
  });
  cartCheckoutBtn?.addEventListener("click", async () => {
    if (cartCheckoutStatus) cartCheckoutStatus.textContent = "";
    openCartTermsModal();
  });
  cartTermsProceedBtn?.addEventListener("click", async () => {
    if (cartTermsNotice) cartTermsNotice.textContent = "";
    if (!cartTermsCheckbox?.checked) {
      if (cartTermsNotice) {
        cartTermsNotice.textContent = "Please accept Terms & Conditions to continue.";
      }
      return;
    }
    try {
      cartTermsProceedBtn.disabled = true;
      closeModal(cartTermsModal, cartTermsModalBackdrop);
      await proceedCartCheckout();
    } catch (error) {
      if (cartCheckoutStatus) {
        cartCheckoutStatus.textContent =
          error.message || "Unable to submit booking request.";
      }
    } finally {
      cartTermsProceedBtn.disabled = false;
    }
  });
  cartPriceBreakdownToggleBtn?.addEventListener("click", () => {
    if (!cartPriceBreakdownPanel) return;
    const willShow = cartPriceBreakdownPanel.classList.contains("hidden");
    cartPriceBreakdownPanel.classList.toggle("hidden", !willShow);
    if (cartPriceBreakdownToggleBtn) {
      cartPriceBreakdownToggleBtn.textContent = willShow
        ? "Hide Price Breakdown"
        : "View Price Breakdown";
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshBookingsIfOpen();
    }
  });
  window.addEventListener("focus", () => {
    refreshBookingsIfOpen();
  });
}

function initCustomCursor() {
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!hasFinePointer) return;
  const cursorDot = document.querySelector(".pointer-dot");
  const cursorGlow = document.querySelector(".pointer-glow");
  const cursorTrail = document.querySelector(".pointer-trail");
  if (!cursorDot || !cursorGlow || !cursorTrail) return;
  document.body.classList.add("custom-cursor-enabled");
  let mouseX = 0;
  let mouseY = 0;
  let trailX = 0;
  let trailY = 0;
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
  });
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

async function initApp() {
  initCustomCursor();
  setMinDates();
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  setupEvents();
  updateAuthStateUI();
  loadGoogleIdentityScript().catch(() => {
    /* button init will surface errors when modal opens */
  });
  try {
    await loadRooms();
    await loadCart();
    await loadBookings();
    await updateBookingSummary();
  } catch (error) {
    showError(error.message || "Failed to initialize booking app.");
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("payment") === "success" && getGuestToken()) {
    if (bookingsNotice) {
      bookingsNotice.textContent =
        "Payment successful. Your booking is confirmed.";
    }
    try {
      await loadBookings();
      openModal(bookingsModal, bookingsModalBackdrop);
    } catch {
      /* ignore */
    }
    window.history.replaceState({}, "", window.location.pathname);
  }

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.head.appendChild(script);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
