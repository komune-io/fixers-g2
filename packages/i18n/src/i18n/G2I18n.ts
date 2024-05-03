import { KeyPath } from '@komune-io/g2-utils'

export interface I18nG2 {
  fieldRequired: string
  fileRequired: string
  needFieldAbove0: string
  needFieldPositive: string
  phoneNeedsToHave10Digits: string
  incorrectEmail: string
  requiredStreet: string
  requiredPostalCode: string
  requiredCity: string
  emailAlreadyUsed: string
  completeTheEmail: string
  enterAValidEmail: string
  siretNotFound: string
  siretDescription: string
  addPicture: string
  removePicture: string
  'file-invalid-type': string
  'file-too-large': string
  'too-many-files': string
  or: string
  Required: string
  openFullScreen: string
  canDrag: string
  addMarker: string
  useMyPosition: string
  logo: string
  siret: string
  name: string
  roles: string
  facultativeField: string
  website: string
  description: string
  organization: string
  address: string
  postalCode: string
  city: string
  givenName: string
  familyName: string
  memberOf: string
  email: string
  phone: string
  sendVerifyEmail: string
  sendResetPassword: string
  user: string
  completeThePassword: string
  passWordLongerThan8: string
  samePasswordCheck: string
  newPassword: string
  passwordCheck: string
  cancel: string
  confirm: string
  password: string
  changePassword: string
  passwordChangement: string
  passwordEmail: string
  clear: string
  accept: string
  today: string
  addImages: string
  gallery: string
  save: string
  copySuccess: string
  copyToClipboard: string
  required: string
  noData: string
  noOrganization: string
  totalItem: string
}
export interface I18nHttp {
  '600': string
  '401': string
  '500': string
  backendErrors: {}
  errors: {
    organizationPage: string
    organizationGet: string
    organizationUpdate: string
    organizationCreate: string
    organizationUploadLogo: string
    organizationDisable: string
    userPage: string
    userGet: string
    userUpdate: string
    userCreate: string
    userUpdatePassword: string
    userResetPassword: string
    userUpdateEmail: string
    userDisable: string
  }
  success: {
    organizationUpdate: string
    organizationCreate: string
    organizationDisable: string
    userUpdate: string
    userCreate: string
    userUpdatePassword: string
    userResetPassword: string
    userDisable: string
  }
}

export interface I18n {
  g2: I18nG2
  http: I18nHttp
}

export interface I18nLanguages {
  fr: I18n
  en: I18n
}

// Specific Template Literal Types for I18n
export type I18nKeys = KeyPath<I18n>
