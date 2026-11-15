# 01. Introduction to Node.js

**Course:** Node.js Masterclass
**Level:** Beginner to Intermediate
**Status:** In Progress

---

## 1. What Is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript outside a web browser.

It is commonly used to develop:

* Backend applications.
* Web servers.
* REST APIs.
* Real-time applications.
* Command-line tools.
* File-processing applications.

### Simple Explanation

JavaScript was originally designed to run inside web browsers.

Node.js allows JavaScript to run outside the browser, including on a computer or server.

This makes it possible to use JavaScript for both frontend and backend development.

### Example

Create a file named `hello.js`.

```javascript
console.log("Hello from Node.js");
```

Run the file using the terminal:

```bash
node hello.js
```

Expected output:

```text
Hello from Node.js
```

### Important Point

Node.js is not a programming language.

* JavaScript is the programming language.-----------
* Node.js is the runtime environment.-------------
* V8 is the JavaScript engine used by Node.js.-----------

---

## 2. What Is a Runtime Environment?

A runtime environment provides the facilities required to execute a program.

For JavaScript, the runtime environment includes the JavaScript engine and additional APIs and services.

These facilities allow JavaScript programs to interact with their environment.

For example, Node.js provides APIs for:

* Reading and writing files.
* Creating HTTP servers.
* Working with operating-system information.
* Managing network communication.
* Using timers.

### Example

```javascript
const os = require("node:os");

console.log(os.platform());
```

This example uses Node.js's built-in `os` module to retrieve operating-system information.

The `require()` syntax belongs to the CommonJS module system, which we will study in a separate lesson.

---

## 3. Why Was Node.js Important?

Before Node.js, JavaScript was primarily associated with browser-based applications.

Node.js made it possible for developers to use JavaScript for server-side development as well.

This allowed developers to use one programming language across many parts of a web application.

### Major Advantages

1. JavaScript can be used for backend development.
2. It provides built-in APIs for many system operations.
3. It supports asynchronous and non-blocking I/O.
4. Its ecosystem contains many reusable packages.
5. It is useful for network applications and real-time services.

### Important Limitation

Node.js is not automatically the best choice for every application.

CPU-intensive tasks can block the JavaScript event loop if they are executed synchronously on the main thread.

Such workloads may require worker threads, separate processes or specialized services.

---

## 4. What Is Backend Development?

Backend development involves building the server-side logic of an application.

The backend commonly handles:

* Business logic.
* API requests.
* Database operations.
* Authentication and authorization.
* Data validation.
* Error handling.
* Communication between clients and servers.

### Example: Login System

Suppose a user enters an email address and password on a website.

A simplified backend workflow is:

1. The client sends a login request.
2. The server receives the request.
3. The backend validates the submitted data.
4. The application checks the stored user information.
5. The server returns an appropriate response.

A real authentication system must also verify passwords securely and protect sensitive information.

---

## 5. How Does Node.js Fit into the MERN Stack?

MERN stands for:

* MongoDB
* Express.js
* React
* Node.js

### Responsibilities

| Technology | Primary Responsibility             |
| ---------- | ---------------------------------- |
| MongoDB    | Database                           |
| Express.js | Backend web framework              |
| React      | User interface                     |
| Node.js    | JavaScript runtime for the backend |

### Example Workflow

A React frontend requests a list of products.

1. React sends an HTTP request.
2. Node.js runs the backend application.
3. Express.js handles the route and request.
4. The backend retrieves the required data from MongoDB.
5. The server sends a response.
6. React displays the products.

This is a simplified example of how these technologies can work together.

---

## 6. Important Terminology

### JavaScript

A programming language used to create dynamic applications.

### Runtime Environment

The environment that provides the facilities required to execute a program.

### JavaScript Engine

Software responsible for executing JavaScript code.

### V8 Engine

The JavaScript engine used by Node.js. It is developed by the Chromium project.

### Server

A computer or software system that provides services or responds to requests.

### API

An interface that allows different software components to communicate.

### HTTP

A protocol used for communication between clients and servers on the web.

### Backend

The server-side part of an application.

### Asynchronous Programming

A programming approach that allows certain operations to progress without requiring the current execution flow to wait for each operation to finish.

### Non-Blocking I/O

An approach in which an I/O operation does not unnecessarily block the execution of the main JavaScript thread while waiting for the operation to complete.

---

## 7. Common Beginner Mistakes

### Mistake 1: Calling Node.js a Programming Language

Incorrect: Node.js is a programming language.

Correct: Node.js is a JavaScript runtime environment.

### Mistake 2: Assuming Node.js and Express.js Are the Same

Node.js provides the runtime environment.

Express.js is a web framework commonly used with Node.js to build web applications and APIs.

### Mistake 3: Assuming Node.js Cannot Access Files

Node.js provides APIs for file-system operations.

For example, the `node:fs` module supports reading and writing files.

### Mistake 4: Assuming Node.js Is Always Faster

Performance depends on the workload, implementation and architecture.

Node.js is especially useful for many I/O-intensive applications, but CPU-intensive work can block its main JavaScript thread if handled improperly.

---

## 8. Interview Questions

### Q1. What is Node.js?

**Answer:**

Node.js is an open-source, cross-platform JavaScript runtime environment that allows JavaScript to execute outside a web browser. It is commonly used to build backend applications, APIs and network services.

### Q2. Is Node.js a programming language?

**Answer:**

No. JavaScript is the programming language, while Node.js is a runtime environment that allows JavaScript to run outside the browser.

### Q3. What is V8?

**Answer:**

V8 is a JavaScript engine developed by the Chromium project. It compiles and executes JavaScript code and is used by Node.js.

### Q4. What is the difference between Node.js and Express.js?

**Answer:**

Node.js is a JavaScript runtime environment. Express.js is a web framework that runs on Node.js and simplifies the development of web servers and APIs.

### Q5. Why is Node.js used for backend development?

**Answer:**

Node.js allows developers to use JavaScript on the server side. Its asynchronous I/O capabilities and extensive package ecosystem make it suitable for many APIs and network applications.

---

## 9. Practice Tasks

### Task 1: Basic Execution

Create a file named `hello.js` and print:

* Your name.
* Your learning goal.
* The message "I am learning Node.js".

### Task 2: Multiple Statements

Print three different messages using three separate `console.log()` statements.

### Task 3: Explain the Concept

Write your own answers to these questions:

1. What is Node.js?
2. Why do developers use Node.js?
3. Is Node.js a programming language?
4. What is the difference between Node.js and Express.js?
5. What is a runtime environment?

### Task 4: Verify Your Environment

Run these commands:

```bash
node -v
npm -v
```

Record the output in your setup notes.

---

## 10. Revision Checklist

Before marking this lesson complete, make sure you can:

* [ ] Define Node.js in English.
* [ ] Explain what a runtime environment is.
* [ ] Differentiate JavaScript, Node.js and V8.
* [ ] Explain the role of Node.js in MERN.
* [ ] Run a JavaScript file using Node.js.
* [ ] Answer the five interview questions without copying the notes.

---

## 11. Next Lesson

**Topic:** Node.js Architecture

We will study:

* The V8 engine.
* The role of libuv.
* The main JavaScript thread.
* The event loop.
* Asynchronous I/O.
* How Node.js handles different kinds of operations.

**Progress:** Introduction to Node.js — In Progress
