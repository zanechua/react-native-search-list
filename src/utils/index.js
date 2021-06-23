export const containsChinese = (input) => {
  if (input) {
    return /.*[\u4e00-\u9fa5]+.*$/.test(input);
  }
};

export const sTrim = (sourceStr) => {
  if (sourceStr) {
    return sourceStr.replace(/\s+/g, '');
  }
  return '';
};

export const isCharacter = (value) => {
  const Regx = /^[A-Za-z]*$/;
  return Regx.test(value);
};
