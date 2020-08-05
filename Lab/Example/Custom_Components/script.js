class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class='header'>
      <svg id='gradient' style='width: auto;'>
        <defs>
          <linearGradient id='linearGradient' x1='0%' x2='100%' y1='0%' y2='100%'>
            <stop offset='0%' stop-color='#B8D087'></stop>
            <stop offset='100%' stop-color='#00996D'></stop>
          </linearGradient>
        </defs>
        <h2 fill-opacity='1' y='36px'>
          Pomodoro Clock
        </h2>
      </svg>
    </div>
      `;
    }
  }
  
  class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `	   
        <footer>            
        <div class='start' id='start-timer'>START</div>
        <div class='start hidden' id='reset-timer'>RESET</div>         
        </footer>     
      `;
    }
  }

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);