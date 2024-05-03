import { I18n } from '../G2I18n'

export const fr: I18n = {
  g2: {
    fieldRequired: 'Ce champ est obligatoire',
    fileRequired: 'Vous devez insérer ce fichier: {{fileDesc}}',
    needFieldAbove0: 'La valeur doit être supérieure à 0',
    needFieldPositive: 'La valeur doit être supérieure ou égale à 0',
    phoneNeedsToHave10Digits:
      'Le numéro de téléphone doit contenir dix chiffres',
    incorrectEmail: "L'email renseigné n'est pas correct",
    requiredStreet:
      "Vous devez renseigner l'addresse en plus de la ville et du code postal",
    requiredPostalCode:
      'Vous devez renseigner le code postal pour avoir une adresse complète',
    requiredCity:
      'Vous devez renseigner la ville pour avoir une adresse complète',
    emailAlreadyUsed: 'Cet email est déjà utilisé',
    completeTheEmail: 'Vous devez renseigner le mail',
    enterAValidEmail: "L'email renseigné n'est pas correct",
    siretNotFound:
      'Aucune information trouvé. Saisissez les informations ci-dessous manuellement',
    siretDescription:
      'Le numéro de siret permettra de remplir automatiquement une partie des champs suivants',
    addPicture: 'Ajouter une image',
    removePicture: "Retirer l'image",
    'file-invalid-type': 'Les fichiers doivent être au format: {{formats}}',
    'file-too-large': 'Les fichiers ne devrait pas dépasser {{sizeLimit}}Mo',
    'too-many-files': "Vous ne pouvez ajouter qu'un seul fichier à la fois",
    or: 'ou',
    Required: 'Obligatoire',
    openFullScreen: 'Ouvrir en pleine écran',
    canDrag: 'Vous pouvez déplacer ce point',
    addMarker: 'Ajouter un marker',
    useMyPosition: 'Utiliser ma position',
    logo: "Logo de l'entreprise",
    siret: 'Numéro de siret',
    name: 'Nom',
    roles: 'Rôle',
    facultativeField: '{{label}} (facultatif)',
    website: 'Site web',
    description: 'Description',
    organization: 'Organisation',
    address: 'Adresse',
    postalCode: 'Code postal',
    city: 'Ville',
    givenName: 'Prénom',
    familyName: 'Nom de famille',
    memberOf: '$t(g2.organization)',
    email: 'Adresse mail',
    phone: 'Numéro de téléphone',
    sendVerifyEmail: "Envoyer le mail de vérification de l'adresse email",
    sendResetPassword:
      "Envoyer le mail de création de son mot de passe à l'utilisateur",
    user: 'Utilisateur',
    completeThePassword: 'Vous devez renseigner le mot de passe',
    passWordLongerThan8:
      "Le mot de passe doit être composé d'au minimum 8 caractères",
    samePasswordCheck:
      'Vous devez renseigner un mot de passe identique au premier',
    newPassword: 'Nouveau mot de passe',
    passwordCheck: 'Vérification du mot de passe',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    password: 'Mot de passe',
    changePassword: 'Changer le mot de passe',
    passwordChangement: 'Changement de mot de passe',
    passwordEmail:
      "Un email pour effectuer le changement de mot de passe va être envoyé à l'adresse email de votre compte.",
    clear: 'Vider',
    accept: 'Valider',
    today: "Aujourd'hui",
    addImages: 'Ajouter une ou plusieurs images',
    gallery: 'Galerie',
    save: 'Enregistrer',
    copySuccess: 'Déjà copié, cliquez ici pour re-copier',
    copyToClipboard: 'Copier dans le presse papier',
    required: 'Obligatoire',
    noData: 'Aucune donnée trouvé',
    noOrganization: "Vous n'êtes pas inclut dans une organisation",
    totalItem: '{{start}} - {{end}} sur {{total}}'
  },
  http: {
    '600': "{{errorMessage}} à cause d'un problème de connexion",
    '401':
      "Vous essayez d'accéder à une ressource à laquelle vous n'êtes pas autorisé",
    '500':
      "{{errorMessage}} à cause d'un problème technique, si ce problème persiste contactez un administrateur",
    backendErrors: {},
    errors: {
      organizationPage: "La liste des organisations n'a pas pu être récupérée",
      organizationGet: "Le détail de l'organisation n'a pas pu être répuré",
      organizationUpdate: "L'organisation n'a pas pu être mise à jour",
      organizationCreate: "L'organisation n'a pas pu être créée",
      organizationUploadLogo: "Le logo de l'organisation n'a pu être envoyé",
      organizationDisable: "L'organisation n'a pas pu être supprimée",
      userPage: "La liste des utilisateurs n'a pas pu être récupérée",
      userGet: "le détail de l'utlisateur n'a pas pu être répuré",
      userUpdate: "L'utilisateur n'a pas pu être mis à jour",
      userCreate: "L'utilisateur n'a pas pu être créé",
      userUpdatePassword:
        "Le mot de passe de l'utlisateur n'a pas pu être mis à jour",
      userResetPassword:
        "La demande de renouvellement de mot de passe de l'utlisateur n'a pas pu être envoyée",
      userUpdateEmail: "L'email de l'utilisateur n'a pas pu être mis à jour",
      userDisable: "L'utilisateur n'a pas pu être supprimé"
    },
    success: {
      organizationUpdate: "L'organisation a bien été mise à jour",
      organizationCreate: "L'organisation a bien été créée",
      organizationDisable: "L'organisation a bien été supprimée",
      userUpdate: "L'utilisateur a bien été mis à jour",
      userCreate: "L'utilisateur a bien été créé",
      userUpdatePassword:
        "Le mot de passe de l'utlisateur a bien été mis à jour",
      userResetPassword:
        "La demande de renouvellement de mot de passe de l'utlisateur a bien été envoyée",
      userDisable: "L'utilisateur a bien été supprimé"
    }
  }
}
