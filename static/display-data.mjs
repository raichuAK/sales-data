import displayTemplate from './display-data-template.mjs';
import { createTemplate } from '../lib/templatefactory.mjs';

export default class DisplayData extends HTMLElement {

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }

  connectedCallback() {
    const template = createTemplate(displayTemplate());
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }

  disconnectedCallback() {}
}

customElements.get('table-data') || customElements.define('table-data', DisplayData);
