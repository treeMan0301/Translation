import fs from "fs-extra";

const LANGUAGES = ["es", "fr", "pt", "sw"];
const ENGLISH_FILE = "translations/en.json";

function reorderKeys() {
  const enData = fs.readJsonSync(ENGLISH_FILE);

  LANGUAGES.forEach(lang => {
    const langFile = `translations/${lang}.json`;

    if (!fs.existsSync(langFile)) {
      fs.writeJsonSync(langFile, {}, { spaces: 2 });
    }

    const langData = fs.readJsonSync(langFile);
    const reorderedData: Record<string, string> = {};

    Object.keys(enData).forEach(key => {
      reorderedData[key] = langData[key] || "";
    });

    fs.writeJsonSync(langFile, reorderedData, { spaces: 2 });
    console.log(`✅ ${lang}.json keys reordered`);
  });
}

reorderKeys();
