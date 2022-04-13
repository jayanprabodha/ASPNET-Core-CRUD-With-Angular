import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  };

  constructor(private cardService: CardsService) {

  }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardService.getAllCards()
      .subscribe(
        response => {
          this.cards = response;
          //console.log(response);
        }
      );
  }

  onSubmit() {
    //console.log(this.card);
    if (this.card.id === '') {
      this.cardService.addCard(this.card)
        .subscribe(
          response => {
            //console.log(response);
            this.getAllCards();
            this.card = {
              id: '',
              cardholderName: '',
              cardNumber: '',
              expiryMonth: '',
              expiryYear: '',
              cvc: ''
            };
          }
        );
    } else {
      console.log(this.card);
      this.updateCard(this.card);
    }
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id)
      .subscribe(
        response => {
          //console.log(response);
          this.getAllCards();
        }
      );
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardService.updateCard(card)
      .subscribe(
        response => {
          console.log(response);
          this.getAllCards();
        }
      );
  }
}
