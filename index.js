const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class EmojiSpoof extends Plugin {
    async startPlugin() {
        const getCustom = await getModule(['getCustomEmojiById']);
        const lastGuild = await getModule(['getLastSelectedGuildId']);

        //override functions to make discord show the unavailable 
        //emojis as available in autocomplete and in emoji picker
        const cCheck = await getModule(['canUseEmojisEverywhere'])
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

            //find all emojis from the captured message string and return iterable containing them
            let emojiStrings = args[1].content.matchAll(/<a?:([A-Z]+):([0-9]+)>/ig);

            for (const emoji of emojiStrings) {
                //fetch required info about the emoji
                emote = getCustom.getCustomEmojiById(emoji[2]);

                //check if emoji is normally usable or animated
                if (emote["guildId"] != lastGuild.getLastSelectedGuildId() || emote["animated"] == true) {
                    //remove emoji text from the captured message string
                    args[1].content = args[1].content.replace(emoji[0], "");
                    //push link to array
                    emotelinks.push(emote["url"] + `&size=${size}`);
                }
            }

            //add links to the end of the original message
            args[1].content = args[1].content + emotelinks.join("\n");
            //set invalidEmojis to empty to prevent discord yelling to you about you not having nitro
            args[1].invalidEmojis = [];

            //send modified message
            return args;
        }

        const messageEvents = await getModule(["sendMessage"]);
        inject("spoofSend", messageEvents, "sendMessage", (args) => {
            //only run if message contains emojis
            if (args[1].content.match(/<a?:([A-Z]+):([0-9]+)>/i) != null) {
                getEmojiLinks(args);
            }
        });
    }

    pluginWillUnload() {
        uninject("spoofSend");
    }
};
