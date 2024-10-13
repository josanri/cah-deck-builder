import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardColor } from '@shared/card-color';
import { CardSize } from '@shared/card-size';

@Component({
  selector: 'app-add-new-card',
  standalone: true,
  imports: [],
  templateUrl: './add-new-card.component.html',
  styleUrl: './add-new-card.component.scss'
})
export class AddNewCardComponent {
  @Input()
  cardColor: CardColor = CardColor.WHITE;

  @Input()
  cardSize: CardSize = CardSize.L;

  @Output()
  addNewCard: EventEmitter<any> = new EventEmitter();

  readonly CARDCOLOR = CardColor;
  readonly CARDSIZE = CardSize;

  handleClick() {
    this.addNewCard.emit()
  }
}
