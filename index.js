const { odd, even } = require("./var");
const checkOddOrEven = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkOddOrEven(10));
console.log(checkStringOddOrEven("hell"));
console.log(__dirname);
