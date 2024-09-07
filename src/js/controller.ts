import { stringToEnum } from '../utils';
import modelController from './model';
import { Card, State, Type } from './types/index.types';
import viewController from './view';

const controller = (function (creatorCtrl, uiCtrl) {
	const setupEventListeners = () => {
		const DOM = uiCtrl.getDomStrings();
		const btns = document.querySelectorAll(
			DOM.setBtns
		) as NodeListOf<HTMLButtonElement>;

		if (btns) {
			btns.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					const typeStr: string = btn.getAttribute('data-kit')!;
					const type: Type | undefined = stringToEnum(typeStr);
					const count = Number(btn.getAttribute('data-count'));
					if (type && count) {
						creatorCtrl.setupType(type);
						creatorCtrl.setupCount(count);
						reset();
						ctrlGetCards(type, count);
						uiCtrl.toggleActive(e);
						checkActiveCards();
					}
				});
			});
		}
		document
			.querySelector(DOM.wrapperTopCards)
			?.addEventListener('click', activedCard);
		document
			.querySelector(DOM.wrapperBottomCards)
			?.addEventListener('click', deleteCard);
	};

	const ctrlGetCards = (type: Type, count: number): void => {
		const cards: Card[] = creatorCtrl.getTypeCards(type, count);
		uiCtrl.renderCards(cards, 'top');
	};

	const activedCard = (e: Event) => {
		const target = e.target as HTMLDivElement;
		const card = target.closest('.field__card-top') as HTMLDivElement;

		if (target && card) {
			const state: State = creatorCtrl.getState();
			const id = Number(card?.getAttribute('data-top'));
			const currentCard: Card = creatorCtrl.findCard(id);
			const TypedCards: Card[] = creatorCtrl.getTypeCards(
				state.type,
				state.count
			);
			let activeCardsIds;

			creatorCtrl.toggleActiveCard(id);
			creatorCtrl.addToActiveCards(currentCard);

			activeCardsIds = state.activeCards.map((card) => card.id);

			uiCtrl.renderCards(TypedCards, 'top', activeCardsIds);
			uiCtrl.renderCards(state.activeCards, 'bottom');
			checkActiveCards();
		}
	};

	const deleteCard = (e: Event): void => {
		const target = e.target as HTMLDivElement;
		const card = target.closest('.field__card-bottom') as HTMLDivElement;

		if (target && card) {
			const state: State = creatorCtrl.getState();
			const id = Number(card?.getAttribute('data-bottom'));
			const TypedCards: Card[] = creatorCtrl.getTypeCards(
				state.type,
				state.count
			);
			let activeCardsIds;

			creatorCtrl.removeFromActiveCards(id);
			creatorCtrl.toggleActiveCard(id);

			activeCardsIds = state.activeCards.map((card) => card.id);

			uiCtrl.renderCards(TypedCards, 'top', activeCardsIds);
			uiCtrl.renderCards(state.activeCards, 'bottom');
			checkActiveCards();
		}
	};
	const checkActiveCards = (): void => {
		const activeCards: Card[] = creatorCtrl.getState().activeCards;

		if (activeCards.length >= 2) {
			uiCtrl.toggleGenerateBtn(false);
		} else {
			uiCtrl.toggleGenerateBtn(true);
		}
	};
	const reset = () => {
		creatorCtrl.resetActives();
		uiCtrl.resetCards();
		creatorCtrl.resetCards();
	};

	return {
		init: () => {
			setupEventListeners();
		}
	};
})(modelController, viewController);

controller.init();
