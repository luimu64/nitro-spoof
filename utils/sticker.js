
const c3 = await getModule(['isSendableSticker']);
const c4 = await getModule(['canUseStickersEverywhere']);
const { StickerSendability } = await getModule(['StickerSendability']);
const { getStickerById } = await getModule(['getStickerById']);

c3.isSendableSticker = () => {
    return true;
}

c4.canUseStickersEverywhere = () => {
    return true;
}

StickerSendability.SENDABLE = (
    StickerSendability.SENDABLE_WITH_PREMIUM +
    StickerSendability.SENDABLE_WITH_PREMIUM_GUILD +
    StickerSendability.NONSENDABLE
)

StickerSendability.NONSENDABLE = 0
StickerSendability.SENDABLE_WITH_PREMIUM = 0
StickerSendability.SENDABLE_WITH_PREMIUM_GUILD = 0