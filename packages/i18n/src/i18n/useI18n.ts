import { useTranslation } from 'react-i18next'
import { Callback, i18n as I18nType, TFunction } from 'i18next'

export interface I18nWithLanguages<Languages extends { [key: string]: string }>
  extends I18nType {
  changeLanguage: (
    lng?: keyof Languages,
    callback?: Callback
  ) => Promise<TFunction>
  getDataByLanguage(
    lng: keyof Languages
  ): { translation: { [key: string]: string } } | undefined
  language: Extract<keyof Languages, string>
  languages: Extract<keyof Languages, string>[]
}

export const useI18n = <
  Languages extends { [K in keyof Languages]: string }
>(): { i18n: I18nWithLanguages<Languages> } => {
  const { i18n } = useTranslation()
  return { i18n: i18n as I18nWithLanguages<Languages> }
}
