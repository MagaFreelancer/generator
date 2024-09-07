const modelController = (function () {
    const model = {
        cards: [
            {
                id: 1,
                imgUrl:
                    "https://adsboard-static.spectrumdata.tech/files/blogs_content/fe2a89919d8aa9a/v7f79c8.jpg",
                title: "Car 1",
                type: "car",
                active: false,
            },
            {
                id: 2,
                imgUrl:
                    "https://motor.ru/thumb/1500x0/filters:quality(75):no_upscale()/imgs/2022/01/27/11/5197968/f7aba1d92862152a77a6fcf637d2ea171e1defe8.jpg",
                title: "Car 2",
                type: "car",
                active: false,
            },
            {
                id: 3,
                imgUrl: "https://rg.ru/uploads/images/169/12/62/35_e43ba14c.jpg",
                title: "Car 3",
                type: "car",
                active: false,
            },
            {
                id: 4,
                imgUrl:
                    "https://img.gazeta.ru/files3/225/15619225/602fd8501fa16_img-pic_32ratio_1200x800-1200x800-70042.jpg",
                title: "Car 4",
                type: "car",
                active: false,
            },
            {
                id: 5,
                imgUrl:
                    "https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg",
                title: "Cat 1",
                type: "cat",
                active: false,
            },
            {
                id: 6,
                imgUrl:
                    "https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg",
                title: "Cat 2",
                type: "cat",
                active: false,
            },
            {
                id: 7,
                imgUrl:
                    "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled",
                title: "Cat 3",
                type: "cat",
                active: false,
            },
            {
                id: 8,
                imgUrl:
                    "https://avatars.dzeninfra.ru/get-zen_doc/8269145/pub_641ec1d0798be415157b4180_641f3d1cd4b1f54fcf2f0a01/scale_1200",
                title: "Cat 4",
                type: "cat",
                active: false,
            },
            {
                id: 9,
                imgUrl:
                    "https://avatars.dzeninfra.ru/get-zen_doc/8098241/pub_641ec1d0798be415157b4180_641ec210d2d45b2f14e36c73/scale_1200",
                title: "Cat 5",
                type: "cat",
                active: false,
            },
        ],
        state: {
            activeCards: [], //для активных карточек
            type: "car", //тип карточек, которые будут отображаться
            count: 0, //количество карточек отображаемых на странице
        },
    };
    const getTypeCards = (type, count) => {
        return filtreCards(model.cards, type).slice(0, count);
    };
    const toggleActive = (id) => {
        const card = findCard(id);
        card.active = !card.active;
    };
    const filtreCards = (arr, type) => {
        return arr.filter((card) => card.type === type);
    };
    const addToActiveCards = (card) => {
        model.state.activeCards.push(card);
    };
    const removeFromActiveCards = (id) => {
        const indexActive = model.state.activeCards.findIndex(
            (card) => card.id === id,
        );

        if (indexActive !== -1) {
            model.state.activeCards.splice(indexActive, 1);
        }
    };
    const resetActives = () => {
        model.state.activeCards = [];
    };
    const findCard = (id) => {
        return model.cards.find((card) => card.id === id);
    };
    const getCards = () => {
        return model.cards;
    };
    const getState = () => {
        return model.state;
    };

    const setupType = (type) => {
        model.state.type = type;
    };

    const setupCount = (count) => {
        model.state.count = count;
    };
    const resetCards = () => {
        model.cards.forEach((card) => {
            card.active = false;
        });
    };

    return {
        getTypeCards,
        filtreCards,
        addToActiveCards,
        findCard,
        removeFromActiveCards,
        getCards,
        setupType,
        toggleActive,
        setupCount,
        getState,
        resetActives,
        resetCards,
    };
})();

export default modelController;
