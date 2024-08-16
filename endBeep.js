const endBeep = (file) => {
  file += `
M300 S440 P1000`;
  return { message: 'Add a beep when the file is done printing', file };
};

module.exports = endBeep;
