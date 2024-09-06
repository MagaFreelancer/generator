const viewController = (function () {

    const DomStrings = {

        setBtns: '.controller__list-btn',
        wrapperTopCards: '.field__cards',
        cards: '.field__card',
        wrapperBottomCards: '.field__cards-bottom',
        generateBtn: '.controller__generate',

    }
    const renderCards = (cards: any, type: string) => {
        let fun, container;

        if (type === 'top') {

            fun = createTopCard
            container = DomStrings.wrapperTopCards

        } else {

            fun = createBottomCard
            container = DomStrings.wrapperBottomCards

        }

        document.querySelector(container)!.innerHTML = ''

        cards.forEach((obj: any) => {
            fun(obj)
        })
    }
    const resetCards = () => {
        document.querySelector(DomStrings.wrapperTopCards)!.innerHTML = ''
        document.querySelector(DomStrings.wrapperBottomCards)!.innerHTML = ''
    }

    const createTopCard = (obj: any) => {

        let html = ` 
        <div class="field__card field__card-top ${obj.active && "field__card--active"}" data-top="${obj.id}">
                 <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
                      <div class="field__card-index"></div>
            </div> `

        document.querySelector(DomStrings.wrapperTopCards)?.insertAdjacentHTML('beforeend', html)

    }
    const createBottomCard = (obj: any) => {

        let html = ` 
            <div class="field__card field__card-bottom" data-bottom="${obj.id}">
                 <img class="field__card-img" src="${obj.imgUrl}" alt="${obj.title}" />
            </div> `

        document.querySelector(DomStrings.wrapperBottomCards)?.insertAdjacentHTML('beforeend', html)

    }

    return {

        getDomStrings: () => DomStrings,
        renderCards,
        resetCards

    }

})()

export default viewController