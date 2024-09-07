const viewController = (function () {
  const DomStrings = {
    setBtns: ".controller__list-btn",
    wrapperTopCards: ".field__cards",
    cards: ".field__card",
    wrapperBottomCards: ".field__cards-bottom",
    generateBtn: ".controller__generate",
    controllerBtns: ".controller__list-btn",
  };

  const renderCards = (cards, type, array = []) => {
    let fun, container;

    if (type === "top") {
      fun = createTopCard;
      container = DomStrings.wrapperTopCards;
    } else {
      fun = createBottomCard;
      container = DomStrings.wrapperBottomCards;
    }

    document.querySelector(container).innerHTML = "";

    cards.forEach((obj) => {
      const index = array.indexOf(obj.id) + 1;
      fun({ ...obj, index });
    });
  };
  const resetCards = () => {
    document.querySelector(DomStrings.wrapperTopCards).innerHTML = "";
    document.querySelector(DomStrings.wrapperBottomCards).innerHTML = "";
  };
  const resetBtns = () => {
    const btns = document.querySelectorAll(DomStrings.setBtns);
    btns.forEach((btn) => btn.classList.remove("controller__list-btn--active"));
  };

  const toggleActive = (event) => {
    const target = event.target;

    resetBtns();
    target.classList.add("controller__list-btn--active");
  };

  const createTopCard = (obj) => {
    let html = ` 
        <div class="field__card field__card-top ${obj.active && "field__card--active"}" data-top="${obj.id}">
                 <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
                      <div class="field__card-index">${obj.index}</div>
            </div> `;

    document
      .querySelector(DomStrings.wrapperTopCards)
      ?.insertAdjacentHTML("beforeend", html);
  };
  const createBottomCard = (obj) => {
    let html = ` 
            <div class="field__card field__card-bottom" data-bottom="${obj.id}">
                 <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
            </div> `;

    document
      .querySelector(DomStrings.wrapperBottomCards)
      ?.insertAdjacentHTML("beforeend", html);
  };
  const toggleGenerateBtn = (status) => {
    const generatorBottom = document.querySelector(
      DomStrings.generateBtn,
    );

    if (generatorBottom) {
      generatorBottom.disabled = status;
    }
  };
  return {
    getDomStrings: () => DomStrings,
    renderCards,
    resetCards,
    toggleActive,
    toggleGenerateBtn,
  };
})();

export default viewController;
