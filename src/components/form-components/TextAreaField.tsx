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
	focusColor = 'focus:border-primary',
}) => (
	<div className="flex flex-col gap-1">
		<label className="text-sm font-medium text-primary">{label}</label>
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			rows={rows}
			placeholder={placeholder}
			className={`w-full py-2.5 px-1 border-b border-primary/30 outline-none bg-transparent resize-none transition-colors duration-200 placeholder:text-primary/30 ${focusColor}`}
		/>
	</div>
);

export default TextAreaField;
