/* global WebImporter */

/**
 * Import script for the Stillwater Coffee site.
 * Each source <section> becomes an EDS section; components become blocks via parsers.
 * A section's data-style attribute becomes a Section Metadata block.
 */
import { createBlock } from './parsers/utils.js';
import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';
import menuParser from './parsers/menu.js';

const FRAGMENTS = ['/nav', '/footer'];

const PARSERS = [
  { selector: '.hero', parse: heroParser, self: true },
  { selector: '.cards', parse: cardsParser },
  { selector: '.columns', parse: columnsParser },
  { selector: '.menu', parse: menuParser },
];

function convertButtons(main, document) {
  main.querySelectorAll('a.btn').forEach((a) => {
    const wrapper = document.createElement(a.classList.contains('btn-secondary') ? 'em' : 'strong');
    a.removeAttribute('class');
    a.replaceWith(wrapper);
    wrapper.append(a);
  });
}

function makeLinksRelative(main, origin) {
  main.querySelectorAll('a[href]').forEach((a) => {
    const href = a.href || a.getAttribute('href');
    if (href.startsWith(origin)) {
      const { pathname, search, hash } = new URL(href);
      const path = pathname.replace(/\.html$/, '').replace(/^\/index$/, '/');
      a.setAttribute('href', `${path}${search}${hash}`);
    }
  });
}

function addPageMetadata(main, document) {
  const meta = {};
  const title = document.querySelector('title');
  if (title) meta.Title = title.textContent.trim();
  const desc = document.querySelector('meta[name="description"]');
  if (desc) meta.Description = desc.content;
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    const img = document.createElement('img');
    img.src = ogImage.content;
    meta.Image = img;
  }
  main.append(WebImporter.Blocks.getMetadataBlock(document, meta));
}

function documentPath(url) {
  const pathname = new URL(url).pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return WebImporter.FileUtils.sanitizePath(pathname || '/index');
}

export default {
  transform: ({ document, url }) => {
    const main = document.querySelector('main');
    const path = documentPath(url);

    makeLinksRelative(main, new URL(url).origin);
    convertButtons(main, document);

    [...main.querySelectorAll(':scope > section')].forEach((section, i) => {
      PARSERS.forEach(({ selector, parse, self }) => {
        if (self) {
          if (section.matches(selector)) parse(section, { document });
        } else {
          section.querySelectorAll(selector).forEach((el) => parse(el, { document }));
        }
      });
      if (section.dataset.style) {
        section.append(createBlock(document, 'Section Metadata', [['Style', section.dataset.style]]));
      }
      if (i > 0) section.before(document.createElement('hr'));
    });

    if (!FRAGMENTS.includes(path)) addPageMetadata(main, document);

    return [{ element: main, path }];
  },
};
