// ==UserScript==
// @name         add.torrent.transmission
// @namespace    com.github.fuminchao.monkeyscripts
// @version      1.0
// @description
// @author       You
// @match        https://hdchina.org/details.php*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const TRANSMISSION_RPC = 'http://127.0.0.1:9091/transmission/rpc';

function getTransmissionSession() {
  return new Promise((resolve, reject) => GM_xmlhttpRequest({
    method: "POST",
    url: TRANSMISSION_RPC,
    data: '',
    onload: function(res) {

      if ( res.status === 409 ) {
        resolve(res.responseHeaders.split('\r\n').filter((ln) => /^X\-Transmission\-Session\-Id.*/.test(ln)).map((ln) => ln.split(': ')[1]) );
      } else {
        reject('INVALID_CODE_' + res.status);
      }
    },
    onerror: function() {
      reject('TRANSMISSION_NOT_DETECTED');
    },
  }));
}

function addTransmissionTorrent(sessionId, url) {
  GM_xmlhttpRequest({
    method: "POST",
    url: TRANSMISSION_RPC,
    data: JSON.stringify({
      method: "torrent-add",
      arguments: {
        'filename': url,
        'paused': false,
        'download-dir': '/Users/mfu/Video'
      },
      tag: ""
    }),
    headers:{
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Transmission-Session-Id': sessionId,
    },
    onload: function(response) {

      alert(JSON.stringify(response));
    },
    onerror: function(){
      alert('failed');
    },
  });
}

(function() {

  GM_addStyle(`
  a#clip_target:before {
    content: ' ';
    display: inline-block;
    width: 14px;
    height: 12px;
    position: absolute;
    transform: translateY(3px) translateX(-18px);
    background: url(styles/icons.png) -28px -68px;
  }
  a#clip_target { text-indent: 18px; }
  `);

  getTransmissionSession().then((sessionId) => {

    GM_addStyle(`a#clip_target:before { background-position: 0 -68px; }`);

    document.addEventListener('click', function(event){
      if ( event.target === document.querySelector('a#clip_target') ) {
        event.preventDefault();
        addTransmissionTorrent(sessionId, event.target.innerText);
      }
    }, true);
  }, (err) => console.error(err));

})();
