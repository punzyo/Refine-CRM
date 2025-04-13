import { useCreate, useNotification, useTranslate } from '@refinedev/core'

export const useCustomCreate = () => {
  const { mutate, isLoading } = useCreate()
  const { open } = useNotification()
  const translate = useTranslate()
  interface handleCreateProps {
    resource: string
    values: any
    successMessageKey?: string
    successMessageDefault?: string
    errorMessagePrefix?: string
    errorDescriptionKey?: string
    errorDescriptionDefault?: string
    onSuccess?: (data: any) => void
    onError?: (error: any) => void
  }
  const handleCreate = async ({
    resource,
    values,
    successMessageKey = 'messages.createSuccess',
    successMessageDefault = '建立成功',
    errorMessagePrefix = 'errors',
    errorDescriptionKey = 'messages.createFail',
    errorDescriptionDefault = '建立失敗',
    onSuccess,
    onError,
  }: handleCreateProps) => {
    return new Promise<boolean>((resolve) => {
      mutate(
        { resource, values, successNotification: false, errorNotification: false },
        {
          onSuccess: (data) => {
            const successMessage = data?.data?.message
              ? translate('server.' + data.data.message, data.data.message)
              : translate(successMessageKey, successMessageDefault)

            open?.({
              type: 'success',
              message: successMessage,
            })
            onSuccess?.(data)
            resolve(true)
          },
          onError: (error) => {
            const errorData = error?.response?.data || {}
            const code = errorData.code
            const serverMessage = errorData.message

            let errorMessage
            if (code) {
              errorMessage = translate(
                `${errorMessagePrefix}.${code}`,
                serverMessage
                  ? translate(`server.${serverMessage}`, serverMessage)
                  : errorDescriptionDefault
              )
            } else if (serverMessage) {
              errorMessage = translate(`server.${serverMessage}`, serverMessage)
            } else {
              errorMessage = translate(errorDescriptionKey, errorDescriptionDefault)
            }

            open?.({
              type: 'error',
              message: errorMessage,
              description: translate(errorDescriptionKey, errorDescriptionDefault),
            })
            onError?.(error)
            resolve(false)
          },
        }
      )
    })
  }

  return { handleCreate, isLoading }
}
