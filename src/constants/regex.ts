/**
 * This regular expression will match only latin letter.
 * @example
 * ONLY_LATIN_LETTERS_REGEX.test('цей текст не відпрацює'); // false
 * ONLY_LATIN_LETTERS_REGEX.test('good string'); // true
 */
export const ONLY_LATIN_LETTERS_REGEX = /^[A-Za-z]+$/;

/**
 * This regular expression will match only letter.
 * @example
 * CONTAIN_LETTER_REGEX.test('bad string 42'); // false
 * CONTAIN_LETTER_REGEX.test('good string'); // true
 */
export const CONTAIN_LETTER_REGEX = /[A-Za-z]/;

/**
 * This regular expression will match only digits.
 * @example
 * CONTAIN_DIGIT_REGEX.test('bad string'); // false
 * CONTAIN_DIGIT_REGEX.test('42'); // true
 */
export const CONTAIN_DIGIT_REGEX = /\d/;

export const ONLY_DIGIT_REGEX = /^\d+$/;

/**
 * Accepts alphabetic characters, including those with diacritics (e.g., accents), hyphens, and apostrophes.
 * @example
 * FULL_NAME_REGEX.test('anna-marie2'); // false
 * FULL_NAME_REGEX.test('anna-mar'ie'); // true
 */
export const FULL_NAME_REGEX = /^[A-Za-z\u00C0-\u017F' -]+$/;

export const PHONE_NUMBER_REGEX = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const EDIT_PATHNAME_REGEX = /\/(.*)\/edit(?:\/(\d+|:\w+|\w+))?/;
