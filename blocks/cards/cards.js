import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    if (!li.querySelector('.cards-card-image')) li.classList.add('cards-card-text-only');
    ul.append(li);
  });
  // only same-origin images can use the media optimization query params
  ul.querySelectorAll('picture > img').forEach((img) => {
    if (new URL(img.src, window.location.href).origin !== window.location.origin) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
