import { SpelExpressionEvaluator } from 'spel2js'
import { FieldValidatorFnc } from '../FormComposable'
import { AdditionalOperation, RulesLogic, apply } from 'json-logic-js'

export interface ConditionBase {
  type: string
  expression?: string
  logic?: RulesLogic<AdditionalOperation>
}

export interface DisplayCondition extends ConditionBase {
  type: 'display'
}

export interface EnableCondition extends ConditionBase {
  type: 'enable'
}

export interface ValidatorCondition extends ConditionBase {
  type: 'validator'
  error: string
}

export interface MessageCondition extends ConditionBase {
  type: 'info' | 'error' | 'warning'
  message: string
}

export type Condition = DisplayCondition | ValidatorCondition | EnableCondition
export type SectionCondition = DisplayCondition | MessageCondition

export const evalCondition = (
  condition: ConditionBase,
  locals: any
): boolean => {
  if (condition.logic) {
    return apply(condition.logic, locals)
  }
  if (condition.expression) {
    const properLocals = localsUndefinedToNull(condition.expression, locals)
    properLocals.now = Date.now()
    return SpelExpressionEvaluator.eval(
      condition.expression,
      null,
      properLocals
    )
  }
  return false
}

export const evalConditions = (
  type: Condition['type'],
  conditions?: ConditionBase[],
  values?: any
): boolean => {
  if (!conditions) return true
  const displayConditions = conditions.filter((cond) => cond.type === type)
  if (displayConditions.length === 0) return true
  return displayConditions.every((cond) => evalCondition(cond, values))
}

export const evalDisplayConditions = (
  conditions?: ConditionBase[],
  values?: any
): boolean => {
  return evalConditions('display', conditions, values)
}

export const evalEnableConditions = (
  conditions?: ConditionBase[],
  values?: any
): boolean => {
  return evalConditions('enable', conditions, values)
}

export const evalMessageConditions = (
  conditions?: ConditionBase[],
  values?: any
): MessageCondition | undefined => {
  if (!conditions) return undefined
  const messageConditions = conditions.filter(
    (cond) => cond.type === 'message'
  ) as MessageCondition[]
  return messageConditions.find((cond) => evalCondition(cond, values))
}

export const validateConditions =
  (conditions: Condition[]): FieldValidatorFnc =>
  (_?: any, values?: any) => {
    //@ts-ignore
    const validatorConditions: ValidatorCondition[] = conditions.filter(
      (cond) => cond.type === 'validator'
    )
    for (const cond of validatorConditions) {
      if (evalCondition(cond, values)) return cond.error
    }
    return
  }

export const requiredFieldConditions = (
  t: (key: string) => string,
  fieldName: string
): Condition => {
  let name = fieldName
  if (name.includes('.')) {
    name = name.replaceAll('.', '?.')
  }
  return {
    type: 'validator',
    expression: `#${name} == null || #${name}?.length == 0 || #${name} == '' `,
    error: t('g2.fieldRequired')
  }
}

const localsUndefinedToNull = (expression: string, locals: any) => {
  const copy = {
    ...locals
  }
  const values = expression
    .split(' ')
    .filter((str) => str.includes('#') && !str.includes('.'))
    .map((value) => value.replace('#', ''))
  values.forEach((value) => {
    copy[value] = copy[value] ?? null
  })
  return copy
}
