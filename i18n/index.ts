import NextI18Next from 'next-i18next';
import path from 'path';
import config from '../next.config';
import { NextPageContext } from 'next';
import { IncomingMessage } from 'http';

const i18n = new NextI18Next({
  defaultNS: 'common',
  defaultLanguage: 'en',
  otherLanguages: ['ru'],
  localeSubpaths: config.publicRuntimeConfig.localeSubpaths,
  localePath: path.resolve('./public/static/locales')
});

export const languages: Language[] = [
  {
    code: 'en',
    text: 'English'
  },
  {
    code: 'ru',
    text: 'Русский'
  }
];

interface IncomingMessageWithI18n extends IncomingMessage {
  language?: string;
  i18n: any;
}
export const i18nPropsFromCtx = (
  ctx: NextPageContext
): any => {
  if (!(ctx && ctx.req && (ctx.req as IncomingMessageWithI18n).language)) {
    return {};
  }
  const req = ctx.req as IncomingMessageWithI18n;
  return {
    lang: req.language,
    dir: req.i18n && req.i18n.dir(req.language),
  };
};

export const { appWithTranslation, useTranslation, Link, withTranslation } = i18n;

export default i18n;
