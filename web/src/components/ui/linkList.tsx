interface LinkListProps {
  links?: string[]
}

export function LinkList({ links = [] }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">Nenhum link encurtado ainda</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-md border border-gray-200 shadow-sm"
        >
          <p className="text-sm text-gray-700 truncate">{link}</p>
        </div>
      ))}
    </div>
  )
}
