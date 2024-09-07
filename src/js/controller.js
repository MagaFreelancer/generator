import modelController from "./model";
import viewController from "./view";

const controller = (function (creatorCtrl, uiCtrl) {
  const setupEventListeners = () => {
    const DOM = uiCtrl.getDomStrings();
    document.querySelectorAll(DOM.setBtns).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const type = btn.getAttribute("data-kit");
        const count = Number(btn.getAttribute("data-count"));
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
    document
      .querySelector(DOM.wrapperTopCards)
      ?.addEventListener("click", activedCard);
    document
      .querySelector(DOM.wrapperBottomCards)
      ?.addEventListener("click", deleteCard);
  };

  const ctrlGetCards = (type, count) => {
    const cards = creatorCtrl.getTypeCards(type, count);
    uiCtrl.renderCards(cards, "top");
  };

  const activedCard = (e) => {
    
    const target = e.target;
    const card = target.closest(".field__card-top");
    const state = creatorCtrl.getState();
    const id = Number(card?.getAttribute("data-top"));
    const currentCard = creatorCtrl.findCard(id);

    const TypedCards = creatorCtrl.getTypeCards(state.type, state.count);

    if (card) {
      creatorCtrl.toggleActive(id);
      creatorCtrl.addToActiveCards(currentCard);

      const activeCardsIds = state.activeCards.map((card) => card.id);

      uiCtrl.renderCards(TypedCards, "top", activeCardsIds);
      uiCtrl.renderCards(state.activeCards, "bottom");
      checkActiveCards();

    }
  };

  const deleteCard = (e) => {
    const target = e.target;
    let card, id;
    const state = creatorCtrl.getState();
    const TypedCards = creatorCtrl.getTypeCards(state.type, state.count);
    card = target.closest(".field__card-bottom");
    id = Number(card?.getAttribute("data-bottom"));
    creatorCtrl.removeFromActiveCards(id);
    const activeCardsIds = state.activeCards.map((card) => card.id);

    if (card) {
      creatorCtrl.toggleActive(id);
      uiCtrl.renderCards(TypedCards, "top", activeCardsIds);
      uiCtrl.renderCards(state.activeCards, "bottom");
      checkActiveCards();
      
    }
  };
  const checkActiveCards = () => {
    const activeCards = creatorCtrl.getState().activeCards;

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
    },
  };
})(modelController, viewController);

controller.init();

