import fs from "fs-extra";
import { createObjectCsvWriter } from "csv-writer";

const LANGUAGES = ["es", "fr", "pt", "sw"];
const ENGLISH_FILE = "translations/en.json";
const ORIGIN_CSV = "review/translations_origin.csv";
const CHANGE_CSV = "review/translations_update.csv";

async function exportToCSV() {
  const enData = fs.readJsonSync(ENGLISH_FILE);
  const translations: Record<string, Record<string, string>> = {};

  for (const key of Object.keys(enData)) {
    translations[key] = { English: enData[key] };
    LANGUAGES.forEach(lang => {
      const langFile = `translations/${lang}.json`;
      if (fs.existsSync(langFile)) {
        const langData = fs.readJsonSync(langFile);
        translations[key][lang] = langData[key] || "";
      } else {
        translations[key][lang] = "";
      }
    });
  }

  const csvWriterOrigin = createObjectCsvWriter({
    path: ORIGIN_CSV,
    header: [{ id: "Key", title: "Key" }, { id: "English", title: "English" }],
  });

  const csvWriterChange = createObjectCsvWriter({
    path: CHANGE_CSV,
    header: [{ id: "Key", title: "Key" }, ...LANGUAGES.map(lang => ({ id: lang, title: lang.toUpperCase() })), { id: "English", title: "English" }, { id: "Key", title: "Key" }],
  });

  const records = Object.entries(translations).map(([key, values]) => ({ Key: key, ...values }));
  await csvWriterChange.writeRecords(records);
  await csvWriterOrigin.writeRecords(records);
  console.log(`✅ Translations exported to ${CHANGE_CSV}`);
}

exportToCSV();
