export interface Event {
  competitionName: string;
  eventName: string;
  eventStartDate: number;
  markets: Market[];
}


export interface Days {
  day: number;
  events: Event[];
}

export interface Market {
  betEndDate: number;
  competitionName: string;
  eventAwayTeamName: string;
  eventHomeTeamName: string;
  eventName: string;
  eventStartDate: number;
  selections: Selection[];
}

export interface MarketType {
  days: Days[];
  marketName: string;
}


export interface ResultInterface {
  googlePage: string;
  isMultiSport: boolean;
  marketsByType: MarketType[];
  singleSportId: number;
  singleSportName: string;
}

export interface Selection {
  currentPriceDown: string;
  currentPriceUp: string;
  name: string;
}
