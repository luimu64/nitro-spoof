const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class EmojiSpoof extends Plugin {
    async startPlugin() {
        const emojiStore = await getModule(['getCustomEmojiById'])
        const cCheck = await getModule(['canUseEmojisEverywhere']);
        const aCheck = await getModule(['canUseAnimatedEmojis']);

        cCheck.canUseEmojisEverywhere = () => {
            return true;
        }

        aCheck.canUseAnimatedEmojis = () => {
            return true;
        }

        function findFromEmojis(id) {
            return emojiStore.getCustomEmojiById(id);
        }

        function getEmojiLinks(args) {

            let emojiStrings = args[1].content.split(">").slice(0, -1);
            let id;
            let emote;
            let size = 64;
            let emotelinks = [];

            emojiStrings.forEach(arg => {
                id = arg.match(/:([0-9]+)/)[0].replace(":", "");
                emote = findFromEmojis(id);
                emotelinks.push(emote["url"] + `&size=${size}`);
            })

            args[1].content = emotelinks.join("\n");
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
