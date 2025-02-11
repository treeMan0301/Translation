How to execute this project:

npm install


---Implement Key Reordering Script
   npx ts-node scripts/recorderKeys.ts
   1. Load en.json as the reference.
   2. Load each translation file (es.json, fr.json, etc.).
   3. Keep only the keys from en.json, discarding extra ones.
   4. Save back the reordered JSON.

---Implement Missing Translations Auto-Fill
   npx ts-node scripts/translate.ts

---Updating New Translations
   npx ts-node scripts/translateMissing.ts

---Export for Review and create CSV file
   npx ts-node scripts/exportCSV.ts

---Import Reviewed Translations
   npx ts-node scripts/importCSV



reorderKeys.ts	               ->        Ensures translation keys match en.json.

translate.ts	               ->        Translates all missing texts (for initial setup).

translateMissing.ts	         ->        Translates only new keys without modifying reviewed ones.

exportCSV.ts                  ->        Exports all translations to CSV for easy review.

importCSV.ts                  ->        Imports reviewed translations from CSV into JSON files.
