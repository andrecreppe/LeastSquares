import I18n from 'i18n-js';
//import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import pt from './locales/pt.json';

I18n.defaultLocale = 'en';
  I18n.locale = 'pt';

I18n.fallbacks = true;
I18n.translations = {
  en,
  pt
};

export default I18n;
