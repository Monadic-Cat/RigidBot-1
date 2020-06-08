
const fs = require("fs");

module.exports = class Config {
	
	constructor(path, time = 1000) {
		this.path = path;
		this.load();
		setInterval(() => this.save(), time);
	}
	
	create(...items) {
		var cur = this.data;
		const len = items.length;
		for (var i = 0; i < len - 2; i++) {
			if (!(items[i] in cur)) {
				cur[items[i]] = {};
			}
			cur = cur[items[i]];
		}
		const key = items[len - 2];
		const val = items[len - 1];
		if (!(key in cur)) {
			cur[key] = val;
			return true;
		}
		return false;
	}
	delete(...items) {
		var cur = this.data;
		const len = items.length;
		for (var i = 0; i < len - 1; i++) {
			if (!(items[i] in cur)) {
				cur[items[i]] = {};
			}
			cur = cur[items[i]];
		}
		const key = items[len - 1];
		if (key in cur) {
			delete cur[key];
			return true;
		}
		return false;
	}
	set(...items) {
		var cur = this.data;
		const len = items.length;
		for (var i = 0; i < len - 2; i++) {
			if (!(items[i] in cur)) {
				cur[items[i]] = {};
			}
			cur = cur[items[i]];
		}
		const key = items[len - 2];
		const val = items[len - 1];
		cur[key] = val;
		return val;
	}
	get(...items) {
		var cur = this.data;
		const len = items.length;
		for (var i = 0; i < len - 1; i++) {
			if (!(items[i] in cur)) {
				cur[items[i]] = {};
			}
			cur = cur[items[i]];
		}
		const key = items[len - 1];
		return cur[key];
	}
	
	save() {
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}
	load() {
		var text = fs.readFileSync(this.path);
		if (text == "") text = "{}";
		this.data = JSON.parse(text);
	}
	
}