export interface giftProps {
    id: number,
    giftTitle: string,
    giftType: string,
    reaction: string,
    dateGiven: string,
    occasion: string,
    recipientId: number
}

export interface newGiftProps {
    giftTitle: string,
    giftType: string,
    reaction: string,
    dateGiven: string,
    occasion: string,
    recipientId: number
}

export interface recipientOptions {
    id: number,
    name: string
}