import { createBlock, cellContent } from './utils.js';

/** .cards -> Cards block (one row per card: [image], body) */
export default function parse(element, { document }) {
  const rows = [...element.querySelectorAll('.card')].map((card) => {
    const img = card.querySelector(':scope > img');
    const body = card.querySelector('.card-body');
    const row = [];
    if (img) row.push(img);
    if (body) row.push(cellContent(document, body));
    return row;
  });
  const { variant } = element.dataset;
  const name = variant ? `Cards (${variant})` : 'Cards';
  element.replaceWith(createBlock(document, name, rows));
}
