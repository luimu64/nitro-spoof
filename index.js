import { findByProps } from '@goosemod/webpack';
import * as patcher from '@goosemod/patcher';
import { createItem, removeItem } from '@goosemod/settings';
import { getEmojiLinks, getSticker } from './utils';

let settings = { emojisize: '64' };

const emojiCheck = findByProps('canUseEmojisEverywhere', 'canUseAnimatedEmojis');
const stickerCheck = findByProps('isSendableSticker', 'canUseStickersEverywhere');
const messageEvents = findByProps('sendMessage');
const stickerEvents = findByProps('sendStickers');

const Unpatch = {
    emojiCheck1: null,
    emojiCheck2: null,
    stickerCheck1: null,
    stickerCheck2: null,
    sendMessage: null,
    sendSticker: null
};

export default {
    goosemodHandlers: {
        onImport: async () => {


            Unpatch.emojiCheck1 = patcher.patch(emojiCheck, "canUseEmojisEverywhere", () => {
                return true;
            });

            Unpatch.emojiCheck2 = patcher.patch(emojiCheck, "canUseAnimatedEmojis", () => {
                return true;
            });

            Unpatch.stickerCheck1 = patcher.patch(stickerCheck, "isSendableSticker", () => {
                return true;
            });

            Unpatch.stickerCheck2 = patcher.patch(stickerCheck, "canUseStickersEverywhere", () => {
                return true;
            });

            Unpatch.sendMessage = patcher.patch(messageEvents, "sendMessage", (args) => {
                if (args[1].content.match(/<a?:(\w+):(\d+)>/i) != null) {
                    getEmojiLinks(settings.emojisize, args);
                }
            });

            Unpatch.sendSticker = patcher.patch(stickerEvents, "sendStickers", (args) => {
                console.log(getSticker(args))
            });

            createItem('Nitro Spoof', ['',
                {
                    type: 'text-input',
                    text: 'Emoji Size',
                    initialValue: () => settings.emojisize,
                    oninput: (value) => {
                        settings.emojisize = value;
                    },
                },
            ]);
        },

        getSettings: () => [settings],
        loadSettings: ([_settings]) => { settings = _settings },

        onRemove: async () => {
            Object.values(Unpatch).forEach(unpatch => unpatch());
            removeItem('Nitro Spoof');
        }
    },
};