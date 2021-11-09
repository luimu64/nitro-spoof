const { getCustomEmojiById } = await getModule(['getCustomEmojiById']);
const { getStickerAssetUrl } = await getModule(['getStickerAssetUrl']);
const { getLastSelectedGuildId } = await getModule(['getLastSelectedGuildId']);


//override functions to make discord show the unavailable
//emojis as available in autocomplete and in emoji picker
const c1 = await getModule(['canUseEmojisEverywhere']);
const c2 = await getModule(['canUseAnimatedEmojis']);


c1.canUseEmojisEverywhere = () => {
    return true;
}

c2.canUseAnimatedEmojis = () => {
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

//returns true if the home button is selected
function isInDms() {
    return document
        .querySelector('[data-list-item-id="guildsnav___home"]')
        .classList
        .contains("selected-bZ3Lue")
}

function getEmojiLinks(size, args) {
    //find all emojis from the captured message string and return iterable containing them
    let message = extractEmojis(args[1].content);
    message.emojis.forEach((emojiId, i) => {
        //fetch required info about the emoji
        let emoji = getCustomEmojiById(emojiId);
        //check if emoji is normally usable or animated
        if (emoji["guildId"] != getLastSelectedGuildId() || emoji["animated"] || isInDms()) {
            //push link to array
            message.emojis[i] = emoji["url"].split("?")[0] + `?size=${size}`;
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

export default getEmojiLinks;