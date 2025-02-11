import fs from "fs-extra";
import { parse } from "csv-parse/sync";

const LANGUAGES = ["es", "fr", "pt", "sw"];
const REVIEW_CSV = "review/translations_review.csv";

interface TranslationRow {
  Key: string;
  English: string;
  ES?: string;
  FR?: string;
  PT?: string;
  SW?: string;
}

async function importReviewedCSV() {
  if (!fs.existsSync(REVIEW_CSV)) {
    console.error("❌ Error: CSV file not found. Run `exportCSV.ts` first.");
    return;
  }

  const csvData = fs.readFileSync(REVIEW_CSV, "utf-8");
  const records: TranslationRow[] = parse(csvData, { columns: true, skip_empty_lines: true });

  const translations: Record<string, Record<string, string>> = {};
  records.forEach((row: TranslationRow) => {
    if (!row.Key) return; // Skip invalid rows
    const key = row.Key.trim();
    LANGUAGES.forEach(lang => {
      if (!translations[lang]) translations[lang] = {};
      translations[lang][key] = row[lang.toUpperCase() as keyof TranslationRow]?.trim() || "";
    });
  });

  LANGUAGES.forEach(lang => {
    const langFile = `translations/${lang}.json`;
    const langData = fs.existsSync(langFile) ? fs.readJsonSync(langFile) : {};

    Object.assign(langData, translations[lang]);
    fs.writeJsonSync(langFile, langData, { spaces: 2 });

    console.log(`✅ Imported reviewed translations for ${lang}`);
  });

  console.log("✅ All reviewed translations imported successfully.");
}

importReviewedCSV();
