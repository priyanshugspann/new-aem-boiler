import { createBlock, cellContent } from './utils.js';

/** .columns -> Columns block (one row per .row, one cell per .col) */
export default function parse(element, { document }) {
  const rows = [...element.querySelectorAll('.row')].map(
    (row) => [...row.querySelectorAll(':scope > .col')].map((col) => cellContent(document, col)),
  );
  element.replaceWith(createBlock(document, 'Columns', rows));
}
