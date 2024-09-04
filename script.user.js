// ==UserScript==
// @name        Google Map Helper
// @namespace   https://github.com/tlan16/user-script-google-map
// @match       https://www.google.com/maps*
// @version     1.0
// @license     GPL-3.0 license
// @author      Frank<franklan118@gmail.com>
// @updateURL   https://github.com/tlan16/user-script-google-map/raw/main/script.user.js
// @downloadURL https://github.com/tlan16/user-script-google-map/raw/main/script.user.js
// @homepage    https://github.com/tlan16/user-script-google-map
// @supportURL  https://github.com/tlan16/user-script-google-map
// @run-at      document-idle
// @icon        https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com/maps&size=128
// ==/UserScript==

(() => {

  const appName = `Google Map Helper`;
  
  const sleep = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
  
  const logger = {
    log: (...args) => {
      console.log(`[UserScript][${appName}]`, ...args)
    },
    error: (...args) => {
      console.error(`[UserScript][${appName}]`, ...args)
    },
  }
  
  async function clickElement(selector) {
    if (this.counter && this.counter > 5) return;
    if (document.querySelector(selector)?.checked) return;
  
    if (this.counter == undefined) this.counter = 0;
    const element = document.querySelector(selector);
    if (element) {
      element.click();
      this.counter = 0;
      logger.log(`Element ${selector} clicked. Counter: ${this.counter}.`);
    }
    else {
      this.counter++;
      logger.log(`Element ${selector} not found. Counter: ${this.counter}.`);
      await sleep();
      await clickElement(selector);
    }
  }
  

  const selector = `body button[jsaction*="queryOnPan"][aria-checked="false"]`;
  await clickElement(selector);
})();
