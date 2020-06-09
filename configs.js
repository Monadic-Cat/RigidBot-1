const Config = require("./config.js");
module.exports = rigidbot => {
	const cfg = rigidbot.configs = {};
	const list = [
		"config",
		"guilds",
		"users",
		"logs"
	];
	list.forEach(name => {
		cfg[name] = new Config("./configs/" + name + ".json");
	});
}