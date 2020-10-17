import I18n from 'i18n-js';
import { Platform, NativeModules } from 'react-native';

import en from './locales/en.json';
import pt from './locales/pt.json';
import de from './locales/de.json';

const deviceLanguageCode =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const filteredCode = String(deviceLanguageCode).split('_');

I18n.defaultLocale = 'en';
I18n.locale = filteredCode[0];

I18n.fallbacks = true;
I18n.translations = {
  en,
  pt,
  de
};

export default I18n;
