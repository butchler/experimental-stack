// The default language is the language that getStrings() will fall back on if
// it cannot find a translation for the langauge code passed to it.
export const DEFAULT_LANGUAGE = { code: 'en', name: 'English' };

export const LANGUAGES = [
  DEFAULT_LANGUAGE,
  { code: 'ja', name: '日本語' },
];

export const STRINGS = {
  loading: {
    en: 'Loading...',
    ja: '読込中',
  },
  memoryGame: {
    en: 'Memory Game',
    ja: '記憶ゲーム',
  },
  learnWordsParagraph: {
    en: 'Learn Japanese words by playing a memory game!',
    ja: '記憶ゲームで英単語を学びましょう！',
  },
  flipOverParagraph: {
    en: 'After flipping over a card, try to find the card with the Japanese or English word that has the same meaning.',
    ja: 'カードを裏返したら、同じ意味の英語か日本語が載っているカードを探してみて。',
  },
  startEasy: {
    en: 'Easy',
    ja: '簡単',
  },
  startMedium: {
    en: 'Medium',
    ja: '普通',
  },
  startHard: {
    en: 'Hard',
    ja: '難しい',
  },
  quitGame: {
    en: 'Quit Game',
    ja: 'やめる',
  },
  confirmQuit: {
    en: 'Are you sure you want to quit?',
    ja: '本当にやめますか？',
  },
  playAgain: {
    en: 'Play Again',
    ja: 'もう一度',
  },
  timeElapsed: {
    en: 'Time elapsed',
    ja: '時間',
  },
  attemptsMade: {
    en: 'Attempts made',
    ja: '試し数',
  },
  youWon: {
    en: 'You Won!',
    ja: '成功！',
  },
  wordsMatched: {
    en: 'Words Matched',
    ja: '合わせた単語',
  },
  english: {
    en: 'English',
    ja: '英語',
  },
  japanese: {
    en: 'Japanese',
    ja: '日本語',
  },
};
