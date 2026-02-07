import { readFileSync } from "fs";
import { join } from "path";
import crypto from "crypto";

const wordlistPath = join(process.cwd(), "public", "wordlist.json");
const words = JSON.parse(readFileSync(wordlistPath, "utf-8"));

export const getInputWidth = (text, className) => {
    const tmp = document.createElement("span");
    tmp.className = className;
    tmp.style.visibility = "hidden";
    tmp.style.position = "absolute";
    tmp.style.whiteSpace = "pre";
    tmp.textContent = text || "stranger";
    document.body.appendChild(tmp);
    const width = tmp.getBoundingClientRect().width;
    document.body.removeChild(tmp);
    return width;
};

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