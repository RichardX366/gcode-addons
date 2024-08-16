const { readFileSync, writeFileSync } = require('fs');
const { prompt, clear, closeReader } = require('./utils');

let file = readFileSync(process.argv[2], 'utf8');

const operations = [
  {
    name: 'Beep When Print Finished',
    exec: require('./endBeep'),
  },
  {
    name: 'Pause Print at Layer',
    exec: require('./pause'),
  },
  {
    name: 'Finish',
    exec: () => {},
  },
];

const displayInstructions = () => {
  console.log('Choose an operation:');
  operations.forEach((instruction, i) => {
    console.log(`${i + 1}. ${instruction.name}`);
  });
  console.log();
};

let next = 'y';

const modifications = [];

const main = async () => {
  clear();
  while (next === 'y') {
    displayInstructions();
    const choice = await prompt('Operation Number: ');
    const operation = await operations[choice - 1].exec(file);

    if (!operation) {
      next = 'n';
      continue;
    }

    modifications.push(operation.message);
    file = operation.file;

    console.log(
      '\nThe current operations you have done to the are:\n' +
        modifications.join('\n'),
    );
    console.log();

    next = await prompt('Anything else? (y/n) ');
    console.log();
  }
  closeReader();
  writeFileSync(process.argv[2], file);
};

main();
