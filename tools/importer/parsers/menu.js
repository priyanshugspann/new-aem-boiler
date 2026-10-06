import { createBlock, cellContent } from './utils.js';

/** .menu -> Menu block (one row per item: name + description, price) */
export default function parse(element, { document }) {
  const rows = [...element.querySelectorAll('.item')].map((item) => {
    const price = item.querySelector('.price');
    if (price) price.remove();
    return [cellContent(document, item), price ? price.textContent.trim() : ''];
  });
  element.replaceWith(createBlock(document, 'Menu', rows));
}
