// ==UserScript==
// @name         Stash - Default Avatar
// @namespace    com.github.fuminchao.monkeyscripts
// @downloadURL  https://github.com/fuminchao/monkeyscripts/blob/master/atlassian_stash.user.js
// @version      0.1
// @description  Add default avatar on atlassian stash
// @author       fuminchao@outlook.com
// @run-at       document-start
// @require      http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @match        *://stash.bbpd.io/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  let k = 'k' + new Date().getTime();
  let x = `avatar-image-detection-${k}`;

  GM_addStyle(`
  @import 'https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css';
  @keyframes ${x} {
    0%   {transform: translateZ(0);}
    100% {transform: translateZ(0);}
  }

  .aui-avatar-inner > img {
    animation: ${x};
  }

  .aui-avatar-inner.${k} {
    text-align: center;
    font-size: 12px;
    background-color: rgb(204, 204, 204);
    color: white;
    border-radius: 100%;
  }
  .aui-avatar-inner.${k} > img {
    display: none;
  }
  `);

  document.addEventListener('animationend', function(event){

    let imgElement = event.target;
    let avatarElement = imgElement.parentNode;
    let username = imgElement.getAttribute('alt');

    if ( event.animationName === x && /^https:\/\/secure\.gravatar\.com\/avatar\/.*/.test(imgElement.getAttribute('src')) ){
      let initial = /^(\w)\w*\s+(\w)\w*$/.exec(username);

      $(avatarElement)
        .addClass(k)
        .append(initial[1] + initial[2])
        .attr('data-balloon', username)
        .attr('data-balloon-pos', "right")
        .css('line-height', ($(avatarElement).height() + 2) + 'px' );
    }
  });
})();