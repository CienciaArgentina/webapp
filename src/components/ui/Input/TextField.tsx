import React from 'react'
import { ScienceInput, ScienceInputProps, ValidationResult } from './ScienceInput'
import { InputContainer, InputError, InputLabel, InputRoot } from './InputStyles'

interface TextFieldProps extends ScienceInputProps {
	/** Type of text input.*/
	type: 'text' | 'number' | 'email' | 'password';
	/** Minimum amount of characters in string.*/
	minLength?: number;
	/** Maximum amount of characters in string.*/
	maxLength?: number;
	min?: number;
	max?: number;
	autoComplete?: boolean;
}

export class TextField extends ScienceInput<TextFieldProps> {
	public static defaultProps = {
		type: 'text'
	}
	constructor(props:TextFieldProps) {
		super(props)
		this.inputRef = React.createRef<HTMLInputElement>()
	}
	inputRef:React.RefObject<HTMLInputElement>

	validate = (value:string):ValidationResult => {
		return !!this.props.required && !!value
	}
	getValue = ():string|number => {
		const value = this.inputRef.current?.value || ''
		return value
	}
	render() {
		const type:TextFieldProps['type'] = this.props.type
		const autoComplete = typeof this.props.autoComplete=='undefined' ? undefined : (this.props.autoComplete ? 'on' : 'off')
		return (
				<InputRoot
					style={this.props.style}
					className={this.props.className}
					>
					<InputContainer
						error={!!this.state.render_error}
						hasValue = {!!this.state.input_value} >
						{!!this.props.label &&
							<InputLabel required={this.props.required}>{this.props.label}</InputLabel>
						}
						<input
							name = {this.props.name}
							required = {this.props.required}
							onChange = {this.onChange}
							value = {this.state.input_value}
							ref = {this.inputRef}
							type = {type}
							min = {this.props.min}
							max = {this.props.max}
							autoComplete={autoComplete}
						/>
					</InputContainer>
					{(!!this.state.error_message) && this.state.render_error &&
						<InputError>{this.state.error_message}</InputError>
					}
				</InputRoot>
		)
	}
}

//**Example */
() => (
	<TextField
		onChange={( { is_valid } ) => { console.log(is_valid); }}
		validations={[
			(v:string):ValidationResult => v!='' || 'Invalid name!'
		]}
	/>
)