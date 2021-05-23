import React from 'react'
import { ScienceInput, ScienceInputProps, ValidationResult } from './ScienceInput'
import { InputContainer, InputError, InputLabel, InputRoot, ExtraInput, InputHelper } from './InputStyles'

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
	/** Text to show before the input */
	preInputText?: string;
	/** Text to show after the input */
	postInputText?: string;
	/** Helper text below the input */
	helperText?: string
}

interface TextFieldState {
	pre_input_width: number,
	post_input_width: number,
}


export class TextField extends ScienceInput<TextFieldProps, TextFieldState> {
	public static defaultProps = {
		type: 'text'
	}
	constructor(props:TextFieldProps) {
		super(props, {
			pre_input_width: 0,
			post_input_width: 0
		})
		this.inputRef = React.createRef<HTMLInputElement>()
		this.preInputRef = React.createRef()
		this.postInputRef = React.createRef()
	}
	inputRef:React.RefObject<HTMLInputElement>
	preInputRef:React.RefObject<HTMLDivElement>
	postInputRef:React.RefObject<HTMLDivElement>

	validate = (value:string):ValidationResult => {
		if(!!this.props.required) {
			return !!value
		} else {
			return true
		}
	}
	getValue = ():string|number => {
		const value = this.inputRef.current?.value || ''
		return value
	}
	resizeExtra = (type:'pre'|'post', width:number|undefined) => {
		// console.log(width);
		
		this.setState( (prevState) => {
			const prop = `${type}_input_width`
			return {
				...prevState,
				[prop]: width
			}
		})
	}
	componentDidUpdate( prevProps:TextFieldProps ) {
		if(prevProps.preInputText !== this.props.preInputText) {
			this.resizeExtra('pre', this.preInputRef.current?.offsetWidth || 0)
		}
		if(prevProps.postInputText !== this.props.postInputText) {
			this.resizeExtra('post', this.postInputRef.current?.offsetWidth || 0)
		}
	}
	componentDidMount() {
		this.resizeExtra('pre', this.preInputRef.current?.offsetWidth || 0)
		this.resizeExtra('post', this.postInputRef.current?.offsetWidth || 0)
	}
	render() {
		const type:TextFieldProps['type'] = this.props.type
		const autoComplete = typeof this.props.autoComplete=='undefined' ? undefined : (this.props.autoComplete ? 'on' : 'off')
		const hasValue = !!this.state.input_value
		const showError:boolean = (!!this.state.error_message) && this.state.render_error
		const hasPreInput:boolean = !!this.props.preInputText
		const hasPostInput:boolean = !!this.props.postInputText

		return (
				<InputRoot
					style={this.props.style}
					className={this.props.className}
					>
					<InputContainer
						error={!!this.state.render_error}
						hasValue = {hasValue}
						onClick={() => this.inputRef.current?.focus()}
						preInputWidth={this.state.pre_input_width}
						postInputWidth={this.state.post_input_width}
					>
						{hasPreInput && //only observe when it exists
							<ExtraInput ref={this.preInputRef} pre show={hasValue || !this.props.label}>
								{this.props.preInputText}
							</ExtraInput>
						}
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
						{hasPostInput&&
							<ExtraInput ref={this.postInputRef} post show={hasValue || !this.props.label}>
								{this.props.postInputText}
							</ExtraInput>
						}
						</InputContainer>
					{showError ?
						<InputError>{this.state.error_message}</InputError>
						:
						!!this.props.helperText && <InputHelper>{this.props.helperText}</InputHelper>
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