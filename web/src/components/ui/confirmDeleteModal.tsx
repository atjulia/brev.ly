interface ConfirmDeleteModalProps {
  isOpen: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDeleteModal({
  isOpen,
  title = 'Excluir link',
  description = 'Tem certeza que deseja excluir este link? Essa ação não pode ser desfeita.',
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
