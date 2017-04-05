// ==UserScript==
// @name        bing2google
// @namespace   com.github.fuminchao.monkeyscripts
// @author      fuminchao@outlook.com
// @description Add button to navigate from bing.com to google.com, with keyword
// @include     https://www.bing.com/search*
// @run-at      document-end
// @grant       GM_addStyle
// @require     http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @downloadURL https://github.com/fuminchao/monkeyscripts/raw/master/bing2google.user.js
// @version     1
// ==/UserScript==

(function( document, window, $, GM_addStyle ){
  'use strict';

  let buttonId = '__btn_google';

  // add button
  $(`<div id="${buttonId}" class="__btn_google b_searchboxSubmit">Google</div>`).appendTo($('#sb_form'));

  // button style
  GM_addStyle(`
    #sb_form .b_searchboxSubmit#__btn_google {
      display: inline-block;
      border-width: 0;
      margin: 0;

      position:absolute;
      background: transparent url(https://www.google.com/favicon.ico) no-repeat center center;
    }
  `);

  // button action
  $(document).delegate(`#${buttonId}`, 'click', function(){
    var searchQ = (/\bq=([^\&]+)\&/.exec( window.location ) || ['',''])[1];
    window.location = `https://www.google.com/search?q=${searchQ}&ie=utf-8&oe=utf-8`;
  });

})( document, window, window.jQuery, window.GM_addStyle );