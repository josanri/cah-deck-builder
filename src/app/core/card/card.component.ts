import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '@shared/card';
import { CardColor } from '@shared/cardcolor';
import { CardSize } from '@shared/cardsize';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  card!: Card;

  @Input()
  cardColor!: CardColor;

  @Output()
  removeCard: EventEmitter<string> = new EventEmitter();
  
  readonly CARDSIZE = CardSize;
  readonly CARDCOLOR = CardColor;

  onRemoveCardClick() {
    this.removeCard.emit(this.card.id);
  }
}
