import { findByProps } from '@goosemod/webpack';

const { getCustomEmojiById } = findByProps('getCustomEmojiById');
const { getLastSelectedGuildId } = findByProps('getLastSelectedGuildId');

function handleEscapedEmojis(content) {
    return content.replaceAll(/\\(<a?:(\w+):(\d+)>)/ig, '$1');
}

function extractNonUsableEmojis(messageString, size, extension) {
    let emojiStrings = messageString.matchAll(/(?<!\\)<a?:(\w+):(\d+)>/ig);

    let emojiUrls = [];
    for (let emojiString of emojiStrings) {
        //fetch required info about the emoji
        let emoji = getCustomEmojiById(emojiString[2]);
        //check emoji usability
        if (emoji["guildId"] != getLastSelectedGuildId() || emoji["animated"] || isInDms()) {
            messageString = messageString.replace(emojiString[0], '');
            const initialUrl = emoji["url"].split("?")[0];
            emojiUrls.push((initialUrl.endsWith(".gif") ? initialUrl : initialUrl.replace(/\.(\w*)$/,"."+extension||"webp")) + `?size=${size}&quality=lossless`);
        }
    }
    return { content: messageString.trim(), emojis: emojiUrls };
}

//returns true if the home button is selected
function isInDms() {
    return Array.from(document
        .querySelector('[data-list-item-id="guildsnav___home"]')
        .classList)
        .some(v => v.indexOf("selected-") == 0)
}

function getEmojiLinks(size, args, extension) {
    //find all emojis from the captured message string and return object with emojiURLS and content
    let processedData = extractNonUsableEmojis(args[1].content, size, extension);
    processedData.content = handleEscapedEmojis(processedData.content);

    args[1].content = processedData.content;
    if (processedData.emojis.length > 0) {
        args[1].content += "\n" + processedData.emojis.join("\n");
    }

    //set invalidEmojis to empty to prevent discord yelling to you about you not having nitro
    args[1].invalidEmojis = [];

    //send modified message
    return args;
}

export default getEmojiLinks;
