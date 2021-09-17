const { React } = require('powercord/webpack');
const { TextInput } = require("powercord/components/settings");


module.exports = class SpoofSettings extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { getSetting, updateSetting } = this.props;
        return (
            <TextInput
                required={true}
                note={"Most commonly used working values are 32, 40 and 64 but many others work up to 128."}
                defaultValue={getSetting('size')}
                onChange={(value) => updateSetting('size', value.length === 0 ? null : value)}
            >
                Emoji size in pixels
            </TextInput>
        );
    }
};