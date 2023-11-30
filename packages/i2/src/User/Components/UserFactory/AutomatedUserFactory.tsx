import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import { OrganizationId } from '../../../Organization'
import { User } from '../../Domain'
import { ReadOnlyFields, UserFactory, UserFactoryProps } from './UserFactory'
import {
  CreateUserOptions,
  GetUserOptions,
  UpdateUserOptions,
  useCreateUser,
  useGetUser,
  userExistsByEmail,
  UserUpdateEmailOptions,
  useUpdateUser,
  useUserUpdateEmail
} from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { useQueryClient } from '@tanstack/react-query'
import {
  ChoicedResetPassword,
  ChoicedResetPasswordProps
} from '../UserResetPassword'

export type ReadOnlyUserFieldsPerState = {
  create?: ReadOnlyFields
  /**
   * @default {memberOf: true, email: true, roles:true }
   */
  update?: ReadOnlyFields
}

export interface AutomatedUserFactoryBasicProps extends BasicProps {
  /**
   * The getUser hook options
   */
  getUserOptions?: GetUserOptions
  /**
   * The updateUser hook options
   */
  updateUserOptions?: UpdateUserOptions
  /**
   * The createUser hook options
   */
  createUserOptions?: CreateUserOptions
  /**
   * The userUpdateEmail hook options
   */
  userUpdateEmailOptions?: UserUpdateEmailOptions
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The organizationId of the user.⚠️ You have to provide it if `update` is false and the organization module is activated
   */
  organizationId?: OrganizationId
  /**
   * The user id to provide if it's an updation
   */
  userId?: string
  /**
   * The fields readOnly attributes for the current state
   */
  readOnlyFieldsPerState?: ReadOnlyUserFieldsPerState
  /**
   * The props passed to the component ChoicedResetPassword
   */
  choicedResetPasswordProps?: ChoicedResetPasswordProps
  /**
   * The type of the reset password. If not provided the component will not be rendered
   */
  resetPasswordType?: 'email' | 'forced'
  /**
   * The attributes to add in the user object on submission
   */
  attributes?: any
}

export type AutomatedUserFactoryProps = MergeMuiElementProps<
  UserFactoryProps,
  AutomatedUserFactoryBasicProps
>

export const AutomatedUserFactory = (props: AutomatedUserFactoryProps) => {
  const {
    userId,
    update = false,
    organizationId,
    readOnlyFieldsPerState,
    getUserOptions,
    updateUserOptions,
    createUserOptions,
    choicedResetPasswordProps,
    resetPasswordType,
    userUpdateEmailOptions,
    attributes,
    formExtension,
    ...other
  } = props

  const { keycloak } = useAuth()
  const queryClient = useQueryClient()

  const getUser = useGetUser({
    apiUrl: i2Config().url,
    jwt: keycloak.token,
    userId: userId,
    options: getUserOptions
  })

  const updateUserOptionsMemo = useMemo(
    () => ({
      ...updateUserOptions,
      onSuccess: (data, variables, context) => {
        getUser.refetch()
        queryClient.invalidateQueries({ queryKey: ['users'] })
        updateUserOptions?.onSuccess &&
          updateUserOptions.onSuccess(data, variables, context)
      }
    }),
    [updateUserOptions, getUser, queryClient.invalidateQueries]
  )

  const createUserOptionsMemo = useMemo(
    () => ({
      ...createUserOptions,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        createUserOptions?.onSuccess &&
          createUserOptions.onSuccess(data, variables, context)
      }
    }),
    [createUserOptions, queryClient.invalidateQueries]
  )

  const updateUser = useUpdateUser({
    apiUrl: i2Config().url,
    jwt: keycloak.token,
    options: updateUserOptionsMemo
  })

  const createUser = useCreateUser({
    apiUrl: i2Config().url,
    jwt: keycloak.token,
    options: createUserOptionsMemo,
    organizationId: organizationId
  })

  const updateEmail = useUserUpdateEmail({
    apiUrl: i2Config().url,
    jwt: keycloak.token,
    options: userUpdateEmailOptions
  })

  const updateUserMemoized = useCallback(
    async (user: User) => {
      const results: Promise<any>[] = []
      results.push(updateUser.mutateAsync({ ...user, ...attributes }))
      if (getUser.data?.email !== user.email) {
        results.push(
          updateEmail.mutateAsync({
            email: user.email,
            id: user.id
          })
        )
      }
      const res = await Promise.all(results)
      for (let it in res) {
        const result = res[it]
        if (!result) return false
      }
      return true
    },
    [
      updateUser.mutateAsync,
      updateEmail.mutateAsync,
      getUser.data?.email,
      attributes
    ]
  )

  const createUserMemoized = useCallback(
    async (user: User) => {
      const res = await createUser.mutateAsync({ ...user, ...attributes })
      if (res) {
        return true
      } else {
        return false
      }
    },
    [createUser.mutateAsync, attributes]
  )

  const checkEmailValidity = useCallback(
    async (email: string) => {
      return userExistsByEmail(email, i2Config().url, keycloak.token)
    },
    [keycloak.token]
  )

  return (
    <UserFactory
      user={getUser.data}
      onSubmit={update ? updateUserMemoized : createUserMemoized}
      isUpdate={update}
      isLoading={getUser.isLoading}
      organizationId={organizationId}
      checkEmailValidity={checkEmailValidity}
      formExtension={
        <>
          {formExtension}
          {userId && resetPasswordType && (
            <ChoicedResetPassword
              resetPasswordType={resetPasswordType}
              userId={userId}
              {...choicedResetPasswordProps}
            />
          )}
        </>
      }
      readOnlyFields={
        update
          ? {
              memberOf: true,
              email: false,
              roles: true,
              ...readOnlyFieldsPerState?.update
            }
          : readOnlyFieldsPerState?.create
      }
      {...other}
    />
  )
}
