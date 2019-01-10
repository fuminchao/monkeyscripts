// ==UserScript==
// @name         outlook.noad
// @namespace    io.github.fuminchao
// @version      0.2
// @description
// @author       fuminchao@outlook.com
// @match        https://outlook.live.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle(`
    #app > div.ms-Fabric > div:last-child > div:first-child > div:first-child > div:last-child {
      display: none;
    }
  `);
})();
