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
	<div className="flex flex-col gap-1">
		<label className="text-sm font-medium text-primary">
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<input
			type={type}
			name={name}
			required={required}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`w-full py-2.5 px-1 border-b border-primary/30 outline-none bg-transparent transition-colors duration-200 placeholder:text-primary/30 ${focusColor}`}
		/>
	</div>
);

export default InputField;
