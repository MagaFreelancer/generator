import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="generator">
      <div class="controller">
        <div class="controller__kit">
          <button class="controller__kit-btn">Набор 1</button>
          <button class="controller__kit-btn">Набор 2</button>
        </div>
        <button class="controller__btn" disabled>Сгенерировать</button>
      </div>
      <div class="field">
      </div>
    </div>
`

