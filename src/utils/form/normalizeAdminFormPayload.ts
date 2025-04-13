export function normalizeAdminFormPayload({
  payload,
  isEdit,
}: {
  payload: Record<string, any>
  isEdit: boolean
}) {
  const { confirmPassword, ...rest } = payload
  return isEdit ? payload : rest
}
