import { Card } from './types/index.types';

const viewController = (function () {
	const DomStrings: Record<string, string> = {
		setBtns: '.controller__list-btn',
		wrapperTopCards: '.field__cards',
		cards: '.field__card',
		wrapperBottomCards: '.field__cards-bottom',
		generateBtn: '.controller__generate',
		controllerBtns: '.controller__list-btn'
	};

	const renderCards = (
		cards: Card[],
		position: string,
		array: number[] = []
	): void => {
		let fun,
			container,
			index = -1;

		if (position === 'top') {
			fun = createTopCard;
			container = DomStrings.wrapperTopCards;
		} else {
			fun = createBottomCard;
			container = DomStrings.wrapperBottomCards;
		}

		const htmlContainer = document.querySelector(container) as HTMLDivElement;
		if (!htmlContainer) return;
		htmlContainer.innerHTML = '';

		cards.forEach((obj: Card) => {
			if (array) {
				index = array.indexOf(obj.id) + 1;
			}
			fun({ ...obj, index }, htmlContainer);
		});
	};
	const resetCards = (): void => {
		const topCards = document.querySelector(
			DomStrings.wrapperTopCards
		) as HTMLDivElement;
		const bottomCards = document.querySelector(
			DomStrings.wrapperBottomCards
		) as HTMLDivElement;
		if (topCards && bottomCards) {
			topCards.innerHTML = '';
			bottomCards.innerHTML = '';
		}
	};
	const resetBtns = (): void => {
		const btns = document.querySelectorAll(
			DomStrings.setBtns
		) as NodeListOf<HTMLButtonElement>;
		if (btns) {
			btns.forEach((btn) =>
				btn.classList.remove('controller__list-btn--active')
			);
		}
	};

	const toggleActive = (event: Event): void => {
		const target = event.target as HTMLButtonElement;

		if (target) {
			resetBtns();
			target.classList.add('controller__list-btn--active');
		}
	};

	const createTopCard = (obj: Card, container: HTMLDivElement): void => {
		const checkIndex =
			obj.index != -1
				? `<div class="field__card-index">${obj.index}</div>`
				: '';

		if (!container) return;

		let html = ` 
            <div class="field__card field__card-top ${obj.active && 'field__card--active'}" data-top="${obj.id}">
                  <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
                    ${checkIndex}
            </div> `;

		container.insertAdjacentHTML('beforeend', html);
	};
	const createBottomCard = (obj: Card, container: HTMLDivElement): void => {
		const bottomCards = document.querySelector(
			DomStrings.wrapperBottomCards
		) as HTMLDivElement;

		if (!bottomCards) return;

		let html = ` 
            <div class="field__card field__card-bottom" data-bottom="${obj.id}">
                 <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
            </div> `;

		container.insertAdjacentHTML('beforeend', html);
	};
	const toggleGenerateBtn = (status: boolean): void => {
		const generatorBottom = document.querySelector(
			DomStrings.generateBtn
		) as HTMLButtonElement;

		if (generatorBottom) {
			generatorBottom.disabled = status;
		}
	};
	return {
		getDomStrings: () => DomStrings,
		renderCards,
		resetCards,
		toggleActive,
		toggleGenerateBtn
	};
})();

export default viewController;
