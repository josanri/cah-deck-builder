import { inject, Injectable, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BLACK_CARD_DEFAULT_TEXT, Card, cardsFromArray, WHITE_CARD_DEFAULT_TEXT } from '@shared/card';
import { TranslateModule } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public whiteCards = signal<Card[]>([]);
  public blackCards = signal<Card[]>([]);
  private translateService = inject(TranslateService);

  constructor() {
    const localWhiteCards = localStorage.getItem("whitecards");
    if (localWhiteCards) {
      this.whiteCards.set(cardsFromArray(JSON.parse(localWhiteCards)));
    } else {
      this.initializeWhiteCards();
    }

    const localBlackCards = localStorage.getItem("blackcards");
    if (localBlackCards) {
      this.blackCards.set(cardsFromArray(JSON.parse(localBlackCards)));
    } else {
      this.initializeBlackCards();
    }
  }

  private initializeWhiteCards() {
    this.whiteCards.set([
      { id: crypto.randomUUID(), text: WHITE_CARD_DEFAULT_TEXT },
    ]);
  }

  private initializeBlackCards() {
    this.blackCards.set([
      {id: crypto.randomUUID(), text: BLACK_CARD_DEFAULT_TEXT },
    ]);
  }

  addExampleWhiteCard() {
    this.whiteCards.update((items) => [...items, {
      id: crypto.randomUUID(),
      text: this.translateService.instant(WHITE_CARD_DEFAULT_TEXT)
    }]);
    this.saveToWhiteCardsToLocalhost();
  }

  addExampleBlackCard() {
    this.blackCards.update((items) => [...items, {
      id: crypto.randomUUID(),
      text: this.translateService.instant(BLACK_CARD_DEFAULT_TEXT)
    }]);
    this.saveToBlackCardsToLocalhost();
  }

  removeWhiteCard(id: string) {
    this.whiteCards.update((items) => items.filter((card) => {
      return card.id !== id
    }));
    this.saveToWhiteCardsToLocalhost();
  }
  
  removeBlackCard(id: string) {
    this.blackCards.update((items) => items.filter((card) => {
      return card.id !== id
    }));
    this.saveToBlackCardsToLocalhost();
  }

  exportJSON() {
    const link = document.createElement('a');
    const file = new Blob([JSON.stringify({
        "whitecards": this.whiteCards(),
        "blackcards": this.blackCards(),
    }, null, 2)], {type: "application/json"});
    
    link.href = URL.createObjectURL(file);
    link.download = 'cards_data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  importFile(fileText: string) {
    const fileDict = JSON.parse(fileText);
    this.whiteCards.set(cardsFromArray(fileDict["whitecards"]));
    this.blackCards.set(cardsFromArray(fileDict["blackcards"]));
  }

  saveToLocalhost(){
    this.saveToWhiteCardsToLocalhost();
    this.saveToBlackCardsToLocalhost();
  }

  saveToWhiteCardsToLocalhost(){
    localStorage.setItem("whitecards", JSON.stringify(this.whiteCards()));
  }
  saveToBlackCardsToLocalhost(){
    localStorage.setItem("blackcards", JSON.stringify(this.blackCards()));
  }

  clearCards() {
    localStorage.removeItem("whitecards");
    localStorage.removeItem("blackcards");

    this.whiteCards.set([]);
    this.addExampleWhiteCard();
    
    this.blackCards.set([]);
    this.addExampleBlackCard();

    this.saveToLocalhost();
  }
}
