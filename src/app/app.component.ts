import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Market, ResultInterface} from './interfaces/result.interface';
import * as moment from 'moment';

export enum BETS {
  DOM = 'L\'équipe à domicile marque sur penalty',
  EXT = 'L\'équipe à l\'extérieur marque sur penalty',
  ONE = 'Une des deux équipes marque sur penalty',
  BOTH = 'Les deux équipes marquent sur penalty',
  NONE = 'Pas de penalty marqué'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'uni-app';
  data: ResultInterface;
  bets = BETS;
  mapOfCountryAndGame: Map<string, Market[]> = new Map<string, Market[]>();


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getUniData().subscribe(result => {
      this.data = result;

      this.sortData();
    });
  }

  sortData(): void {
    this.data.marketsByType.forEach(marketType => {
      marketType.days.forEach(day => {
        day.events.forEach(event => {
          event.markets.forEach(market => {
            const futureMarket = this.mapOfCountryAndGame.get(market.competitionName) || [];
            futureMarket.push(market);
            this.mapOfCountryAndGame.set(market.competitionName, futureMarket);
          });
        });
      });
    });
  }

  getKeys(): string[] {
    return Array.from(this.mapOfCountryAndGame.keys()).sort();
  }

  getTime(market: Market): string {
    return moment(market.eventStartDate).format('MMMM Do YYYY, hh:mm:ss a');
  }

  getSelection(market: Market, bet: BETS): number {
    let result;
    market.selections.forEach(selection => {
      // tslint:disable-next-line:triple-equals
      if (selection.name == bet) {
        result = (1 + (+selection.currentPriceUp) / (+selection.currentPriceDown)).toFixed(2);
      }
    });
    return result;
  }

    getDOMColor(market): string {
    const dom = this.getSelection(market, BETS.DOM);
    const both = this.getSelection(market, BETS.BOTH);
    if (dom > 10 || (dom > both - 0.001)) {
      return 'blue';
    }

    if (dom < 4) {
      return 'red';
    }

    return '';

  }

  getEXTColor(market): string {
    const ext = this.getSelection(market, BETS.EXT);
    const both = this.getSelection(market, BETS.BOTH);
    if (ext > 10 || (ext > both - 0.001)) {
      return 'blue';
    }

    if (ext < 4) {
      return 'red';
    }
    return '';
  }

  getONEColor(market): string {
    const dom = this.getSelection(market, BETS.DOM);
    const ext = this.getSelection(market, BETS.EXT);
    const one = this.getSelection(market, BETS.ONE);
    const both = this.getSelection(market, BETS.BOTH);
    const none = this.getSelection(market, BETS.NONE);

    if ((one > dom - 0.001) || (one > ext - 0.001)  || (one > both - 0.001) ) {
      return 'blue';
    }

    if (one < 2.7) {
      return 'red';
    }

    return '';

  }

  getNONEColor(market): string {
    const dom = this.getSelection(market, BETS.DOM);
    const ext = this.getSelection(market, BETS.EXT);
    const one = this.getSelection(market, BETS.ONE);
    const both = this.getSelection(market, BETS.BOTH);
    const none = this.getSelection(market, BETS.NONE);

    if (none >= 2 || (none > dom - 0.001)  || (none > ext - 0.001) || (none > both - 0.001)) {
      return 'blue';
    }
    return '';
  }
}
