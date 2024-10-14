export interface Card {
    id: string;
    text: string;
}


export const cardsFromArray = (cardArray: { id?: string, text: string }[]): Card[] => {
    try {
        const cards =  cardArray.map(
            (card) => (
                {
                    id: card.id ?? crypto.randomUUID(),
                    text: card.text
                }
            )
        );
        return cards;
    } catch {
        return [];
    }

}

export const WHITE_CARD_DEFAULT_TEXT = "This is an example for white card."
export const BLACK_CARD_DEFAULT_TEXT = "This is an example for black card ____."