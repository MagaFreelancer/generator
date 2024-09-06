import modelController from "./model";
import viewController from "./view";

const controller = (function (creatorCtrl, uiCtrl) {

  const setupEventListeners = () => {

    const DOM = uiCtrl.getDomStrings()
    document.querySelectorAll<HTMLButtonElement>(DOM.setBtns).forEach((btn) => {

      btn.addEventListener('click', () => {

        const type: string | null = btn.getAttribute('data-kit')
        const count: number | null = Number(btn.getAttribute('data-count'))
        if (type && count) {
          creatorCtrl.setupType(type)
          creatorCtrl.setupCount(count)
          reset()
          ctrlGetCards(type, count);

        }

      })

    })
    document.querySelector(DOM.wrapperTopCards)?.addEventListener('click', activedCard)
    document.querySelector(DOM.wrapperBottomCards)?.addEventListener('click', deleteCard)


  }


  const ctrlGetCards = (type: string, count: number) => {

    const cards = creatorCtrl.getTypeCards(type, count)

    uiCtrl.renderCards(cards, 'top')

  }
  const updateCards = (type: string, count: number) => {

  }
  const reset = () => {
    creatorCtrl.resetActives()
    uiCtrl.resetCards()
    creatorCtrl.resetCards()
  }
  const activedCard = (e: Event) => {

    const target = e.target as HTMLElement
    const card = target.closest('.field__card-top')
    const state = creatorCtrl.getState()
    const id = Number(card?.getAttribute('data-top'))
    const currentCard = creatorCtrl.findCard(id)


    const TypedCards = creatorCtrl.getTypeCards(state.type, state.count)

    if (card) {

      creatorCtrl.toggleActive(id)

      creatorCtrl.addToActiveCards(currentCard);

      uiCtrl.renderCards(TypedCards, 'top');
      uiCtrl.renderCards(state.activeCards, 'bottom');

    }

  }
  const deleteCard = (e: Event) => {

    const target = e.target as HTMLElement
    const card = target.closest('.field__card-bottom')
    const state = creatorCtrl.getState()
    const id = Number(card?.getAttribute('data-bottom'))

    const TypedCards = creatorCtrl.getTypeCards(state.type, state.count)

    if (card) {

      console.log(state.activeCards);

      creatorCtrl.removeFromActiveCards(id)
      creatorCtrl.toggleActive(id)


      uiCtrl.renderCards(TypedCards, 'top');
      uiCtrl.renderCards(state.activeCards, 'bottom');

    }

  }
  return {

    init: () => {

      setupEventListeners()

    }

  }

})(
  modelController,
  viewController
)


controller.init()
//создаю верхний или нижнюю карточку
//проверяю куда добавлять карточку
//и рендерю туда куда надо 