const { React } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SliderInput, TextInput, SwitchItem, } = require('powercord/components/settings');
const startDate = new Date();

module.exports = class daysuntilSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            enabled: this.props.getSetting('enabled', false),
            date: this.props.getSetting('date', "25/12/22"),
            event: this.props.getSetting('event', "Christmas!"),
            time: this.props.getSetting('time', false),
            boring: this.props.getSetting('boring'. false)
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

                <SwitchItem
                    note="Use timestamp as your status"
                    value={this.state.time}
                    onChange={() => {
                        this.setState({time: !this.state.time})
                        this.props.toggleSetting('time')
                    }}
                >
                Timestamp   
                </SwitchItem>

                <SwitchItem
                    note="Use 24 hour time, if timestamp is set as status"
                    value={this.state.boring}
                    onChange={() => {
                        this.setState({boring: !this.state.boring})
                        this.props.toggleSetting('boring')
                    }}
                >
                24 hour   
                </SwitchItem>

                <TextInput
                    note="Enter the date here, in the format DD/MM/YYYY"
                    defaultValue={this.state.date}
                    onChange={(value) => {
                        this.setState({ date: value })
                        this.props.updateSetting('date', value)
                    }}
                >
                Date
                </TextInput>

                <TextInput
                    note="Enter the name of the event!"
                    defaultValue={this.state.event}
                    onChange={(value) => {
                        this.setState({ event: value })
                        this.props.updateSetting('event', value)
                    }}
                >
                Event name
                </TextInput>
            </div>
        );
    }
}