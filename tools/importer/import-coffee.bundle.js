/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-coffee.js
  var import_coffee_exports = {};
  __export(import_coffee_exports, {
    default: () => import_coffee_default
  });

  // tools/importer/parsers/utils.js
  function createBlock(document, name, rows) {
    return WebImporter.DOMUtils.createTable([[name], ...rows], document);
  }
  function cellContent(document, el) {
    const cell = document.createElement("div");
    cell.append(...el.childNodes);
    return cell;
  }

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const img = element.querySelector(":scope > img");
    const text = element.querySelector(".hero-text");
    const rows = [];
    if (img) rows.push([img]);
    if (text) rows.push([cellContent(document, text)]);
    element.replaceChildren(createBlock(document, "Hero", rows));
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    const rows = [...element.querySelectorAll(".card")].map((card) => {
      const img = card.querySelector(":scope > img");
      const body = card.querySelector(".card-body");
      const row = [];
      if (img) row.push(img);
      if (body) row.push(cellContent(document, body));
      return row;
    });
    const { variant } = element.dataset;
    const name = variant ? `Cards (${variant})` : "Cards";
    element.replaceWith(createBlock(document, name, rows));
  }

  // tools/importer/parsers/columns.js
  function parse3(element, { document }) {
    const rows = [...element.querySelectorAll(".row")].map(
      (row) => [...row.querySelectorAll(":scope > .col")].map((col) => cellContent(document, col))
    );
    element.replaceWith(createBlock(document, "Columns", rows));
  }

  // tools/importer/parsers/menu.js
  function parse4(element, { document }) {
    const rows = [...element.querySelectorAll(".item")].map((item) => {
      const price = item.querySelector(".price");
      if (price) price.remove();
      return [cellContent(document, item), price ? price.textContent.trim() : ""];
    });
    element.replaceWith(createBlock(document, "Menu", rows));
  }

  // tools/importer/import-coffee.js
  var FRAGMENTS = ["/nav", "/footer"];
  var PARSERS = [
    { selector: ".hero", parse, self: true },
    { selector: ".cards", parse: parse2 },
    { selector: ".columns", parse: parse3 },
    { selector: ".menu", parse: parse4 }
  ];
  function convertButtons(main, document) {
    main.querySelectorAll("a.btn").forEach((a) => {
      const wrapper = document.createElement(a.classList.contains("btn-secondary") ? "em" : "strong");
      a.removeAttribute("class");
      a.replaceWith(wrapper);
      wrapper.append(a);
    });
  }
  function makeLinksRelative(main, origin) {
    main.querySelectorAll("a[href]").forEach((a) => {
      const href = a.href || a.getAttribute("href");
      if (href.startsWith(origin)) {
        const { pathname, search, hash } = new URL(href);
        const path = pathname.replace(/\.html$/, "").replace(/^\/index$/, "/");
        a.setAttribute("href", `${path}${search}${hash}`);
      }
    });
  }
  function addPageMetadata(main, document) {
    const meta = {};
    const title = document.querySelector("title");
    if (title) meta.Title = title.textContent.trim();
    const desc = document.querySelector('meta[name="description"]');
    if (desc) meta.Description = desc.content;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      const img = document.createElement("img");
      img.src = ogImage.content;
      meta.Image = img;
    }
    main.append(WebImporter.Blocks.getMetadataBlock(document, meta));
  }
  function documentPath(url) {
    const pathname = new URL(url).pathname.replace(/\.html$/, "").replace(/\/$/, "");
    return WebImporter.FileUtils.sanitizePath(pathname || "/index");
  }
  var import_coffee_default = {
    transform: ({ document, url }) => {
      const main = document.querySelector("main");
      const path = documentPath(url);
      makeLinksRelative(main, new URL(url).origin);
      convertButtons(main, document);
      [...main.querySelectorAll(":scope > section")].forEach((section, i) => {
        PARSERS.forEach(({ selector, parse: parse5, self }) => {
          if (self) {
            if (section.matches(selector)) parse5(section, { document });
          } else {
            section.querySelectorAll(selector).forEach((el) => parse5(el, { document }));
          }
        });
        if (section.dataset.style) {
          section.append(createBlock(document, "Section Metadata", [["Style", section.dataset.style]]));
        }
        if (i > 0) section.before(document.createElement("hr"));
      });
      if (!FRAGMENTS.includes(path)) addPageMetadata(main, document);
      return [{ element: main, path }];
    }
  };
  return __toCommonJS(import_coffee_exports);
})();
