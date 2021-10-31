import { findByProps } from '@goosemod/webpack';
import * as patcher from '@goosemod/patcher';
import { createItem, removeItem } from '@goosemod/settings';
import getEmojiLinks from './utils';

let settings = { emojisize: '64' };

const usabilityCheck = findByProps('canUseEmojisEverywhere', 'canUseAnimatedEmojis');
const messageEvents = findByProps('sendMessage');

const Unpatch = { animatedCheck: null, emojiCheck: null, sendMessage: null };

export default {
    goosemodHandlers: {
        onImport: async () => {
            Unpatch.emojiCheck = patcher.patch(usabilityCheck, "canUseEmojisEverywhere", () => {
                return true;
            });

            Unpatch.animatedCheck = patcher.patch(usabilityCheck, "canUseAnimatedEmojis", () => {
                return true;
            });

            Unpatch.sendMessage = patcher.patch(messageEvents, "sendMessage", (args) => {
                if (args[1].content.match(/<a?:(\w+):(\d+)>/i) != null) {
                    getEmojiLinks(settings.emojisize, args);
                }
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