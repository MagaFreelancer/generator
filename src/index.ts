import "./style.css";

document.querySelector("#app")!.innerHTML = `
   <div class="generator">
      <div class="controller">
        <h1 class="controller__title">Creator AI</h1>
        <div class="controller__content">

          <ul class="controller__list">
            <li class="controller__list-item"> <button class="controller__list-btn" data-kit="cat" data-count="5">Набор 1</button></li>
            <li class="controller__list-item"> <button class="controller__list-btn" data-kit="car" data-count="4">Набор 2</button></li>
          </ul>

          <button class="controller__generate" disabled>Сгенерировать</button>
        </div>
      </div>
      <div class="field">
        <div class="field__cards"> </div>
        <div class="field__cards-bottom">
        </div>
      </div>
    </div>
`;
