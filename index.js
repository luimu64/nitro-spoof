const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class EmojiSpoof extends Plugin {
    async startPlugin() {
        const emojiStore = await getModule(['getCustomEmojiById'])

        //override permissions to make discord show the unavailable 
        //emojis as available in autocomplete and in emoji picker
        const cCheck = await getModule(['canUseEmojisEverywhere']);
        const aCheck = await getModule(['canUseAnimatedEmojis']);

        cCheck.canUseEmojisEverywhere = () => {
            return true;
        }

        aCheck.canUseAnimatedEmojis = () => {
            return true;
        }

        function getEmojiLinks(args) {

            let emote;
            let size = 64;
            let emotelinks = [];

            let emojiStrings = args[1].content.matchAll(/<a?:([A-Z]+):([0-9]+)>/ig);

            for (const emoji of emojiStrings) {
                args[1].content = args[1].content.replace(emoji[0], "");
                emote = emojiStore.getCustomEmojiById(emoji[2]);
                emotelinks.push(emote["url"] + `&size=${size}`);
            }

            console.log(args[1].content);
            args[1].content = args[1].content + emotelinks.join("\n");
            args[1].invalidEmojis = [];

            return args;
        }

        const messageEvents = await getModule(["sendMessage"]);
        inject("spoofSend", messageEvents, "sendMessage", (args) => {
            if (args[1].content.match(/<a?:([A-Z]+):([0-9]+)>/i) != null) {
                getEmojiLinks(args);
            }
        });
    }

    pluginWillUnload() {
        uninject("spoofSend");
    }
};
