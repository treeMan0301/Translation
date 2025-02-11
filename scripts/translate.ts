import fs from "fs-extra";
import axios from "axios";

const LANGUAGES = { es: "es", fr: "fr", pt: "pt", sw: "sw" };
const ENGLISH_FILE = "translations/en.json";
const API_URL = "https://api.mymemory.translated.net/get";

async function translateText(text: string, lang: string): Promise<string> {
  if (!text) return "";
  try {
    const response = await axios.get(API_URL, { params: { q: text, langpair: `en|${lang}` } });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error(`❌ Error translating "${text}" to ${lang}:`, error);
    return text; // fallback to English
  }
}

async function fillTranslations() {
  const enData = fs.readJsonSync(ENGLISH_FILE);

  for (const [lang, langCode] of Object.entries(LANGUAGES)) {
    const langFile = `translations/${lang}.json`;
    const langData = fs.readJsonSync(langFile);

    for (const key of Object.keys(enData)) {
      if (!langData[key]) {
        langData[key] = await translateText(enData[key], langCode);
      }
    }

    fs.writeJsonSync(langFile, langData, { spaces: 2 });
    console.log(`✅ ${lang}.json updated`);
  }
}

fillTranslations();
