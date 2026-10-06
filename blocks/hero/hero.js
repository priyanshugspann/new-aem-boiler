/**
 * Hero: a full-bleed image with overlaid text.
 * Authors provide an image row and a text row; either may be missing.
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const picture = block.querySelector('picture');
  const content = document.createElement('div');
  content.className = 'hero-content';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (picture && cell.contains(picture) && cell.textContent.trim() === '') return;
      content.append(...cell.childNodes);
    });
  });

  block.replaceChildren();
  if (picture) {
    const media = document.createElement('div');
    media.className = 'hero-image';
    media.append(picture);
    block.append(media);
  } else {
    block.classList.add('no-image');
  }
  if (content.textContent.trim()) block.append(content);
}
