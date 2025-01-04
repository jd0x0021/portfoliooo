import { useState } from 'react';

/**
 * A custom hook to toggle the text from defaultText to toggledText.
 *
 * @param {string} defaultText
 * @param {string} toggledText
 * @returns
 */
export const useToggleText = (defaultText, toggledText) => {
  const [text, setText] = useState(defaultText);

  /**
   * Toggles the text from defaultText to toggledText,
   * then resets back to defaultText after the textUpdateDelay.
   *
   * @param {number} textUpdateDelay
   */
  const toggleThenResetText = (textUpdateDelay = 2000) => {
    setText(toggledText);

    setTimeout(() => {
      setText(defaultText);
    }, textUpdateDelay);
  };

  return { text, toggleThenResetText };
};
