const generateRandomAlphaNumeric = (
  length: number,
  characters = "abcdefghijklmnopqrstuvwxyz0123456789"
) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export const generateUniqueId = () => {
  return generateRandomAlphaNumeric(16, "abcde0123456789");
};

export const generateMFAId = () => {
  return generateRandomAlphaNumeric(32, "abcde0123456789") + '-MFAGOJEK';
};
