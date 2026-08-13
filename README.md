# lean-utils

Small collection of useful JavaScript utilities extracted from this package's `index.js`.

Installation

Install the published package:

```bash
npm install lean-utils
```

Quick usage

```javascript
const { debounce, throttle, deepClone } = require("lean-utils");

const fn = () => console.log("hello");
const t = throttle(fn, 200);

// deep clone example
const o = { a: 1, b: { c: 2 } };
const c = deepClone(o);
```

API

- `deepClone(value)` — deep clones arrays/objects, preserves Date/RegExp
- `debounce(fn, wait = 100)` — debounces a function
- `throttle(fn, interval = 100)` — throttles a function
- `once(fn)` — runs a function once
- `memoize(fn, resolver)` — memoizes sync functions
- `retryAsync(fn, attempts = 3, delay = 100)` — retries async functions
- `formatBytes(bytes, decimals = 2)` — human-readable byte sizes
- `pick(obj, keys)` — picks specified keys from object
- `omit(obj, keys)` — omits specified keys from object
- `timeIt(fn)` — measures sync function execution time
- `isObject(v)` — simple object type check
