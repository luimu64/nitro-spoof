const { Plugin } = require('powercord/entities');

const { getModule } = require('powercord/webpack');

module.exports = class EmojiSpoof extends Plugin {
    async import(filter, functionName = filter) {
        if (typeof filter === 'string') {
            filter = [filter];
        }

        this[functionName] = (await getModule(filter))[functionName];
    }

    async doImport() {
        this.emojiStore = await getModule(['getGuildEmoji']);

        await this.import('getEmojiURL');
        await this.import('fetchEmoji');
        await this.import('getGuilds');
    }

    getEmojiById(id) {
        return Object.values(this.emojiStore.getGuilds()).flatMap(g => g.emojis).find(e => e.id === id);
    }

    async startPlugin() {
        await this.doImport();

        powercord.api.commands.registerCommand({
            command: 'e',
            description: 'Sends emote as link',
            usage: '{c} :emote:',
            executor: (args) => {

                let emote;
                let size = 64;
                let emotelinks = [];

                if (Number.isFinite(Number(args[0]))) {
                    size = args[0];
                    args.shift();
                }

                args.forEach(arg => {
                    emote = this.getEmojiById(arg.match(/([0-9]+)/)[0]);
                    emotelinks.push(emote["url"] + `&size=${size}`);
                })

                return {
                    send: true,
                    result: emotelinks.join("\n")
                };
            }
        });
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('e');
    }
};
