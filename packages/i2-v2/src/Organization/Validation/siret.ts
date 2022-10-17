import { PotentialError } from '@smartb/g2-forms'

export const siretValidation = (
  value?: string,
  readonly?: boolean
): PotentialError => {
  if (readonly) return undefined
  const trimmed = value?.trim()
  if (!!trimmed && trimmed?.length !== 14 && trimmed?.length !== 0)
    return 'un numéro de siret doit être composé de 14 chiffres'
  return
}