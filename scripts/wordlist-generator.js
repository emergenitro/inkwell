import { writeFileSync } from 'fs';

async function downloadWordlist() {
  const response = await fetch('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt');
  const text = await response.text();
  
  const words = text
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.split('\t')[1]);
  
  writeFileSync('public/wordlist.json', JSON.stringify(words, null, 2));
  console.log(`Generated wordlist with ${words.length} words`);
}

downloadWordlist();