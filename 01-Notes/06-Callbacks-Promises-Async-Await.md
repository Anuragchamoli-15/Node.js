# Lesson 06: Callbacks, Promises and Async/Await

## 1. Learning Objectives

After completing this lesson, you should understand:

* What synchronous and asynchronous execution mean.
* What callback functions are.
* How asynchronous callbacks work in Node.js.
* What callback hell is and why it is problematic.
* What Promises are and how they work.
* How to use `.then()`, `.catch()` and `.finally()`.
* What `async` and `await` do.
* How to handle errors using `try...catch`.
* How to choose between callbacks, Promises and `async/await`.

---

# PART 1: SYNCHRONOUS AND ASYNCHRONOUS EXECUTION

## 2. What Is Synchronous Execution?

### English

Synchronous execution means that statements execute in sequence. The current operation must finish before the next statement in that execution flow can proceed.

### Hindi

Synchronous execution mein code ek ke baad ek execute hota hai. Jab tak current operation complete nahi hota, us execution flow mein agla statement execute nahi hota.

### Example

```js
console.log("First");

console.log("Second");

console.log("Third");
```

Output:

```text
First
Second
Third
```

### Explanation

1. The first statement prints `First`.
2. The second statement prints `Second`.
3. The third statement prints `Third`.

Ye synchronous execution hai kyunki statements apne order mein execute ho rahe hain.

---

## 3. What Is Asynchronous Execution?

### English

Asynchronous programming allows an application to initiate an operation and continue doing other work while waiting for that operation to complete.

When the operation completes, its result can be handled through a callback, Promise or another supported mechanism.

### Hindi

Asynchronous programming mein application kisi operation ko start karke uske complete hone ka wait karte hue doosra kaam kar sakti hai.

Example ke liye, Node.js kisi file ko read karne ka operation start kar sakta hai. File read hone ka wait karte samay JavaScript doosra code execute kar sakti hai.

### Example

```js
console.log("First");

setTimeout(() => {
  console.log("Second");
}, 2000);

console.log("Third");
```

Output:

```text
First
Third
Second
```

### Explanation

1. `First` synchronously print hota hai.
2. `setTimeout()` timer schedule karta hai.
3. JavaScript aage badhkar `Third` print karti hai.
4. Timer callback baad mein execute hota hai.

**Important:** `setTimeout()` ka delay minimum delay hota hai. Callback exactly 2 seconds baad execute hone ki guarantee nahi hoti.

### Where Is Asynchronous Programming Used?

* Reading and writing files.
* Database operations.
* HTTP requests.
* Network communication.
* Timers.
* Processing incoming client requests.

---

# PART 2: CALLBACK FUNCTIONS

## 4. What Is a Callback Function?

### English Definition

A callback is a function passed as an argument to another function so that the receiving function can call it.

A callback may be synchronous or asynchronous. Its name alone does not mean that it executes asynchronously.

### Hindi Explanation

Jab hum ek function ko doosre function ke argument ke roop mein pass karte hain, taaki doosra function use call kar sake, to use callback function kaha jaata hai.

Callback ka use synchronous aur asynchronous dono situations mein ho sakta hai.

### Example 1: Simple Callback

```js
function greet(name, callback) {
  console.log("Hello " + name);

  callback();
}

function sayBye() {
  console.log("Goodbye!");
}

greet("Anurag", sayBye);
```

Output:

```text
Hello Anurag
Goodbye!
```

### Explanation

**Step 1:**

```js
function greet(name, callback)
```

`greet()` do parameters accept karta hai: `name` aur `callback`.

**Step 2:**

```js
function sayBye() {
  console.log("Goodbye!");
}
```

Humne `sayBye()` naam ka function banaya.

**Step 3:**

```js
greet("Anurag", sayBye);
```

Yahan `sayBye` function ko argument ke roop mein pass kiya hai.

Notice that we write `sayBye`, not `sayBye()`.

* `sayBye` function reference pass karta hai.
* `sayBye()` function ko turant call karta hai aur uska return value pass karta hai.

**Step 4:** `greet()` pehle greeting print karta hai aur phir `callback()` call karta hai.

Isliye `Goodbye!` print hota hai.

---

## 5. Why Are Callbacks Useful?

Callbacks allow us to specify what should happen after another function performs some work.

For example, suppose we want to read a file and then process its contents.

```js
const fs = require("node:fs");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }

  console.log("File content:", data);
});

console.log("File reading started");
```

Assume `message.txt` exists and can be read successfully.

Possible output:

```text
File reading started
File content: Hello from Node.js
```

The exact completion time depends on the system and file operation.

### Explanation

```js
fs.readFile("message.txt", "utf8", (err, data) => {
  // ...
});
```

`fs.readFile()` starts an asynchronous file-reading operation.

The callback receives two arguments:

* `err`: an error object if the operation fails; otherwise, `null`.
* `data`: the file contents if the operation succeeds.

The callback handles the result when the operation completes.

Meanwhile, JavaScript can continue executing the next synchronous statement.

**Note:** Is example ko run karne ke liye current folder mein `message.txt` file honi chahiye.

Create `message.txt`:

```text
Hello from Node.js
```

Then run your JavaScript file.

---

## 6. What Is Error-First Callback?

### English

In many Node.js callback APIs, the first callback argument represents an error and the second represents the result.

This convention is commonly called an **error-first callback**.

### Hindi

Node.js ke bahut se traditional callback APIs mein callback ka pehla parameter error aur doosra parameter result ke liye hota hai.

Example:

```js
const fs = require("node:fs");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log(data);
});
```

### How Does It Work?

**If an error occurs:**

* `err` contains error information.
* The code handles the error.
* `return` prevents the callback from continuing into the success section.

**If the operation succeeds:**

* `err` is usually `null`.
* `data` contains the result.

Remember that this convention applies to many traditional Node.js callback APIs, but not every callback API follows it.

---

# PART 3: CALLBACK HELL

## 7. What Is Callback Hell?

### English Definition

Callback hell occurs when multiple callbacks are nested deeply inside one another, making the code difficult to read, understand, debug and maintain.

It is especially common in code where several asynchronous operations depend on the results of earlier operations.

### Hindi Explanation

Jab hum multiple asynchronous operations ko ek ke baad ek execute karne ke liye callbacks ko bahut zyada nested kar dete hain, to code complex aur difficult to maintain ho sakta hai.

Isi problem ko commonly callback hell kehte hain.

### Example

Imagine an application performs these operations:

1. Get a user.
2. Get that user's orders.
3. Get the details of a product in an order.

Using nested callbacks, the structure might look like this:

```js
getUser((err, user) => {
  if (err) {
    return handleError(err);
  }

  getOrders(user.id, (err, orders) => {
    if (err) {
      return handleError(err);
    }

    getProduct(orders[0].productId, (err, product) => {
      if (err) {
        return handleError(err);
      }

      console.log(product);
    });
  });
});
```

**Note:** `getUser()`, `getOrders()` and `getProduct()` are illustrative functions. They are not built-in Node.js functions.

### Problems With Callback Hell

1. **Poor readability:** Deep nesting makes the code harder to follow.
2. **Difficult maintenance:** Adding or changing steps can make the nesting worse.
3. **Repeated error handling:** Each callback may need its own error checks.
4. **Difficult debugging:** It can be harder to trace how data moves through nested callbacks.

### Important Clarification

Callbacks themselves are not bad. They remain useful and are used throughout JavaScript and Node.js.

The problem is excessive nesting and poorly structured asynchronous control flow.

Promises and `async/await` provide alternative ways to organize such code.

---

# PART 4: PROMISES

## 8. What Is a Promise?

### English Definition

A Promise is a JavaScript object that represents the eventual completion or failure of an asynchronous operation and its resulting value.

A Promise can be pending, fulfilled or rejected.

### Hindi Explanation

Promise ek JavaScript object hai jo kisi operation ke future result ko represent karta hai.

Operation abhi complete nahi hua ho sakta, successfully complete ho sakta hai, ya fail ho sakta hai.

Promise ki teen states hoti hain:

1. **Pending:** Operation abhi settle nahi hua.
2. **Fulfilled:** Promise successfully settle ho chuka hai.
3. **Rejected:** Promise failure ke saath settle ho chuka hai.

Fulfilled aur rejected states ko collectively **settled** kaha jaata hai.

A settled Promise apni state ko dobara change nahi karta.

### Promise Example

```js
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation successful");
  } else {
    reject(new Error("Operation failed"));
  }
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Operation successful
```

### Explanation

```js
new Promise((resolve, reject) => {
  // ...
});
```

Promise constructor ek executor function accept karta hai.

Executor synchronously run hota hai jab Promise create kiya jaata hai.

Us executor ko do functions milte hain:

* `resolve(value)`: Promise ko fulfill karne ke liye.
* `reject(reason)`: Promise ko reject karne ke liye.

In the example, `success` is `true`, so `resolve()` is called.

The `.then()` handler runs with the fulfillment value.

If `success` were `false`, `reject()` would be called and the `.catch()` handler would handle the rejection.

**Important:** Promise create karne se automatically koi background task start nahi hota. Executor immediately run hota hai; actual asynchronous work uske implementation par depend karta hai.

---

## 9. What Is `.then()`?

### English

The `.then()` method registers handlers for a Promise's fulfillment and optionally its rejection. It returns a new Promise, allowing us to chain asynchronous steps.

### Hindi

`.then()` ka use Promise ke successful result ko handle karne ke liye kiya jaata hai. Ismein rejection handler bhi diya ja sakta hai.

Example:

```js
Promise.resolve(10)
  .then((number) => {
    console.log(number);

    return number * 2;
  })
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
10
20
```

### Explanation

1. `Promise.resolve(10)` ek fulfilled Promise banata hai.
2. Pehla `.then()` `10` receive karta hai.
3. Callback `number * 2` return karta hai, yaani `20`.
4. Agla `.then()` `20` receive karta hai.

### Why Does `.then()` Return a Promise?

Because Promise chaining lets one asynchronous step pass its result to the next step.

The next `.then()` waits for the previous handler's returned value or Promise.

If the handler returns a normal value, the next Promise fulfills with that value.

If the handler returns a Promise, the chain adopts its eventual state and value.

This makes it possible to write sequences of asynchronous operations without deeply nested callbacks.

---

## 10. What Is `.catch()`?

### English

The `.catch()` method registers a rejection handler on a Promise chain.

It is commonly used to handle errors from a rejected Promise or exceptions thrown by earlier Promise handlers.

### Hindi

`.catch()` ka use Promise chain mein errors handle karne ke liye hota hai.

Example:

```js
Promise.reject(new Error("Something went wrong"))
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Something went wrong
```

### Important Point

`.catch()` sirf error print karne ke liye nahi hai. It returns a new Promise.

If the catch handler returns a normal value, the resulting Promise is fulfilled with that value.

If it throws an error or returns a rejected Promise, the resulting Promise remains rejected.

Example:

```js
Promise.reject(new Error("Failed"))
  .catch((error) => {
    console.log(error.message);
    return "Recovered";
  })
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
Failed
Recovered
```

The error was handled, and the chain continued successfully.

---

## 11. What Is `.finally()`?

### English

The `.finally()` method registers a handler that runs when a Promise settles, whether it fulfills or rejects.

It is commonly used for cleanup tasks.

### Hindi

`.finally()` ka callback Promise fulfill ho ya reject, dono cases mein run hota hai.

Iska use cleanup jaise tasks ke liye ho sakta hai.

Example:

```js
Promise.resolve("Success")
  .then((result) => {
    console.log(result);
  })
  .finally(() => {
    console.log("Operation finished");
  });
```

Output:

```text
Success
Operation finished
```

### Common Use Cases

* Hiding a loading indicator.
* Releasing a resource.
* Cleaning up temporary state.
* Performing a final action after an operation.

**Important:** `.finally()` generally preserves the original fulfillment value or rejection unless the handler throws an error or returns a rejected Promise.

---

## 12. Promise Chaining

Promise chaining is one of the most important Promise concepts.

### Example

```js
Promise.resolve(5)
  .then((number) => {
    console.log("First:", number);
    return number + 5;
  })
  .then((number) => {
    console.log("Second:", number);
    return number * 2;
  })
  .then((result) => {
    console.log("Final:", result);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
First: 5
Second: 10
Final: 20
```

### Explanation

**First step:**

The initial Promise fulfills with `5`.

**Second step:**

The first `.then()` receives `5` and returns `10`.

**Third step:**

The next `.then()` receives `10` and returns `20`.

**Final step:**

The last `.then()` receives and prints `20`.

### Key Rule

To pass a result to the next `.then()`, return it from the current handler.

Incorrect chaining can happen when you forget to return the value or Promise needed by the next step.

---

# PART 5: ASYNC AND AWAIT

## 13. What Is an `async` Function?

### English Definition

An `async` function always returns a Promise.

If the function returns a normal value, the Promise fulfills with that value. If the function throws an error, the returned Promise rejects with that error.

### Hindi Explanation

`async` keyword kisi function ko async function banata hai.

Async function normal value return kare tab bhi uska result Promise ke through represent hota hai.

### Example

```js
async function getMessage() {
  return "Hello Node.js";
}

getMessage().then((message) => {
  console.log(message);
});
```

Output:

```text
Hello Node.js
```

### Why Does This Work?

The function returns the string:

```js
"Hello Node.js"
```

But because the function is declared with `async`, the returned value is wrapped in a fulfilled Promise.

Conceptually, it behaves like:

```js
function getMessage() {
  return Promise.resolve("Hello Node.js");
}
```

This is a useful conceptual comparison, though it is not a complete replacement for every detail of async-function semantics.

---

## 14. What Is `await`?

### English Definition

The `await` keyword pauses the execution of the surrounding async function until the awaited value is settled, then evaluates to its fulfillment value or throws its rejection reason.

### Hindi Explanation

`await` ka use kisi Promise ke result ka wait karne ke liye hota hai.

Jab execution `await` tak pahunchti hai, to surrounding async function temporarily suspend ho jaata hai. Promise settle hone ke baad function aage continue karta hai.

Iska matlab ye nahi ki poora Node.js process ya Event Loop block ho jaata hai.

### Example

```js
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function showData() {
  console.log("Waiting for data");

  const result = await getData();

  console.log(result);
}

showData();

console.log("Other code");
```

Output:

```text
Waiting for data
Other code
Data received
```

### Explanation

**Step 1:**

`showData()` call hota hai.

**Step 2:**

`Waiting for data` print hota hai.

**Step 3:**

`await getData()` tak execution pahunchti hai.

Promise abhi pending hai, isliye `showData()` temporarily suspend ho jaata hai.

**Step 4:**

`showData()` ke suspend hone ke baad, main JavaScript execution doosra code chala sakti hai.

Isliye `Other code` print hota hai.

**Step 5:**

Timer complete hota hai aur Promise fulfill ho jaata hai.

**Step 6:**

`showData()` resume hota hai aur `Data received` print karta hai.

### Important Rule

`await` generally async function ke andar use hota hai. Modern JavaScript environments support top-level `await` in ES modules, subject to the environment's module rules.

---

## 15. Async/Await vs Promise Chaining

Both approaches can handle asynchronous operations.

### Using Promise Chaining

```js
function getNumber() {
  return Promise.resolve(10);
}

getNumber()
  .then((number) => {
    return number * 2;
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
20
```

### Using Async/Await

```js
function getNumber() {
  return Promise.resolve(10);
}

async function calculate() {
  try {
    const number = await getNumber();
    const result = number * 2;

    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

calculate();
```

Output:

```text
20
```

### Comparison

| Feature                                            | Promise Chaining                      | Async/Await                           |
| -------------------------------------------------- | ------------------------------------- | ------------------------------------- |
| Main syntax                                        | `.then()` and `.catch()`              | `async` and `await`                   |
| Reading sequential steps                           | Can become difficult with long chains | Often reads more like sequential code |
| Error handling                                     | Usually `.catch()`                    | Often `try...catch`                   |
| Based on Promises                                  | Yes                                   | Yes                                   |
| Makes asynchronous operations automatically faster | No                                    | No                                    |

### Hindi Explanation

`async/await` Promises ka replacement nahi hai. Ye Promises ke saath kaam karne ka ek convenient syntax hai.

Dono approaches asynchronous work handle kar sakti hain. Kaunsa style use karna hai, ye code ki structure aur requirements par depend karta hai.

---

# PART 6: ERROR HANDLING

## 16. Handling Errors with `try...catch`

### Example

```js
function getUser() {
  return Promise.reject(new Error("User not found"));
}

async function showUser() {
  try {
    const user = await getUser();
    console.log(user);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

showUser();
```

Output:

```text
Error: User not found
```

### Explanation

`getUser()` ek rejected Promise return karta hai.

Jab `await getUser()` rejection receive karta hai, to woh rejection reason ko throw karta hai inside the async function.

`try...catch` us error ko catch karta hai.

### Important Difference

A normal synchronous `try...catch` does not automatically catch a rejection from a Promise that you start but do not await or otherwise handle.

Example:

```js
try {
  Promise.reject(new Error("Failed"));
} catch (error) {
  console.log("Caught:", error.message);
}
```

This does not catch the Promise rejection.

The Promise is rejected, but the synchronous `try...catch` does not handle it.

Correct approach:

```js
async function run() {
  try {
    await Promise.reject(new Error("Failed"));
  } catch (error) {
    console.log("Caught:", error.message);
  }
}

run();
```

Output:

```text
Caught: Failed
```

In production code, ensure rejected Promises are handled appropriately. Do not leave rejections unhandled.

---

## 17. Handling Errors in Node.js File Operations

Let's use `async/await` with Node.js's filesystem Promise API.

```js
const fs = require("node:fs/promises");

async function readMessage() {
  try {
    const data = await fs.readFile("message.txt", "utf8");

    console.log(data);
  } catch (error) {
    console.error("Unable to read file:", error.message);
  }
}

readMessage();
```

### Explanation

```js
const fs = require("node:fs/promises");
```

This imports the Promise-based filesystem API.

```js
const data = await fs.readFile("message.txt", "utf8");
```

The function waits for the file-reading Promise to settle.

If the operation succeeds, `data` contains the file contents.

If the operation fails, the awaited Promise throws its rejection reason into the surrounding async function, where `catch` can handle it.

### Try This

1. Create `message.txt`.
2. Add some text to it.
3. Run the JavaScript file.
4. Rename `message.txt` temporarily.
5. Run the JavaScript file again.

Observe the difference between success and error handling.

---

# PART 7: PRACTICAL MINI-PROJECT

## 18. Simulating a User Login Flow

This example demonstrates how Promise-based operations can be combined using `async/await`.

Create:

`login-demo.js`

```js
function checkCredentials(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve({
          id: 1,
          username: "admin"
        });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });
}

async function login(username, password) {
  try {
    console.log("Checking credentials...");

    const user = await checkCredentials(username, password);

    console.log("Login successful!");
    console.log("Welcome,", user.username);
  } catch (error) {
    console.error("Login failed:", error.message);
  } finally {
    console.log("Login process completed");
  }
}

login("admin", "1234");
```

### Expected Output for Valid Credentials

```text
Checking credentials...
Login successful!
Welcome, admin
Login process completed
```

### Test Invalid Credentials

Change the last line:

```js
login("admin", "wrong-password");
```

Expected output:

```text
Checking credentials...
Login failed: Invalid username or password
Login process completed
```

### What Did You Learn?

* A function can return a Promise.
* `resolve()` supplies a successful result.
* `reject()` represents failure.
* `await` waits for the Promise's result.
* `try...catch` handles errors.
* `finally` runs after the operation settles.

**Security note:** This is only a learning simulation. It is not a real authentication system. Real login systems must verify credentials securely, hash passwords appropriately, and use proper session or token management.

---

# PART 8: INTERVIEW QUESTIONS AND ANSWERS

## Q1. What is a callback function?

**Answer:**

A callback is a function passed as an argument to another function so that the receiving function can invoke it. A callback can be synchronous or asynchronous.

**Hindi:** Callback ek function hota hai jise doosre function ke argument ke roop mein pass kiya jaata hai.

## Q2. What is the difference between synchronous and asynchronous execution?

**Answer:**

Synchronous execution proceeds sequentially, with each operation in the current flow completing before the next one proceeds. Asynchronous programming allows an application to initiate an operation and continue other work while waiting for it to complete.

**Hindi:** Synchronous code apne execution flow mein ek ke baad ek chalta hai. Asynchronous programming mein operation ke wait ke dauraan doosra kaam ho sakta hai.

## Q3. What is callback hell?

**Answer:**

Callback hell is deeply nested callback code that becomes difficult to read, debug and maintain. Promises and `async/await` help organize asynchronous control flow more clearly.

## Q4. What is a Promise?

**Answer:**

A Promise is a JavaScript object representing the eventual fulfillment or rejection of an operation and its resulting value.

## Q5. What are the three states of a Promise?

**Answer:**

The three states are pending, fulfilled and rejected. Fulfilled and rejected Promises are settled.

## Q6. What is the difference between `resolve()` and `reject()`?

**Answer:**

`resolve()` fulfills a Promise with a value, while `reject()` rejects a Promise with a reason, usually an error.

Strictly speaking, resolving a Promise with another Promise or thenable can adopt that object's eventual state rather than immediately fulfilling with the object itself.

## Q7. What is the difference between `.then()` and `.catch()`?

**Answer:**

`.then()` registers fulfillment handling and can optionally register rejection handling. `.catch()` registers a rejection handler. Both return new Promises, enabling chaining.

## Q8. What is the purpose of `.finally()`?

**Answer:**

`.finally()` registers a handler that runs when a Promise settles, regardless of whether it fulfills or rejects. It is commonly used for cleanup.

## Q9. What does the `async` keyword do?

**Answer:**

An `async` function always returns a Promise. A returned value fulfills that Promise, while an uncaught exception rejects it.

## Q10. What does the `await` keyword do?

**Answer:**

`await` suspends the surrounding async function until the awaited value is settled. It then evaluates to the fulfillment value or throws the rejection reason.

## Q11. Is `async/await` a replacement for Promises?

**Answer:**

No. `async/await` is syntax for working with Promises. It often makes sequential asynchronous code easier to read.

## Q12. How do you handle errors in an async function?

**Answer:**

Use `try...catch` around awaited operations, or handle errors through the Promise chain using `.catch()`. Ensure that rejected Promises are not left unhandled.

## Q13. Does `await` block the entire Node.js Event Loop?

**Answer:**

No. `await` suspends the surrounding async function while the awaited operation is pending. It does not by itself block the entire Event Loop.

## Q14. What is Promise chaining?

**Answer:**

Promise chaining connects asynchronous steps by returning values or Promises from handlers. Each step can receive the result of the previous step, while errors can propagate through the chain.

## Q15. Why might `forEach()` be unsuitable when you need to wait for asynchronous operations?

**Answer:**

`forEach()` does not wait for Promises returned by its callback. If you need to wait for asynchronous work, alternatives include `for...of` with `await` for sequential processing or `Promise.all()` for concurrent processing.

---

# PART 9: IMPORTANT RULES TO REMEMBER

1. A callback is a function passed to another function.
2. A callback is not necessarily asynchronous.
3. Callback hell is caused by excessive nesting, not by callbacks themselves.
4. A Promise represents a future fulfillment or rejection.
5. `.then()` and `.catch()` return new Promises.
6. `.finally()` is useful for cleanup after settlement.
7. An `async` function always returns a Promise.
8. `await` suspends the surrounding async function, not the entire Event Loop.
9. Use `try...catch` to handle errors from awaited operations.
10. Ensure that every relevant Promise rejection is handled.
11. `Promise.all()` can run multiple Promise-based operations concurrently and rejects if one of its inputs rejects.
12. Async code is not automatically faster; performance depends on the operations and how they are coordinated.

---

# LESSON 06 SUMMARY

In this lesson, we covered:

* Synchronous and asynchronous execution.
* Callback functions.
* Error-first callbacks.
* Callback hell.
* Promises and their states.
* `.then()`, `.catch()` and `.finally()`.
* Promise chaining.
* `async` and `await`.
* Error handling using `try...catch`.
* Practical Node.js filesystem and login-flow examples.
* Important interview questions.

## One-Line Revision

**Callbacks, Promises and async/await are different ways to organize work and handle results in JavaScript; Promises and async/await make many asynchronous workflows easier to compose and maintain.**

## Next Lesson

**Lesson 07: Modules in Node.js**

We have already covered some module concepts earlier, so we will build on that knowledge rather than repeat everything from scratch.
