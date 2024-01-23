import textMap from './text';

export type ContentKey = keyof typeof textMap;

const content = (key: ContentKey) => textMap[key] ?? key;

/** Provides a similar dev xp as react-i18next */
export function useContent() {
  return {
    t: content,
  };
}
