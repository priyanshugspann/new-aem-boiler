/* global WebImporter */

export function createBlock(document, name, rows) {
  return WebImporter.DOMUtils.createTable([[name], ...rows], document);
}

export function cellContent(document, el) {
  const cell = document.createElement('div');
  cell.append(...el.childNodes);
  return cell;
}
