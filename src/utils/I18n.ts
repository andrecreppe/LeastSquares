import I18n from 'i18n-js';
//import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import pt from './locales/pt.json';
import de from './locales/de.json';

I18n.defaultLocale = 'en';
I18n.locale = 'pt'; //only for debug in brazil, hehe

I18n.fallbacks = true;
I18n.translations = {
  en,
  pt
  //de
};

export default I18n;
