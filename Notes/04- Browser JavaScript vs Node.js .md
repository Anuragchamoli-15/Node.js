# Lesson 4: Browser JavaScript vs Node.js

# पाठ 4: Browser JavaScript और Node.js में अंतर

## 1. Introduction — परिचय

**English:**

JavaScript is a programming language that can run in different environments. Two common environments are web browsers and Node.js.

**Hindi:**

JavaScript एक programming language है जो अलग-अलग environments में चल सकती है। इसके दो सामान्य environments हैं: Web Browser और Node.js।

A browser provides JavaScript with APIs to interact with web pages, while Node.js provides APIs to build server-side applications and interact with the operating system.

Browser JavaScript को web pages के साथ काम करने के लिए APIs देता है, जबकि Node.js server-side applications बनाने और operating system के साथ काम करने के लिए APIs देता है।

**Examples:**

* Browser: Google Chrome, Mozilla Firefox.
* Runtime: Node.js.

**Important:** JavaScript language दोनों जगह समान है, लेकिन उपलब्ध APIs और execution environment अलग हो सकते हैं।

---

## 2. What Is Browser JavaScript?

### English Definition

Browser JavaScript is JavaScript executed inside a web browser. It can interact with HTML elements, CSS styles, browser events, and other browser APIs.

### हिंदी में समझें

Browser JavaScript वह JavaScript है जो web browser के अंदर execute होती है। इसका उपयोग HTML elements को access करने, CSS बदलने और user interactions handle करने के लिए किया जाता है।

### Example

```javascript
const heading = document.querySelector("h1");

heading.textContent = "Hello Anurag!";
```

### Explanation — व्याख्या

* `document` provides access to the webpage's DOM.
* `querySelector()` selects an HTML element.
* `textContent` changes the text inside that element.

हिंदी में:

* `document` webpage के DOM को access करने देता है।
* `querySelector()` किसी HTML element को select करता है।
* `textContent` उस element का text बदलता है।

**Note:** यह code सामान्य Node.js environment में सीधे काम नहीं करेगा, क्योंकि वहाँ browser का DOM उपलब्ध नहीं होता।

---

## 3. What Is Node.js JavaScript?

### English Definition

Node.js allows JavaScript to execute outside a web browser. It provides built-in modules and APIs for server-side development, file operations, networking, and process management.

### हिंदी में समझें

Node.js की मदद से JavaScript को browser के बाहर चलाया जा सकता है। इसका उपयोग backend development, files को पढ़ने-लिखने, servers बनाने और operating system से संबंधित काम करने में होता है।

### Example

```javascript
const os = require("node:os");

console.log(os.platform());
```

### Explanation — व्याख्या

* `require()` loads a module in CommonJS.
* `node:os` is a built-in Node.js module.
* `os.platform()` returns the operating-system platform identifier.

हिंदी में:

* `require()` CommonJS में module load करता है।
* `node:os` Node.js का built-in module है।
* `os.platform()` operating system का platform identifier देता है।

इस code को `node app.js` से चलाया जा सकता है।

---

## 4. Browser vs Node.js — मुख्य अंतर

| Feature           | Browser                                                                  | Node.js                                               |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| Main purpose      | Webpage functionality                                                    | Server-side and general-purpose JavaScript            |
| मुख्य उद्देश्य    | Webpage को interactive बनाना                                             | Backend और अन्य applications बनाना                    |
| DOM               | Normally available                                                       | Not provided by default                               |
| File access       | Restricted browser APIs                                                  | Node.js file-system APIs                              |
| Global object     | `globalThis` refers to the browser global environment, commonly `window` | `globalThis` refers to the Node.js global environment |
| Common APIs       | `document`, `window`, `localStorage`                                     | `process`, `node:fs`, `node:http`                     |
| JavaScript engine | Depends on the browser; Chrome uses V8                                   | Uses V8                                               |
| Typical use       | Frontend development                                                     | Backend development, scripts, tooling                 |

### Important Note

`globalThis` is the standard cross-environment way to refer to the global object. Browser globals commonly include `window`, while Node.js exposes `global` as an alias for its global object.

हिंदी में: `globalThis` दोनों environments में global object को access करने का standard तरीका है। Browser में सामान्यतः `window` मिलता है और Node.js में `global` भी उपलब्ध है।

---

## 5. What Is the DOM?

### English Definition

DOM stands for Document Object Model. It represents an HTML document as a structured tree of objects that JavaScript can access and modify.

### हिंदी में समझें

DOM का पूरा नाम Document Object Model है। यह HTML document को objects की tree structure के रूप में represent करता है, जिससे JavaScript webpage के elements को access और modify कर सकती है।

### Example HTML

```html
<h1 id="title">Welcome</h1>
```

### Browser JavaScript

```javascript
const title = document.getElementById("title");

title.textContent = "Welcome to Node.js Learning";
```

### Result — परिणाम

Webpage पर heading बदलकर यह हो जाएगी:

`Welcome to Node.js Learning`

**Remember:** Node.js स्वयं browser DOM provide नहीं करता। हालांकि, external libraries कुछ परिस्थितियों में DOM जैसी functionality emulate कर सकती हैं।

---

## 6. What Is the Global Object?

### English Definition

A global object provides access to values and functions available in a particular JavaScript environment.

### हिंदी में समझें

Global object ऐसा object है जिसके माध्यम से किसी JavaScript environment में उपलब्ध global properties और functions को access किया जा सकता है।

### Browser Example

```javascript
console.log(globalThis);
console.log(window);
```

Browser में दोनों global environment को refer करते हैं, हालांकि `globalThis` standard approach है।

### Node.js Example

```javascript
console.log(globalThis);
console.log(global);
```

Node.js में `globalThis` और `global` दोनों global object को refer करते हैं।

**Important:** हर environment के global object पर उपलब्ध properties समान नहीं होतीं।

---

## 7. What Is `process` in Node.js?

### English Definition

`process` is a global object in Node.js that provides information about and control over the current Node.js process.

### हिंदी में समझें

`process` Node.js का global object है। यह current running Node.js process की information देता है और process से संबंधित कुछ operations करने में मदद करता है।

### Example

```javascript
console.log(process.version);
console.log(process.platform);
```

### Explanation — व्याख्या

* `process.version` shows the Node.js version.
* `process.platform` shows the platform identifier for the operating system.

हिंदी में:

* `process.version` Node.js का version दिखाता है।
* `process.platform` operating system का platform identifier दिखाता है।

इस code को चलाने के लिए:

```bash
node app.js
```

---

## 8. What Is `localStorage`?

### English Definition

`localStorage` is a browser API that stores key-value data in a particular origin's storage area across browser sessions.

### हिंदी में समझें

`localStorage` browser की storage सुविधा है। इसकी मदद से website कुछ data browser में save कर सकती है, जो सामान्यतः browser बंद करके दोबारा खोलने पर भी रहता है।

### Browser Example

```javascript
localStorage.setItem("username", "Anurag");

const username = localStorage.getItem("username");

console.log(username);
```

Output:

```text
Anurag
```

### Important

`localStorage` standard Node.js global API नहीं है।

Node.js में data store करने के लिए file system, database या अन्य storage solutions का उपयोग किया जा सकता है।

---

## 9. Why Does `document` Not Work in Node.js?

### English Explanation

The `document` object is provided by browser environments through the DOM API. A standard Node.js runtime does not provide a browser DOM by default.

### हिंदी में समझें

`document` browser के DOM API का हिस्सा है। Node.js में सामान्यतः DOM मौजूद नहीं होता, इसलिए `document` को access करने पर `ReferenceError` आ सकता है।

### Example

```javascript
console.log(document);
```

Typical Node.js output:

```text
ReferenceError: document is not defined
```

लेकिन यह code browser में चल सकता है।

**Interview Point:** JavaScript language और JavaScript environment अलग concepts हैं।

JavaScript एक language है, जबकि Browser और Node.js उस language को चलाने वाले अलग environments हैं।

---

## 10. How Does Node.js Help in MERN Stack?

### English

MERN stands for MongoDB, Express.js, React, and Node.js.

* MongoDB: Stores application data.
* Express.js: Helps build backend routes and APIs.
* React: Builds user interfaces.
* Node.js: Runs the backend JavaScript application.

### हिंदी में

MERN Stack के चार मुख्य parts हैं:

* MongoDB: Application का data store करता है।
* Express.js: Backend routes और APIs बनाने में मदद करता है।
* React: User interface बनाता है।
* Node.js: Backend JavaScript application को run करता है।

### Simplified Flow

```text
React Frontend
      |
      | HTTP Request
      v
Express.js API
      |
      v
Node.js Runtime
      |
      v
MongoDB Database
      |
      v
Response to React
```

यह एक simplified architecture है। वास्तविक application में Express.js, Node.js के ऊपर चलने वाला framework है और database interaction के लिए अतिरिक्त libraries या drivers इस्तेमाल हो सकते हैं।

---

## 11. Practical Example — Browser vs Node.js

### Task A: Browser

Create an HTML file named `browser-test.html`.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Browser Test</title>
</head>
<body>
    <h1 id="heading">Original Text</h1>

    <script>
        document.getElementById("heading").textContent =
            "JavaScript in Browser";
    </script>
</body>
</html>
```

Open this file in a browser.

**Expected Result:** The heading will display `JavaScript in Browser`.

हिंदी: Browser HTML को load करेगा और JavaScript heading का text बदल देगी।

### Task B: Node.js

Create a file named `node-test.js`.

```javascript
console.log("JavaScript running in Node.js");

console.log("Node.js version:", process.version);

console.log("Operating system:", process.platform);
```

Run it:

```bash
node node-test.js
```

**Expected Result:** The terminal displays the message, Node.js version, and operating-system platform.

हिंदी: यह program terminal में output देगा। यहाँ browser के DOM की जरूरत नहीं है।

---

## 12. Common Interview Questions

### Q1. What is the main difference between Browser JavaScript and Node.js?

**English:** Browser JavaScript works with browser APIs and webpage elements, while Node.js provides APIs for backend development and system-related tasks.

**हिंदी:** Browser JavaScript webpage और browser APIs के साथ काम करती है, जबकि Node.js backend और system-related tasks के लिए APIs देता है।

### Q2. What is the DOM?

**English:** The DOM represents an HTML document as a tree of objects that JavaScript can access and modify.

**हिंदी:** DOM HTML document को objects की tree के रूप में represent करता है, जिसे JavaScript access और modify कर सकती है।

### Q3. What is `process` in Node.js?

**English:** `process` is a global object that provides information about and control over the current Node.js process.

**हिंदी:** `process` Node.js का global object है, जो current process की जानकारी और कुछ control सुविधाएँ देता है।

### Q4. Why does `document` not work in Node.js by default?

**English:** Because Node.js does not provide the browser DOM API by default.

**हिंदी:** क्योंकि Node.js में browser का DOM API सामान्यतः उपलब्ध नहीं होता।

### Q5. Can the same JavaScript language run in both environments?

**English:** Yes. JavaScript can run in both environments, but available APIs and environment-specific behavior can differ.

**हिंदी:** हाँ। दोनों environments में JavaScript चल सकती है, लेकिन उपलब्ध APIs और कुछ behaviors अलग होते हैं।

### Q6. Does Node.js use V8?

**English:** Yes. Node.js uses the V8 engine to execute JavaScript.

**हिंदी:** हाँ। Node.js JavaScript execute करने के लिए V8 engine का उपयोग करता है।

---

## 13. Key Takeaways — मुख्य बातें

1. JavaScript is a programming language.

   * JavaScript एक programming language है।

2. A browser provides APIs for webpage interaction.

   * Browser webpage के साथ interaction के लिए APIs देता है।

3. Node.js allows JavaScript to run outside a browser.

   * Node.js JavaScript को browser के बाहर चलाता है।

4. The DOM is normally available in browsers, not standard Node.js.

   * DOM सामान्यतः browser में होता है, standard Node.js में नहीं।

5. `process` is a Node.js global object.

   * `process` Node.js का global object है।

6. `localStorage` is a browser storage API.

   * `localStorage` browser की storage API है।

7. Both environments can run JavaScript, but their APIs differ.

   * दोनों environments JavaScript चला सकते हैं, लेकिन APIs अलग हैं।

---

## 14. Practice Task — अभ्यास

Create a file named `environment-check.js`.

```javascript
console.log("Global object:", typeof globalThis);
console.log("Document:", typeof document);
console.log("Process:", typeof process);
console.log("Window:", typeof window);
console.log("Console:", typeof console);
```

Run the file:

```bash
node environment-check.js
```

### Expected Output in a Standard Node.js Environment

```text
Global object: object
Document: undefined
Process: object
Window: undefined
Console: object
```

### Why?

* `globalThis` exists in Node.js.
* `document` is not a standard Node.js global.
* `process` is provided by Node.js.
* `window` is not a standard Node.js global.
* `console` is available in Node.js.

---

## 15. Lesson Completion Checklist

* [ ] I understand Browser JavaScript.
* [ ] I understand Node.js JavaScript.
* [ ] I understand the DOM.
* [ ] I understand the global object.
* [ ] I understand `process`.
* [ ] I understand why `document` does not work in standard Node.js.
* [ ] I completed the practical task.
* [ ] I can explain the differences in English.

**Next Lesson:** `05-NodeJS-Modules-and-CommonJS.md`

In the next lesson, we will learn about modules, `require()`, `module.exports`, and how to split a Node.js application into multiple files.

अगले lesson में हम modules, `require()`, `module.exports` और Node.js project को multiple files में organize करना सीखेंगे।
