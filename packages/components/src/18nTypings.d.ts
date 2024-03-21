// import the original type declarations
// import the original type declarations
import 'i18next'
import { G2Translations } from '@komune-io/g2-providers'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'translation'
    // custom resources type
    resources: {
      g2: typeof G2Translations.fr
    }
    returnNull: false
  }
}
