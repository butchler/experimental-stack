import { observable, computed } from 'mobx';

import { assert } from './util';

export const STRINGS = {
    loading: {
        en: "Loading...",
        ja: "読込中"
    },
    memoryGame: {
        en: "Memory Game",
        ja: "記憶ゲーム"
    },
    learnWordsParagraph: {
        en: "Learn Japanese words by playing a memory game!",
        ja: "記憶ゲームで英単語を学びましょう！"
    },
    flipOverParagraph: {
        en: "After flipping over a card, try to find the card with the Japanese or English word that has the same meaning.",
        ja: "カードを裏返したら、同じ意味の英語か日本語が載っているカードを探してみて。"
    },
    startEasy: {
        en: "Easy",
        ja: "簡単"
    },
    startMedium: {
        en: "Medium",
        ja: "普通"
    },
    startHard: {
        en: "Hard",
        ja: "難しい"
    },
    quitGame: {
        en: "Quit Game",
        ja: "やめる"
    },
    confirmQuit: {
        en: "Are you sure you want to quit?",
        ja: "本当にやめますか？"
    },
    playAgain: {
        en: "Play Again",
        ja: "もう一度"
    },
    timeElapsed: {
        en: "Time elapsed",
        ja: "時間"
    },
    attemptsMade: {
        en: "Attempts made",
        ja: "試し数"
    },
    youWon: {
        en: "You Won!",
        ja: "成功！"
    },
    wordsMatched: {
        en: "Words Matched",
        ja: "合わせた単語"
    },
    english: {
        en: "English",
        ja: "英語"
    },
    japanese: {
        en: "Japanese",
        ja: "日本語"
    }
};

// The default language is the language that getStrings() will fall back on if
// it cannot find a translation for the langauge code passed to it.
export const DEFAULT_LANGUAGE = { code: 'en', name: 'English' };
export const LANGUAGES = [
    DEFAULT_LANGUAGE,
    { code: 'ja', name: '日本語' }
];

// Returns an object mapping all of the properties in STRINGS to the string for
// the given language.
export function getStrings(languageCode) {
    assert(typeof languageCode === 'string', "languageCode must be a string");

    const strings = {};
    const regionlessLanguageCode = (languageCode.indexOf('-') !== -1) ?
        languageCode.substring(0, languageCode.indexOf('-')) : null;

    for (const property in STRINGS) {
        if (!STRINGS.hasOwnProperty(property)) { continue; }

        if (STRINGS[property][languageCode] !== undefined) {
            // Look up translation for the given language code.
            strings[property] = STRINGS[property][languageCode];
        } else if (regionlessLanguageCode !== null && STRINGS[property][regionlessLanguageCode] !== undefined) {
            // If there is no string for the given language, look for one for the
            // language with the region (e.g. just 'en' instead of 'en-US').
            strings[property] = STRINGS[property][regionlessLanguageCode];
        } else {
            // If there is no translated string, use the default language.
            assert(STRINGS[property][DEFAULT_LANGUAGE.code] !== undefined, "All strings must have a translation for the default language");

            strings[property] = STRINGS[property][DEFAULT_LANGUAGE.code];
        }
    }

    return strings;
}
