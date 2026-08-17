import * as XLSX from "xlsx";
import * as fs from "fs";

const buf = fs.readFileSync("final_university.xlsx");
const workbook = XLSX.read(buf);

console.log("init")

// Function to extract data
function getDataFromSheet(sheetName, fallbackToFirst = false) {
  let actualSheetName = sheetName;

  // If sheet not found → fallback to first sheet
  if (!workbook.SheetNames.includes(sheetName)) {
    if (fallbackToFirst) {
      actualSheetName = workbook.SheetNames[0];
      console.log(`⚠️ "${sheetName}" not found. Using first sheet: "${actualSheetName}"`);
    } else {
      console.log(`❌ Sheet not found: ${sheetName}`);
      return [];
    }
  }

  const sheet = workbook.Sheets[actualSheetName];

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return rows
    .slice(1)
    .map(row => String(row[0] || "").trim())
    .filter(val => val);
}

// ✅ "All" → fallback to first sheet
const allData = getDataFromSheet("All", true);

// ✅ "Waive off" → no fallback (strict)
const waiveOffData = getDataFromSheet("Waive off");

// Remove duplicates
const uniqueAll = [...new Set(allData)];
const uniqueWaive = [...new Set(waiveOffData)];

// Save files
fs.writeFileSync("universities.json", JSON.stringify(uniqueAll, null, 2));
fs.writeFileSync("select-university.json", JSON.stringify(uniqueWaive, null, 2));

console.log("✅ Done!");