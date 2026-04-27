import React from 'react';

interface InputFieldProps {
	label: string;
	name: string;
	type?: string;
	required?: boolean;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	focusColor: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type = 'text',
	required = false,
	value,
	onChange,
	placeholder,
	focusColor,
}) => (
	<div>
		<label className="block   text-primary">
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<input
			type={type}
			name={name}
			required={required}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`w-full mt-1 h-12 p-1 border-b border-gray-300 outline-none bg-transparent ${focusColor}`}
		/>
	</div>
);

export default InputField;
