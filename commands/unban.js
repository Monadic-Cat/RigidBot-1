const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	rigidbot.commands.push(new Command({
		name: "unban",
		desc: "Unbans a member from the guild.",
		usage: [
			"unban [member]"
		],
		perms: ["BAN_MEMBERS"],
		info: [
			"The unban command allows a previously banned user to join back to your guild once thry are given a new invite."
		],
		run: async e => {
			if (e.args.length != 1) {
				return false;
			}
			const user = helpers.toUser(e.args[0]);
			if (user != null) {
				try {
					await e.guild.members.unban(user);
				} catch(err) {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "Could not unban that user.").create();
					return true;
				}
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "The user **" + user.tag + "** has been unbanned.").create();
			} else {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "That user could not be found.").create();
			}
			return true;
		}
	}));
};