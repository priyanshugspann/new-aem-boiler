import { createBlock, cellContent } from './utils.js';

/** .hero section -> Hero block (row 1: image, row 2: text) */
export default function parse(element, { document }) {
  const img = element.querySelector(':scope > img');
  const text = element.querySelector('.hero-text');
  const rows = [];
  if (img) rows.push([img]);
  if (text) rows.push([cellContent(document, text)]);
  element.replaceChildren(createBlock(document, 'Hero', rows));
}
