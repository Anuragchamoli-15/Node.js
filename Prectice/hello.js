console.log("hello world")

const os = require("node:os")
console.log(os.platform())

console.log("First");

setTimeout(() => {
    console.log("Second");
}, 2000);

console.log("Third");

// console.log(globalThis);
// console.log(window);
// console.log(global);
console.log(process.version);
console.log(process.platform);

console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

setImmediate(() => {
  console.log("3. Immediate");
});

Promise.resolve().then(() => {
  console.log("4. Promise");
});

process.nextTick(() => {
  console.log("5. Next Tick");
});

console.log("6. End");