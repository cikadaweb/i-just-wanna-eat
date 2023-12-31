export interface ICafe {
  id: number,
  name: string,
  address: string,
  landmark: string,
  cuisine: string,
  distance: number,
  time: number,
  photo: string,
  business_lunch: boolean,
  price: number,
}
export interface IState {
  cafes: ICafe[],
  currentCafe: ICafe,
}