import React from 'react';

interface TextAreaFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	rows?: number;
	placeholder?: string;
	focusColor: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
	label,
	name,
	value,
	onChange,
	rows = 3,
	placeholder,
	focusColor = 'focus:border-primary focus:ring-primary',
}) => (
	<div>
		<label className="block  text-primary">{label}</label>
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			rows={rows}
			placeholder={placeholder}
			className={`w-full mt-1 h-12 p-1 border-b border-gray-300 outline-none bg-transparent ${focusColor}`}
		/>
	</div>
);

export default TextAreaField;
