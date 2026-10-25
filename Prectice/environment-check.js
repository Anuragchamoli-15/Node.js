console.log("Global object:", typeof globalThis);
console.log("Document:", typeof document);
console.log("Process:", typeof process);
console.log("Window:", typeof window);
console.log("Console:", typeof console);

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});