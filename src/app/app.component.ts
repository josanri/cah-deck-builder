import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./core/card/card.component";
import { AddNewCardComponent } from './core/add-new-card/add-new-card.component';
import { CardSize } from '@shared/card-size';
import { CardColor } from '@shared/card-color';
import { FileUploadComponent } from './core/file-upload/file-upload.component';
import { CardService } from './card.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, AddNewCardComponent, FileUploadComponent, NgClass,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cards Against humanity Builder';
  cardSize = CardSize.L;
  destroyRef = inject(DestroyRef);
  cardService = inject(CardService);

  blackCards = this.cardService.blackCards;
  whiteCards = this.cardService.whiteCards;

  readonly CARDSIZE = CardSize;
  readonly CARDCOLOR = CardColor;

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
