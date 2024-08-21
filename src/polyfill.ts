/* eslint-disable no-redeclare, no-var */
import { Buffer } from 'buffer';

window.open = (function (open) {
  return function (url, _, features) {
    return open.call(window, url, '_blank', features);
  };
})(window.open);

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? { env: {} }; // Minimal process polyfill
