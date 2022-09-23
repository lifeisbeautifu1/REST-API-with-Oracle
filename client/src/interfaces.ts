export interface IRestaurant {
  id: number;
  name: string;
  location: string;
  price_range: number;
  reviews_count?: number;
  average_rating?: number;
}

export interface IReview {
  id: number;
  name: string;
  review: string;
  rating: number;
}

export interface IStudent {
  NUM: number,
  FNAME: string,
  YEAR: number,
  BDAY: string,
  PLATE: string,
  MB: number,
  MONEY: number,
  ADDRESS: string,
}
