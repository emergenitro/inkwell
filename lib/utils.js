import { readFileSync } from "fs";
import { join } from "path";
import crypto from "crypto";

const wordlistPath = join(process.cwd(), "public", "wordlist.json");
const words = JSON.parse(readFileSync(wordlistPath, "utf-8"));

function generateSyncCode() {
    const getRandomWord = () => {
        const index = crypto.randomInt(0, words.length);
        return words[index];
    };

    return `${getRandomWord()}-${getRandomWord()}-${crypto.randomInt(10000).toString().padStart(4, '0')}`;
}

export async function createUniqueCode(existsFn) {
    let code;
    let isUnique = false;

    while (!isUnique) {
        code = generateSyncCode();
        isUnique = !(await existsFn(code));
    }
    return code;
}