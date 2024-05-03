import { I18n } from '../G2I18n'

export const en: I18n = {
  g2: {
    fieldRequired: 'This field is required',
    fileRequired: 'You must insert this file: {{fileDesc}}',
    needFieldAbove0: 'The value must be greater than 0',
    needFieldPositive: 'The value must be greater than or equal to 0',
    phoneNeedsToHave10Digits: 'The phone number must have ten digits',
    incorrectEmail: 'The entered email is incorrect',
    requiredStreet:
      'You must provide the address in addition to the city and postal code',
    requiredPostalCode:
      'You must provide the postal code for a complete address',
    requiredCity: 'You must provide the city for a complete address',
    emailAlreadyUsed: 'This email is already in use',
    completeTheEmail: 'You must complete the email',
    enterAValidEmail: 'The entered email is incorrect',
    siretNotFound:
      'No information found. Please manually enter the following information',
    siretDescription:
      'The SIRET number will automatically populate some of the following fields',
    addPicture: 'Add a picture',
    removePicture: 'Remove the picture',
    'file-invalid-type':
      'Your file must be in the following format: {{formats}}',
    'file-too-large': 'Your file should not exceed {{sizeLimit}}MB',
    'too-many-files': 'You can only add one file at a time',
    or: 'or',
    Required: 'Required',
    openFullScreen: 'Open in fullscreen',
    canDrag: 'You can move this point',
    addMarker: 'Add a marker',
    useMyPosition: 'Use my position',
    logo: 'Company Logo',
    siret: 'SIRET Number',
    name: 'Name',
    roles: 'Roles',
    facultativeField: '{{label}} (optional)',
    website: 'Website',
    description: 'Description',
    organization: 'Organization',
    address: 'Address',
    postalCode: 'Postal code',
    city: 'City',
    givenName: 'Given Name',
    familyName: 'Family Name',
    memberOf: '$t(g2.organization)',
    email: 'Email Address',
    phone: 'Phone Number',
    sendVerifyEmail: 'Send email verification to the email address',
    sendResetPassword: 'Send password reset email to the user',
    user: 'User',
    completeThePassword: 'You must provide the password',
    passWordLongerThan8: 'The password must be at least 8 characters long',
    samePasswordCheck: 'You must enter a password identical to the first one',
    newPassword: 'New Password',
    passwordCheck: 'Password Confirmation',
    cancel: 'Cancel',
    confirm: 'Confirm',
    password: 'Password',
    changePassword: 'Change Password',
    passwordChangement: 'Password Change',
    passwordEmail:
      "An email to change the password will be sent to your account's email address.",
    clear: 'Clear',
    accept: 'Accept',
    today: 'Today',
    addImages: 'Add one or more images',
    gallery: 'Gallery',
    save: 'Save',
    copySuccess: 'Already copied, click here to re-copy',
    copyToClipboard: 'Copy to clipboard',
    required: 'Required',
    noData: 'No data found',
    noOrganization: 'You are not included in an organization',
    totalItem: '{{start}} - {{end}} of {{total}}'
  },
  http: {
    '600': '{{errorMessage}} due to a network issue',
    '401': 'You are trying to access a ressource you are not authorized to',
    '500':
      '{{errorMessage}} due to a technical issue, if this error occurs again please contact an administrator',
    backendErrors: {},
    errors: {
      organizationPage: 'The list of organizations could not be retrieved',
      organizationGet: 'The organization details could not be retrieved',
      organizationUpdate: 'The organization could not be updated',
      organizationCreate: 'The organization could not be created',
      organizationUploadLogo: "The organization's logo could not be uploaded",
      organizationDisable: 'The organization could not be deleted',
      userPage: 'The list of users could not be retrieved',
      userGet: 'User details could not be retrieved',
      userUpdate: 'The user could not be updated',
      userCreate: 'The user could not be created',
      userUpdatePassword: "The user's password could not be updated",
      userResetPassword:
        "The request to reset the user's password could not be sent",
      userUpdateEmail: "The user's email could not be updated",
      userDisable: 'The user could not be deleted'
    },
    success: {
      organizationUpdate: 'The organization has been updated successfully',
      organizationCreate: 'The organization has been created successfully',
      organizationDisable: 'The organization has been deleted successfully',
      userUpdate: 'The user has been updated successfully',
      userCreate: 'The user has been created successfully',
      userUpdatePassword: "The user's password has been updated successfully",
      userResetPassword:
        "The request to reset the user's password has been sent successfully",
      userDisable: 'The user has been deleted successfully'
    }
  }
}
