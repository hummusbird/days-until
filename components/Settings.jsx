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
            timestring: this.props.getSetting('timestring', "{h}:{M} {A}"),
            event: this.props.getSetting('event', "{days} until Christmas!"),
            time: this.props.getSetting('time', false),
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
                    note="Timestamp string - use {H} or {h} for hours, {M} or {m} for minutes and {A} for AM/PM"
                    defaultValue={this.state.timestring}
                    onChange={(value) => {
                        this.setState({ timestring: value })
                        this.props.updateSetting('timestring', value)
                    }}
                >
                Timestamp Custom Status
                </TextInput>

                <TextInput
                    note="Event string - Use {days} for days remaining"
                    defaultValue={this.state.event}
                    onChange={(value) => {
                        this.setState({ event: value })
                        this.props.updateSetting('event', value)
                    }}
                >
                Event custom status
                </TextInput>
            </div>
        );
    }
}