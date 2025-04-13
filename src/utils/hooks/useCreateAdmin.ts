import { useCreate, useNotification } from '@refinedev/core'

export const useCustomCreate = () => {
  const { mutate, isLoading } = useCreate()
  const { open } = useNotification()

 const handleCreate = async ({
   resource,
   values,
   onSuccess,
   onError,
 }: {
   resource: string
   values: any
   onSuccess?: (data: any) => void
   onError?: (error: any) => void
 }) => {
   return new Promise<boolean>((resolve) => {
     mutate(
       { resource, values, successNotification: false, errorNotification: false },
       {
         onSuccess: (data) => {
           open?.({
             type: 'success',
             message: data?.data?.message || '建立成功',
           })
           onSuccess?.(data)
           resolve(true)
         },
         onError: (error) => {
           const message = error?.response?.data?.message || error?.message || '建立失敗'
           open?.({
             type: 'error',
             message,
             description: '建立失敗',
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
