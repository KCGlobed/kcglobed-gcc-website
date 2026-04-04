
import * as XLSX from "xlsx";
import * as fs from "fs";

const buf = fs.readFileSync("universities.xlsx");
const workbook = XLSX.read(buf);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Read rows
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Convert to simple array
const data = rows
  .slice(1) // remove header
  .map(row => String(row[0]).trim()) // first column
  .filter(val => val); // remove empty

// Remove duplicates (optional but recommended)
const uniqueData = [...new Set(data)];

// Save JSON
fs.writeFileSync("universities.json", JSON.stringify(uniqueData, null, 2));

console.log("✅ Done!");