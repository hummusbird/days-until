const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

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
	}

    pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
	}

}
