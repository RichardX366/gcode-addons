const { prompt } = require('./utils');

const pause = async (file) => {
  const layer = +(await prompt('Add a pause after what layer? '));

  const layers = file.split(';LAYER:');

  layers[layer] += `;pause print
M104 S0
G0 X0 Y0 F9000
M300 S440 P1000
M25
M109 S200
`;

  file = layers.join(';LAYER:');

  return { message: 'Add a pause to the print after layer ' + layer, file };
};

module.exports = pause;
