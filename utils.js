const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) =>
  new Promise((resolve) => {
    rl.question(question, resolve);
  });

const closeReader = () => rl.close();

const clear = () => console.log('\x1Bc');

module.exports = { prompt, clear, closeReader };
