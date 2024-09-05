
type Card = {
  id: number;
  imgUrl: string;
  title: string;
  type: string;
};


window.addEventListener('load', () => {
  const btn1 = document.querySelector<HTMLButtonElement>('#kitBtn-1');
  const btn2 = document.querySelector<HTMLButtonElement>('#kitBtn-2');
  const btns = document.querySelectorAll<HTMLDivElement>('.controller__list-btn');
  const fields = document.querySelector<HTMLDivElement>('.field__cards');
  const fieldsBottom = document.querySelector<HTMLDivElement>('.field__cards-bottom');
  const generatorBottom = document.querySelector<HTMLButtonElement>('.controller__generate');
  let activeCards: number[] = [];
  let count = 0
  const cards1: Card[] = [
    { id: 1, imgUrl: "https://adsboard-static.spectrumdata.tech/files/blogs_content/fe2a89919d8aa9a/v7f79c8.jpg", title: "Car 1", type: "car" },
    { id: 2, imgUrl: "https://motor.ru/thumb/1500x0/filters:quality(75):no_upscale()/imgs/2022/01/27/11/5197968/f7aba1d92862152a77a6fcf637d2ea171e1defe8.jpg", title: "Car 2", type: "car" },
    { id: 3, imgUrl: "https://rg.ru/uploads/images/169/12/62/35_e43ba14c.jpg", title: "Car 3", type: "car" },
    { id: 4, imgUrl: "https://img.gazeta.ru/files3/225/15619225/602fd8501fa16_img-pic_32ratio_1200x800-1200x800-70042.jpg", title: "Car 4", type: "car" },
    { id: 5, imgUrl: "https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg", title: "Cat 1", type: 'cat' },
    { id: 6, imgUrl: "https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg", title: "Cat 2", type: 'cat' },
    { id: 7, imgUrl: "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled", title: "Cat 3", type: 'cat' },
    { id: 8, imgUrl: "https://avatars.dzeninfra.ru/get-zen_doc/8269145/pub_641ec1d0798be415157b4180_641f3d1cd4b1f54fcf2f0a01/scale_1200", title: "Cat 4", type: 'cat' },
    { id: 9, imgUrl: "https://avatars.dzeninfra.ru/get-zen_doc/8098241/pub_641ec1d0798be415157b4180_641ec210d2d45b2f14e36c73/scale_1200", title: "Cat 5", type: 'cat' }
  ]

  btn1?.addEventListener('click', (e) => {
    handleButtonClick(e, 'cat', 5)
  })

  btn2?.addEventListener('click', (e) => {
    handleButtonClick(e, 'car', 4)
  })
  function resetStylesBtns() {

    btns.forEach((btn) => btn.classList.remove('controller__list-btn--active'))
  }
  function handleButtonClick(e: Event, type: string, cardCount: number) {

    count = cardCount
    activeCards = [];
    resetStylesBtns()
    checkActiveCards()

    const btn = e.target as HTMLDivElement
    btn.classList.add('controller__list-btn--active')

    handleRender(type)

  }

  function handleRender(type: string) {
    const filteredCards = filterCardsByType(cards1, type)
    renderTopCards(filteredCards)
    renderBottomCards()
  }
  function renderTopCards(cards: Card[]) {
    if (!fields) return false
    fields.innerHTML = ''

    for (let i = 0; i < count; i++) {
      // Проверяем, что карточка существует
      if (!cards[i]) continue
      const activedCard = activeCards.includes(cards[i].id)
      const indexCard = activeCards.indexOf(cards[i].id) + 1

      createCard(cards[i], fields, 'top', activedCard, indexCard)
    }
  }
  function createCard(
    card: Card,
    container: HTMLDivElement,
    position: 'top' | 'bottom',
    isActived: boolean,
    index: number
  ) {
    const className = position === 'top' && isActived ? 'field__card-active' : '';
    const indexMarkup = position === 'top' && isActived ? `<span>${index}</span>` : '';
    const iconPath = position === 'top' ? 'plus' : 'min';

    container?.insertAdjacentHTML('beforeend', `
      <div class="field__card ${className}" data-${position}="${card.id}">
        <img class="field__card-img" src="${card.imgUrl}" alt="${card.title}" />
        <div class="field__card-index">${indexMarkup}</div>
        <img class="field__card-icon" src="../src/assets/svg/${iconPath}.svg" alt="icon" />
      </div>
      `)
    document.querySelector(`.field__card[data-${position}="${card.id}"]`)?.addEventListener('click', () => {
      position === 'top' ? addCardToBottom(card.id) : removeBottomCard(card.id)
    })
  }
  function filterCardsByType(cards: Card[], type: string) {
    return cards.filter((el) => el.type === type)
  }
  function renderBottomCards() {
    if (!fieldsBottom) return false
    fieldsBottom.innerHTML = ''
    const findedCards: Card[] = cards1.filter(item => activeCards.includes(item.id));
    findedCards.forEach((card) => {
      createCard(card, fieldsBottom, 'bottom', false, 0)
    })
  }


  function addCardToBottom(id: number) {
    fieldsBottom!.innerHTML = ''
    const card = cards1.find((el) => el.id === id)
    if (!card) return false
    document.querySelector(`.field__card[data-top="${id}"]`)?.classList.add('field__card-active')


    activeCards.push(card!.id)
    renderTopCards(cards1.filter(c => c.type === card.type));
    renderBottomCards()
    checkActiveCards()
  }

  function removeBottomCard(id: number) {
    const index = activeCards.indexOf(id)
    const card = cards1.find((el) => el.id === id)
    if (!card) return false

    activeCards.splice(index, 1)
    document.querySelector(`.field__card[data-top="${id}"]`)?.classList.remove('field__card-active')

    renderTopCards(cards1.filter(c => c.type === card.type));
    renderBottomCards()
    checkActiveCards()
  }
  function checkActiveCards() {
    if (!generatorBottom) return false
    if (activeCards.length >= 2) {
      generatorBottom.disabled = false
    } else {
      generatorBottom.disabled = true

    }
  }
})