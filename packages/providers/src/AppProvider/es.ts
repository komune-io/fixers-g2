const es = {
  es: {
    fieldRequired: 'Este campo es obligatorio',
    fileRequired: 'Debe insertar este archivo: {{fileDesc}}',
    needFieldAbove0: 'El valor debe ser mayor que 0',
    needFieldPositive: 'El valor debe ser mayor o igual a 0',
    phoneNeedsToHave10Digits: 'El número de teléfono debe tener diez dígitos',
    incorrectEmail: 'El correo electrónico ingresado es incorrecto',
    requiredStreet:
      'Debe proporcionar la dirección además de la ciudad y el código postal',
    requiredPostalCode:
      'Debe proporcionar el código postal para una dirección completa',
    requiredCity: 'Debe proporcionar la ciudad para una dirección completa',
    emailAlreadyUsed: 'Este correo electrónico ya está en uso',
    completeTheEmail: 'Debe completar el correo electrónico',
    enterAValidEmail: 'El correo electrónico ingresado es incorrecto',
    siretNotFound:
      'No se encontró información. Por favor, ingrese manualmente la siguiente información',
    siretDescription:
      'El número SIRET completará automáticamente algunos de los siguientes campos',
    addPicture: 'Agregar una imagen',
    removePicture: 'Eliminar la imagen',
    'file-invalid-type':
      'Su archivo debe estar en el siguiente formato: {{formats}}',
    'file-too-large': 'Su archivo no debe exceder {{sizeLimit}}MB',
    'too-many-files': 'Solo puede agregar un archivo a la vez',
    or: 'o',
    Required: 'Obligatorio',
    openFullScreen: 'Abrir en pantalla completa',
    canDrag: 'Puede mover este punto',
    addMarker: 'Agregar un marcador',
    useMyPosition: 'Usar mi posición',
    logo: 'Logo de la empresa',
    siret: 'Número SIRET',
    name: 'Nombre',
    roles: 'Roles',
    facultativeField: '{{label}} (opcional)',
    website: 'Sitio web',
    description: 'Descripción',
    organization: 'Organización',
    address: 'Dirección',
    postalCode: 'Código postal',
    city: 'Ciudad',
    givenName: 'Nombre',
    familyName: 'Apellido',
    memberOf: '$t(g2.organization)',
    email: 'Dirección de correo electrónico',
    phone: 'Número de teléfono',
    sendVerifyEmail:
      'Enviar verificación de correo electrónico a la dirección de correo',
    sendResetPassword:
      'Enviar correo de restablecimiento de contraseña al usuario',
    user: 'Usuario',
    completeThePassword: 'Debe proporcionar la contraseña',
    passWordLongerThan8: 'La contraseña debe tener al menos 8 caracteres',
    samePasswordCheck: 'Debe ingresar una contraseña idéntica a la primera',
    newPassword: 'Nueva contraseña',
    passwordCheck: 'Confirmación de contraseña',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    password: 'Contraseña',
    changePassword: 'Cambiar contraseña',
    passwordChangement: 'Cambio de contraseña',
    passwordEmail:
      'Se enviará un correo electrónico para cambiar la contraseña a la dirección de correo de su cuenta.',
    clear: 'Limpiar',
    accept: 'Aceptar',
    today: 'Hoy',
    addImages: 'Agregar una o más imágenes',
    gallery: 'Galería',
    save: 'Guardar',
    copySuccess: 'Ya copiado, haga clic aquí para volver a copiar',
    copyToClipboard: 'Copiar al portapapeles',
    required: 'Obligatorio',
    noData: 'No se encontraron datos',
    noOrganization: 'No está incluido en una organización',
    toFilter: 'Filtrar',
    toFilterCount: 'Filtrar ({{count}})',
    apply: 'Aplicar',
    clearFilters: 'Limpiar filtros',
    totalItem: '{{start}} - {{end}} de {{total}}',
    title: 'Título',
    text: 'Texto'
  },
  http: {
    '600': '{{errorMessage}} debido a un problema de red',
    '401': 'Está intentando acceder a un recurso al que no está autorizado',
    '500':
      '{{errorMessage}} debido a un problema técnico, si este error ocurre nuevamente, por favor contacte a un administrador',
    backendErrors: {},
    errors: {
      organizationPage: 'No se pudo recuperar la lista de organizaciones',
      organizationGet:
        'No se pudieron recuperar los detalles de la organización',
      organizationUpdate: 'No se pudo actualizar la organización',
      organizationCreate: 'No se pudo crear la organización',
      organizationUploadLogo: 'No se pudo cargar el logo de la organización',
      organizationDisable: 'No se pudo eliminar la organización',
      userPage: 'No se pudo recuperar la lista de usuarios',
      userGet: 'No se pudieron recuperar los detalles del usuario',
      userUpdate: 'No se pudo actualizar el usuario',
      userCreate: 'No se pudo crear el usuario',
      userUpdatePassword: 'No se pudo actualizar la contraseña del usuario',
      userResetPassword:
        'No se pudo enviar la solicitud para restablecer la contraseña del usuario',
      userUpdateEmail:
        'No se pudo actualizar el correo electrónico del usuario',
      userDisable: 'No se pudo eliminar el usuario'
    },
    success: {
      organizationUpdate: 'La organización se ha actualizado con éxito',
      organizationCreate: 'La organización se ha creado con éxito',
      organizationDisable: 'La organización se ha eliminado con éxito',
      userUpdate: 'El usuario se ha actualizado con éxito',
      userCreate: 'El usuario se ha creado con éxito',
      userUpdatePassword:
        'La contraseña del usuario se ha actualizado con éxito',
      userResetPassword:
        'La solicitud para restablecer la contraseña del usuario se ha enviado con éxito',
      userDisable: 'El usuario se ha eliminado con éxito'
    }
  }
}
