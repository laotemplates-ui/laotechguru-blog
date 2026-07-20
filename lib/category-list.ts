// ໄຟລ໌ນີ້ບໍ່ແຕະ fs/path ເລີຍ — ປອດໄພໃຫ້ທັງ Server ແລະ Client Component import ໄດ້
export type Category =
  | "it-thurakit"
  | "programming"
  | "khao-it"
  | "cyber-security"
  | "computer-hardware"
  | "office-technique"
  | "kae-khai-banha"
  | "program-tools";

export const CATEGORY_LABELS: Record<Category, string> = {
  "it-thurakit": "IT ທຸລະກິດ",
  "programming": "ການຂຽນໂປຣແກຣມ",
  "khao-it": "ຂ່າວໄອທີ",
  "cyber-security": "ຄວາມປອດໄພໄຊເບີ",
  "computer-hardware": "ຄອມພິວເຕີ & Hardware",
  "office-technique": "ເຕັກນິກ Office",
  "kae-khai-banha": "ແກ້ໄຂບັນຫາ",
  "program-tools": "ໂປຣແກຣມ & ເຄື່ອງມື",
};