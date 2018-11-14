import { LitElement, html } from '@polymer/lit-element'

class HomePage extends LitElement {
  render(){
    return html`
      <p>Hello world! From home-page</p>
    `
  }
}

customElements.define('home-page', MyElement)