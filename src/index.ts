import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="generator">
      <div class="controller">
        <div class="controller__kit">
          <button class="controller__kit-btn" id="kitBtn-1">Набор 1</button>
          <button class="controller__kit-btn" id="kitBtn-2">Набор 2</button>
        </div>
        <button class="controller__btn" disabled>Сгенерировать</button>
      </div>
      <div class="field">
      <div class="field__cards"></div>
         <div class="field__cards-bottom"></div>
      </div>
    </div>
`


