const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

let oldstatus = ""

const Settings = require('./components/Settings');

module.exports = class daysuntil extends Plugin {

	async startPlugin() {
		this.loadStylesheet('style.scss');

		powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Days Until',
			render: (props) => React.createElement(Settings, {
				main: this,
				...props
			})
		});

		this.start();
	}

	async start() {
		if (this.settings.get('time')) {
			var date = new Date()
			let longhour = date.getHours().toString()
			let shorthour = date.getHours().toString()
			var am = "AM"

			if (shorthour == 12) { shorthour = 12; am = "PM" }
			else if (shorthour == 0) { shorthour = 12; am = "AM" }
			else if (shorthour > 12) { shorthour -= 12; am = "PM" }

			var longmin = date.getMinutes().toString()
			var shortmin = date.getMinutes().toString()
			if (longmin.toString().length == 1) { longmin = "0" + longmin }

			var newtime = this.settings.get("timestring").replace("{h}", shorthour).replace("{H}", longhour).replace("{m}", shortmin).replace("{M}", longmin).replace("{A}", am)
			if (newtime != oldstatus) {
				oldstatus = newtime
				this.status(oldstatus)
			}
		}
		else if (!this.settings.get('time')) {
			try {
				var date = new Date()
				var dateParts = this.settings.get('date').split("/");
				var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
				var eventdate = new Date(dateObject);

				var days = Math.ceil((eventdate.getTime() - date.getTime()) / 1000000 * 0.0115740741)

				var until = this.settings.get('event').replace('{days}', days)

				if (oldstatus != until) {
					oldstatus = until
					this.status(oldstatus)
				}
			}
			catch (e) {
				console.log(e)
			}
		}

		setTimeout(() => {
			this.start();
		}, 5000);
	}

	status(text) {
		require('powercord/webpack').getModule(["CustomStatusSetting"], false).CustomStatusSetting.updateSetting(
			{
				"text": text,
				"emojiId": "0",
				"emojiName": "",
				"expiresAtMs": "0"
			}
		);
	}

	pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
	}
}
