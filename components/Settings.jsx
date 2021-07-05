const { React } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SliderInput, SwitchItem } = require('powercord/components/settings');

module.exports = class daysuntilSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            enabled: this.props.getSetting('enabled', false),
        }
    }

    render() {
        return (
            <div>
                <SwitchItem
                    note="Enable 'Days Until' in your custom status"
                    value={this.state.enabled}
                    onChange={() => {
                        this.setState({enabled: !this.state.enabled})
                        this.props.toggleSetting('enabled')
                    }}
                >
                Enable    
                </SwitchItem>

            </div>
        );
    }
}