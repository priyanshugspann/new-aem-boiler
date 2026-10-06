/**
 * Menu: a list of items with a description and a price.
 * Each row is [name + description, price]; the price cell is optional.
 * @param {Element} block The menu block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const [details, price] = row.children;
    if (!details) return;

    const li = document.createElement('li');
    li.className = 'menu-item';

    const info = document.createElement('div');
    info.className = 'menu-item-details';
    info.append(...details.childNodes);

    // authors may type the name as plain text rather than a heading
    const firstChild = info.firstElementChild;
    if (!info.querySelector('h1, h2, h3, h4, h5, h6')) {
      const name = document.createElement('h3');
      if (firstChild && firstChild.tagName === 'P') {
        name.append(...firstChild.childNodes);
        firstChild.replaceWith(name);
      } else if (!firstChild) {
        name.textContent = info.textContent.trim();
        info.replaceChildren(name);
      }
    }
    li.append(info);

    if (price && price.textContent.trim()) {
      const priceEl = document.createElement('p');
      priceEl.className = 'menu-item-price';
      priceEl.textContent = price.textContent.trim();
      li.append(priceEl);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
}
