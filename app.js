const KEY = "tongjie_rent_app_v8";
const LINE_OA_URL = "https://lin.ee/QMWEJ6KI";
const LINE_OA_ID = "@773zynao";
const LINE_CHAT_URL = "https://chat.line.biz/";
const LINE_HOOK = "https://tongjie-line.b10619038.workers.dev";
const DATA_API = LINE_HOOK + "/api/state";
const SYNC_KEY = "tj-82934388";
const UI_KEY = "tongjie_ui_v1";
const ADMIN_CODES = ["1976", "7651", "1240"];
function lineBindForRoom(no) {
  const v = ui.lineBinds && ui.lineBinds.byRoom && ui.lineBinds.byRoom[no];
  if (!v) return "";
  return typeof v === "string" ? v : (v.userId || "");
}
function lineBindName(no) {
  const v = ui.lineBinds && ui.lineBinds.byRoom && ui.lineBinds.byRoom[no];
  if (v && typeof v === "object") return v.name || "";
  return "";
}
async function refreshLineBinds() {
  try {
    const res = await fetch(LINE_HOOK + "/binds");
    ui.lineBinds = await res.json();
  } catch {
    ui.lineBinds = ui.lineBinds || { byRoom: {}, byUser: {} };
  }
}
function lineOaMessageUrl(text) {
  return "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_OA_ID) + "/?" + encodeURIComponent(text || "");
}
const DEFAULT_RULES = `1. 每月租金請於繳費日前完成，逾期將依合約處理。
2. 公共區域請保持安靜，晚上 9 點後避免大聲喧嘩。
3. 垃圾請分類並依規定時間放置，勿堆放在走廊或樓梯間。
4. 房間內禁止抽菸、開伙（簡易加熱除外）。
5. 冷氣、熱水器等設備請正常使用，損壞請從 App 報修，勿自行拆修。
6. 電費請至 5 樓自助儲值機刷卡儲值；水費為一年固定 $1,800。
7. 訪客請由承租人陪同，勿將房間轉租或借給他人長期居住。
8. 退租時請恢復原狀並交還鑰匙，押金於點交無誤後退還。`;
const TODAY = new Date("2026-08-26T00:00:00");
const STUDIO_NOS = [
  "6821", "6822", "6823", "6831", "6832", "6841", "6842",
  "7021", "7022", "7023", "7031", "7032", "7041", "7042", "7051",
  "7221", "7222", "7223", "7231", "7232", "7241", "7242", "7251",
  "7611", "7621", "7622", "7623", "7631", "7632", "7641", "7642"
];
const TENANT_BY_ROOM = {
  "6821": "黃宥宇", "6822": "黃莉晏、吳孟書", "6831": "吳昱瑋",
  "6841": "劉冠德", "6842": "吳汶修", "7021": "陳信安", "7022": "郭雅萱",
  "7023": "謝雯鶯", "7031": "朱甫晟", "7032": "楊旻憲", "7041": "劉恩彤",
  "7042": "周佳瑩", "7221": "張智傑", "7222": "廖晉億、林呈澔", "7232": "林紜亦",
  "7611": "波波奇", "7622": "邱育琳", "7623": "陳財源", "7631": "蔡文銘",
  "7632": "謝佩君", "7641": "洪子軒"
};
const AMENITIES = ["冷氣", "冰箱", "洗衣機", "熱水器", "獨立衛浴", "網路", "書桌椅", "電視", "機車停車格"];
const FACTORY_GROUPS = [
  { group: "牛1", street: "文龍東路", company: "", city: "高雄市鳳山區文龍東路", items: [
    { no: "牛1-59", unit: "59號", manager: "文榮" },
    { no: "牛1-61", unit: "61號", manager: "洪潭" },
    { no: "牛1-57巷2", unit: "57巷2號", manager: "浩鈞" },
    { no: "牛1-57巷6", unit: "57巷6號", manager: "文彬" },
    { no: "牛1-57巷8", unit: "57巷8號", manager: "苡真" }
  ]},
  { group: "牛2", street: "文龍東路", company: "", city: "高雄市鳳山區文龍東路", items: [
    { no: "牛2-21", unit: "57巷1弄21號", manager: "洪潭" },
    { no: "牛2-23", unit: "57巷1弄23號", manager: "文榮" },
    { no: "牛2-25", unit: "57巷1弄25號", manager: "洪潭" },
    { no: "牛2-27", unit: "57巷1弄27號", manager: "" },
    { no: "牛2-29", unit: "57巷1弄29號", manager: "" },
    { no: "牛2-31", unit: "57巷1弄31號", manager: "" },
    { no: "牛2-33", unit: "57巷1弄33號", manager: "浩鈞" },
    { no: "牛2-35", unit: "57巷1弄35號", manager: "苡真" }
  ]},
  { group: "牛3", street: "鳳仁路", company: "", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛3-97-63", unit: "97-63號", manager: "成、賢" },
    { no: "牛3-97-65A", unit: "97-65A號", manager: "成、賢" },
    { no: "牛3-97-65B", unit: "97-65B號", manager: "賢" }
  ]},
  { group: "牛5", street: "鳳仁路", company: "信潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛5-66", unit: "97-66號", manager: "" },
    { no: "牛5-67", unit: "97-67號", manager: "" },
    { no: "牛5-68", unit: "97-68號", manager: "" },
    { no: "牛5-69", unit: "97-69號", manager: "" },
    { no: "牛5-70", unit: "97-70號", manager: "" },
    { no: "牛5-71", unit: "97-71號", manager: "" },
    { no: "牛5-72", unit: "97-72號", manager: "" },
    { no: "牛5-73", unit: "97-73號", manager: "" },
    { no: "牛5-75", unit: "97-75號", manager: "" },
    { no: "牛5-76", unit: "97-76號", manager: "" }
  ]},
  { group: "牛6", street: "鳳仁路", company: "信潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛6-55", unit: "55號", manager: "" },
    { no: "牛6-56", unit: "56號", manager: "" },
    { no: "牛6-57", unit: "57號", manager: "" },
    { no: "牛6-58", unit: "58號", manager: "" },
    { no: "牛6-59", unit: "59號", manager: "" },
    { no: "牛6-60", unit: "60號", manager: "" },
    { no: "牛6-61", unit: "61號", manager: "" },
    { no: "牛6-62", unit: "62號", manager: "" }
  ]},
  { group: "牛7", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛7-1F", unit: "93-63號1樓", manager: "" },
    { no: "牛7-2F", unit: "93-63號2樓", manager: "" },
    { no: "牛7-3F", unit: "93-63號3樓", manager: "" }
  ]},
  { group: "牛8", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "牛8-77", unit: "97-77號", manager: "錦芳" },
    { no: "牛8-78", unit: "97-78號", manager: "錦芳" }
  ]},
  { group: "牛10", street: "文龍東路", company: "統潔", city: "高雄市鳳山區文龍東路", items: [
    { no: "牛10-68", unit: "68號", manager: "" },
    { no: "牛10-70", unit: "70號", manager: "" },
    { no: "牛10-72", unit: "72號", manager: "" },
    { no: "牛10-76", unit: "76號", manager: "" }
  ]},
  { group: "拉皮", street: "鳳仁路", company: "統潔", city: "高雄市鳳山區鳳仁路", items: [
    { no: "拉皮-1A", unit: "93-1A號", manager: "" },
    { no: "拉皮-1B", unit: "93-1B號", manager: "" },
    { no: "拉皮-2A", unit: "93-2A號", manager: "" },
    { no: "拉皮-2B", unit: "93-2B號", manager: "" }
  ]},
  { group: "大樹", street: "九曲路", company: "統潔", city: "高雄市鳳山區九曲路", items: [
    { no: "大樹-18", unit: "52巷32弄18號", manager: "" }
  ]}
];
const FACTORY_GROUP_ORDER = FACTORY_GROUPS.map(g => g.group);
const PHOTO_SET = [
  ["images/living.jpg", "images/kitchen.jpg"],
  ["images/bedroom.jpg", "images/bath.jpg"],
  ["images/kitchen.jpg", "images/living.jpg"],
  ["images/bath.jpg", "images/bedroom.jpg"]
];
function isUsablePhoto(src) {
  return typeof src === "string" && (src.startsWith("data:image") || src.startsWith("images/") || src.startsWith("blob:") || src.startsWith("http"));
}
function ensurePhotos(r) {
  if (!Array.isArray(r.photos)) r.photos = [];
  r.photos = r.photos.filter(isUsablePhoto).slice(0, 5);
  if (!r.photos.length) r.photos = photosFor(r.no).slice();
}
function photosFor(no) {
  return PHOTO_SET[Number(String(no).replace(/\D/g, "") || 0) % PHOTO_SET.length];
}
function roomAddress(no) {
  const s = String(no).replace(/\D/g, "");
  if (s.length < 4) return "高雄市鳳山區文龍東路";
  return `高雄市鳳山區文龍東路${s.slice(0, 2)}號${s.charAt(2)}樓-${s.charAt(3)}室`;
}
function photoEl(src, no) {
  if (!src || String(src).length < 8) src = photosFor(no || "6821")[0];
  return `<img src="${src}" alt="${no || ""}">`;
}
function factoryRooms() {
  const out = [];
  FACTORY_GROUPS.forEach(g => {
    g.items.forEach(item => {
      out.push({
        id: "f" + item.no.replace(/[^\w\u4e00-\u9fff-]/g, ""),
        no: item.no,
        title: "廠房",
        kind: "factory",
        group: g.group,
        street: g.street,
        company: g.company,
        manager: item.manager || "",
        location: g.city + item.unit,
        rent: 0,
        deposit: 0,
        status: item.manager ? "rented" : "vacant",
        tenantId: null,
        photos: photosFor(item.no),
        amenities: ["電力", "停車"],
        utilities: { electric: "依約自付", water: "依約自付" },
        contractImages: []
      });
    });
  });
  return out;
}

function buildSeed() {
  const rooms = [];
  const tenants = [];
  let ti = 1;
  STUDIO_NOS.forEach((no, i) => {
    const id = "r" + no;
    const name = TENANT_BY_ROOM[no] || "";
    const tid = name ? "t" + ti++ : null;
    rooms.push({
      id, no, title: "套房", rent: 10000, deposit: 25600, kind: "studio",
      status: name ? "rented" : "vacant",
      tenantId: tid, photos: photosFor(no), amenities: AMENITIES,
      utilities: { electric: "5樓設有自助儲值機可以刷卡儲值", water: "一年固定 $1,800" },
      contractImages: [], location: roomAddress(no)
    });
    if (!name) return;
    const phoneTail = String(1000000 + i * 1373).slice(0, 7);
    tenants.push({
      id: tid, name,
      phone: "0912-" + phoneTail.slice(0, 3) + "-" + phoneTail.slice(3, 6),
      idNo: "A1" + String(20000000 + i * 17).slice(0, 8),
      address: "高雄市新興區民生一路",
      emergencyName: ["林淑惠", "陳建國", "黃美玲", "張文傑"][i % 4],
      emergencyPhone: "0988-12" + String(30 + i).padStart(2, "0") + "-55" + String(10 + i).slice(-2),
      roomId: id, leaseStart: "2026-03-01", leaseEnd: "2027-02-28", dueDay: 5,
      paid: i % 7 !== 3, note: ""
    });
  });
  rooms.push({
    id: "r7651", no: "7651", title: "辦公室", rent: 0, deposit: 0, status: "office", kind: "studio",
    tenantId: null, photos: photosFor("7651"), amenities: ["冷氣", "網路", "書桌椅"],
    utilities: { electric: "公司自付", water: "公司自付" }, contractImages: [], location: roomAddress("7651")
  });
  factoryRooms().forEach(r => rooms.push(r));
  tenants[0].phone = "0912-345-678";
  tenants[0].paid = true;
  return {
    rooms, tenants,
    repairs: [{ id: "rep1", roomId: "r6831", tenantId: "t3", type: "熱水器", note: "忽冷忽熱，晚上完全沒熱水", photo: null, status: "open", createdAt: "2026-08-24 21:10" }],
    notices: [{ id: "n1", type: "repair", repairId: "rep1", roomNo: "6831", text: "6831 熱水器報修", createdAt: "2026-08-24 21:10", read: false }],
    announcements: [],
    houseRules: DEFAULT_RULES,
    renewals: []
  };
}
const SEED = buildSeed();
let state = loadLocal();
let ui = { role: null, page: "home", roomId: null, tenantId: null, loginError: "", repairType: "冷氣", toast: "", repairMedia: [], announceEditId: null, announceMedia: [], assetKind: "studio", lineBinds: { byRoom: {}, byUser: {} }, cloudOk: null, bankMedia: [] };
let saveTimer = 0;

function normalize(data) {
  if (!data) data = structuredClone(SEED);
  if (!Array.isArray(data.rooms)) data.rooms = [];
  if (!Array.isArray(data.tenants)) data.tenants = [];
  STUDIO_NOS.forEach(no => {
    if (!data.rooms.some(r => r.no === no)) {
      const seedRoom = SEED.rooms.find(r => r.no === no);
      const seedTenant = SEED.tenants.find(t => t.roomId === "r" + no);
      if (seedRoom) data.rooms.push(structuredClone(seedRoom));
      if (seedTenant && !data.tenants.some(t => t.roomId === seedTenant.roomId)) data.tenants.push(structuredClone(seedTenant));
    }
  });
  factoryRooms().forEach(seedRoom => {
    if (!data.rooms.some(r => r.id === seedRoom.id || r.no === seedRoom.no)) data.rooms.push(structuredClone(seedRoom));
  });
  data.rooms.forEach(r => {
    if (!Array.isArray(r.contractImages)) r.contractImages = [];
    ensurePhotos(r);
    if (!r.location) r.location = roomAddress(r.no);
    if (!r.kind) r.kind = r.title === "廠房" ? "factory" : "studio";
    if (r.no === "7651") r.kind = "studio";
    if (!r.utilities) r.utilities = {};
    if (r.kind !== "factory" && r.status !== "office") {
      if (!r.utilities.electric) r.utilities.electric = "5樓設有自助儲值機可以刷卡儲值";
      if (!r.utilities.water || /每月定額/.test(r.utilities.water)) r.utilities.water = "一年固定 $1,800";
      if (!r.rent) r.rent = 10000;
    }
    if (r.title === "套房" && Array.isArray(r.amenities) && !r.amenities.includes("機車停車格")) r.amenities.push("機車停車格");
  });
  if (!Array.isArray(data.notices)) data.notices = [];
  if (!Array.isArray(data.announcements)) data.announcements = [];
  if (!data.houseRules) data.houseRules = DEFAULT_RULES;
  else data.houseRules = String(data.houseRules).replace(/水費為每月定額[。]?/, "水費為一年固定 $1,800。");
  if (!Array.isArray(data.renewals)) data.renewals = [];
  if (!Array.isArray(data.bankSlips)) data.bankSlips = [];
  if (!Array.isArray(data.aiLogs)) data.aiLogs = [];
  if (!Array.isArray(data.books)) data.books = [];
  data.rooms.forEach(r => {
    if (r.status === "office" || r.kind === "factory") return;
    const busy = (data.repairs || []).some(x => x.roomId === r.id && x.status !== "done");
    if (busy) r.status = "repair";
  });
  data.tenants.forEach(t => {
    const room = data.rooms.find(r => r.id === t.roomId);
    if (!room || room.status === "office" || room.kind === "factory") return;
    if (!t.name && Object.prototype.hasOwnProperty.call(TENANT_BY_ROOM, room.no)) t.name = TENANT_BY_ROOM[room.no];
  });
  return data;
}
function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch {}
  return normalize(structuredClone(SEED));
}
async function pullCloud() {
  try {
    const res = await fetch(DATA_API, { headers: { "X-Tongjie-Key": SYNC_KEY } });
    if (!res.ok) { ui.cloudOk = false; return false; }
    const data = await res.json();
    if (!data || !Array.isArray(data.rooms) || !data.rooms.length) { ui.cloudOk = true; return false; }
    if (state.updatedAt && data.updatedAt && data.updatedAt < state.updatedAt) { ui.cloudOk = true; return false; }
    state = normalize(data);
    localStorage.setItem(KEY, JSON.stringify(state));
    ui.cloudOk = true;
    return true;
  } catch {
    ui.cloudOk = false;
    return false;
  }
}
async function pushCloud() {
  try {
    state.updatedAt = Date.now();
    const res = await fetch(DATA_API, {
      method: "PUT",
      headers: { "X-Tongjie-Key": SYNC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
    ui.cloudOk = res.ok;
  } catch { ui.cloudOk = false; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushCloud, 400);
}
function persistUi() {
  try {
    const snap = JSON.stringify({
      role: ui.role, page: ui.page, roomId: ui.roomId, tenantId: ui.tenantId, assetKind: ui.assetKind
    });
    sessionStorage.setItem(UI_KEY, snap);
    localStorage.setItem(UI_KEY, snap);
  } catch {}
}
function restoreUi() {
  try {
    const raw = sessionStorage.getItem(UI_KEY) || localStorage.getItem(UI_KEY);
    const s = raw ? JSON.parse(raw) : null;
    if (!s || !s.role) return;
    ui.role = s.role;
    ui.page = s.page || (s.role === "admin" ? "dash" : "home");
    ui.roomId = s.roomId || null;
    ui.tenantId = s.tenantId || null;
    ui.assetKind = s.assetKind || "studio";
    if (s.role === "tenant" && s.tenantId && !state.tenants.some(t => t.id === s.tenantId)) {
      ui.role = null; ui.page = "home"; ui.tenantId = null; ui.roomId = null;
    }
  } catch {}
}
function clearSession() {
  ui.role = null; ui.page = "home"; ui.tenantId = null; ui.roomId = null; ui.loginError = "";
  try { sessionStorage.removeItem(UI_KEY); localStorage.removeItem(UI_KEY); } catch {}
}

function syncRoomRepairStatus(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room || room.status === "office") return;
  const busy = state.repairs.some(x => x.roomId === roomId && x.status !== "done");
  if (busy) room.status = "repair";
  else if (room.status === "repair") room.status = room.tenantId ? "rented" : "vacant";
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/\"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#39;");
}
function formatDateTime12(value) {
  if (!value) return "";
  const text = String(value);
  if (/上午|下午/.test(text)) return text;
  const m = text.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})/);
  if (!m) return text;
  const hour24 = Number(m[2]);
  const period = hour24 >= 12 ? "下午" : "上午";
  let hour12 = hour24 % 12; if (hour12 === 0) hour12 = 12;
  return `${m[1]} ${period} ${hour12}:${m[3]}`;
}
function nowStamp() {
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  const h = now.getHours();
  const period = h >= 12 ? "下午" : "上午";
  let h12 = h % 12; if (h12 === 0) h12 = 12;
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${period} ${h12}:${p(now.getMinutes())}`;
}
function daysLeft(end) {
  return Math.ceil((new Date(end + "T00:00:00") - TODAY) / 86400000);
}
function rentOverdueDays() {
  const due = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  return Math.max(0, Math.floor((TODAY - due) / 86400000));
}
function money(n) { return "NT$ " + Number(n).toLocaleString("zh-TW"); }
function rocDate(d) {
  d = d || new Date();
  return `中華民國 ${d.getFullYear() - 1911} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
function moneyCN(n) {
  n = Math.round(Math.abs(Number(n) || 0));
  if (!n) return "新臺幣零元整";
  const num = "零壹貳參肆伍陸柒捌玖";
  const units = ["仟", "佰", "拾", ""];
  function four(x) {
    const s4 = String(x).padStart(4, "0");
    let out = "";
    for (let i = 0; i < 4; i++) {
      const v = +s4[i];
      if (v) out += num[v] + units[i];
      else if (out && !out.endsWith("零") && /[1-9]/.test(s4.slice(i))) out += "零";
    }
    return out;
  }
  const yi = Math.floor(n / 1e8);
  const wan = Math.floor((n % 1e8) / 1e4);
  const rest = n % 10000;
  let s = "";
  if (yi) s += four(yi) + "億";
  if (wan) {
    if (yi && wan < 1000) s += "零";
    s += four(wan) + "萬";
  } else if (yi && rest) s += "零";
  if (rest) {
    if ((yi || wan) && rest < 1000) s += "零";
    s += four(rest);
  }
  return "新臺幣" + s + "元整";
}
function invoiceBuyer(r, t) {
  if (r.kind === "factory") return (t && t.name) || r.company || r.manager || "";
  return (t && t.name) || "";
}
function invoiceAddr(r, t) {
  const raw = (t && t.address) || r.location || (r.kind === "factory" ? "" : roomAddress(r.no)) || "";
  const m = String(raw).match(/^(.*?[市縣])\s*(.*?[區鄉鎮市])\s*(.*?)(\d+)\s*號(?:(\d+)\s*樓)?(?:-(\d+)\s*室)?/);
  if (!m) return { city: "", dist: "", road: raw, no: "", floor: "", room: "", lane: "", alley: "" };
  return { city: m[1] || "", dist: m[2] || "", road: (m[3] || "").trim(), no: m[4] || "", floor: m[5] || "", room: m[6] || "", lane: "", alley: "" };
}
function rocYearCn(y) {
  return String(y).split("").map(ch => "○一二三四五六七八九"[Number(ch)] || ch).join("");
}
function invoicePeriod(d) {
  d = d || new Date();
  const y = d.getFullYear() - 1911;
  const m = d.getMonth() + 1;
  const start = m % 2 === 0 ? m - 1 : m;
  const end = start + 1;
  const cn = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  return {
    y, m, day: d.getDate(), start, end,
    period: `${rocYearCn(y)}年${cn[start]}、${cn[end]}月份`,
    dateLine: `中華民國 ${y} 年　${m}　月　${d.getDate()}　日`
  };
}
function moneyCnBoxes(n) {
  n = Math.round(Math.abs(Number(n) || 0));
  const digits = String(n).padStart(9, "0").slice(-9).split("");
  const han = "零壹貳參肆伍陸柒捌玖";
  const labels = ["億", "仟", "佰", "拾", "萬", "仟", "佰", "拾", "元"];
  let started = false;
  return digits.map((d, i) => {
    const v = Number(d);
    if (v) started = true;
    const ch = !started && i < 8 ? "" : han[v];
    if (v) started = true;
    return `<span class="inv-box"><em>${labels[i]}</em><b>${ch}</b></span>`;
  }).join("");
}
function invoiceCopyHtml(r, t, copyName) {
  const amt = Number(r.rent) || 0;
  const month = (new Date()).getMonth() + 1;
  const triple = r.kind === "factory";
  const p = invoicePeriod();
  const addr = invoiceAddr(r, t);
  const buyer = invoiceBuyer(r, t);
  const track = (ui.invoiceTrack || "").toUpperCase();
  const num = ui.invoiceNum || "";
  const blank = `<tr><td></td><td></td><td></td><td></td><td></td></tr>`;
  return `<section class="inv-paper">
    <div class="inv-head">
      <div class="inv-no">
        <span class="inv-track">${escapeHtml(track || "　")}</span>
        <span class="inv-digits">${escapeHtml(num || "　　　　　　")}</span>
      </div>
      <div class="inv-title">
        <div class="inv-main-title">統一發票${triple ? "(三聯式)" : "(二聯式)"}</div>
        <div class="inv-period">－ ${p.period} －</div>
        <div class="inv-date">${p.dateLine}</div>
      </div>
    </div>
    <div class="inv-buyer">
      <div class="inv-line"><span>買 受 人：</span><b>${escapeHtml(buyer)}</b></div>
      <div class="inv-addr">
        <span>地　　址：</span>
        <b>${escapeHtml(addr.city)}</b><i>縣市</i>
        <b>${escapeHtml(addr.dist)}</b><i>鄉鎮市區</i>
        <b>${escapeHtml(addr.road)}</b><i>路街</i>
        <b></b><i>段</i>
        <b></b><i>巷</i>
        <b></b><i>弄</i>
        <b>${escapeHtml(addr.no)}</b><i>號</i>
        <b>${escapeHtml(addr.floor)}</b><i>樓</i>
        <b>${escapeHtml(addr.room)}</b><i>室</i>
      </div>
    </div>
    <div class="inv-grid">
      <div class="inv-items-wrap">
      <table class="inv-items">
        <thead>
          <tr>
            <th class="c-name">品　　名</th>
            <th class="c-qty">數 量</th>
            <th class="c-price">單 價</th>
            <th class="c-amt">金　　額</th>
            <th class="c-note">備　　註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${month}月租金收入</td>
            <td>一式</td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td>${escapeHtml(r.no)}</td>
          </tr>
          ${blank}${blank}${blank}${blank}
          <tr class="inv-total-row">
            <td colspan="2">總　　計</td>
            <td></td>
            <td>${amt.toLocaleString("zh-TW")}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="inv-stamp">營業人蓋用統一發票專用章
        <div class="inv-chop">
          <strong>統潔開發有限公司</strong>
          <span>82934388</span>
          <em>高雄市鳳山區北興街100號1樓</em>
        </div>
      </div>
    </div>
    <div class="inv-cnrow">
      <span class="inv-cnlab">總計新臺幣<br>（中文大寫）</span>
      <div class="inv-boxes">${moneyCnBoxes(amt)}</div>
    </div>
    <div class="inv-taxrow">
      <span>課 稅 別</span>
      <label class="on">應 稅 √</label>
      <label>零稅率</label>
      <label>免 稅</label>
    </div>
    <div class="inv-bottom">
      <span>※應稅、零稅率、免稅之銷售額應分別開立統一發票，並應於各該欄打「√」。</span>
      <b>${copyName}</b>
    </div>
  </section>`;
}
function adminInvoice() {
  const r = state.rooms.find(x => x.id === ui.invoiceRoomId);
  if (!r) return `<div class="empty">找不到房間</div>`;
  const t = state.tenants.find(x => x.roomId === r.id || x.id === r.tenantId);
  const triple = r.kind === "factory";
  const copies = triple ? ["第一聯 存根聯", "第二聯 扣抵聯", "第三聯 收執聯"] : ["第一聯 存根聯", "第二聯 收執聯"];
  const back = ui.invoiceFrom === "room-edit" ? "room-edit" : "tenants";
  return `<div class="admin-grid list invoice-page">
    <div class="card card-body no-print">
      <button class="back" type="button" data-admin="${back}">← 返回</button>
      <h2 class="dash-h">${r.no}　${triple ? "三聯式統一發票" : "二聯式統一發票"}</h2>
      <p class="small">排版依財政部手開${triple ? "三" : "二"}聯式收執聯。請填入手開發票本字軌與號碼後列印。</p>
      <div class="inv-inputs">
        <label class="field"><span>字軌（2 碼）</span><input id="inv-track" type="text" maxlength="2" value="${escapeHtml(ui.invoiceTrack || "")}" placeholder="例如 TP" /></label>
        <label class="field"><span>號碼（8 碼）</span><input id="inv-num" type="text" maxlength="8" value="${escapeHtml(ui.invoiceNum || "")}" placeholder="例如 21751800" /></label>
      </div>
      <button type="button" class="btn-navy" id="print-invoice" style="margin-top:8px">列印發票</button>
    </div>
    ${copies.map(c => invoiceCopyHtml(r, t, c)).join("")}
  </div>`;
}
function statusLabel(s) { return { rented: "滿租", vacant: "空置", repair: "維修中", office: "辦公室" }[s] || s; }
function payLabel(tenant) {
  if (!tenant) return { text: "—", cls: "paid" };
  return tenant.paid ? { text: "本月已繳", cls: "paid" } : { text: "本月未繳", cls: "unpaid" };
}
function floorNo(no) {
  const s = String(no).replace(/\D/g, "");
  if (s.length < 2) return 0;
  return Number(s.charAt(s.length - 2));
}
function roomsByFloor() {
  return [...state.rooms].sort((a, b) => floorNo(a.no) - floorNo(b.no) || a.no.localeCompare(b.no, "zh-Hant"));
}
function me() { return state.tenants.find(t => t.id === ui.tenantId); }
function myRoom() { const t = me(); return t ? state.rooms.find(r => r.id === t.roomId) : null; }
function unreadAnnouncements(tenantId) {
  return (state.announcements || []).filter(a => !(a.readBy || []).includes(tenantId));
}
function unreadRenewTimes(tenantId) {
  return (state.renewals || []).filter(x => x.tenantId === tenantId && x.appointAt && !x.appointRead && x.status !== "done").length;
}
function unreadAppoints(tenantId) {
  return (state.repairs || []).filter(r => r.tenantId === tenantId && r.appointAt && !r.appointRead).length;
}

function toast(msg) {
  ui.toast = msg; render();
  setTimeout(() => { ui.toast = ""; render(); }, 1800);
}
function pushPhoneNotify(title, body) {
  const text = body || "";
  const show = () => {
    try {
      const n = new Notification(title, { body: text, tag: "tongjie-" + Date.now(), lang: "zh-Hant" });
      n.onclick = () => { window.focus(); n.close(); };
    } catch { toast(title); }
  };
  if (!("Notification" in window)) { toast(title); return; }
  if (Notification.permission === "granted") { show(); return; }
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(p => p === "granted" ? show() : toast(title + (text ? "：" + text : "")));
    return;
  }
  toast(title + (text ? "：" + text : ""));
}

function icon(name) {
  const map = {
    home: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10 10 4l7 6v7H3z"/></svg>',
    room: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="12" height="11" rx="1.5"/><path d="M8 16v-5h4v5"/></svg>',
    lease: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h8v14H6z"/><path d="M8 8h4M8 11h4"/></svg>',
    fix: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
  };
  return map[name];
}

function getRepairMedia(rep) {
  if (!rep) return [];
  if (Array.isArray(rep.media) && rep.media.length) return rep.media;
  if (rep.photo) return [{ kind: "image", src: rep.photo }];
  return [];
}
function repairMediaButtons(rep) {
  const media = getRepairMedia(rep);
  const photos = media.filter(m => m.kind === "image").length;
  const videos = media.filter(m => m.kind === "video").length;
  if (!photos && !videos) return "";
  return `<div class="media-actions">
    ${photos ? `<button type="button" class="ghost" data-view-media="${rep.id}|image">查看照片${photos > 1 ? "（" + photos + "）" : ""}</button>` : ""}
    ${videos ? `<button type="button" class="ghost" data-view-media="${rep.id}|video">查看影片${videos > 1 ? "（" + videos + "）" : ""}</button>` : ""}
  </div>`;
}
function mediaPreviewHtml(list, delAttr) {
  if (!list || !list.length) return "";
  return `<div class="media-preview">${list.map((m, i) => `
    <div class="media-thumb">
      ${m.kind === "video" ? `<video src="${m.src}" muted playsinline></video>` : `<img src="${m.src}" alt="">`}
      <span>${m.kind === "video" ? "影片" : "照片"}</span>
      <button type="button" class="ghost" ${delAttr}="${i}">刪除</button>
    </div>`).join("")}</div>`;
}
function pendingPreviewHtml() { return mediaPreviewHtml(ui.repairMedia, "data-del-pending"); }

function closeContractViewer() { const el = document.getElementById("contract-box"); if (el) el.remove(); }
function closeMediaViewer() {
  const el = document.getElementById("media-box");
  if (el) { el.querySelectorAll("video").forEach(v => { v.pause(); v.src = ""; }); el.remove(); }
}
function openMediaViewer(list, index) {
  closeMediaViewer(); closeContractViewer();
  if (!list.length) return;
  const item = list[index];
  const wrap = document.createElement("div");
  wrap.className = "lightbox"; wrap.id = "media-box";
  wrap.innerHTML = `
    <div class="lightbox-bar"><button type="button" id="lb-close">關閉</button><span>${item.kind === "video" ? "影片" : "照片"} ${index + 1} / ${list.length}</span><span></span></div>
    ${item.kind === "video" ? `<video src="${item.src}" controls autoplay playsinline></video>` : `<img src="${item.src}" alt="">`}
    <div class="lightbox-nav">
      <button type="button" id="lb-prev" ${index === 0 ? "disabled" : ""}>上一則</button>
      <button type="button" id="lb-next" ${index === list.length - 1 ? "disabled" : ""}>下一則</button>
    </div>`;
  (document.querySelector(".shell") || document.body).appendChild(wrap);
  document.getElementById("lb-close").onclick = closeMediaViewer;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeMediaViewer(); });
  document.getElementById("lb-prev").onclick = () => { if (index > 0) openMediaViewer(list, index - 1); };
  document.getElementById("lb-next").onclick = () => { if (index < list.length - 1) openMediaViewer(list, index + 1); };
}
function bindMediaViewers() {
  document.querySelectorAll("[data-view-media]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const [id, kind] = btn.dataset.viewMedia.split("|");
      const rep = state.repairs.find(x => x.id === id);
      const ann = (state.announcements || []).find(x => x.id === id);
      const media = rep ? getRepairMedia(rep) : (ann ? (ann.media || []) : []);
      if (ann && ui.tenantId) {
        if (!ann.readBy) ann.readBy = [];
        if (!ann.readBy.includes(ui.tenantId)) { ann.readBy.push(ui.tenantId); save(); }
      }
      openMediaViewer(media.filter(m => m.kind === kind), 0);
    };
  });
}
function bindPendingMedia() {
  document.querySelectorAll("[data-del-pending]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      ui.repairMedia.splice(Number(btn.dataset.delPending), 1);
      const box = document.getElementById("media-preview");
      if (box) box.innerHTML = pendingPreviewHtml();
      bindPendingMedia();
    };
  });
}
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const max = 1400;
      let w = img.width, h = img.height;
      if (w > max) { h = Math.round(h * max / w); w = max; }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = reject; img.src = url;
  });
}
function readFileDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function contractPdfName(page) {
  const t = me(); const r = myRoom();
  const base = `${(t && t.name) || "租客"} ${(r && r.no) || ""}-租屋合約書`;
  return (page ? `${base}-${page}` : base) + ".pdf";
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.style.display = "none";
  document.body.appendChild(a); a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 4000);
}
async function downloadContractsPdf(images, filename) {
  if (!images || !images.length) { toast("尚無合約書圖檔可下載"); return; }
  try {
    const pages = [];
    for (const src of images) {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject; i.src = src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      pages.push({ dataUrl: canvas.toDataURL("image/jpeg", 0.85), w: img.naturalWidth, h: img.naturalHeight });
    }
    const enc = new TextEncoder();
    const out = []; const off = [0]; let ppos = 0;
    const emit = (str, raw) => { const a = enc.encode(str); out.push(a); ppos += a.length; if (raw) { out.push(raw); ppos += raw.length; } };
    emit("%PDF-1.4\n");
    off[1] = ppos; emit("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    const kidsStr = pages.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
    off[2] = ppos; emit(`2 0 obj\n<< /Type /Pages /Count ${pages.length} /Kids [${kidsStr}] >>\nendobj\n`);
    pages.forEach((pg, i) => {
      const pageId = 3 + i * 3, contentId = pageId + 1, imgId = pageId + 2;
      const scale = Math.min((555) / pg.w, (802) / pg.h);
      const dw = pg.w * scale, dh = pg.h * scale, x = (595 - dw) / 2, y = (842 - dh) / 2;
      const stream = `q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im${i} Do Q`;
      off[pageId] = ppos;
      emit(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im${i} ${imgId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`);
      off[contentId] = ppos;
      emit(`${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`);
      const b64 = (pg.dataUrl.split(",")[1] || "");
      const bin = atob(b64); const jpeg = new Uint8Array(bin.length);
      for (let j = 0; j < bin.length; j++) jpeg[j] = bin.charCodeAt(j);
      off[imgId] = ppos;
      emit(`${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pg.w} /Height ${pg.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`, jpeg);
      emit("\nendstream\nendobj\n");
    });
    const xrefPos = ppos; const maxObj = 2 + pages.length * 3;
    let xref = `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= maxObj; i++) xref += String(off[i] || 0).padStart(10, "0") + " 00000 n \n";
    emit(xref); emit(`trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`);
    const buf = new Uint8Array(out.reduce((n, a) => n + a.length, 0));
    let o = 0; out.forEach(a => { buf.set(a, o); o += a.length; });
    triggerDownload(new Blob([buf], { type: "application/pdf" }), filename || "租屋合約書.pdf");
  } catch { toast("下載失敗，請再試一次"); }
}
function openContractViewer(images, index) {
  closeContractViewer();
  const wrap = document.createElement("div");
  wrap.className = "lightbox"; wrap.id = "contract-box";
  wrap.innerHTML = `
    <div class="lightbox-bar"><button type="button" id="lb-close">關閉</button><span>${index + 1} / ${images.length}</span><button type="button" id="lb-pdf">下載 PDF</button></div>
    <img src="${images[index]}" alt="合約書大圖">
    <div class="lightbox-nav">
      <button type="button" id="lb-prev" ${index === 0 ? "disabled" : ""}>上一張</button>
      <button type="button" id="lb-next" ${index === images.length - 1 ? "disabled" : ""}>下一張</button>
    </div>`;
  (document.querySelector(".shell") || document.body).appendChild(wrap);
  document.getElementById("lb-close").onclick = closeContractViewer;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeContractViewer(); });
  document.getElementById("lb-pdf").onclick = e => { e.preventDefault(); e.stopPropagation(); downloadContractsPdf([images[index]], contractPdfName(index + 1)); };
  document.getElementById("lb-prev").onclick = () => { if (index > 0) openContractViewer(images, index - 1); };
  document.getElementById("lb-next").onclick = () => { if (index < images.length - 1) openContractViewer(images, index + 1); };
}

function gcalRange(local) {
  const start = new Date(local); if (isNaN(start)) return "";
  const end = new Date(start.getTime() + 3600000);
  const fmt = d => {
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
  };
  return fmt(start) + "/" + fmt(end);
}
function openGoogleCalendar(item, kind) {
  if (!item || !item.appointAt) { toast("請先選擇預約日期"); return; }
  const range = gcalRange(item.appointAt);
  if (!range) { toast("預約時間格式不正確"); return; }
  const room = state.rooms.find(x => x.id === item.roomId);
  const tenant = state.tenants.find(x => x.id === item.tenantId);
  const isRenew = kind === "renew" || !item.type;
  const text = encodeURIComponent(isRenew ? `${room ? room.no : ""} 續約簽約` : `${room ? room.no : ""} ${item.type}維修`);
  const details = encodeURIComponent(isRenew
    ? `統潔開發有限公司續約簽約\n租客：${tenant ? tenant.name : ""}\n房號：${room ? room.no : ""}`
    : `統潔開發有限公司報修預約\n租客：${tenant ? tenant.name : ""}\n房號：${room ? room.no : ""}\n說明：${item.note || ""}`);
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${range}&details=${details}`, "_blank", "noopener");
}
function calendarItems() {
  const items = [];
  (state.repairs || []).forEach(r => {
    if (!r.appointAt) return;
    const room = state.rooms.find(x => x.id === r.roomId);
    const tenant = state.tenants.find(x => x.id === r.tenantId);
    items.push({
      at: r.appointAt, kind: "repair", id: r.id, item: r,
      title: `${room ? room.no : ""} ${r.type}維修`,
      sub: `${tenant ? tenant.name : ""} · ${formatDateTime12(String(r.appointAt).replace("T", " "))}`
    });
  });
  (state.renewals || []).forEach(r => {
    if (!r.appointAt || r.status === "done") return;
    const room = state.rooms.find(x => x.id === r.roomId);
    const tenant = state.tenants.find(x => x.id === r.tenantId);
    items.push({
      at: r.appointAt, kind: "renew", id: r.id, item: r,
      title: `${room ? room.no : ""} 續約簽約`,
      sub: `${tenant ? tenant.name : ""} · ${formatDateTime12(String(r.appointAt).replace("T", " "))}`
    });
  });
  return items.sort((a, b) => String(a.at).localeCompare(String(b.at)));
}
function ymdOf(value) {
  const m = String(value || "").match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}
function ensureCalMonth() {
  if (ui.calYear && ui.calMonth) return;
  const n = new Date();
  ui.calYear = n.getFullYear();
  ui.calMonth = n.getMonth() + 1;
  ui.calDay = n.getDate();
}
function collectLedger() {
  const rows = [];
  (state.books || []).forEach(b => rows.push({
    id: b.id, type: b.type === "out" ? "out" : "in", date: ymdOf(b.date), amount: Number(b.amount) || 0,
    roomNo: b.roomNo || "", note: b.note || "", source: "book", canDel: true
  }));
  (state.bankSlips || []).forEach(s => {
    rows.push({
      id: "slip-" + s.id, type: "in", date: ymdOf(s.date), amount: Number(s.amount) || 0,
      roomNo: s.roomNo || "", note: s.note || "銀行入帳", source: "slip", canDel: false
    });
  });
  const slipRooms = new Set((state.bankSlips || []).map(s => String(s.roomNo || "")));
  state.tenants.filter(t => t.paid).forEach(t => {
    const room = state.rooms.find(r => r.id === t.roomId);
    const date = ymdOf(t.paidAt) || ymdOf(nowStamp());
    if (room && slipRooms.has(String(room.no))) return;
    rows.push({
      id: "rent-" + t.id, type: "in", date, amount: Number(room && room.rent) || 0,
      roomNo: room ? room.no : "", note: (t.name || "") + " 租金", source: "rent", canDel: false
    });
  });
  return rows.filter(x => x.date);
}
function monthCashHtml() {
  ensureCalMonth();
  const y = ui.calYear, m = ui.calMonth;
  const key = `${y}-${String(m).padStart(2, "0")}`;
  const rows = collectLedger().filter(x => x.date.slice(0, 7) === key);
  const inn = rows.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
  const out = rows.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
  const first = new Date(y, m - 1, 1);
  const start = first.getDay();
  const dim = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < start; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const dayKey = d => `${key}-${String(d).padStart(2, "0")}`;
  const byDay = d => rows.filter(x => x.date === dayKey(d));
  const sel = ui.calDay && ui.calDay <= dim ? ui.calDay : 0;
  const selected = sel ? byDay(sel) : [];
  return `<div class="card card-body">
    <div class="row">
      <div>
        <h2 class="dash-h" style="margin:0">本月進出帳</h2>
        <div class="small">在平台上查看與登錄一個月的進帳、出帳</div>
      </div>
    </div>
    <div class="cal-nav">
      <button type="button" class="ghost" data-cal-nav="-1">上一月</button>
      <strong>${y} 年 ${m} 月</strong>
      <button type="button" class="ghost" data-cal-nav="1">下一月</button>
    </div>
    <div class="cal-sum">
      <span>進帳 ${money(inn)}</span>
      <span>出帳 ${money(out)}</span>
      <span>結餘 ${money(inn - out)}</span>
    </div>
    <div class="cal-grid">
      ${["日", "一", "二", "三", "四", "五", "六"].map(w => `<div class="cal-w">${w}</div>`).join("")}
      ${cells.map(d => {
        if (!d) return `<div class="cal-cell empty"></div>`;
        const list = byDay(d);
        const di = list.filter(x => x.type === "in").reduce((s, x) => s + x.amount, 0);
        const dout = list.filter(x => x.type === "out").reduce((s, x) => s + x.amount, 0);
        return `<button type="button" class="cal-cell ${sel === d ? "on" : ""}" data-cal-day="${d}">
          <em>${d}</em>
          ${di ? `<span class="in">+${di.toLocaleString("zh-TW")}</span>` : ""}
          ${dout ? `<span class="out">-${dout.toLocaleString("zh-TW")}</span>` : ""}
        </button>`;
      }).join("")}
    </div>
    <div class="cal-day">
      <div class="small">${sel ? `${m} 月 ${sel} 日` : "點日期查看當日進出帳"}</div>
      ${selected.length ? selected.map(x => `
        <div class="mini">
          <b>${x.type === "in" ? "進帳" : "出帳"} · ${x.roomNo || "—"} · ${money(x.amount)}</b>
          <span>${escapeHtml(x.note || "")}</span>
          ${x.canDel ? `<button type="button" class="ghost" data-del-book="${x.id}" style="width:auto;margin-top:6px">刪除</button>` : ""}
        </div>`).join("") : (sel ? `<div class="empty">這天尚無紀錄</div>` : "")}
    </div>
    <form id="book-form" class="cal-form">
      <h2 class="dash-h">新增一筆</h2>
      <div class="cal-form-row">
        <select name="type"><option value="in">進帳</option><option value="out">出帳</option></select>
        <input name="date" type="date" value="${sel ? dayKey(sel) : ymdOf(nowStamp())}" />
      </div>
      <div class="cal-form-row">
        <input name="amount" type="text" placeholder="金額" />
        <input name="roomNo" type="text" placeholder="房號（選填）" />
      </div>
      <input name="note" type="text" placeholder="說明，例如 6821 租金／修繕／水費" />
      <button class="btn-navy" type="submit">記入日曆</button>
    </form>
  </div>`;
}
function appointLabel(rep) {
  if (!rep.appointAt) return "";
  return `<div class="row"><span class="k">預約時間</span><button type="button" class="linkish appoint-link" data-gcal="${rep.id}">${formatDateTime12(String(rep.appointAt).replace("T", " "))}</button></div>`;
}
function appointBlock(rep) {
  return `<div class="appoint-box">
    <label class="field"><span>預約日期</span>
      <input type="datetime-local" data-appoint="${rep.id}" value="${rep.appointAt || ""}" />
    </label>
    <div class="small appoint-shown">${rep.appointAt ? "已預約 " + formatDateTime12(String(rep.appointAt).replace("T", " ")) : "選擇完成維修的時間"}</div>
  </div>`;
}

function render() {
  persistUi();
  const root = document.getElementById("app");
  if (!ui.role) { root.innerHTML = gateView(); bindGate(); return; }
  if (ui.role === "admin") {
    root.innerHTML = `<div class="shell admin-wide">${ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : ""}${adminView()}</div>`;
    bindAdmin(); return;
  }
  root.innerHTML = `<div class="shell">${ui.toast ? `<div class="toast">${escapeHtml(ui.toast)}</div>` : ""}<div class="tenant-scroll"><div class="zoom-page">${tenantView()}</div></div>${nav()}</div>`;
  bindTenant();
}

function gateView() {
  if (ui.page === "tenant-login" || ui.page === "admin-login") {
    const isAdmin = ui.page === "admin-login";
    return `<div class="gate">
      <button class="back slide-right" id="back-gate" type="button">← 返回</button>
      <div class="slide-right">
        <div class="logo">TONG JIE</div>
        <h1>${isAdmin ? "管理員登入" : "租客登入"}</h1>
        <p class="lead">${isAdmin ? "請輸入管理員密碼，進入後台" : "請輸入自己的房號，進入該房間的租約、繳費與報修。"}</p>
      </div>
      <div class="login-block slide-left">
        <input id="room-login" type="text" inputmode="numeric" maxlength="8" placeholder="${isAdmin ? "管理員密碼" : "房號"}" />
        ${ui.loginError ? `<div class="err">${escapeHtml(ui.loginError)}</div>` : ""}
      </div>
    </div>`;
  }
  return `<div class="gate">
    <div class="slide-right">
      <div class="logo">TONG JIE</div>
      <h1>統潔開發有限公司</h1>
      <p class="lead">房間、租約、租金與報修，集中在同一個地方管理。</p>
      <p class="small">${ui.cloudOk === true ? "雲端已同步" : ui.cloudOk === false ? "尚未連上雲端，先使用本機資料" : "正在連接雲端…"}</p>
    </div>
    <button class="role-btn slide-left" data-go="tenant-login">
      <strong>我是租客</strong>
      <span>請輸入自己的房號，進入該房間的租約、繳費與報修。</span>
    </button>
    <button class="role-btn slide-left delay" data-go="admin-login">
      <strong>我是管理員</strong>
      <span>請輸入管理員密碼後，查看全部房間、租客與報修</span>
    </button>
  </div>`;
}

function nav() {
  const items = [["home", "home", "首頁"], ["rooms", "room", "房間"], ["lease", "lease", "租約"], ["repair", "fix", "報修"]];
  return `<nav class="nav">${items.map(([id, ic, label]) => {
    const unread = !ui.tenantId ? 0
      : id === "home" ? unreadAnnouncements(ui.tenantId).length
      : id === "repair" ? unreadAppoints(ui.tenantId)
      : id === "lease" ? unreadRenewTimes(ui.tenantId)
      : 0;
    const on = ui.page === id || ((ui.page === "room-detail" || ui.page === "parking" || ui.page === "balcony") && id === "rooms") || (ui.page === "repair-done" && id === "repair") || (ui.page === "pay" && id === "home");
    return `<button data-page="${id}" class="${on ? "active" : ""}">${icon(ic)}${label}${unread ? `<em class="badge-dot badge-dot-only"></em>` : ""}</button>`;
  }).join("")}</nav>`;
}

function tenantView() {
  if (ui.page === "rooms") return roomsView();
  if (ui.page === "room-detail") return roomDetailView(ui.roomId || myRoom().id);
  if (ui.page === "parking") return parkingView();
  if (ui.page === "balcony") return balconyView();
  if (ui.page === "lease") return leaseView();
  if (ui.page === "repair" || ui.page === "repair-done") return repairView();
  if (ui.page === "pay") return payView();
  return homeView();
}

function announceCardsHtml() {
  const list = (state.announcements || []).slice().reverse();
  if (!list.length) return `<div class="card card-body slide-left"><div class="empty">目前沒有管理員公告</div></div>`;
  return list.map(a => {
    const unread = ui.tenantId && !(a.readBy || []).includes(ui.tenantId);
    return `<div class="card card-body slide-left clickable" data-read-announce="${a.id}">
      <div class="row"><span class="k">${escapeHtml(a.title)}</span>${unread ? `<span class="badge unpaid">新</span>` : ""}</div>
      <div class="small">${formatDateTime12(a.createdAt)}</div>
      <p style="margin-top:8px;white-space:pre-wrap">${escapeHtml(a.body)}</p>
      ${repairMediaButtons({ id: a.id, media: a.media || [], photo: null })}
    </div>`;
  }).join("");
}

function homeView() {
  const t = me(); const r = myRoom();
  const left = daysLeft(t.leaseEnd); const pay = payLabel(t);
  return `
    <div class="topbar">
      <div class="slide-right"><div class="eyebrow">GOOD EVENING</div><h1>您好${t.name ? "，" + escapeHtml(t.name) : ""}</h1></div>
      <button class="back" id="logout-tenant" type="button">登出</button>
    </div>
    <div class="screen">
      <div class="hero-card slide-left">
        <div class="label">我的房間</div>
        <div class="room-name">${r.no}　${r.title}</div>
        <div class="small" style="margin:-8px 0 14px">${escapeHtml(r.location || roomAddress(r.no))}</div>
        <div class="hero-stats">
          <div class="stat"><div class="label">租約剩餘天數</div><b>${left} 天</b></div>
          <div class="stat"><div class="label">本月租金</div><b>${money(r.rent)}</b></div>
        </div>
      </div>
      <div class="section-title"><h2 class="slide-right">繳費狀態</h2><span class="slide-left" data-page="lease">看租約</span></div>
      <div class="card card-body slide-left">
        <div class="row"><span class="k">2026 年 8 月租金</span><span class="v">${money(r.rent)}</span></div>
        <div class="row"><span class="k">狀態</span><span class="pay-pill ${pay.cls}">${pay.text}</span></div>
        <div class="row"><span class="k">到期日</span><span class="v">每月 ${t.dueDay || 5} 日前</span></div>
      </div>
      <div class="section-title"><h2 class="slide-right">內容</h2></div>
      <div class="btn-row slide-left">
        <button class="ghost" data-page="rooms">房間資訊</button>
        <button class="ghost" data-page="pay">繳費租金</button>
        <button class="ghost" id="bind-line" type="button">綁定 LINE</button>
        <button class="btn-navy" data-page="repair">我要報修</button>
      </div>
      <div class="section-title"><h2 class="slide-right">管理員公告</h2></div>
      ${announceCardsHtml()}
    </div>`;
}

function markTenantPaid(via) {
  const t = me(); const r = myRoom();
  if (!t || !r) return;
  t.paid = true;
  t.paidVia = via;
  t.paidAt = nowStamp();
  if (via === "line") t.lineNotified = true;
  save();
  pushPhoneNotify("繳費回報", `${r.no} ${t.name || ""} 已回報繳費（${via === "line" ? "官方 LINE" : "App"}）`);
}
function linePayMessage() {
  const t = me(); const r = myRoom();
  return `【繳費通知】${r ? r.no : ""} ${t && t.name ? t.name : ""} 已繳本月租金 ${r ? money(r.rent) : ""}\n戶名：統潔開發有限公司\n銀行：803 聯邦銀行 高雄分行\n帳號：010100035909`;
}
function payView() {
  const t = me(); const r = myRoom();
  const paid = !!(t && t.paid);
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="home">← 返回</button>
      <div class="eyebrow">PAY</div><h1>繳費租金</h1>
    </div></div>
    <div class="screen">
      <div class="card card-body slide-left">
        <div class="small">本月應繳</div>
        <div style="font-size:26px;font-weight:800;margin:6px 0 4px">${money(r.rent)}</div>
        <div class="small">${r.no}　${escapeHtml(t && t.name ? t.name : "")}</div>
        <div style="margin-top:10px"><span class="pay-pill ${paid ? "paid" : "unpaid"}">${paid ? "本月已繳" : "本月未繳"}</span>
          ${t && t.paidVia === "line" ? `<span class="badge rented" style="margin-left:6px">LINE 已通知</span>` : t && t.paidVia === "app" ? `<span class="badge doing" style="margin-left:6px">App 回報</span>` : ""}</div>
      </div>
      <div class="section-title"><h2 class="slide-right">統潔開發有限公司帳戶</h2></div>
      <div class="card card-body slide-left">
        <div class="copy-row no-copy"><span class="k">戶名</span><span class="v">統潔開發有限公司</span></div>
        <div class="copy-row"><span class="k">銀行代號</span><span class="v">803</span><button type="button" class="ghost" data-copy="803">複製</button></div>
        <div class="copy-row no-copy"><span class="k">銀行名稱</span><span class="v">聯邦銀行 高雄分行</span></div>
        <div class="copy-row"><span class="k">帳號</span><span class="v">010100035909</span><button type="button" class="ghost" data-copy="010100035909">複製</button></div>
      </div>
      <button type="button" class="btn-navy slide-left" id="mark-paid" style="margin-top:14px" ${paid ? "disabled" : ""}>${paid ? "已回報本月已繳費" : "本月已繳費"}</button>
      <button type="button" class="ghost slide-left" id="line-paid" style="margin-top:8px">${t && t.lineNotified ? "再次到官方 LINE 通知" : "到官方 LINE 通知已繳費"}</button>
      <p class="small slide-left" style="margin-top:12px;padding:0 6px">請先轉帳，再點「本月已繳費」。點官方 LINE 會直接打開統潔開發聊天室並帶入繳費文字，傳送即可。</p>
    </div>`;
}
function roomsView() {
  const mine = myRoom();
  return `<div class="topbar slide-right"><div><div class="eyebrow">ROOMS</div><h1>房間</h1></div></div>
    <div class="screen">
      ${roomTile(mine, true, "room-seq")}
      <div class="room-row clickable room-seq s2" data-page="balcony" style="margin-top:12px">
        <img src="images/balcony.jpg" alt="公共陽台" />
        <div class="room-row-info">
          <strong>公共陽台</strong>
          <span class="small">曬衣陽台</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="room-row clickable room-seq s3" data-page="parking" style="margin-top:12px">
        <div class="parking-thumb"><span>P</span></div>
        <div class="room-row-info">
          <strong>${mine.no}</strong>
          <span class="small">停車位</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
    </div>`;
}

function parkingView() {
  const r = myRoom();
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 返回</button>
      <div class="eyebrow">PARKING</div><h1>停車位</h1>
    </div></div>
    <div class="screen">
      <div class="room-row slide-left">
        <div class="parking-thumb"><span>P</span></div>
        <div class="room-row-info">
          <strong>${r.no}</strong>
          <span class="small">機車停車位</span>
          <div class="price">NT$ 0 <em>/月</em></div>
        </div>
        <span class="badge rented">已配</span>
      </div>
      <div class="card card-body slide-left rules" style="margin-top:14px">
        <p>1. 本房已配置一格機車停車位，月費 NT$ 0。</p>
        <p>2. 請停放於劃設格位內，勿占用走道、大門或消防通道。</p>
        <p>3. 離開時請熄火、上鎖，貴重物品請勿留置車上。</p>
        <p>4. 停車區禁止充電改裝、維修或傾倒機油。</p>
        <p>5. 車輛損壞、遺失由車主自行負責，請妥善保管。</p>
      </div>
    </div>`;
}
function balconyView() {
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 返回</button>
      <div class="eyebrow">BALCONY</div><h1>公共陽台</h1>
    </div></div>
    <div class="screen">
      <div class="photos slide-left"><img src="images/balcony.jpg" alt="公共陽台" /></div>
      <div class="card card-body slide-left rules" style="margin-top:14px">
        <div class="row"><span class="k">使用費</span><span class="v">NT$ 0 /月</span></div>
        <p>1. 公共陽台提供自助洗衣機、乾衣機與曬衣桿，供全體租客使用。</p>
        <p>2. 洗衣機、乾衣機需刷卡扣款，請依機台說明操作。</p>
        <p>3. 使用完畢請立即取走衣物，勿占用機台或曬衣桿。</p>
        <p>4. 請保持陽台整潔，垃圾與洗衣殘渣請自行清理。</p>
        <p>5. 晚上請放低音量，避免影響其他住戶。</p>
      </div>
    </div>`;
}
function roomTile(r, clickable, extraClass) {
  return `<div class="room-row ${extraClass || "slide-left"}" ${clickable ? `data-room="${r.id}"` : ""}>
    ${photoEl(r.photos && r.photos[0], r.no)}
    <div class="room-row-info">
      <strong>${r.no}</strong>
      <span class="small">${r.title}</span>
      <div class="small">${escapeHtml(r.location || roomAddress(r.no))}</div>
      <div class="price">${r.status === "office" ? "自用辦公室" : `${money(r.rent)} <em>/月</em>`}</div>
    </div>
    <span class="badge ${r.status}">${statusLabel(r.status)}</span>
  </div>`;
}
function roomDetailView(id) {
  const r = state.rooms.find(x => x.id === id);
  if (!r) return `<div class="screen"><p>找不到房間</p></div>`;
  return `<div class="topbar slide-right"><div>
      <button class="back" data-page="rooms">← 房間</button><h1>${r.no}</h1>
    </div></div>
    <div class="screen">
      <div class="photos slide-left">${(r.photos || photosFor(r.no)).map(src => photoEl(src, r.no)).join("")}</div>
      <p class="small hint-note">左右滑動可看更多房間照片</p>
      <div class="card card-body slide-up" style="margin-top:14px">
        <div class="row"><span class="k">房號</span><span class="v">${r.no}</span></div>
        <div class="row wrap"><span class="k">地址</span><span class="v">${escapeHtml(r.location || roomAddress(r.no))}</span></div>
        <div class="row"><span class="k">租金</span><span class="v">${r.status === "office" ? "—" : money(r.rent)}</span></div>
        <div class="row"><span class="k">狀態</span><span class="v"><span class="badge ${r.status}">${statusLabel(r.status)}</span></span></div>
      </div>
      <div class="section-title"><h2>設備</h2></div>
      <div class="chips">${r.amenities.map(a => `<span class="chip">${a}</span>`).join("")}</div>
      <div class="section-title"><h2>水電</h2></div>
      <div class="card card-body">
        <div class="row"><span class="k">電費</span><span class="v">${r.utilities.electric}</span></div>
        <div class="row"><span class="k">水費</span><span class="v">${r.utilities.water}</span></div>
      </div>
      <div class="section-title"><h2>Wifi</h2></div>
      <div class="card card-body">
        <div class="row"><span class="k">帳號</span><span class="v">${r.no}</span></div>
        <div class="row"><span class="k">密碼</span><span class="v">123456789</span></div>
      </div>
    </div>`;
}
function leaseView() {
  const t = me(); const r = myRoom(); const left = daysLeft(t.leaseEnd);
  return `<div class="topbar"><div class="slide-right"><div class="eyebrow">LEASE</div><h1>租約</h1></div></div>
    <div class="screen">
      <div class="card card-body slide-left">
        <div class="row"><span class="k">承租房間</span><span class="v">${r.no} ${r.title}</span></div>
        <div class="row wrap"><span class="k">地址</span><span class="v">${escapeHtml(r.location || roomAddress(r.no))}</span></div>
        <div class="row"><span class="k">起租日</span><span class="v">${t.leaseStart}</span></div>
        <div class="row"><span class="k">到期日</span><span class="v">${t.leaseEnd}</span></div>
        <div class="row"><span class="k">剩餘天數</span><span class="v">${left} 天</span></div>
        <div class="row"><span class="k">押金</span><span class="v">${money(r.deposit)}</span></div>
        <div class="row"><span class="k">每月租金</span><span class="v">${money(r.rent)}</span></div>
      </div>
      <div class="section-title"><h2 class="slide-right">使用規範</h2></div>
      <div class="card card-body slide-left rules">${(state.houseRules || DEFAULT_RULES).split("\n").filter(x => x.trim()).map(line => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      <div class="section-title">
        <h2 class="slide-right">合約書</h2>
        ${(r.contractImages && r.contractImages.length) ? `<button type="button" class="linkish" id="dl-all-contract">下載 PDF</button>` : ""}
      </div>
      ${(r.contractImages && r.contractImages.length)
        ? `<div class="contract-list slide-left">${r.contractImages.map((src, i) => `<img src="${src}" alt="合約書" data-contract="${i}">`).join("")}</div>`
        : `<div class="card card-body slide-left"><p class="small">管理員尚未上傳此房間的合約書。</p></div>`}
      <p class="small slide-left" style="margin-top:12px;padding:0 6px">合約將於 ${t.leaseEnd} 到期，建議提前 30 天確認是否續約。</p>
      ${(() => {
        const pending = (state.renewals || []).filter(x => x.tenantId === t.id && x.status !== "done");
        const cur = pending[pending.length - 1];
        const asked = !!cur;
        return `
      <button type="button" class="btn-navy slide-left" id="ask-renew" style="margin-top:12px" ${asked ? "disabled" : ""}>${asked ? "已送出續約申請" : "我要續約"}</button>
      ${cur && cur.appointAt ? `<div class="card card-body slide-left" style="margin-top:12px">
        <div class="row"><span class="k">簽約時間</span><button type="button" class="linkish appoint-link" data-gcal-renew="${cur.id}">${formatDateTime12(String(cur.appointAt).replace("T", " "))}</button></div>
        <p class="small" style="margin-top:8px">點擊時間可加入 Google 日曆</p>
      </div>` : ""}`;
      })()}
    </div>`;
}
function repairCard(rep, extraClass) {
  return `<div class="card card-body ${extraClass || ""}">
    <div class="row"><span class="k">${rep.type}</span><span class="badge ${rep.status}">${rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成"}</span></div>
    <div class="small">${formatDateTime12(rep.createdAt)}</div>
    <p style="margin-top:8px">${escapeHtml(rep.note)}</p>
    ${appointLabel(rep)}
    ${repairMediaButtons(rep)}
  </div>`;
}
function repairView() {
  const mine = state.repairs.filter(r => r.tenantId === ui.tenantId).slice().reverse();
  if (ui.page === "repair-done") {
    return `<div class="topbar"><div class="slide-right"><div class="eyebrow">REPAIR</div><h1>報修</h1></div></div>
      <div class="screen">
        <div class="card card-body slide-left done-box">
          <div class="done-title">已提交報修</div>
          <p class="small">下面已自動出現這筆報修。</p>
          <button class="ghost" id="back-repair" type="button">返回</button>
        </div>
        <div class="section-title"><h2 class="slide-right">我的報修</h2></div>
        ${mine.map((rep, i) => repairCard(rep, i === 0 ? "slide-up-card" : "")).join("")}
      </div>`;
  }
  const types = ["冷氣", "熱水器", "電燈", "冰箱", "網路", "電視"];
  return `<div class="topbar"><div class="slide-right"><div class="eyebrow">REPAIR</div><h1>報修</h1></div></div>
    <div class="screen">
      <div class="form-grid slide-left" id="repair-form">
        ${types.map(tp => `<button type="button" class="issue-opt ${ui.repairType === tp ? "selected" : ""}" data-type="${tp}">${tp}</button>`).join("")}
        <textarea id="repair-note" placeholder="請描述問題，例如：冷氣不制冷、晚上會滴水…"></textarea>
        <label class="upload">上傳照片<input id="repair-photo" type="file" accept="image/*" multiple hidden /></label>
        <label class="upload">上傳影片<input id="repair-video" type="file" accept="video/*" hidden /></label>
        <div id="media-preview">${pendingPreviewHtml()}</div>
        <button class="btn-navy" id="submit-repair">提交報修</button>
      </div>
      <div class="section-title"><h2 class="slide-right">我的報修</h2></div>
      ${mine.length ? mine.map(rep => repairCard(rep)).join("") : `<div class="empty">還沒有報修紀錄</div>`}
    </div>`;
}

function adminView() {
  const pages = [["dash", "總覽"], ["rooms", "所有資產"], ["tenants", "租客"], ["announce", "公告"], ["repairs", "報修"], ["ai", "AI助手"]];
  return `
    <div class="admin-bar">
      <div><div class="eyebrow">統潔開發有限公司</div><h1 style="font-size:24px">管理員後台</h1>
        <div class="small">${ui.cloudOk === true ? "雲端已同步，全部裝置共用" : ui.cloudOk === false ? "尚未連上雲端" : "正在同步…"}</div>
      </div>
      <button class="ghost" id="logout" style="width:auto">切換身分</button>
    </div>
    <div class="tabs">
      ${pages.map(([id, label]) => {
        const count = tabBadgeCount(id);
        const on = ui.page === id || (ui.page === "home" && id === "dash") || (id === "rooms" && ui.page === "room-edit");
        return `<button class="tab ${on ? "on" : ""}" data-admin="${id}">${label}${count ? `<em class="badge-dot">${count > 99 ? "99+" : count}</em>` : ""}</button>`;
      }).join("")}
    </div>
    <div class="admin-scroll"><div class="admin-in-right">${adminBody()}</div></div>`;
}
function tabBadgeCount(id) {
  if (id === "repairs") return state.repairs.filter(r => r.status !== "done").length;
  if (id === "tenants") {
    const unpaid = state.tenants.filter(t => !t.paid).length;
    const renew = (state.renewals || []).filter(x => x.status !== "done").length;
    return unpaid + renew;
  }
  return 0;
}
function updateTabBadges() {
  document.querySelectorAll("[data-admin]").forEach(tab => {
    const n = tabBadgeCount(tab.dataset.admin);
    let em = tab.querySelector(".badge-dot");
    if (!n) { if (em) em.remove(); return; }
    if (!em) { em = document.createElement("em"); em.className = "badge-dot"; tab.appendChild(em); }
    em.textContent = n > 99 ? "99+" : String(n);
  });
}
function adminBody() {
  const page = ui.page === "home" ? "dash" : ui.page;
  if (page === "rooms") return adminRooms();
  if (page === "room-edit") return adminRoomEdit();
  if (page === "invoice") return adminInvoice();
  if (page === "tenants") return adminTenants();
  if (page === "repairs") return adminRepairs();
  if (page === "ai") return adminAi();
  if (page === "announce") return adminAnnounce();
  return adminDash();
}
function adminAi() {
  const logs = (state.aiLogs || []).slice(-20);
  const slips = (state.bankSlips || []).slice().reverse();
  return `<div class="admin-grid list">
    <div class="card card-body">
      <h2 class="dash-h">AI助手</h2>
      <div class="small">可分析報修、未繳、行事曆，也可上傳實體銀行入帳資料協助對帳。</div>
      <div class="ai-chips">
        <button type="button" class="ghost" data-ai-q="分析目前報修">分析報修</button>
        <button type="button" class="ghost" data-ai-q="誰還沒繳租金">分析未繳</button>
        <button type="button" class="ghost" data-ai-q="整理 Google 日曆預約">行事曆整理</button>
        <button type="button" class="ghost" data-ai-q="銀行入帳對帳">銀行對帳</button>
      </div>
      <div class="ai-log">${logs.length ? logs.map(m => `<div class="ai-msg ${m.role}"><b>${m.role === "admin" ? "管理員" : "AI助手"}</b><p>${escapeHtml(m.text)}</p></div>`).join("") : `<div class="empty">直接提問，或點上面的分析。</div>`}</div>
      <form id="ai-form">
        <textarea id="ai-q" placeholder="例如：這個月誰還沒繳？冷氣報修還有幾件？"></textarea>
        <button class="btn-navy" type="submit">送出問題</button>
      </form>
    </div>
    <form class="card card-body" id="bank-form">
      <h2 class="dash-h">上傳銀行入帳資料</h2>
      <p class="small">可上傳存摺、轉帳畫面或對帳單。填金額與房號後，AI助手就能用來對帳。</p>
      <label class="field"><span>入帳日期</span><input name="date" type="date" /></label>
      <label class="field"><span>金額</span><input name="amount" type="text" placeholder="例如 10000" /></label>
      <label class="field"><span>房號</span><input name="roomNo" type="text" placeholder="例如 6821" /></label>
      <label class="field"><span>備註</span><textarea name="note" placeholder="例如 聯邦銀行 後五碼 35909"></textarea></label>
      <label class="upload">上傳照片或檔案<input id="bank-file" type="file" accept="image/*,application/pdf" multiple hidden /></label>
      <div id="bank-preview">${mediaPreviewHtml(ui.bankMedia || [], "data-del-bank-media")}</div>
      <button class="btn-navy" type="submit">儲存入帳資料</button>
    </form>
    ${slips.length ? slips.map(s => `
      <div class="card card-body">
        <div class="row"><span class="k">${escapeHtml(s.roomNo || "未填房號")} · ${escapeHtml(s.date || "")}</span><span class="v">${s.amount ? money(s.amount) : "—"}</span></div>
        <p class="small">${escapeHtml(s.note || "")}</p>
        ${(s.media || []).map(m => m.kind === "image" ? `<img src="${m.src}" alt="" style="width:100%;border-radius:12px;margin:8px 0">` : `<a class="ghost" href="${m.src}" download="${escapeHtml(m.name || "檔案")}" style="margin-top:8px;display:block;text-align:center">下載檔案</a>`).join("")}
        <button type="button" class="ghost" data-del-slip="${s.id}" style="margin-top:8px">刪除</button>
      </div>`).join("") : ""}
  </div>`;
}
function aiAnswer(q) {
  const text = String(q || "").trim();
  const unpaid = state.tenants.filter(t => !t.paid);
  const open = state.repairs.filter(r => r.status !== "done");
  const doing = open.filter(r => r.status === "doing");
  const wait = open.filter(r => r.status !== "doing");
  const cal = calendarItems();
  const slips = state.bankSlips || [];
  const studios = state.rooms.filter(r => r.kind !== "factory" && r.status !== "office");
  const rented = studios.filter(r => r.status === "rented").length;
  const roomHit = text.match(/\d{4}/);
  const lines = [];
  if (/未繳|欠租|誰還沒|繳費|租金/.test(text) || /對帳|銀行|入帳/.test(text)) {
    lines.push("本月未繳 " + unpaid.length + " 戶：");
    lines.push(unpaid.length ? unpaid.map(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return (r ? r.no : "") + " " + t.name + " " + money(r ? r.rent : 0);
    }).join("\n") : "目前沒有未繳租客。");
  }
  if (/報修|維修|冷氣|熱水器|電燈/.test(text)) {
    lines.push("報修待處理 " + wait.length + " 件、處理中 " + doing.length + " 件。");
    if (open.length) lines.push(open.slice(0, 8).map(r => {
      const room = state.rooms.find(x => x.id === r.roomId);
      return (room ? room.no : "") + " " + r.type + "（" + (r.status === "doing" ? "處理中" : "待處理") + "）" + (r.note ? "：" + r.note : "");
    }).join("\n"));
  }
  if (/日曆|預約|行事曆|簽約/.test(text)) {
    lines.push(cal.length ? "已排程：\n" + cal.map(ev => ev.sub + "　" + ev.title).join("\n") : "目前沒有維修或續約預約。");
  }
  if (/對帳|銀行|入帳|存摺/.test(text)) {
    const paidAmt = state.tenants.filter(t => t.paid).reduce((s, t) => s + (Number((state.rooms.find(x => x.id === t.roomId) || {}).rent) || 0), 0);
    const slipAmt = slips.reduce((s, x) => s + (Number(x.amount) || 0), 0);
    lines.push("已上傳入帳 " + slips.length + " 筆，合計 " + money(slipAmt) + "。App 已繳合計 " + money(paidAmt) + "。");
    if (slips.length) lines.push(slips.slice(-6).map(s => (s.date || "") + " " + (s.roomNo || "") + " " + (s.amount ? money(s.amount) : "") + " " + (s.note || "")).join("\n"));
    const unmatched = unpaid.filter(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return r && !slips.some(s => String(s.roomNo) === String(r.no));
    });
    if (unmatched.length) lines.push("尚未對到入帳的未繳：" + unmatched.map(t => {
      const r = state.rooms.find(x => x.id === t.roomId);
      return r ? r.no : "";
    }).join("、"));
  }
  if (roomHit) {
    const no = roomHit[0];
    const r = state.rooms.find(x => String(x.no) === no);
    const t = r ? state.tenants.find(x => x.roomId === r.id) : null;
    if (r) {
      lines.push(r.no + " " + r.title + "，狀態 " + statusLabel(r.status) + "，租金 " + money(r.rent) + "。");
      if (t) lines.push("租客 " + t.name + "，" + (t.paid ? "本月已繳" : "本月未繳") + "，合約 " + t.leaseStart + " 至 " + t.leaseEnd + "。");
    }
  }
  if (!lines.length) {
    lines.push("目前套房出租 " + rented + "／" + studios.length + "。未繳 " + unpaid.length + " 戶，報修未完成 " + open.length + " 件，已排程 " + cal.length + " 筆，銀行入帳資料 " + slips.length + " 筆。");
    lines.push("可以問：誰還沒繳、分析報修、行事曆整理、銀行對帳，或輸入房號。");
  }
  return lines.join("\n");
}
function adminAnnounce() {
  const list = (state.announcements || []).slice().reverse();
  const editing = ui.announceEditId && (state.announcements || []).find(a => a.id === ui.announceEditId);
  return `<div class="admin-grid list">
    <div class="card card-body">
      <h2 class="dash-h">官方 LINE</h2>
      <div class="row"><span class="k">帳號</span><span class="v">統潔開發有限公司</span></div>
      <div class="row"><span class="k">LINE ID</span><span class="v">${LINE_OA_ID}</span></div>
      <div class="row"><span class="k">Channel ID</span><span class="v">2011285350</span></div>
      <div class="row"><span class="k">Webhook</span><span class="v">已驗證成功</span></div>
      <div class="small" style="margin-top:8px">租客加入 @773zynao 後傳送「房號 姓名」，例如 6821 黃宥宇，就會綁定。</div>
      <a class="ghost" href="${LINE_CHAT_URL}" target="_blank" rel="noopener" style="margin-top:10px;display:block;text-align:center">開啟 LINE 聊天室後台</a>
    </div>
    <form class="card card-body" id="rules-form">
      <h2 class="dash-h">使用規範</h2>
      <p class="small">修改後會同步顯示在租客「租約」頁、合約書上方。</p>
      <label class="field"><span>規範內容</span><textarea name="rules" style="min-height:220px">${escapeHtml(state.houseRules || DEFAULT_RULES)}</textarea></label>
      <button class="btn-navy" type="submit">儲存規範</button>
    </form>
    <form class="card card-body" id="announce-form">
      <h2 class="dash-h">${editing ? "編輯公告" : "發布公告"}</h2>
      <label class="field"><span>標題</span><input name="title" type="text" placeholder="例如：停水通知" value="${editing ? escapeHtml(editing.title) : ""}" required /></label>
      <label class="field"><span>內容</span><textarea name="body" required>${editing ? escapeHtml(editing.body) : ""}</textarea></label>
      <label class="upload">上傳照片<input id="ann-photo" type="file" accept="image/*" multiple hidden /></label>
      <label class="upload">上傳影片<input id="ann-video" type="file" accept="video/*" hidden /></label>
      <div id="ann-media-preview">${mediaPreviewHtml(ui.announceMedia, "data-del-ann-media")}</div>
      <button class="btn-navy" type="submit">${editing ? "儲存公告" : "發布公告"}</button>
      ${editing ? `<button class="ghost" type="button" id="cancel-announce-edit" style="margin-top:8px">取消編輯</button>` : ""}
    </form>
    ${list.length ? list.map(a => `
      <div class="card card-body">
        <div class="row"><span class="k">${escapeHtml(a.title)}</span>
          <div class="row-actions">
            <button type="button" class="ghost" data-edit-announce="${a.id}" style="width:auto">編輯</button>
            <button type="button" class="ghost" data-del-announce="${a.id}" style="width:auto">刪除</button>
          </div>
        </div>
        <div class="small">${formatDateTime12(a.createdAt)}</div>
        <p style="margin:10px 0 0;white-space:pre-wrap">${escapeHtml(a.body)}</p>
        ${repairMediaButtons({ id: a.id, media: a.media || [], photo: null })}
      </div>`).join("") : `<div class="empty">還沒有公告</div>`}
  </div>`;
}
function reportStatus(r) {
  if (r.kind === "factory") return { rented: "使用中", vacant: "空置", repair: "維修中" }[r.status] || r.status;
  return statusLabel(r.status);
}
function xmlEsc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}
function xlsCell(v) {
  const n = typeof v === "number" && Number.isFinite(v);
  return `<Cell><Data ss:Type="${n ? "Number" : "String"}">${xmlEsc(n ? v : v)}</Data></Cell>`;
}
function xlsSheet(name, headers, rows) {
  const head = `<Row>${headers.map(h => xlsCell(h)).join("")}</Row>`;
  const body = rows.map(r => `<Row>${r.map(c => xlsCell(c)).join("")}</Row>`).join("");
  return `<Worksheet ss:Name="${xmlEsc(name)}"><Table>${head}${body}</Table></Worksheet>`;
}
function overallRows() {
  return state.rooms.slice().sort((a, b) => {
    const ka = a.kind === "factory" ? "2" : "1";
    const kb = b.kind === "factory" ? "2" : "1";
    if (ka !== kb) return ka.localeCompare(kb);
    return String(a.no).localeCompare(String(b.no), "zh-Hant");
  }).map(r => {
    const t = state.tenants.find(x => x.roomId === r.id);
    const pay = t ? (t.paid ? "已繳" : "未繳") : "—";
    const line = r.no && lineBindForRoom(r.no) ? ("已綁定" + (lineBindName(r.no) ? " " + lineBindName(r.no) : "")) : "未綁定";
    return {
      r, t,
      row: [
        r.no,
        r.kind === "factory" ? "廠房" : (r.status === "office" ? "辦公室" : "套房"),
        r.kind === "factory" ? (r.group || "") : ((floorNo(r.no) || "—") + "樓"),
        reportStatus(r),
        t ? t.name : (r.manager || "—"),
        t ? (t.phone || "") : "",
        Number(r.rent) || 0,
        pay,
        t ? (t.leaseStart || "") : "",
        t ? (t.leaseEnd || "") : "",
        t ? daysLeft(t.leaseEnd) : "",
        line,
        r.location || ""
      ]
    };
  });
}
function exportOverallReport() {
  const items = overallRows();
  const summary = [
    ["項目", "數值"],
    ["套房數", state.rooms.filter(r => r.kind !== "factory" && r.status !== "office").length],
    ["廠房數", state.rooms.filter(r => r.kind === "factory").length],
    ["租客數", state.tenants.length],
    ["本月已繳", state.tenants.filter(t => t.paid).length],
    ["本月未繳", state.tenants.filter(t => !t.paid).length],
    ["應收租金", state.rooms.filter(r => r.kind !== "factory").reduce((s, r) => s + (Number(r.rent) || 0), 0)],
    ["已收租金", state.tenants.filter(t => t.paid).reduce((s, t) => s + (Number((state.rooms.find(x => x.id === t.roomId) || {}).rent) || 0), 0)],
    ["報修待處理", state.repairs.filter(x => x.status === "open").length],
    ["報修處理中", state.repairs.filter(x => x.status === "doing").length],
    ["報修已完成", state.repairs.filter(x => x.status === "done").length],
    ["匯出時間", nowStamp()]
  ];
  const assetHead = ["房號", "類型", "樓層/組別", "狀態", "租客/管理人", "電話", "月租", "繳費", "起租日", "到期日", "剩餘天數", "LINE", "地址"];
  const repairHead = ["時間", "房號", "租客", "類型", "狀態", "說明", "預約時間"];
  const repairRows = state.repairs.slice().reverse().map(rep => {
    const r = state.rooms.find(x => x.id === rep.roomId);
    const t = state.tenants.find(x => x.id === rep.tenantId);
    const st = rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成";
    return [formatDateTime12(rep.createdAt), r ? r.no : "", t ? t.name : "", rep.type, st, rep.note || "", rep.appointAt ? formatDateTime12(String(rep.appointAt).replace("T", " ")) : ""];
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
${xlsSheet("總覽", ["項目", "數值"], summary.slice(1))}
${xlsSheet("全部資產", assetHead, items.map(x => x.row))}
${xlsSheet("報修", repairHead, repairRows)}
</Workbook>`;
  const blob = new Blob(["\uFEFF" + xml], { type: "application/vnd.ms-excel" });
  const a = document.createElement("a");
  const day = nowStamp().slice(0, 10);
  a.href = URL.createObjectURL(blob);
  a.download = `統潔開發有限公司-整體報表-${day}.xls`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("已匯出 Excel");
}
function adminDash() {
  const studios = state.rooms.filter(r => r.status !== "office" && r.kind !== "factory");
  const rented = studios.filter(r => r.status === "rented").length;
  const vacant = studios.filter(r => r.status === "vacant").length;
  const fixRooms = new Set(state.repairs.filter(x => x.status !== "done").map(x => x.roomId));
  const repairing = studios.filter(r => r.status === "repair" || fixRooms.has(r.id)).length;
  const occ = studios.length ? Math.round(rented / studios.length * 100) : 0;
  const dueAmt = studios.reduce((s, r) => s + (Number(r.rent) || 0), 0);
  const paidAmt = state.tenants.filter(t => t.paid).reduce((s, t) => s + (Number((state.rooms.find(x => x.id === t.roomId) || {}).rent) || 0), 0);
  const unpaidAmt = Math.max(dueAmt - paidAmt, 0);
  const collectRate = dueAmt ? Math.round(paidAmt / dueAmt * 100) : 0;
  const unpaidTenants = state.tenants.filter(t => !t.paid);
  const expiring = state.tenants.map(t => ({ t, days: daysLeft(t.leaseEnd) })).filter(x => x.days <= 90).sort((a, b) => a.days - b.days);
  const soon = expiring.filter(x => x.days <= 60).length;
  const fixes = {
    open: state.repairs.filter(x => x.status === "open").length,
    doing: state.repairs.filter(x => x.status === "doing").length,
    done: state.repairs.filter(x => x.status === "done").length
  };
  const floors = [1, 2, 3, 4, 5].map(fl => {
    const list = studios.filter(r => floorNo(r.no) === fl);
    const full = list.filter(r => r.status === "rented").length;
    return { fl, total: list.length, full, pct: list.length ? Math.round(full / list.length * 100) : 0 };
  });
  const avgRent = rented ? Math.round(studios.filter(r => r.status === "rented").reduce((s, r) => s + r.rent, 0) / rented) : 0;
  return `<div class="dash">
    <div class="dash-hero">
      <div class="card kpi accent"><div class="k">本月應收租金</div><div class="num">${money(dueAmt)}</div><div class="small">平均每間 ${money(avgRent)}</div></div>
      <div class="card kpi"><div class="k">已收／未收</div><div class="num">${money(paidAmt)}</div><div class="small">未收 ${money(unpaidAmt)} · ${unpaidTenants.length} 戶</div></div>
      <div class="card ring-card"><div class="ring" style="--p:${collectRate}"><b>${collectRate}%</b></div><div><div class="k">本月收租率</div><div class="small">已繳 ${state.tenants.filter(t => t.paid).length}／${state.tenants.length} 位租客</div></div></div>
      <div class="card ring-card"><div class="ring teal" style="--p:${occ}"><b>${occ}%</b></div><div><div class="k">套房出租率</div><div class="small">滿租 ${rented} · 空置 ${vacant} · 維修 ${repairing}</div></div></div>
    </div>
    <div class="card card-body">
      <div class="row" style="align-items:flex-start">
        <div>
          <h2 class="dash-h" style="margin:0">整體報表</h2>
          <div class="small">套房、廠房、繳費、報修一次彙總，可匯出 Excel</div>
        </div>
        <button type="button" class="ghost" id="export-report" style="width:auto;flex:0 0 auto">匯出 Excel</button>
      </div>
      <div class="report-sum">
        <span>套房 ${studios.length}</span>
        <span>廠房 ${state.rooms.filter(r => r.kind === "factory").length}</span>
        <span>已繳 ${state.tenants.filter(t => t.paid).length}</span>
        <span>未繳 ${unpaidTenants.length}</span>
        <span>報修中 ${fixes.open + fixes.doing}</span>
      </div>
      <div class="report-wrap">
        <table class="report-table">
          <thead><tr><th>房號</th><th>類型</th><th>狀態</th><th>租客</th><th>月租</th><th>繳費</th><th>到期</th><th>LINE</th></tr></thead>
          <tbody>
            ${overallRows().map(x => `<tr>
              <td>${escapeHtml(String(x.row[0]))}</td>
              <td>${escapeHtml(String(x.row[1]))}</td>
              <td>${escapeHtml(String(x.row[3]))}</td>
              <td>${escapeHtml(String(x.row[4]))}</td>
              <td>${money(x.row[6])}</td>
              <td>${escapeHtml(String(x.row[7]))}</td>
              <td>${escapeHtml(String(x.row[9] || "—"))}</td>
              <td>${escapeHtml(String(x.row[11]))}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${monthCashHtml()}
    <div class="dash-two">
      <div class="card card-body"><h2 class="dash-h">樓層出租概況</h2>
        ${floors.map(f => `<div class="bar-row"><span>${f.fl}樓</span><div class="bar"><i style="width:${f.pct}%"></i></div><em>${f.full}/${f.total}</em></div>`).join("")}
      </div>
      <div class="card card-body"><h2 class="dash-h">房況與報修</h2>
        <div class="stack">
          <div class="chip-line"><span class="dot rented"></span>滿租 ${rented}</div>
          <div class="chip-line"><span class="dot vacant"></span>空置 ${vacant}</div>
          <div class="chip-line"><span class="dot repair"></span>維修中 ${repairing}</div>
          <div class="chip-line"><span class="dot office"></span>辦公室 1</div>
        </div>
        <div class="fix-pills"><span>待處理 ${fixes.open}</span><span>處理中 ${fixes.doing}</span><span>已完成 ${fixes.done}</span></div>
      </div>
    </div>
    <div class="dash-two">
      <div class="card card-body"><h2 class="dash-h">續約申請</h2>
        ${(state.renewals || []).filter(x => x.status !== "done").length
          ? (state.renewals || []).filter(x => x.status !== "done").slice().reverse().map(x => {
              const room = state.rooms.find(r => r.id === x.roomId);
              const tenant = state.tenants.find(t => t.id === x.tenantId);
              return `<div class="mini clickable" data-admin-room="${x.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(tenant ? tenant.name : "")} · 申請續約</b><span>${x.appointAt ? formatDateTime12(String(x.appointAt).replace("T", " ")) : formatDateTime12(x.createdAt)}</span></div>`;
            }).join("")
          : `<div class="empty">目前沒有續約申請</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">未繳租客</h2>
        ${unpaidTenants.length ? unpaidTenants.map(t => {
          const room = state.rooms.find(x => x.id === t.roomId);
          const late = rentOverdueDays();
          return `<div class="mini clickable" data-admin-room="${t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(t.name)} · ${money(room?.rent || 0)}</b><span class="overdue">${late > 0 ? "逾期 " + late + " 日" : "今日到期"}</span></div>`;
        }).join("") : `<div class="empty">本月已全部收款</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">繳費回報</h2>
        ${state.tenants.filter(t => t.paid && (t.paidVia || t.lineNotified)).length
          ? state.tenants.filter(t => t.paid && (t.paidVia || t.lineNotified)).slice().sort((a, b) => String(b.paidAt || "").localeCompare(String(a.paidAt || ""))).map(t => {
              const room = state.rooms.find(x => x.id === t.roomId);
              return `<div class="mini clickable" data-admin-room="${t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(t.name)}</b><span>${t.lineNotified ? "LINE 已通知" : "App 回報"}</span></div>`;
            }).join("")
          : `<div class="empty">尚無 App／LINE 繳費回報</div>`}
      </div>
      <div class="card card-body"><h2 class="dash-h">90 天內到期（${soon} 戶 60 天內）</h2>
        ${expiring.length ? expiring.slice(0, 8).map(x => {
          const room = state.rooms.find(r => r.id === x.t.roomId);
          return `<div class="mini clickable" data-admin-room="${x.t.roomId}"><b>${room ? room.no : ""} ·${escapeHtml(x.t.name)}</b><span>${x.days} 天 · ${x.t.leaseEnd}</span></div>`;
        }).join("") : `<div class="empty">近 90 天沒有到期合約</div>`}
      </div>
    </div>
  </div>`;
}
function adminRoomListHtml(kind) {
  if (kind === "factory") {
    const list = state.rooms.filter(r => r.kind === "factory").slice().sort((a, b) => {
      const ga = FACTORY_GROUP_ORDER.indexOf(a.group);
      const gb = FACTORY_GROUP_ORDER.indexOf(b.group);
      if (ga !== gb) return (ga < 0 ? 99 : ga) - (gb < 0 ? 99 : gb);
      return String(a.no).localeCompare(String(b.no), "zh-Hant");
    });
    if (!list.length) return `<div class="empty">目前沒有廠房</div>`;
    let last = "";
    return list.map(r => {
      const head = r.group !== last ? `<div class="floor-h">${r.group}${r.company ? " · " + r.company : ""} · ${r.street}（${list.filter(x => x.group === r.group).length} 戶）</div>` : "";
      last = r.group;
      return `${head}<div class="card item clickable" data-admin-room="${r.id}">
        ${photoEl(r.photos && r.photos[0], r.no)}
        <div><strong>${r.no}</strong>
          <div class="small">${escapeHtml(r.location || "")}${r.manager ? " · " + escapeHtml(r.manager) : ""}</div>
        </div>
        <select class="select-mini" data-status="${r.id}">
          <option value="rented" ${r.status === "rented" ? "selected" : ""}>使用中</option>
          <option value="vacant" ${r.status === "vacant" ? "selected" : ""}>空置</option>
          <option value="repair" ${r.status === "repair" ? "selected" : ""}>維修中</option>
        </select>
      </div>`;
    }).join("");
  }
  const list = roomsByFloor().filter(r => (r.kind || "studio") !== "factory");
  if (!list.length) return `<div class="empty">${kind === "factory" ? "目前沒有廠房" : "目前沒有套房"}</div>`;
  let lastFloor = "";
  return list.map(r => {
    const t = state.tenants.find(x => x.id === r.tenantId);
    const floor = floorNo(r.no);
    const head = String(floor) !== lastFloor ? `<div class="floor-h">${floor}樓</div>` : "";
    lastFloor = String(floor);
    return `${head}<div class="card item clickable" data-admin-room="${r.id}">
      ${photoEl(r.photos && r.photos[0], r.no)}
      <div><strong>${r.no}　${r.title}</strong>
        <div class="small">${r.status === "office" ? "自用 · 統潔開發" : money(r.rent) + "／月"}${r.status === "office" ? "" : (t && t.name ? " · " + t.name : " · 尚無租客")}</div>
      </div>
      <select class="select-mini" data-status="${r.id}">
        <option value="rented" ${r.status === "rented" ? "selected" : ""}>滿租</option>
        <option value="vacant" ${r.status === "vacant" ? "selected" : ""}>空置</option>
        <option value="repair" ${r.status === "repair" ? "selected" : ""}>維修中</option>
        <option value="office" ${r.status === "office" ? "selected" : ""}>辦公室</option>
      </select>
    </div>`;
  }).join("");
}
function adminRooms() {
  const kind = ui.assetKind === "factory" ? "factory" : "studio";
  return `<div class="admin-grid list">
    <div class="card card-body">
      <div class="seg ${kind === "factory" ? "is-factory" : "is-studio"}">
        <i class="seg-bg"></i>
        <button type="button" class="${kind === "studio" ? "on" : ""}" data-asset-kind="studio">套房</button>
        <button type="button" class="${kind === "factory" ? "on" : ""}" data-asset-kind="factory">廠房</button>
      </div>
    </div>
    <div id="asset-list">${adminRoomListHtml(kind)}</div>
  </div>`;
}
function adminTenants() {
  const list = state.tenants.slice().sort((a, b) => {
    if (!!a.paid !== !!b.paid) return a.paid ? 1 : -1;
    const ra = state.rooms.find(x => x.id === a.roomId);
    const rb = state.rooms.find(x => x.id === b.roomId);
    return String(ra?.no || "").localeCompare(String(rb?.no || ""), "zh-Hant");
  });
  const renews = (state.renewals || []).filter(x => x.status !== "done").slice().reverse();
  return `<div class="admin-grid list">
    <p class="small" style="padding:0 4px">向左滑動租客圖卡，可同時打開官方 LINE 私訊視窗。</p>
    ${renews.length ? `<div class="card card-body"><h2 class="dash-h">續約申請</h2>${renews.map(x => {
      const room = state.rooms.find(r => r.id === x.roomId);
      const tenant = state.tenants.find(t => t.id === x.tenantId);
      return `<div class="mini"><b>${room ? room.no : ""} ·${escapeHtml(tenant ? tenant.name : "")}</b>
        <button type="button" class="ghost" data-renew-done="${x.id}" style="width:auto">已處理</button></div>
        <div class="small" style="margin-bottom:8px">申請時間 ${formatDateTime12(x.createdAt)}</div>
        <div class="appoint-box">
          <label class="field"><span>簽約時間</span>
            <input type="datetime-local" data-renew-appoint="${x.id}" value="${x.appointAt || ""}" />
          </label>
          <div class="small">${x.appointAt ? "已預約 " + formatDateTime12(String(x.appointAt).replace("T", " ")) : "選擇簽約時間"}</div>
        </div>`;
    }).join("")}</div>` : ""}
    ${list.map(t => {
    const r = state.rooms.find(x => x.id === t.roomId);
    const pay = payLabel(t);
    return `<div class="swipe-wrap" data-swipe-tenant="${t.id}">
      <div class="swipe-reveal">LINE<br>私訊</div>
      <div class="card card-body clickable swipe-front" data-admin-room="${t.roomId}">
      <div class="row"><span class="k">${escapeHtml(t.name)}</span><span class="pay-pill ${pay.cls}">${pay.text}</span></div>
      ${t.paidVia || t.lineNotified ? `<div class="row"><span class="k">繳費回報</span><span class="v">${t.lineNotified ? "官方 LINE 已通知" : "App 已回報"}${t.paidAt ? " · " + formatDateTime12(t.paidAt) : ""}</span></div>` : ""}
      <div class="row"><span class="k">房間</span><span class="v">${r ? r.no : "—"}</span></div>
      ${(() => {
        const bound = r && lineBindForRoom(r.no);
        return `<div class="row" data-line-status="${r ? r.no : ""}"><span class="k">LINE</span>${bound ? `<span class="badge rented">已綁定${lineBindName(r.no) ? " · " + escapeHtml(lineBindName(r.no)) : ""}</span>` : `<span class="small">尚未綁定</span>`}</div>`;
      })()}
      <div class="row"><span class="k">電話</span><span class="v">${t.phone}</span></div>
      <div class="row"><span class="k">租期</span><span class="v">${t.leaseStart} → ${t.leaseEnd}</span></div>
      <div class="row"><span class="k">剩餘</span><span class="v">${daysLeft(t.leaseEnd)} 天</span></div>
      <button class="ghost" data-invoice="${t.roomId}" style="margin-top:8px">產出發票</button>
      <button class="ghost" data-toggle-pay="${t.id}" style="margin-top:8px">${t.paid ? "標記為未繳" : "標記為已繳"}</button>
    </div>
    </div>`;
  }).join("")}
    <div class="line-dock" id="line-dock">
      <div class="line-dock-bar">
        <div>
          <strong>官方 LINE 私訊</strong>
          <div class="small" id="line-dock-who" style="color:#e9fbe9">選擇租客後開啟聊天室</div>
        </div>
        <button type="button" class="ghost" id="line-dock-close" style="width:auto">關閉</button>
      </div>
      <iframe id="line-dock-frame" src="${LINE_CHAT_URL}" title="官方 LINE 聊天室"></iframe>
      <div class="line-dock-fallback">
        <p id="line-dock-note">租客請在官方 LINE 傳送「房號 姓名」，例如 6821 黃宥宇。</p>
        <a class="btn-navy" href="${LINE_CHAT_URL}" target="_blank" rel="noopener">開啟 LINE 聊天室視窗</a>
        <a class="ghost" href="${LINE_OA_URL}" target="_blank" rel="noopener" style="margin-top:8px;display:block;text-align:center">官方帳號 ${LINE_OA_URL.replace("https://","")}</a>
      </div>
    </div>
  </div>`;
}
function adminRepairs() {
  if (!state.repairs.length) return `<div class="empty">目前沒有報修</div>`;
  return `<div class="admin-grid list">${state.repairs.slice().reverse().map(rep => {
    const r = state.rooms.find(x => x.id === rep.roomId);
    const t = state.tenants.find(x => x.id === rep.tenantId);
    return `<div class="card card-body">
      <div class="row"><span class="k">${rep.type} · ${r ? r.no : ""}</span><span class="badge ${rep.status}">${rep.status === "open" ? "待處理" : rep.status === "doing" ? "處理中" : "已完成"}</span></div>
      <div class="small">${escapeHtml(t ? t.name : "")} · ${formatDateTime12(rep.createdAt)}</div>
      <p style="margin:10px 0">${escapeHtml(rep.note)}</p>
      ${repairMediaButtons(rep)}
      ${appointBlock(rep)}
      <div class="seg ${rep.status === "done" ? "is-done" : rep.status === "doing" ? "is-doing" : ""}">
        <i class="seg-bg"></i>
        <button type="button" class="${rep.status === "doing" ? "on" : ""}" data-rep-status="${rep.id}|doing">處理中</button>
        <button type="button" class="${rep.status === "done" ? "on" : ""}" data-rep-status="${rep.id}|done">已完成</button>
      </div>
    </div>`;
  }).join("")}</div>`;
}
function field(label, name, value, type) {
  if (type === "textarea") return `<label class="field"><span>${label}</span><textarea name="${name}">${escapeHtml(value || "")}</textarea></label>`;
  if (type === "select-status") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="rented" ${value === "rented" ? "selected" : ""}>滿租</option>
    <option value="vacant" ${value === "vacant" ? "selected" : ""}>空置</option>
    <option value="repair" ${value === "repair" ? "selected" : ""}>維修中</option>
    <option value="office" ${value === "office" ? "selected" : ""}>辦公室</option>
  </select></label>`;
  if (type === "select-kind") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="studio" ${value === "studio" ? "selected" : ""}>套房</option>
    <option value="factory" ${value === "factory" ? "selected" : ""}>廠房</option>
  </select></label>`;
  if (type === "select-paid") return `<label class="field"><span>${label}</span><select name="${name}">
    <option value="1" ${value ? "selected" : ""}>本月已繳</option>
    <option value="0" ${!value ? "selected" : ""}>本月未繳</option>
  </select></label>`;
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type || "text"}" value="${escapeHtml(value ?? "")}" /></label>`;
}
function adminRoomEdit() {
  const r = state.rooms.find(x => x.id === ui.roomId);
  if (!r) return `<div class="empty">找不到房間</div>`;
  const t = state.tenants.find(x => x.id === r.tenantId);
  return `<div class="admin-grid list">
    <form class="card card-body" id="room-edit-form">
      <button class="back" type="button" data-admin="rooms">← 所有資產</button>
      <h2 class="dash-h">${r.no}　${r.title}</h2>
      ${field("房號", "no", r.no)}
      ${field("房間地址", "location", r.location || (r.kind === "factory" ? "" : roomAddress(r.no)))}
      ${field("分組", "group", r.group || "")}
      ${field("路段", "street", r.street || "")}
      ${field("歸屬", "company", r.company || "")}
      ${field("負責人", "manager", r.manager || "")}
      ${field("資產類型", "kind", r.kind || "studio", "select-kind")}
      ${field("房型", "title", r.title)}
      ${field("租金", "rent", r.rent, "text")}
      ${field("押金", "deposit", r.deposit, "text")}
      ${field("狀態", "status", r.status, "select-status")}
      ${field("租客姓名", "name", t?.name || "")}
      ${field("電話", "phone", t?.phone || "")}
      ${field("身分證字號", "idNo", t?.idNo || "")}
      ${field("通訊地址", "address", t?.address || "")}
      ${field("緊急聯絡人", "emergencyName", t?.emergencyName || "")}
      ${field("緊急電話", "emergencyPhone", t?.emergencyPhone || "")}
      ${field("起租日", "leaseStart", t?.leaseStart, "date")}
      ${field("到期日", "leaseEnd", t?.leaseEnd, "date")}
      ${field("每月繳費日", "dueDay", t?.dueDay || 5)}
      ${field("本月繳費", "paid", t ? t.paid : true, "select-paid")}
      ${field("備註", "note", t?.note, "textarea")}
      <div class="section-title"><h2>房間照片（${Math.min((r.photos || []).length, 5)}／5）</h2></div>
      <label class="upload">上傳房間照片<input id="room-photo-upload" type="file" accept="image/*" multiple hidden /></label>
      <p class="small">每個房間最多 5 張，第一張會顯示在列表與租客的房間頁。</p>
      <div class="media-preview">${(r.photos || []).map((src, i) => `
        <div class="media-thumb">
          <img src="${src}" alt="房間照片 ${i + 1}">
          <span>第 ${i + 1} 張${i === 0 ? "（封面）" : ""}</span>
          <button type="button" class="ghost" data-del-photo="${i}">刪除</button>
        </div>`).join("")}</div>
      <div class="section-title"><h2>合約書</h2></div>
      <label class="upload">上傳合約書圖檔<input id="contract-upload" type="file" accept="image/*" multiple hidden /></label>
      ${!(r.contractImages && r.contractImages.length) ? `<p class="small">上傳後會顯示在租客的「租約」頁。</p>` : ""}
      ${(r.contractImages || []).map((src, i) => `<div><img src="${src}" alt="" style="width:100%;border-radius:12px;margin:8px 0"><button type="button" class="ghost" data-del-contract="${i}">刪除圖檔</button></div>`).join("")}
      <button type="button" class="ghost" data-invoice="${r.id}" style="margin-top:12px">產出發票</button>
      <button class="btn-navy" type="submit" style="margin-top:12px">儲存</button>
    </form>
  </div>`;
}
function saveRoomEdit(form) {
  const r = state.rooms.find(x => x.id === ui.roomId);
  if (!r) return;
  const g = n => form[n] ? form[n].value : "";
  r.no = g("no") || r.no;
  r.location = g("location") || r.location || (r.kind === "factory" ? "" : roomAddress(r.no));
  r.group = g("group");
  r.street = g("street");
  r.company = g("company");
  r.manager = g("manager");
  r.title = g("title") || r.title;
  r.kind = g("kind") || r.kind || "studio";
  r.rent = Number(g("rent")) || r.rent;
  r.deposit = Number(g("deposit")) || r.deposit;
  r.status = g("status") || r.status;
  let t = state.tenants.find(x => x.id === r.tenantId);
  if (!t && g("name")) {
    t = { id: "t" + Date.now(), roomId: r.id, paid: true, leaseStart: "2026-03-01", leaseEnd: "2027-02-28", dueDay: 5 };
    state.tenants.push(t); r.tenantId = t.id;
  }
  if (t) {
    t.name = g("name"); t.phone = g("phone"); t.idNo = g("idNo"); t.address = g("address");
    t.emergencyName = g("emergencyName"); t.emergencyPhone = g("emergencyPhone");
    t.leaseStart = g("leaseStart"); t.leaseEnd = g("leaseEnd");
    t.dueDay = Number(g("dueDay")) || t.dueDay || 5;
    t.paid = g("paid") === "1"; t.note = g("note");
  }
  save(); toast("已儲存");
}

function tryLogin() {
  const input = document.getElementById("room-login");
  const no = (input.value || "").replace(/\s+/g, "");
  if (ui.page === "admin-login") {
    if (ADMIN_CODES.includes(no)) { ui.role = "admin"; ui.page = "dash"; ui.loginError = ""; render(); return; }
    ui.loginError = "密碼不正確"; render(); return;
  }
  const room = state.rooms.find(r => r.no === no);
  if (!room) { ui.loginError = "找不到這個房號"; render(); return; }
  if (room.status === "office" || !room.tenantId) {
    ui.loginError = room.status === "office" ? "7651 為辦公室，請改走管理員登入" : "此房號目前沒有租客";
    render(); return;
  }
  ui.role = "tenant"; ui.tenantId = room.tenantId; ui.roomId = room.id; ui.page = "home"; ui.loginError = "";
  render();
  const unread = unreadAnnouncements(ui.tenantId);
  if (unread.length) {
    const latest = unread[unread.length - 1];
    pushPhoneNotify("管理員公告：" + latest.title, latest.body);
  } else if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
}

function bindGate() {
  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.onclick = () => { ui.page = btn.dataset.go; ui.loginError = ""; render(); };
  });
  const back = document.getElementById("back-gate");
  if (back) back.onclick = () => { ui.page = "home"; ui.loginError = ""; render(); };
  const input = document.getElementById("room-login");
  if (input) {
    input.focus();
    input.addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
    input.addEventListener("input", () => { if (input.value.replace(/\s+/g, "").length >= 4) tryLogin(); });
  }
}

function bindTenant() {
  const out = document.getElementById("logout-tenant");
  if (out) out.onclick = () => { clearSession(); render(); };
  document.querySelectorAll("[data-page]").forEach(el => {
    el.onclick = () => {
      ui.page = el.dataset.page;
      if (ui.page === "repair" && ui.tenantId) {
        let changed = false;
        state.repairs.forEach(r => {
          if (r.tenantId === ui.tenantId && r.appointAt && !r.appointRead) { r.appointRead = true; changed = true; }
        });
        if (changed) save();
      }
      if (ui.page === "lease" && ui.tenantId) {
        let changed = false;
        (state.renewals || []).forEach(x => {
          if (x.tenantId === ui.tenantId && x.appointAt && !x.appointRead) { x.appointRead = true; changed = true; }
        });
        if (changed) save();
      }
      render();
    };
  });
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.onclick = async e => {
      e.preventDefault(); e.stopPropagation();
      const text = btn.dataset.copy || "";
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
        else {
          const ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
        }
        toast("已複製 " + text);
      } catch {
        toast("複製失敗，請長按手動複製");
      }
    };
  });
  const bindLine = document.getElementById("bind-line");
  if (bindLine) {
    bindLine.onclick = () => {
      const r = myRoom(); const t = me();
      const msg = (r ? r.no : "") + (t && t.name ? " " + t.name : "");
      window.open(lineOaMessageUrl(msg), "_blank", "noopener");
      toast("請傳送「房號 姓名」完成綁定");
    };
  }
  const markPaid = document.getElementById("mark-paid");
  if (markPaid && !markPaid.disabled) {
    markPaid.onclick = () => {
      markTenantPaid("app");
      toast("已回報本月已繳費");
    };
  }
  const linePaid = document.getElementById("line-paid");
  if (linePaid) {
    linePaid.onclick = async () => {
      const msg = linePayMessage();
      markTenantPaid("line");
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(msg);
      } catch {}
      const url = lineOaMessageUrl(msg);
      window.open(url, "_blank", "noopener");
      toast("已開啟官方 LINE，請直接傳送");
    };
  }
  document.querySelectorAll("[data-gcal]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      const kind = btn.dataset.gcalKind || "repair";
      const item = kind === "renew"
        ? (state.renewals || []).find(x => x.id === btn.dataset.gcal)
        : state.repairs.find(x => x.id === btn.dataset.gcal);
      if (!item) return;
      item.appointRead = true; save(); openGoogleCalendar(item, kind);
    };
  });
  document.querySelectorAll("[data-gcal-renew]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      const item = (state.renewals || []).find(x => x.id === btn.dataset.gcalRenew);
      if (!item) return;
      item.appointRead = true; save(); openGoogleCalendar(item, "renew");
    };
  });
  document.querySelectorAll("[data-read-announce]").forEach(el => {
    el.onclick = () => {
      const a = (state.announcements || []).find(x => x.id === el.dataset.readAnnounce);
      if (!a || !ui.tenantId) return;
      if (!a.readBy) a.readBy = [];
      if (!a.readBy.includes(ui.tenantId)) { a.readBy.push(ui.tenantId); save(); render(); }
    };
  });
  document.querySelectorAll("[data-room]").forEach(el => {
    el.onclick = () => { ui.roomId = el.dataset.room; ui.page = "room-detail"; render(); };
  });
  document.querySelectorAll("[data-type]").forEach(el => {
    el.onclick = () => {
      ui.repairType = el.dataset.type;
      document.querySelectorAll("[data-type]").forEach(b => b.classList.toggle("selected", b.dataset.type === ui.repairType));
    };
  });
  bindMediaViewers();
  const contracts = (myRoom() && myRoom().contractImages) || [];
  document.querySelectorAll("[data-contract]").forEach(img => {
    img.onclick = () => openContractViewer(contracts, Number(img.dataset.contract));
  });
  const dlAll = document.getElementById("dl-all-contract");
  if (dlAll) {
    dlAll.onclick = e => {
      e.preventDefault();
      const room = myRoom();
      if (!room || !room.contractImages || !room.contractImages.length) { toast("尚無合約書圖檔可下載"); return; }
      downloadContractsPdf(room.contractImages, contractPdfName());
    };
  }
  const askRenew = document.getElementById("ask-renew");
  if (askRenew && !askRenew.disabled) {
    askRenew.onclick = () => {
      const t = me(); const r = myRoom();
      if (!t || !r) return;
      if ((state.renewals || []).some(x => x.tenantId === t.id && x.status !== "done")) {
        toast("已送出續約申請"); return;
      }
      if (!state.renewals) state.renewals = [];
      state.renewals.push({
        id: "rn" + Date.now(), roomId: r.id, tenantId: t.id, status: "open", createdAt: nowStamp()
      });
      save();
      pushPhoneNotify("續約申請", `${r.no} ${t.name || ""} 申請續約`);
      toast("已送出續約申請");
    };
  }
  const photo = document.getElementById("repair-photo");
  const video = document.getElementById("repair-video");
  const addRepairFiles = async (files, kind) => {
    if (!ui.repairMedia) ui.repairMedia = [];
    for (const file of files) {
      if (kind === "video") {
        if (file.size > 8 * 1024 * 1024) { toast("影片請小於 8MB"); continue; }
        ui.repairMedia.push({ kind: "video", src: await readFileDataUrl(file), name: file.name });
      } else {
        try { ui.repairMedia.push({ kind: "image", src: await compressImage(file), name: file.name }); } catch {}
      }
    }
    const box = document.getElementById("media-preview");
    if (box) box.innerHTML = pendingPreviewHtml();
    bindPendingMedia();
  };
  if (photo) photo.onchange = () => { addRepairFiles(photo.files, "image"); photo.value = ""; };
  if (video) video.onchange = () => { addRepairFiles(video.files, "video"); video.value = ""; };
  bindPendingMedia();
  const submit = document.getElementById("submit-repair");
  if (submit) {
    submit.onclick = () => {
      const note = (document.getElementById("repair-note").value || "").trim();
      if (!note) { toast("請先描述問題，才能提交報修"); return; }
      const media = (ui.repairMedia || []).slice();
      const stamp = nowStamp();
      const room = myRoom();
      const rid = "r" + Date.now();
      state.repairs.push({
        id: rid, roomId: room.id, tenantId: me().id, type: ui.repairType, note,
        photo: (media.find(m => m.kind === "image") || {}).src || null, media, status: "open", createdAt: stamp
      });
      if (!state.notices) state.notices = [];
      state.notices.push({ id: "n" + Date.now(), type: "repair", repairId: rid, roomNo: room.no, text: `${room.no} ${ui.repairType}報修`, createdAt: stamp, read: false });
      syncRoomRepairStatus(room.id);
      try { save(); } catch {
        state.repairs.pop(); state.notices.pop(); toast("檔案太大，請改傳較小的照片或影片"); return;
      }
      ui.repairType = "冷氣"; ui.repairMedia = []; ui.page = "repair-done";
      toast("已提交報修");
    };
  }
  const backRepair = document.getElementById("back-repair");
  if (backRepair) backRepair.onclick = () => { ui.page = "repair"; render(); };
}

function bindAnnPending() {
  document.querySelectorAll("[data-del-ann-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault(); e.stopPropagation();
      ui.announceMedia.splice(Number(btn.dataset.delAnnMedia), 1);
      const box = document.getElementById("ann-media-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.announceMedia, "data-del-ann-media");
      bindAnnPending();
    };
  });
}

function bindAdminRoomItems() {
  document.querySelectorAll("[data-admin-room]").forEach(el => {
    el.onclick = e => {
      if (e.target.closest("select") || e.target.closest("button")) return;
      if (el.closest(".swipe-wrap") && el.closest(".swipe-wrap").dataset.swiping === "1") return;
      ui.roomId = el.dataset.adminRoom; ui.page = "room-edit"; render();
    };
  });
  document.querySelectorAll("[data-status]").forEach(sel => {
    sel.onclick = e => e.stopPropagation();
    sel.onchange = () => {
      const room = state.rooms.find(r => r.id === sel.dataset.status);
      room.status = sel.value; save(); toast(`${room.no} 已改為${statusLabel(room.status)}`);
    };
  });
}

function openLineChatFor(tenantId) {
  const t = state.tenants.find(x => x.id === tenantId);
  const r = t ? state.rooms.find(x => x.id === t.roomId) : null;
  const dock = document.getElementById("line-dock");
  const who = document.getElementById("line-dock-who");
  if (who) {
    const bound = r && lineBindForRoom(r.no);
    who.textContent = bound
      ? `${r.no} ${t ? t.name : ""} · 已綁定${lineBindName(r.no) ? " " + lineBindName(r.no) : ""}`
      : `${r ? r.no : ""} ${t ? t.name : ""} · 尚未綁定，請傳「房號 姓名」`;
  }
  const note = document.getElementById("line-dock-note");
  if (note && r) {
    note.textContent = lineBindForRoom(r.no)
      ? "此租客已綁定官方 LINE。聊天室後台可用房號或姓名搜尋。"
      : "此租客尚未綁定。請對方加入 @773zynao 並傳送「房號 姓名」。";
  }
  if (dock) {
    dock.style.transition = "transform .5s ease";
    dock.classList.add("open");
    dock.style.transform = "";
  }
  setTimeout(() => {
    try {
      if (ui.lineWin && !ui.lineWin.closed) ui.lineWin.focus();
      else ui.lineWin = window.open(LINE_CHAT_URL, "tongjie-line", "popup=yes,width=420,height=740,noopener");
    } catch {}
  }, 280);
}
function bindLineSwipe() {
  const close = document.getElementById("line-dock-close");
  if (close) close.onclick = () => {
    const dock = document.getElementById("line-dock");
    if (dock) {
      dock.classList.remove("open");
      dock.style.transform = "";
    }
    document.querySelectorAll(".swipe-front").forEach(el => { el.style.transform = ""; });
  };
  document.querySelectorAll("[data-swipe-tenant]").forEach(wrap => {
    const front = wrap.querySelector(".swipe-front");
    if (!front) return;
    let startX = 0, startY = 0, dx = 0, active = false, moved = false;
    const onDown = e => {
      if (e.target.closest("button") || e.target.closest("select") || e.target.closest("a")) return;
      const p = e.touches ? e.touches[0] : e;
      active = true; moved = false; wrap.dataset.swiping = "0";
      startX = p.clientX; startY = p.clientY; dx = 0;
      front.style.transition = "none";
      const dock = document.getElementById("line-dock");
      if (dock && !dock.classList.contains("open")) {
        dock.style.transition = "none";
        dock.style.transform = "translateX(100%)";
      }
    };
    const onMove = e => {
      if (!active) return;
      const p = e.touches ? e.touches[0] : e;
      const mx = p.clientX - startX;
      const my = p.clientY - startY;
      if (!moved && Math.abs(mx) < 10 && Math.abs(my) < 10) return;
      if (!moved && Math.abs(my) > Math.abs(mx)) { active = false; return; }
      moved = true;
      wrap.dataset.swiping = "1";
      const w = wrap.getBoundingClientRect().width || 320;
      dx = Math.max(-w * 0.85, Math.min(0, mx));
      front.style.transform = `translateX(${dx}px)`;
      const mid = w * (2 / 3);
      const reveal = Math.max(0, Math.min(1, (-dx - mid) / (w * 0.12)));
      const dock = document.getElementById("line-dock");
      if (dock && !dock.classList.contains("open")) {
        dock.style.transition = "none";
        dock.style.transform = `translateX(${(1 - reveal) * 100}%)`;
      }
      if (reveal > 0) {
        const t = state.tenants.find(x => x.id === wrap.dataset.swipeTenant);
        const r = t ? state.rooms.find(x => x.id === t.roomId) : null;
        const who = document.getElementById("line-dock-who");
        if (who) who.textContent = `${r ? r.no : ""} ${t ? t.name : ""}`;
      }
      if (e.cancelable) e.preventDefault();
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      const w = wrap.getBoundingClientRect().width || 320;
      const mid = w * (2 / 3);
      front.style.transition = "transform .5s ease";
      const dock = document.getElementById("line-dock");
      if (dock) dock.style.transition = "transform .5s ease";
      if (-dx >= mid) {
        front.style.transform = "translateX(-88px)";
        openLineChatFor(wrap.dataset.swipeTenant);
      } else {
        front.style.transform = "";
        wrap.dataset.swiping = "0";
        if (dock && !dock.classList.contains("open")) dock.style.transform = "translateX(100%)";
      }
      setTimeout(() => { if (-dx < mid) wrap.dataset.swiping = "0"; }, 500);
    };
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("touchmove", onMove, { passive: false });
    wrap.addEventListener("touchend", onUp);
  });
}

function bindAdmin() {
  document.getElementById("logout").onclick = () => { clearSession(); render(); };
  bindMediaViewers();
  document.querySelectorAll("[data-admin]").forEach(btn => {
    btn.onclick = () => { ui.page = btn.dataset.admin; render(); };
  });
  document.querySelectorAll("[data-asset-kind]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const kind = btn.dataset.assetKind;
      if (ui.assetKind === kind) return;
      ui.assetKind = kind;
      const seg = btn.closest(".seg");
      if (seg) {
        seg.classList.remove("is-studio", "is-factory");
        seg.classList.add(kind === "factory" ? "is-factory" : "is-studio");
        seg.querySelectorAll("button").forEach(b => b.classList.remove("on"));
        btn.classList.add("on");
      }
      const box = document.getElementById("asset-list");
      if (box) {
        box.innerHTML = adminRoomListHtml(kind);
        bindAdminRoomItems();
      }
    };
  });
  const onTab = document.querySelector(".tab.on");
  if (onTab && onTab.scrollIntoView) onTab.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  bindAdminRoomItems();
  bindLineSwipe();
  document.querySelectorAll("[data-invoice]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      ui.invoiceRoomId = btn.dataset.invoice;
      ui.invoiceFrom = ui.page === "room-edit" ? "room-edit" : "tenants";
      ui.page = "invoice";
      render();
    };
  });
  const printInv = document.getElementById("print-invoice");
  if (printInv) printInv.onclick = () => {
    const track = document.getElementById("inv-track");
    const num = document.getElementById("inv-num");
    ui.invoiceTrack = track ? String(track.value || "").trim().toUpperCase() : "";
    ui.invoiceNum = num ? String(num.value || "").trim() : "";
    render();
    setTimeout(() => window.print(), 50);
  };
  const invTrack = document.getElementById("inv-track");
  const invNum = document.getElementById("inv-num");
  if (invTrack) invTrack.onchange = () => { ui.invoiceTrack = String(invTrack.value || "").trim().toUpperCase(); };
  if (invNum) invNum.onchange = () => { ui.invoiceNum = String(invNum.value || "").trim(); };
  const exportBtn = document.getElementById("export-report");
  if (exportBtn) exportBtn.onclick = exportOverallReport;
  refreshLineBinds().then(() => {
    document.querySelectorAll("[data-line-status]").forEach(el => {
      const no = el.dataset.lineStatus;
      const bound = lineBindForRoom(no);
      el.innerHTML = `<span class="k">LINE</span>${bound ? `<span class="badge rented">已綁定${lineBindName(no) ? " · " + escapeHtml(lineBindName(no)) : ""}</span>` : `<span class="small">尚未綁定</span>`}`;
    });
  });
  const form = document.getElementById("room-edit-form");
  if (form) form.onsubmit = e => { e.preventDefault(); saveRoomEdit(form); };
  const roomPhotoUp = document.getElementById("room-photo-upload");
  if (roomPhotoUp) {
    roomPhotoUp.onchange = async () => {
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      ensurePhotos(room);
      const files = [...roomPhotoUp.files];
      for (const file of files) {
        if (room.photos.length >= 5) { toast("每個房間最多 5 張照片"); break; }
        try { room.photos.push(await compressImage(file)); } catch {}
      }
      save();
      render();
    };
  }
  document.querySelectorAll("[data-del-photo]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      room.photos.splice(Number(btn.dataset.delPhoto), 1);
      if (!room.photos.length) room.photos = photosFor(room.no).slice();
      save();
      render();
    };
  });
  const up = document.getElementById("contract-upload");
  if (up) {
    up.onchange = async () => {
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      if (!room.contractImages) room.contractImages = [];
      for (const file of up.files) { try { room.contractImages.push(await compressImage(file)); } catch {} }
      save(); render();
    };
  }
  document.querySelectorAll("[data-del-contract]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const room = state.rooms.find(r => r.id === ui.roomId);
      if (!room) return;
      room.contractImages.splice(Number(btn.dataset.delContract), 1); save(); render();
    };
  });
  document.querySelectorAll("[data-toggle-pay]").forEach(btn => {
    btn.onclick = () => {
      const t = state.tenants.find(x => x.id === btn.dataset.togglePay);
      t.paid = !t.paid; save(); render();
    };
  });
  document.querySelectorAll("[data-renew-done]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const item = (state.renewals || []).find(x => x.id === btn.dataset.renewDone);
      if (item) { item.status = "done"; save(); render(); }
    };
  });
  document.querySelectorAll("[data-renew-appoint]").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = () => {
      const item = (state.renewals || []).find(x => x.id === inp.dataset.renewAppoint);
      if (!item) return;
      item.appointAt = inp.value;
      item.appointRead = !inp.value;
      save();
      const shown = inp.closest(".appoint-box") && inp.closest(".appoint-box").querySelector(".small");
      if (shown) shown.textContent = inp.value ? "已預約 " + formatDateTime12(String(inp.value).replace("T", " ")) : "選擇簽約時間";
      if (inp.value) pushPhoneNotify("續約簽約時間已安排", formatDateTime12(String(inp.value).replace("T", " ")));
    };
  });
  document.querySelectorAll("[data-rep-status]").forEach(btn => {
    btn.onclick = () => {
      const [id, status] = btn.dataset.repStatus.split("|");
      const rep = state.repairs.find(x => x.id === id);
      if (!rep) return;
      rep.status = status; syncRoomRepairStatus(rep.roomId); save();
      const card = btn.closest(".card"); const seg = btn.closest(".seg");
      if (seg) {
        seg.classList.remove("is-doing", "is-done");
        seg.classList.add(status === "done" ? "is-done" : "is-doing");
        seg.querySelectorAll("button").forEach(b => b.classList.remove("on"));
        btn.classList.add("on");
      }
      const badge = card && card.querySelector(".badge");
      if (badge) { badge.className = "badge " + status; badge.textContent = status === "done" ? "已完成" : "處理中"; }
      updateTabBadges();
    };
  });
  document.querySelectorAll("[data-appoint]").forEach(inp => {
    inp.onclick = e => e.stopPropagation();
    inp.onchange = () => {
      const rep = state.repairs.find(x => x.id === inp.dataset.appoint);
      if (!rep) return;
      rep.appointAt = inp.value; rep.appointRead = !inp.value; save();
      const shown = inp.closest(".card") && inp.closest(".card").querySelector(".appoint-shown");
      if (shown) shown.textContent = inp.value ? "已預約 " + formatDateTime12(String(inp.value).replace("T", " ")) : "選擇完成維修的時間";
      if (inp.value) pushPhoneNotify("報修預約已安排", formatDateTime12(String(inp.value).replace("T", " ")));
    };
  });
  const rulesForm = document.getElementById("rules-form");
  if (rulesForm) {
    rulesForm.onsubmit = e => {
      e.preventDefault();
      const text = (rulesForm.rules.value || "").trim();
      if (!text) { toast("請填寫使用規範"); return; }
      state.houseRules = text;
      save();
      toast("使用規範已更新，租客租約會同步");
    };
  }
  const af = document.getElementById("announce-form");
  if (af) {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    const addAnnFiles = async (files, kind) => {
      if (!ui.announceMedia) ui.announceMedia = [];
      for (const file of files) {
        if (kind === "video") {
          if (file.size > 8 * 1024 * 1024) { toast("影片請小於 8MB"); continue; }
          ui.announceMedia.push({ kind: "video", src: await readFileDataUrl(file), name: file.name });
        } else {
          try { ui.announceMedia.push({ kind: "image", src: await compressImage(file), name: file.name }); } catch {}
        }
      }
      const box = document.getElementById("ann-media-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.announceMedia, "data-del-ann-media");
      bindAnnPending();
    };
    const photo = document.getElementById("ann-photo");
    const video = document.getElementById("ann-video");
    if (photo) photo.onchange = () => { addAnnFiles(photo.files, "image"); photo.value = ""; };
    if (video) video.onchange = () => { addAnnFiles(video.files, "video"); video.value = ""; };
    bindAnnPending();
    af.onsubmit = e => {
      e.preventDefault();
      const title = (af.title.value || "").trim();
      const body = (af.body.value || "").trim();
      if (!title || !body) { toast("請填寫標題與內容"); return; }
      if (!state.announcements) state.announcements = [];
      const media = (ui.announceMedia || []).slice();
      if (ui.announceEditId) {
        const a = state.announcements.find(x => x.id === ui.announceEditId);
        if (a) { a.title = title; a.body = body; a.media = media; a.updatedAt = nowStamp(); }
        ui.announceEditId = null; ui.announceMedia = []; save(); toast("已更新公告"); return;
      }
      state.announcements.push({ id: "a" + Date.now(), title, body, media, createdAt: nowStamp(), readBy: [] });
      ui.announceMedia = []; save();
      pushPhoneNotify("管理員公告：" + title, body);
      toast("已發布公告");
    };
  }
  const cancelAnn = document.getElementById("cancel-announce-edit");
  if (cancelAnn) cancelAnn.onclick = () => { ui.announceEditId = null; ui.announceMedia = []; render(); };
  document.querySelectorAll("[data-edit-announce]").forEach(btn => {
    btn.onclick = () => {
      const a = (state.announcements || []).find(x => x.id === btn.dataset.editAnnounce);
      if (!a) return;
      ui.announceEditId = a.id; ui.announceMedia = (a.media || []).slice(); render();
    };
  });
  document.querySelectorAll("[data-del-announce]").forEach(btn => {
    btn.onclick = () => {
      state.announcements = (state.announcements || []).filter(a => a.id !== btn.dataset.delAnnounce);
      if (ui.announceEditId === btn.dataset.delAnnounce) { ui.announceEditId = null; ui.announceMedia = []; }
      save(); render();
    };
  });
  bindAdminAi();
  bindCashCal();
}

function bindAdminAi() {
  const ask = q => {
    const text = String(q || "").trim();
    if (!text) return;
    if (!state.aiLogs) state.aiLogs = [];
    state.aiLogs.push({ role: "admin", text, at: nowStamp() });
    state.aiLogs.push({ role: "ai", text: aiAnswer(text), at: nowStamp() });
    if (state.aiLogs.length > 40) state.aiLogs = state.aiLogs.slice(-40);
    save(); render();
  };
  document.querySelectorAll("[data-ai-q]").forEach(btn => {
    btn.onclick = () => ask(btn.dataset.aiQ);
  });
  const form = document.getElementById("ai-form");
  if (form) form.onsubmit = e => {
    e.preventDefault();
    const box = document.getElementById("ai-q");
    ask(box && box.value);
  };
  document.querySelectorAll("[data-del-bank-media]").forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      (ui.bankMedia || []).splice(Number(btn.dataset.delBankMedia), 1);
      const box = document.getElementById("bank-preview");
      if (box) box.innerHTML = mediaPreviewHtml(ui.bankMedia, "data-del-bank-media");
      bindAdminAi();
    };
  });
  const file = document.getElementById("bank-file");
  if (file) file.onchange = async () => {
    if (!ui.bankMedia) ui.bankMedia = [];
    for (const f of file.files || []) {
      try {
        if (f.type === "application/pdf") ui.bankMedia.push({ kind: "file", src: await readFileDataUrl(f), name: f.name });
        else ui.bankMedia.push({ kind: "image", src: await compressImage(f), name: f.name });
      } catch {}
    }
    file.value = "";
    const box = document.getElementById("bank-preview");
    if (box) box.innerHTML = mediaPreviewHtml(ui.bankMedia, "data-del-bank-media");
    bindAdminAi();
  };
  const bank = document.getElementById("bank-form");
  if (bank) bank.onsubmit = e => {
    e.preventDefault();
    if (!state.bankSlips) state.bankSlips = [];
    state.bankSlips.push({
      id: "bk" + Date.now(),
      date: bank.date.value,
      amount: Number(String(bank.amount.value || "").replace(/[^\d.]/g, "")) || 0,
      roomNo: (bank.roomNo.value || "").trim(),
      note: (bank.note.value || "").trim(),
      media: (ui.bankMedia || []).slice(),
      createdAt: nowStamp()
    });
    ui.bankMedia = [];
    save(); toast("已儲存入帳資料"); render();
  };
  document.querySelectorAll("[data-del-slip]").forEach(btn => {
    btn.onclick = () => {
      state.bankSlips = (state.bankSlips || []).filter(x => x.id !== btn.dataset.delSlip);
      save(); render();
    };
  });
}
function bindCashCal() {
  ensureCalMonth();
  document.querySelectorAll("[data-cal-nav]").forEach(btn => {
    btn.onclick = () => {
      let y = ui.calYear, m = ui.calMonth + Number(btn.dataset.calNav);
      if (m < 1) { m = 12; y -= 1; }
      if (m > 12) { m = 1; y += 1; }
      ui.calYear = y; ui.calMonth = m; ui.calDay = 1;
      render();
    };
  });
  document.querySelectorAll("[data-cal-day]").forEach(btn => {
    btn.onclick = () => { ui.calDay = Number(btn.dataset.calDay); render(); };
  });
  document.querySelectorAll("[data-del-book]").forEach(btn => {
    btn.onclick = () => {
      state.books = (state.books || []).filter(x => x.id !== btn.dataset.delBook);
      save(); render();
    };
  });
  const form = document.getElementById("book-form");
  if (form) form.onsubmit = e => {
    e.preventDefault();
    const amount = Number(String(form.amount.value || "").replace(/[^\d.]/g, "")) || 0;
    const date = form.date.value;
    if (!amount || !date) { toast("請填日期與金額"); return; }
    if (!state.books) state.books = [];
    state.books.push({
      id: "bk" + Date.now(),
      type: form.type.value === "out" ? "out" : "in",
      date, amount,
      roomNo: (form.roomNo.value || "").trim(),
      note: (form.note.value || "").trim(),
      createdAt: nowStamp()
    });
    ui.calDay = Number(date.slice(8, 10));
    save(); toast("已記入日曆"); render();
  };
}

document.getElementById("app").addEventListener("click", e => {
  const goBtn = e.target.closest("[data-go]");
  if (goBtn && !ui.role) { ui.page = goBtn.dataset.go; ui.loginError = ""; render(); }
});
function hideSplash() {
  const el = document.getElementById("splash");
  if (!el) return;
  el.classList.add("out");
  setTimeout(() => { if (el.parentNode) el.remove(); }, 500);
}
async function boot() {
  const minWait = new Promise(r => setTimeout(r, 1900));
  const got = await pullCloud();
  if (!got) await pushCloud();
  restoreUi();
  render();
  await minWait;
  hideSplash();
  setInterval(async () => {
    const before = state.updatedAt;
    const changed = await pullCloud();
    if (changed && state.updatedAt !== before) render();
  }, 12000);
}
boot();
