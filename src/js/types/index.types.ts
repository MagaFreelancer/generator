export type Card = {
	id: number;
	imgUrl: string;
	title: string;
	type: string;
	active: boolean;
	index?: number;
};
export type State = {
	type: Type;
	count: number;
	activeCards: Card[];
};
export interface IModel {
	cards: Card[];
	state: State;
}
export enum Type {
	DEFAULT = '',
	CAR = 'car',
	CAT = 'cat'
}
