# Node.js Architecture

## 1. What Is Node.js Architecture?

Node.js Architecture describes how Node.js executes JavaScript code, handles asynchronous operations, and manages multiple requests efficiently.

Node.js uses several important components to execute JavaScript and handle operations such as file access and network communication.

### Main Components of Node.js Architecture

1. V8 Engine
2. Node.js APIs
3. Event Loop
4. libuv
5. Thread Pool
6. Operating System

---

## 2. V8 Engine

V8 is an open-source JavaScript engine developed by Google.

It compiles and executes JavaScript code. Node.js uses the V8 engine to run JavaScript outside the browser.

**Example:**

```javascript
console.log("Hello Node.js");
```

When we run this file using Node.js, V8 executes the JavaScript code.

**Important:** V8 is the JavaScript engine, not the entire Node.js runtime.


V8 Google द्वारा विकसित किया गया एक ओपन-सोर्स (Open-source) और हाई-परफॉरमेंस जावास्क्रिप्ट और वेबअसेंबली (WebAssembly) इंजन है। इसे मुख्य रूप से Google Chrome ब्राउज़र के लिए C++ भाषा में लिखा गया था।

V8 इंजन क्या करता है?
• मशीन कोड में बदलना: यह जावास्क्रिप्ट कोड को सीधे कंप्यूटर के समझने योग्य मशीन कोड (Machine Code) में कंपाइल (Compile) करता है।
• JIT (Just-In-Time) कंपाइलेशन: V8 कोड को लाइन-दर-लाइन इंटरप्रेट करने के बजाय, JIT कंपाइलर का उपयोग करके इसे बहुत तेज़ी से रन करता है। इसमें Ignition (इंटरप्रेटर) और TurboFan (ऑप्टिमाइजिंग कंपाइलर) जैसे टूल्स होते हैं।
• गार्बेज कलेक्शन (Garbage Collection): यह ऑटोमैटिक रूप से मेमोरी मैनेज करता है और इस्तेमाल में न आने वाली मेमोरी को फ्री कर देता है।

---

## 3. Node.js APIs

Node.js provides built-in modules and APIs that allow JavaScript to interact with the computer and the network.

Some important built-in modules are:

| Module   | Purpose                                             |
| -------- | --------------------------------------------------- |
| `fs`     | Works with files and directories                    |
| `http`   | Creates HTTP servers and handles HTTP communication |
| `path`   | Works with file and directory paths                 |
| `os`     | Provides information about the operating system     |
| `events` | Implements event-driven programming                 |
| `timers` | Provides timer-related functions                    |

**Example:**

```javascript
const fs = require("node:fs");

console.log("File System module loaded");
```

Here, `require()` loads the built-in File System module.

---

## 4. What Is libuv?

libuv is a C library used by Node.js to support asynchronous I/O and event-loop functionality.

It helps Node.js handle certain operations without blocking JavaScript execution unnecessarily.

Its responsibilities include:

* Providing the event loop.
* Supporting asynchronous I/O operations.
* Managing a thread pool for certain tasks.
* Helping coordinate callbacks for completed operations.

**Important:** Not every asynchronous operation uses the thread pool. Some operations use operating-system facilities, while others may use libuv's thread pool.

---

## 5. What Is the Event Loop?

The Event Loop is a mechanism that coordinates the execution of callbacks for asynchronous operations.

It allows Node.js to continue handling other work while waiting for certain operations to complete.

For example, when a timer is waiting, JavaScript can execute other statements instead of simply waiting for the timer.

### Example

```javascript
console.log("First");

setTimeout(() => {
    console.log("Second");
}, 2000);

console.log("Third");
```

### Output

```text
First
Third
Second
```

### Explanation

1. Node.js executes `console.log("First")`.
2. The timer is registered.
3. JavaScript continues and executes `console.log("Third")`.
4. When the timer becomes eligible, its callback can execute through the event loop.
5. The callback prints `"Second"`.

**Note:** `setTimeout()` specifies a minimum delay, not an exact execution time.

---

## 6. What Is the Thread Pool?

A thread pool is a group of worker threads that can perform certain tasks separately from the main JavaScript thread.

In Node.js, libuv provides a thread pool that is used for specific operations, including certain file-system operations and some other tasks.

### Why Is It Useful?

Suppose an operation requires significant time to complete. Performing supported work in a worker thread can help prevent that work from blocking the main JavaScript thread.

However, not all asynchronous operations use the thread pool.

---

## 7. How Does Node.js Handle a Request?

Consider a Node.js application that receives a request to read a file.

A simplified flow is:

1. The application receives a request.
2. JavaScript calls a file-system API.
3. Node.js arranges for the file operation to be performed.
4. The operation completes.
5. Its callback or other completion handler becomes eligible to run.
6. JavaScript processes the result.
7. The application sends the response.

The exact execution path depends on the operation and the API being used.

### Architecture Overview

```text
            JavaScript Code
                   |
                   v
              Node.js Runtime
                   |
          +--------+--------+
          |                 |
          v                 v
       V8 Engine       Node.js APIs
                            |
                            v
                          libuv
                            |
               +------------+------------+
               |                         |
               v                         v
          Event Loop              Thread Pool
               |
               v
       Callback Execution
```

This diagram is a simplified conceptual overview, not a complete representation of every internal component or execution path.

---

## 8. Synchronous vs Asynchronous Operations

### Synchronous Operation

A synchronous operation blocks the current JavaScript execution until that operation finishes.

Example:

```javascript
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

Each statement executes in order.

### Asynchronous Operation

An asynchronous operation allows JavaScript to continue doing other work while waiting for the operation to complete.

Example:

```javascript
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

The timer callback executes later, after the other synchronous statements have finished.

### Comparison

| Feature   | Synchronous                               | Asynchronous                                |
| --------- | ----------------------------------------- | ------------------------------------------- |
| Execution | Waits for the current operation to finish | Can continue with other work while waiting  |
| Blocking  | May block the current thread              | Often avoids blocking while waiting for I/O |
| Example   | `readFileSync()`                          | `readFile()` with a callback                |
| Use case  | Small tasks where blocking is acceptable  | Many I/O operations in server applications  |

**Important:** Asynchronous does not automatically mean faster. Performance depends on the type of operation and how the application handles it.

---

## 9. Why Is Node.js Good for Backend Development?

Node.js is commonly used for backend development because it supports:

* Building web servers and APIs.
* Handling many concurrent I/O operations.
* Working with databases.
* Reading and writing files.
* Building real-time applications.
* Using JavaScript on both the frontend and backend.

### Important Limitation

Node.js is not automatically the best choice for every workload.

Long-running CPU-intensive JavaScript can block the main thread and delay other requests.

CPU-intensive tasks may need approaches such as worker threads, separate processes, or dedicated services.

---

## 10. Important Interview Questions

### Q1. What is Node.js Architecture?

Node.js Architecture describes the components and mechanisms Node.js uses to execute JavaScript and handle operations. Important components include the V8 engine, Node.js APIs, libuv, and the event loop.

### Q2. What is V8?

V8 is Google's open-source JavaScript engine. It compiles and executes JavaScript code and is used by Node.js to run JavaScript outside the browser.

### Q3. What is libuv?

libuv is a C library that provides the event loop, asynchronous I/O support, and a thread pool for certain operations in Node.js.

### Q4. What is the Event Loop?

The Event Loop coordinates the execution of callbacks for asynchronous operations, allowing Node.js to handle I/O efficiently.

### Q5. What is a Thread Pool?

A thread pool is a group of worker threads used to perform certain tasks separately from the main JavaScript thread.

### Q6. What is the difference between synchronous and asynchronous operations?

Synchronous operations block the current execution until the operation completes. Asynchronous operations allow other work to continue while waiting for supported operations to finish.

### Q7. Is Node.js single-threaded?

JavaScript execution in a typical Node.js application primarily runs on one main thread. However, Node.js also uses other mechanisms, including operating-system facilities and worker threads, for certain tasks.

### Q8. Why can CPU-intensive code be a problem in Node.js?

CPU-intensive JavaScript running on the main thread can block the event loop, delaying other callbacks and requests.

---

## 11. Key Takeaways

* Node.js is a JavaScript runtime environment.
* V8 compiles and executes JavaScript.
* Node.js provides built-in APIs for files, networking, and other tasks.
* libuv supports the event loop and asynchronous I/O.
* The event loop coordinates callback execution.
* The thread pool handles certain operations.
* Synchronous operations can block JavaScript execution.
* Asynchronous I/O helps Node.js handle concurrent work efficiently.
* CPU-intensive work can block the main JavaScript thread.

---

## 12. Practical Task

Create a file named `architecture.js`.

Write a program that prints:

1. `Program Started`
2. `Timer Started`
3. `Program Finished`
4. `Timer Completed`

Use `console.log()` and `setTimeout()`.

Run the file with:

```bash
node architecture.js
```

Observe the output and explain to yourself why the messages appear in that order.
