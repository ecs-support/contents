
class sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<img src="static/img/ECS_Logo_2020.png" class="logo_ecs" id="logo" onclick="newDoc()">  

       
        `;
    }
}



customElements.define('main-logo');