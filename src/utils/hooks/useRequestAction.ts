import {
  useCreate,
  useCustomMutation,
  useDelete,
  useNotification,
  useTranslate,
  useUpdate,
} from '@refinedev/core'

export const useRequestAction = () => {
  const { mutate: createMutate, isLoading: isCreating } = useCreate()
  const { mutate: updateMutate, isLoading: isUpdating } = useUpdate()
  const { mutate: deleteMutate, isLoading: isDeleting } = useDelete()
  const { mutate: customMutate, isLoading: isCustomMutating } = useCustomMutation()
  const { open } = useNotification()
  const t = useTranslate()

  const isLoading = isCreating || isUpdating || isDeleting || isCustomMutating

  type MethodType = 'create' | 'update' | 'delete' | 'custom'

  interface HandleActionProps {
    method: MethodType
    resource?: string
    url?: string
    id?: string
    values?: any
    customMethod?: 'post' | 'patch' | 'put' | 'delete'
    successMessageKey?: string
    successMessageDefault?: string
    errorDescriptionKey?: string
    errorDescriptionDefault?: string
    onSuccess?: (data: any) => void
    onError?: (error: any) => void
  }

  const handleAction = async ({
    method,
    resource,
    url,
    id,
    values,
    customMethod,
    successMessageKey = 'messages.success',
    successMessageDefault = '操作成功',
    errorDescriptionKey = 'messages.operationFail',
    errorDescriptionDefault = '操作失敗',
    onSuccess,
    onError,
  }: HandleActionProps) => {
    return new Promise<boolean>((resolve) => {
      const successNotification = false
      const errorNotification = false

      const action =
        method === 'create'
          ? createMutate
          : method === 'update'
            ? updateMutate
            : method === 'delete'
              ? deleteMutate
              : customMutate

      const params =
        method === 'create'
          ? { resource, values, successNotification, errorNotification }
          : method === 'update'
            ? { resource, id, values, successNotification, errorNotification }
            : method === 'delete'
              ? { resource, id, successNotification, errorNotification }
              : method === 'custom'
                ? {
                    url,
                    method: customMethod || 'post',
                    values,
                    successNotification,
                    errorNotification,
                  }
                : {}

      if (method === 'custom' && (!url || !customMethod)) {
        console.error('custom 方法必須提供 url 和 customMethod')
        resolve(false)
        return
      }

      if ((method === 'create' || method === 'update' || method === 'delete') && !resource) {
        console.error(`${method} 方法必須提供 resource`)
        resolve(false)
        return
      }

      action(params as any, {
        onSuccess: (data) => {
          const successData = data?.data || {}
          const code = successData.code
          const serverMessage = successData.message

          const successMessage = code
            ? t(`success.${code}`, serverMessage || successMessageDefault)
            : serverMessage || t(successMessageKey, successMessageDefault)

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

          const errorMessage = code
            ? t(`errors.${code}`, serverMessage || errorDescriptionDefault)
            : serverMessage || t(errorDescriptionKey, errorDescriptionDefault)

          open?.({
            type: 'error',
            message: errorMessage,
            description: errorMessage,
          })

          onError?.(error)
          resolve(false)
        },
      })
    })
  }

  return { handleAction, isLoading }
}
