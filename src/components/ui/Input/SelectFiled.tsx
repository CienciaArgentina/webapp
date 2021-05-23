import React from 'react'
import { ScienceInput, ScienceInputProps, ValidationResult } from './ScienceInput'
import { InputContainer, InputError, InputLabel, InputRoot } from './InputStyles'

export type SelectFieldValue = string | number | undefined

export interface InputValueOption {
	label?: string | number
	value: string | number
}

interface SelectFieldProps extends ScienceInputProps {
	/**Options to select in input */
	options: InputValueOption[]
}

export class SelectField extends ScienceInput<SelectFieldProps> {
	public static defaultProps = {
	}
	constructor(props:SelectFieldProps) {
		super(props)
		this.inputRef = React.createRef<HTMLSelectElement>()
	}
	inputRef:React.RefObject<HTMLSelectElement>

	validate = (value:SelectFieldValue):ValidationResult => {
		if(!!this.props.required) {
			return typeof value !== 'undefined'
		} else {
			return true
		}
	}
	getValue = ():SelectFieldValue => {
		const value = this.inputRef.current?.value || undefined
		return value
	}
	render() {
		return (
				<InputRoot
					style={this.props.style}
					className={this.props.className}
					>
					<InputContainer
						error={!!this.state.render_error}
						hasValue = {this.state.input_value!==undefined} >
						{!!this.props.label &&
							<InputLabel required={this.props.required}>{this.props.label}</InputLabel>
						}
						<select
							name = {this.props.name}
							ref = {this.inputRef}
							value = {this.state.input_value}
							onChange = {this.onChange}
							required = {this.props.required}
						>
							<option selected={this.state.input_value===undefined} disabled></option>
							{this.props.options.map( (option, i) => (
								<option key={i} value={option.value} selected={this.state.input_value===option.value}>
									{option.label!==undefined ? option.label : option.value}
								</option>
							))}
						</select>
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
	<SelectField
		label='Número favorito'
		options={[
			{value: 1, label: 'Uno'},
			{value: 2, label: 'Dos'},
			{value: 3, label: 'Tres'},
		]}
		onChange={( { is_valid } ) => { console.log(is_valid); }}
		required
		validations={[
			(v:SelectFieldValue):ValidationResult => v!==3 || 'No me gusta el 3, elegí otro'
		]}
	/>
)