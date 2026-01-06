interface InputAliasProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputAlias({ value, onChange }: InputAliasProps) {
  return (
    <div>
			<label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
				Link encurtado
			</label>
			<input
			type="text"
			id="alias"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder="meu-link"
			className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			required
			/>
		</div>
  );
}