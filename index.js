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
        this.clydeError = await getModule(['sendClydeError']);

        await this.import('getGuild');
        await this.import('getGuilds');
        await this.import('createBotMessage');
        await this.import('receiveMessage');
        await this.import(['getLastSelectedChannelId'], 'getChannelId');
    }

    getEmojiRegex() {
        return /^<a?:([a-zA-Z0-9_]+):([0-9]+)>$/;
    }

    sendBotMessage(content) {
        const receivedMessage = this.createBotMessage(this.getChannelId(), '');

        if (typeof content === 'string') {
            receivedMessage.content = content;
        } else {
            receivedMessage.embeds.push(content);
        }

        return this.receiveMessage(receivedMessage.channel_id, receivedMessage);
    }

    reply(content, embed) {
        this.sendBotMessage(
            this.settings.get('useEmbeds')
                ? Object.assign({
                    type: 'rich',
                    description: content
                }, embed)
                : content
        );
    }

    replySuccess(content, embed) {
        this.reply(content, Object.assign({ color: colors.success }, embed));
    }

    replyError(content, embed) {
        this.reply(content, Object.assign({ color: colors.error }, embed));
    }

    findEmojisForCommand(args) {
        args = [...new Set(args)];

        if (args.length === 0) {
            return this.replyError('Please provide an emote');
        }

        const emojis = Object.values(this.emojiStore.getGuilds()).flatMap(g => g.emojis);

        const foundEmojis = [];

        for (const argument of args) {
            const matcher = argument.match(this.getEmojiRegex());
            if (matcher) {
                const emoji = emojis.find(e => e.id === matcher[2]);

                if (emoji) {
                    emoji.guild = this.getGuild(emoji.guildId);

                    foundEmojis.push(emoji);

                    continue;
                }

                if (args.length === 1) {
                    return this.replyError(`Could not find emote ${argument}`);
                }
            }

            if (args.length === 1) {
                return this.replyError(`**${argument}** is not a custom emote`);
            }

        }

        return {
            foundEmojis
        };
    }

    async startPlugin() {
        await this.doImport();

        powercord.api.commands.registerCommand({
            command: 'e',
            description: 'Sends emote as link',
            usage: '{c} :emote:',
            executor: (args) => {
                const object = this.findEmojisForCommand(args);
                console.log(object);
                return {
                    send: true,
                    result: object["foundEmojis"][0]["url"]
                };
            }
        });
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('e');
    }
};
