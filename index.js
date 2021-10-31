import * as webpackModules from '@goosemod/webpack';
import * as patcher from '@goosemod/patcher';
import { createItem, removeItem } from '@goosemod/settings';

const settings = { emojisize: '64' };

const usabilityCheck = webpackModules.findByProps('canUseEmojisEverywhere');

const Unpatch = {};

export default {
    goosemodHandlers: {
        onImport: async () => {
            Unpatch.usabilityCheck = patcher.patch(usabilityCheck, "canUseEmojisEverywhere", () => {
                return true;
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