# Lesson 05: Node.js Event Loop

## 1. What Is the Event Loop?

### English

The **Event Loop** is a mechanism in Node.js that coordinates the execution of JavaScript callbacks and helps Node.js handle asynchronous operations without blocking the main JavaScript thread while waiting for many I/O operations to complete.

For example, a server may need to:

* Read a file.
* Fetch data from a database.
* Handle an HTTP request.
* Wait for a timer.
* Send a response to a client.

Node.js can initiate or arrange these operations and continue executing other JavaScript code instead of waiting synchronously for every operation to finish.

When an asynchronous operation completes, its associated callback can be scheduled for execution. The Event Loop helps determine when that callback gets a chance to run.

### Hindi

Event Loop Node.js ka ek mechanism hai jo JavaScript callbacks ko execute karne ka kaam coordinate karta hai.

Maan lo tumhara server ek file read kar raha hai. Agar JavaScript ko file read hone tak synchronously wait karna pade, to is dauraan main JavaScript thread doosra JavaScript code execute nahi kar payega.

Node.js asynchronous I/O ka use karke aise wait ko avoid kar sakta hai. Is dauraan doosra JavaScript code execute ho sakta hai.

Jab file read hone ka operation complete ho jata hai, to uska callback execute hone ke liye schedule ho sakta hai.

**Important:** Event Loop khud har file, database query ya network request ko perform nahi karta. Ye Node.js ke doosre components aur operating system ke saath milkar callbacks ki execution coordinate karta hai.

---

## 2. Why Do We Need the Event Loop?

Imagine that you are building a backend server for an online shopping website.

At almost the same time, three users send requests:

1. User A requests product information.
2. User B requests their order history.
3. User C requests a list of categories.

Suppose the server must wait synchronously for each operation before doing anything else.

It could spend unnecessary time waiting for I/O operations to finish one by one.

Node.js can instead initiate asynchronous operations and keep processing other work while those operations are waiting.

When the results become available, their callbacks can execute when the Event Loop and JavaScript execution rules allow them to.

### Hindi Explanation

Maan lo teen users tumhare server par requests bhejte hain.

* Pehli request database se product information maangti hai.
* Doosri request order history maangti hai.
* Teesri request categories maangti hai.

Agar har operation ke complete hone tak server ka JavaScript thread synchronously wait kare, to doosra kaam karne mein unnecessary delay ho sakta hai.

Asynchronous programming ki help se Node.js I/O operations ke wait ke dauraan doosra JavaScript code execute kar sakta hai.

Isse I/O-heavy applications ko efficiently handle karna possible hota hai.

**Interview point:** Node.js is particularly useful for I/O-heavy applications, but CPU-intensive JavaScript can still block the main JavaScript thread.

---

## 3. Understand the Main Components

To understand the Event Loop, first understand these concepts.

### A. Call Stack

**English:** The Call Stack keeps track of the JavaScript functions that are currently executing.

**Hindi:** Jab JavaScript functions execute hote hain, to unki execution track karne ke liye Call Stack use hota hai.

Example:

```js
function first() {
  second();
}

function second() {
  console.log("Hello");
}

first();
```

Execution flow:

1. `first()` is called.
2. `first()` enters the Call Stack.
3. `second()` is called.
4. `second()` enters the Call Stack.
5. `"Hello"` is printed.
6. `second()` finishes and leaves the stack.
7. `first()` finishes and leaves the stack.

The Call Stack follows the **Last In, First Out (LIFO)** principle.

The last function added to the stack is normally the first one to finish and leave it.

### B. Node.js APIs and Operating System Facilities

Node.js provides APIs for tasks such as timers, filesystem access and networking.

Depending on the operation, Node.js may rely on operating system facilities or on libuv, its cross-platform asynchronous I/O library.

**Important:** Not every asynchronous operation uses a separate thread, and not every operation uses the libuv thread pool.

### C. libuv

**English:** libuv is a library used by Node.js that provides support for asynchronous I/O and the Event Loop.

**Hindi:** libuv Node.js ka ek important component hai. Ye Event Loop aur asynchronous I/O operations ko support karta hai.

Certain filesystem operations, some DNS operations and other supported tasks can use the libuv thread pool. Network I/O often relies on operating system mechanisms instead.

### D. Callback

A callback is a function passed to another function or API so that it can be called later.

Example:

```js
setTimeout(() => {
  console.log("Timer completed");
}, 1000);
```

Here, the arrow function is the callback.

It is scheduled to run after the timer becomes eligible, subject to the Event Loop and other work.

---

## 4. How Does the Event Loop Work?

Consider this code:

```js
console.log("First");

setTimeout(() => {
  console.log("Second");
}, 1000);

console.log("Third");
```

Output:

```text
First
Third
Second
```

### Step-by-Step Explanation

**Step 1:** JavaScript executes `console.log("First")`.

Output:

```text
First
```

**Step 2:** JavaScript encounters `setTimeout()`.

Node.js arranges for the timer callback to become eligible after approximately 1000 milliseconds.

JavaScript does not synchronously wait inside `setTimeout()` for those 1000 milliseconds.

**Step 3:** JavaScript continues executing the next statement.

Output:

```text
Third
```

**Step 4:** When the timer becomes eligible, its callback can execute when the Event Loop reaches the appropriate point and JavaScript is able to run it.

Output:

```text
Second
```

### Hindi Summary

`setTimeout()` ka matlab ye nahi hai ki JavaScript us line par ruk jayega.

JavaScript timer schedule karta hai aur aage ka code execute karta rehta hai.

Timer complete hone ke baad callback execute hone ke liye eligible hota hai. Lekin callback ko execute hone mein timer duration se zyada time lag sakta hai.

**Remember:** A timer specifies a minimum delay, not an exact execution time.

---

## 5. The Main Event Loop Phases

Node.js Event Loop has several phases. Each phase has a specific responsibility.

The main phases commonly described in Node.js documentation are:

1. Timers
2. Pending Callbacks
3. Idle, Prepare
4. Poll
5. Check
6. Close Callbacks

Idle and Prepare are primarily internal phases. As an application developer, you will most often need to understand timers, poll, check and close callbacks.

### Phase 1: Timers

This phase is associated with callbacks scheduled using:

* `setTimeout()`
* `setInterval()`

A timer callback becomes eligible when its delay has elapsed.

However, the callback cannot necessarily execute at that exact instant. The Event Loop must reach an appropriate point, and the JavaScript thread must be available.

Example:

```js
setTimeout(() => {
  console.log("Timer callback");
}, 500);
```

This schedules a callback with a delay of 500 milliseconds.

### Phase 2: Pending Callbacks

This phase executes certain I/O-related callbacks deferred from earlier operations.

You usually do not control this phase directly in everyday application code.

### Phase 3: Idle and Prepare

These phases are used internally by Node.js and libuv.

You generally do not need to manage them directly.

### Phase 4: Poll

The Poll phase is particularly important.

It handles many I/O-related callbacks and determines how the Event Loop should proceed when it has no immediately executable work.

Examples of operations involving I/O include:

* Reading files.
* Handling network activity.
* Processing certain socket events.

The exact mechanism depends on the operation and the operating system.

**Hindi:** Poll phase ko I/O ke context mein samjho. Jab filesystem ya networking se related operation ka callback execute karne ke liye ready hota hai, to woh Poll phase ke through process ho sakta hai.

Poll phase ka behavior sirf "saare callbacks ki queue ko ek baar execute karna" nahi hai. Ye available work aur Event Loop ki state par bhi depend karta hai.

### Phase 5: Check

The Check phase is where callbacks scheduled by `setImmediate()` execute.

Example:

```js
setImmediate(() => {
  console.log("Immediate callback");
});
```

This schedules a callback for the Check phase.

Later in this lesson, we will compare `setImmediate()` with `setTimeout()`.

### Phase 6: Close Callbacks

This phase handles certain close-related callbacks.

For example:

```js
socket.on("close", () => {
  console.log("Socket closed");
});
```

When the relevant socket closes, its close event can be handled through the appropriate callback mechanism.

### Important Note About Node.js Versions

The exact internal scheduling behavior has changed across Node.js versions.

Starting with libuv 1.45.0, used by Node.js 20 and later, timer processing changed to occur after the Poll phase rather than both before and after it.

Therefore, do not memorize a simplified phase diagram as if every callback always runs in one fixed, universally predictable order.

For interviews, understand each phase's purpose and the scheduling rules relevant to the code being discussed.

---

## 6. What Is the Difference Between `setTimeout()` and `setImmediate()`?

Both schedule callbacks, but they are associated with different Event Loop mechanisms.

### `setTimeout()`

Schedules a callback after a specified minimum delay.

```js
setTimeout(() => {
  console.log("Timeout");
}, 0);
```

A delay of `0` does not mean that the callback executes immediately. Node.js applies timer scheduling rules, and the callback runs when eligible.

### `setImmediate()`

Schedules a callback to run during the Check phase.

```js
setImmediate(() => {
  console.log("Immediate");
});
```

### Important Comparison

| Feature                                                 | `setTimeout()`                            | `setImmediate()`                        |
| ------------------------------------------------------- | ----------------------------------------- | --------------------------------------- |
| Main purpose                                            | Schedule a callback after a minimum delay | Schedule a callback for the Check phase |
| Associated mechanism                                    | Timers                                    | Check                                   |
| Does it run immediately?                                | No                                        | No                                      |
| Can other work delay it?                                | Yes                                       | Yes                                     |
| Guaranteed to win when both are scheduled at top level? | No                                        | No                                      |

### Example: Why Can the Order Vary?

```js
setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});
```

Do not assume that this code always prints the same order.

When scheduled from the top level of a script, the order can depend on timing and the surrounding execution context.

One run may print:

```text
Timeout
Immediate
```

Another run may print:

```text
Immediate
Timeout
```

Both outcomes can be valid.

### A More Predictable Example

Inside an I/O callback, `setImmediate()` is generally executed before a `setTimeout(..., 0)` callback scheduled in that same callback.

For example:

```js
const fs = require("node:fs");

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("Timeout");
  }, 0);

  setImmediate(() => {
    console.log("Immediate");
  });
});
```

Typical output:

```text
Immediate
Timeout
```

This illustrates the relationship between the I/O callback, the Check phase and timer scheduling.

**Interview tip:** Explain why the top-level order is not guaranteed instead of memorizing one output.

---

## 7. What Is `process.nextTick()`?

`process.nextTick()` is a Node.js API that schedules a callback to run after the current JavaScript operation completes, before the Event Loop continues to its next phase.

Example:

```js
console.log("First");

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("Second");
```

Output:

```text
First
Second
Next Tick
```

### Why?

1. `"First"` is printed.
2. The callback is scheduled with `process.nextTick()`.
3. `"Second"` is printed because the current synchronous code continues.
4. After the current operation completes, the `nextTick` callback runs.

### Hindi Explanation

`process.nextTick()` ka callback current synchronous JavaScript operation complete hone ke baad run hota hai.

Isliye callback schedule karne ke baad bhi uske neeche wala synchronous code pehle execute ho sakta hai.

**Important:** `process.nextTick()` ka naam dekhkar ise Event Loop ki normal phase queue mat samajhna. Node.js mein iska apna special scheduling behavior hai.

Agar `process.nextTick()` ko continuously recursively schedule kiya jaye, to ye Event Loop ko doosre kaam karne ka mauka dene mein delay kar sakta hai.

Example of a pattern to avoid:

```js
function repeat() {
  process.nextTick(repeat);
}

repeat();
```

This keeps scheduling more `nextTick` callbacks and can prevent normal Event Loop progress.

Do not run this example in a long-running application.

---

## 8. What Are Promise Microtasks?

JavaScript Promises use a microtask queue for handlers such as `.then()`, `.catch()` and `.finally()`.

Consider this code:

```js
console.log("First");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("Second");
```

Output:

```text
First
Second
Promise
```

### Explanation

1. `"First"` prints synchronously.
2. The Promise handler is scheduled as a microtask.
3. `"Second"` prints synchronously.
4. After the current synchronous operation completes, the Promise handler runs.

### Compare the Three

```js
console.log("Start");

process.nextTick(() => {
  console.log("Next Tick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

In a normal CommonJS Node.js script, the expected output is:

```text
Start
End
Next Tick
Promise
```

This demonstrates that the `nextTick` queue is processed before the Promise microtask queue in this context.

### Important Distinction

* `process.nextTick()` is a Node.js-specific scheduling mechanism.
* Promise handlers use the JavaScript microtask queue.
* `setTimeout()` schedules timer callbacks.
* `setImmediate()` schedules callbacks for the Check phase.

These are not interchangeable.

Their exact ordering can depend on the current execution context, Node.js version and module environment. Learn the underlying rules instead of assuming that every combination has one universal ordering.

---

## 9. Does the Event Loop Execute Everything Asynchronously?

No.

Consider:

```js
console.log("First");

function calculate() {
  let total = 0;

  for (let i = 0; i < 1000000; i++) {
    total += i;
  }

  console.log("Calculation completed");
}

calculate();

console.log("Last");
```

The output order is:

```text
First
Calculation completed
Last
```

The calculation executes synchronously on the main JavaScript thread.

While it is running, the thread cannot execute another JavaScript callback.

### Hindi Explanation

Node.js asynchronous I/O ko efficiently handle kar sakta hai. Lekin iska matlab ye nahi ki har JavaScript function background mein execute hota hai.

Agar tum main JavaScript thread par bahut heavy calculation karte ho, to woh Event Loop ko block kar sakti hai.

For example, a server that performs a huge synchronous calculation during every request may become slow at handling other requests.

CPU-intensive work may require a different approach, such as worker threads, separate processes or a dedicated processing service.

---

## 10. Does Every Asynchronous Operation Use a Thread Pool?

No.

This is a common misunderstanding.

Node.js relies on different mechanisms depending on the operation.

### Some operations rely on operating system facilities

Many networking operations use asynchronous capabilities provided by the operating system and coordinated through libuv.

### Some operations can use the libuv thread pool

Certain filesystem operations, some DNS operations and other supported operations may use the libuv thread pool.

### Some operations are scheduled by Node.js or JavaScript

Timers and Promise callbacks have their own scheduling rules; they do not each require a dedicated thread to wait for them.

**Hindi:** Har asynchronous operation ke liye ek alag thread create nahi hota.

Operation ke type ke hisaab se Node.js operating system facilities, libuv thread pool ya apne scheduling mechanisms ka use kar sakta hai.

---

## 11. Practical Example: Understanding Execution Order

Create a file named:

`event-loop-demo.js`

Add this code:

```js
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
```

Run it using:

```bash
node event-loop-demo.js
```

### What Should You Understand?

The first two synchronous messages will be:

```text
1. Start
6. End
```

In a normal CommonJS Node.js script, the `process.nextTick()` callback is processed before the Promise handler in this example.

The relative order of the timer and immediate callbacks scheduled at the top level is not guaranteed.

So do not treat one complete output sequence as universal.

The goal is to understand:

* Synchronous code executes first.
* `process.nextTick()` has special Node.js scheduling behavior.
* Promise handlers use the microtask queue.
* Timers and immediates are associated with different Event Loop mechanisms.
* Scheduling context matters.

---

## 12. Common Mistakes

### Mistake 1: Thinking `setTimeout(fn, 0)` means immediate execution

Incorrect.

It schedules a timer callback with a minimum delay. It does not execute the callback immediately.

### Mistake 2: Thinking the Event Loop is a separate JavaScript thread

Incorrect.

The Event Loop is part of Node.js's runtime architecture. Ordinary JavaScript callbacks execute on the main JavaScript thread unless a different execution mechanism, such as worker threads, is used.

### Mistake 3: Thinking every asynchronous operation uses the thread pool

Incorrect.

Different operations use different mechanisms. Networking, filesystem operations and timers do not all work in the same way.

### Mistake 4: Thinking `setTimeout()` always runs before `setImmediate()`

Incorrect.

When both are scheduled at the top level, their relative order is not guaranteed.

### Mistake 5: Thinking asynchronous means JavaScript stops executing

Incorrect.

JavaScript can continue executing other synchronous code while an asynchronous I/O operation is waiting to complete.

---

## 13. Interview Questions and Answers

### Q1. What is the Event Loop in Node.js?

**English Answer:**

The Event Loop is a mechanism in Node.js that coordinates the execution of callbacks associated with asynchronous operations. It allows Node.js to handle many I/O operations without synchronously blocking the main JavaScript thread while waiting for them to complete.

**Hindi Explanation:**

Event Loop asynchronous operations ke callbacks ko execute karne ka process coordinate karta hai. Iski help se Node.js I/O operations ke wait ke dauraan doosra JavaScript code execute kar sakta hai.

### Q2. What is the Call Stack?

**English Answer:**

The Call Stack tracks the currently executing JavaScript functions. It follows the Last In, First Out principle.

**Hindi Explanation:**

Call Stack currently executing functions ko track karta hai. Jo function sabse last mein stack par aata hai, woh normally sabse pehle complete hokar nikalta hai.

### Q3. What is libuv?

**English Answer:**

libuv is a library used by Node.js that provides support for the Event Loop and asynchronous I/O. It also provides a thread pool used by certain operations.

**Hindi Explanation:**

libuv Node.js mein Event Loop aur asynchronous I/O ko support karta hai. Kuch operations ke liye ye thread pool ka bhi use karta hai.

### Q4. What is the difference between `setTimeout()` and `setImmediate()`?

**English Answer:**

`setTimeout()` schedules a callback after a specified minimum delay. `setImmediate()` schedules a callback for the Check phase of the Event Loop. Their relative order is not guaranteed when both are scheduled at the top level.

### Q5. What is `process.nextTick()`?

**English Answer:**

`process.nextTick()` schedules a callback to run after the current JavaScript operation completes, before the Event Loop proceeds to its next phase.

### Q6. What is a Promise microtask?

**English Answer:**

A Promise microtask is a job scheduled for execution through the JavaScript microtask queue. Promise handlers registered with `.then()`, `.catch()` and `.finally()` use this mechanism.

### Q7. Does Node.js execute all asynchronous tasks using the thread pool?

**English Answer:**

No. Node.js uses different mechanisms depending on the operation. Many networking operations rely on operating system facilities, while certain filesystem and other operations can use the libuv thread pool.

### Q8. Can CPU-intensive JavaScript block the Event Loop?

**English Answer:**

Yes. CPU-intensive synchronous JavaScript can block the main JavaScript thread, delaying other callbacks and reducing the server's responsiveness.

### Q9. Does `setTimeout(fn, 0)` execute the callback immediately?

**English Answer:**

No. It schedules a timer callback with a minimum delay. The callback runs when it becomes eligible and the runtime can execute it.

### Q10. Why is Node.js suitable for I/O-heavy applications?

**English Answer:**

Node.js can initiate asynchronous I/O operations and continue processing other work while waiting for those operations to complete. This helps it handle many concurrent I/O activities efficiently, provided the application does not block the main JavaScript thread with excessive synchronous work.

---

## 14. Practical Tasks

Complete these tasks to strengthen your understanding.

### Task 1: Synchronous Execution

Create a JavaScript file containing three `console.log()` statements.

**Goal:** Understand that synchronous statements execute in order.

### Task 2: Timer Scheduling

Add a `setTimeout()` callback between two synchronous statements.

**Goal:** Observe why the synchronous statements print before the timer callback.

### Task 3: Promise and Next Tick

Use `Promise.resolve().then()` and `process.nextTick()` alongside synchronous statements.

**Goal:** Understand the difference between synchronous execution, the `nextTick` queue and Promise microtasks.

### Task 4: Timer Versus Immediate

Schedule both `setTimeout(..., 0)` and `setImmediate()` at the top level.

Run the script several times.

**Goal:** Understand why their relative order is not guaranteed in this context.

### Task 5: Read the Event Loop Phases

Memorize the six phase names:

1. Timers
2. Pending Callbacks
3. Idle, Prepare
4. Poll
5. Check
6. Close Callbacks

**Goal:** Understand the purpose of each phase instead of merely memorizing the list.

---

## 15. Lesson Summary

By completing this lesson, you should understand:

* What the Event Loop is.
* Why asynchronous execution is useful in Node.js.
* The role of the Call Stack.
* What libuv does.
* The main Event Loop phases.
* The difference between `setTimeout()` and `setImmediate()`.
* How `process.nextTick()` differs from Promise microtasks.
* Why CPU-intensive synchronous JavaScript can block the Event Loop.
* Why not every asynchronous operation uses the thread pool.

### One-Line Revision

**The Event Loop coordinates when JavaScript callbacks can execute, while Node.js and the operating system handle asynchronous operations using the mechanisms appropriate to each operation.**

---

## Next Lesson

**Lesson 06: Synchronous vs Asynchronous JavaScript in Node.js**

In the next lesson, we will study:

* Synchronous vs asynchronous execution.
* Blocking vs non-blocking operations.
* How Node.js handles file operations.
* `readFileSync()` vs `readFile()`.
* When to use synchronous and asynchronous APIs in backend development.
* Practical examples and interview questions.
