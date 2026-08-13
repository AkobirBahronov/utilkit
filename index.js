
// Small collection of useful utilities

export function isObject(v) {
	return v && typeof v === 'object' && !Array.isArray(v);
}

export function deepClone(value) {
	if (value === null || typeof value !== 'object') return value;
	if (value instanceof Date) return new Date(value);
	if (value instanceof RegExp) return new RegExp(value);
	if (Array.isArray(value)) return value.map(deepClone);
	const out = {};
	for (const k in value) {
		if (Object.prototype.hasOwnProperty.call(value, k)) out[k] = deepClone(value[k]);
	}
	return out;
}

export function debounce(fn, wait = 100) {
	let t;
	return function (...args) {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, args), wait);
	};
}

export function throttle(fn, interval = 100) {
	let last = 0;
	let scheduled = null;
	return function (...args) {
		const now = Date.now();
		const remaining = interval - (now - last);
		if (remaining <= 0) {
			last = now;
			fn.apply(this, args);
		} else if (!scheduled) {
			scheduled = setTimeout(() => {
				scheduled = null;
				last = Date.now();
				fn.apply(this, args);
			}, remaining);
		}
	};
}

export function once(fn) {
	let done = false;
	let result;
	return function (...args) {
		if (done) return result;
		done = true;
		result = fn.apply(this, args);
		return result;
	};
}

export function memoize(fn, resolver) {
	const cache = new Map();
	return function (...args) {
		const key = resolver ? resolver(...args) : JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);
		const val = fn.apply(this, args);
		cache.set(key, val);
		return val;
	};
}

export async function retryAsync(fn, attempts = 3, delay = 100) {
	let lastErr;
	for (let i = 0; i < attempts; i++) {
		try {
			return await fn();
		} catch (e) {
			lastErr = e;
			if (i + 1 < attempts) await new Promise(r => setTimeout(r, delay));
		}
	}
	throw lastErr;
}

export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const dm = Math.max(0, decimals);
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function pick(obj, keys) {
	const out = {};
	for (const k of keys) if (k in obj) out[k] = obj[k];
	return out;
}

export function omit(obj, keys) {
	const out = {};
	const skip = new Set(keys);
	for (const k in obj) if (!skip.has(k) && Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
	return out;
}

export function timeIt(fn) {
	const start = process.hrtime.bigint();
	const res = fn();
	const end = process.hrtime.bigint();
	return { result: res, ms: Number(end - start) / 1e6 };
}