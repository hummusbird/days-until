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

	async start()
	{
		if (this.settings.get('time'))
		{
			var date = new Date()
			let hour = date.getHours().toString()

			var am = "AM"
			if (this.settings.get("boring")) { am = "" }
			if (hour == 12 && !this.settings.get('boring')) { hour = 12; am = "PM" }
			else if (hour == 0 && !this.settings.get('boring')) { hour = 12; am = "AM" }
			else if (hour > 12 && !this.settings.get('boring')) { hour -= 12; am = "PM" }

			var min = + date.getMinutes().toString()

			if (min.toString().length == 1) { min = "0" + min }


			var newtime = hour + ":" + min + " " + am
			if (newtime != oldstatus)
			{
				oldstatus = newtime
				this.status(oldstatus)
			}
		}
		else if (!this.settings.get('time')) 
		{
			try
			{
				var date = new Date()
				var dateParts = this.settings.get('date').split("/");
				var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
				var eventdate = new Date(dateObject);
	
				var days = Math.ceil( (eventdate.getTime() - date.getTime()) / 1000000 * 0.0115740741 )
				
				var until = this.settings.get('event').replace('{days}', days)

				if (oldstatus != until)
				{
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

	status(text)
	{
		require('powercord/webpack').getModule(['updateRemoteSettings'], false).updateRemoteSettings({
            customStatus: {
                text: text
            }
        });
		console.log("set status to '" + text + "'")
	}

    pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
	}
}
