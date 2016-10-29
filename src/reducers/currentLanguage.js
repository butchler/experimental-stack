import { setLanguage } from 'constants/actions';

export default function reduceCurrentLanguage(currentLanguage = 'en', { type, payload }) {
  if (type === setLanguage.type) {
    return payload;
  }

  return currentLanguage;
}
