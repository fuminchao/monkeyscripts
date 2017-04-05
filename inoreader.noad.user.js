// ==UserScript==
// @name        inoreader.noad
// @namespace   com.github.fuminchao.monkeyscripts
// @author      fuminchao@outlook.com
// @description Hide advertise on the page of inoreader.com
// @include     *://www.inoreader.com/*
// @run-at      document-start
// @grant       GM_addStyle
// @downloadURL https://github.com/fuminchao/monkeyscripts/blob/master/inoreader.noad.user.js
// @version     1
// ==/UserScript==

(function( GM_addStyle ) {
  'use strict';

  GM_addStyle(`
    #reader_pane {
      padding-right: 0px !important;
    }

    #sinner_container,
    .leaderboard_ad,
    #parent_dashboard,
    #parent_all_articles,
    #parent_channel,
    #parent_tags,
    #parent_teams,
    #parent_web_pages,
    .ad_title.ad_title_centered
    {
      display:none !important;
    }

    #link_0_1867726 {
      color:transparent;
    }
  `);

})( window.GM_addStyle );