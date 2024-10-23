import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./core/card/card.component";
import { AddNewCardComponent } from './core/add-new-card/add-new-card.component';
import { CardSize } from '@shared/card-size';
import { CardColor } from '@shared/card-color';
import { FileUploadComponent } from './core/file-upload/file-upload.component';
import { CardService } from './card.service';
import { NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, AddNewCardComponent, FileUploadComponent, NgClass, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Cards Against humanity Builder';
  cardSize = CardSize.L;
  destroyRef = inject(DestroyRef);
  cardService = inject(CardService);
  currentLang: string = "en";
  blackCards = this.cardService.blackCards;
  whiteCards = this.cardService.whiteCards;

  readonly CARDSIZE = CardSize;
  readonly CARDCOLOR = CardColor;
  readonly DEFAULT_LANGUAGE = 'en';

  constructor(private translate: TranslateService) {
    const userLang = navigator.language.split('-')[0];
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.setLanguage(userLang)
  }

  ngOnInit() {
    const localSize = localStorage.getItem("size")
    if (localSize) {
      this.setCardSize(localSize as CardSize);
    };
  }

  get ngClassCards() {
    return {
      'cards--sm': this.cardSize === CardSize.SM,
      'cards--l': this.cardSize === CardSize.L
    };
  }

  onPrintClick() {
    window.print();
  }

  setCardSize(cardSize: CardSize) {
    this.cardSize = cardSize;
    localStorage.setItem("size", cardSize)
  }

  addWhiteCard() {
    this.cardService.addExampleWhiteCard()
  }

  addBlackCard() {
    this.cardService.addExampleBlackCard()
  }

  removeCardFromWhiteCards(id: string) {
    this.cardService.removeWhiteCard(id);
  }

  removeCardFromBlackCards(id: string) {
    this.cardService.removeBlackCard(id);
  }

  setLanguage(newLanguage: string) {
    this.currentLang = newLanguage;
    this.translate.use(this.currentLang);
  }

  handleExportClick() {
    this.cardService.exportJSON()
  }

  handleSaveLocallyClick() {
    this.cardService.saveToLocalhost()
  }

  handleClearLocallyClick() {
    this.cardService.clearCards()
  }
}
