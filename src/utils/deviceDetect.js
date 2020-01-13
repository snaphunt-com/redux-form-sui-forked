const UAParser = require('ua-parser-js/dist/ua-parser.min');

const UA = new UAParser();
const browser = UA.getBrowser();

const BROWSER_TYPES = {
  CHROME: 'Chrome',
  FIREFOX: 'Firefox',
  SAFARI: 'Safari',
  OPERA: 'Opera',
  YANDEX: 'Yandex',
  INTERNET_EXPLORER: 'Internet Explorer',
  EDGE: 'Edge',
  CHROMIUM: 'Chromium',
  IE: 'IE',
  MOBILE_SAFARI: 'Mobile Safari',
};

const isChrome = () => [BROWSER_TYPES.CHROME].includes(browser?.name);

const isFirefox = () => [BROWSER_TYPES.FIREFOX].includes(browser?.name);

const isSafari = () =>
  [BROWSER_TYPES.SAFARI, BROWSER_TYPES.MOBILE_SAFARI].includes(browser?.name);

const isOpera = () => [BROWSER_TYPES.OPERA].includes(browser?.name);

const isYandex = () => [BROWSER_TYPES.YANDEX].includes(browser?.name);

const isIE = [BROWSER_TYPES.INTERNET_EXPLORER, BROWSER_TYPES.IE].includes(
  browser?.name,
);

const isEdge = () => [BROWSER_TYPES.EDGE].includes(browser?.name);

const isChromium = () => [BROWSER_TYPES.CHROMIUM].includes(browser?.name);

export {
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isYandex,
  isIE,
  isEdge,
  isChromium,
};
