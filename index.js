const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class EmojiSpoof extends Plugin {
    async startPlugin() {
        const emojiStore = await getModule(['getGuildEmoji']);
        const premiumCheck = await getModule(['canUseEmojisEverywhere']);

        let emojis = getAllEmojis();

        premiumCheck.canUseEmojisEverywhere = () => {
            return true;
        }

        if (premiumCheck.canUseEmojisEverywhere()) {
            console.log("Thanks for credit card info retard :)");
        }

        function getAllEmojis() {
            return Object.values(emojiStore.getGuilds()).flatMap(g => g.emojis);
        }

        function findFromEmojis(emojis, id) {
            return emojis.find(e => e.id === id);
        }

        function getEmojiLinks(emojis, args) {
            let emojiStrings = args[1].content.split(">").slice(0, -1);
            let id;
            let emote;
            let size = 64;
            let emotelinks = [];

            emojiStrings.forEach(arg => {
                id = arg.match(/:([0-9]+)/)[0].replace(":", "");
                emote = findFromEmojis(emojis, id);
                emotelinks.push(emote["url"] + `&size=${size}`);
            })

            args[1].content = emotelinks.join("\n");
            args[1].invalidEmojis = [];

            return args;
        }

        const messageEvents = await getModule(["sendMessage"]);
        inject("spoofSend", messageEvents, "sendMessage", (args) => {
            if (args[1].content.match(/<:([A-Z]+):([0-9]+)>/i) != null) {
                getEmojiLinks(emojis, args);
            }
        });
    }

    pluginWillUnload() {
        uninject("spoofSend");
    }
};
