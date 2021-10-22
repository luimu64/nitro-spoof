const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const settings = require('./components/Settings');

module.exports = class EmojiSpoof extends Plugin {
    async startPlugin() {

        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Nitro Spoof',
            render: settings,
        });

        const { getCustomEmojiById } = await getModule(['getCustomEmojiById']);
        const { getStickerAssetUrl } = await getModule(['getStickerAssetUrl']);
        const { getStickerById } = await getModule(['getStickerById']);
        const { getLastSelectedGuildId } = await getModule(['getLastSelectedGuildId']);
        const messageEvents = await getModule(["sendMessage"]);
        const stickerEvents = await getModule(["sendStickers"]);

        console.log(stickerEvents)
        //override functions to make discord show the unavailable
        //emojis as available in autocomplete and in emoji picker
        const c1 = await getModule(['canUseEmojisEverywhere']);
        const c2 = await getModule(['canUseAnimatedEmojis']);
        const c3 = await getModule(['isSendableSticker']);

        c1.canUseEmojisEverywhere = () => {
            return true;
        }

        c2.canUseAnimatedEmojis = () => {
            return true;
        }

        c3.isSendableSticker = () => {
            return true;
        }


        function extractEmojis(messageString) {
            let emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/ig);
            let emojiIds = [];
            for (let emoji of emojiStrings) {
                messageString = messageString.replace(emoji[0], '');
                emojiIds.push(emoji[2]);
            }
            return { content: messageString.trim(), emojis: emojiIds };
        }

        function getEmojiLinks(size, args) {
            //find all emojis from the captured message string and return iterable containing them
            let message = extractEmojis(args[1].content);
            message.emojis.forEach((emojiId, i) => {
                //fetch required info about the emoji
                let emoji = getCustomEmojiById(emojiId);
                //check if emoji is normally usable or animated
                if (emoji["guildId"] != getLastSelectedGuildId() || emoji["animated"] == true) {
                    //push link to array
                    message.emojis[i] = emoji["url"] + `&size=${size}`;
                } else {
                    //set the original emoji string back into the array,
                    //yeah I know very efficient design :)
                    message.emojis[i] = '<' + emoji['allNamesString'] + emoji['id'] + '>';
                }
            });

            //add links to the end of the original message
            args[1].content = message.content + "\n" + message.emojis.join("\n");
            //set invalidEmojis to empty to prevent discord yelling to you about you not having nitro
            args[1].invalidEmojis = [];

            //send modified message
            return args;
        }


        inject("spoofEmojiSend", messageEvents, "sendMessage", (args) => {
            let size = this.settings.get("size");

            console.log(args[1])

            //only run if message contains emojis
            if (args[1].content.match(/<a?:(\w+):(\d+)>/i) != null) {
                getEmojiLinks(size, args);
            }
        });

        inject("spoofStickerSend", messageEvents, "sendStickers", (args) => {
            const { format_type, id } = getStickerById(args[1][0])
            console.log(getStickerById(args[1][0]))
            console.log(getStickerAssetUrl(format_type, id))
        });
    }

    pluginWillUnload() {
        uninject("spoofEmojiSend");
        uninject("spoofStickerSend");
        powercord.api.settings.unregisterSettings(this.entityID);
    }
};
