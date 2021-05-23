import React from 'react'
import { CSSProperties } from 'styled-components'
import { FormContext } from '../Form'
import { v4 as uuidv4 } from 'uuid';

export type ValidationResult = boolean|string

export interface ValidationFunction {
	(value:any):ValidationResult;
}

export interface OnChangeFunction {
	(e:{value: any, e: any, is_valid: boolean, is_invalid: boolean}):any
}

export interface ScienceInputProps {
	/** Input is required. */
	required?: boolean;
	/** Array of validation functions. */
	validations?: Array<ValidationFunction>;
	/** Default error message */
	errorMessage?: string;
	/** Generate error message from function. */
	getErrorMessage?: {(value:any):string};
	/** Execute after input changed. */
	onChange?: OnChangeFunction
	//** Label to display. */
	label?: string | number
	//** Show only when no value is present. */
	placeholder?: string | number
	//** Input name. */
	name?: string
	style?: CSSProperties
	className?: string
}
// export interface ScienceInputState {
// 	input_value:any;
// 	is_valid:boolean;
// 	render_error:boolean;
// 	error_message: string|boolean;
// }

export type ScienceInputState<T> = T & {
	input_value:any;
	is_valid:boolean;
	render_error:boolean;
	error_message: string|boolean;
}

type InputValidationResponse = {
	value: any,
	is_valid: boolean,
	is_invalid: boolean,
	error_message?: string | boolean
}

export abstract class ScienceInput<InputProps extends ScienceInputProps, InputState={}> extends React.Component<InputProps, ScienceInputState<InputState>> {
	static contextType = FormContext
	context!: React.ContextType<typeof FormContext>;
	input_id:string | null = null

	constructor(props:InputProps, childState:InputState) {
		super(props)
		const defaultState = {
			input_value: '',
			is_valid: false,
			render_error: false,
			error_message: false
		}
		this.state = {
			...childState,
			...defaultState
		}
	}

	//user defined functions
	abstract getValue():any
	validate: undefined | ValidationFunction = undefined
	afterChange = (value:any):void => {value}
	abstract inputRef: React.RefObject<any>
	//class functions
	setStateAsync = (updater:any):Promise<any> => new Promise((resolve) => {
		this.setState(updater, () => {resolve(true)})
	})
	componentDidMount() {
		const context = this.context
		if (context) {
			this.input_id =  uuidv4()
			context.addFormChildRef(this.input_id, this)
		}
		this.silentValidate()
		setTimeout(this.silentValidate, 500)
	}

	componentWillUnmount = () => {
		const context = this.context
		if (context && this.input_id) {
			context.removeFormChildRef(this.input_id)
		}
	}
	silentValidate = () => {
		this.validateInput(true)
	}
	onChange = (e:any):void => {
		this.validateInput().then(() => {
			//todo: if async validation, wait
			if(typeof this.props.onChange === 'function') {
				//execute custom onChange function
				this.props.onChange({
					value: this.state.input_value,
					e,
					is_valid: this.state.is_valid,
					is_invalid: !this.state.is_valid
				})
			} 
		})
	}
	updateErrorRender = () => {
		this.setState( (prevState:ScienceInputState<InputState>) => ({...prevState, render_error: !prevState.is_valid}) )
	}
	updateValue = async ():Promise<void> => {
		const input_value = this.getValue()
		await this.setStateAsync(() => ({input_value}))
	}
	setValid = async (is_valid:boolean, error_message:string|undefined):Promise<void> => {
		await this.setStateAsync(() => ({ is_valid, error_message: !is_valid ? ((!!error_message)&&error_message) : false }))
	}
	processValidationResponse = async (response: ValidationResult):Promise<boolean> => {
		if(typeof response === 'boolean') {
			//if valitation is boolean, use default error message
			await this.setValid(response, this.props.errorMessage )
			return response
		} else {
			//if validation response is string, use it as error message
			await this.setValid(false, response)
			return false
		}
	}
	getValidationResponse = () => {
		return {
			value: this.state.input_value,
			is_valid: this.state.is_valid,
			is_invalid: !this.state.is_valid,
			error_message: this.state.error_message
		}
	}
	validateInput = async (silent=false):Promise<InputValidationResponse> => {
		return new Promise((resolve) => {
			this.updateValue().then( async () => {
				const value = this.state.input_value
				if(this.validate) {
					const validation_response = this.validate( value )
					const is_valid:boolean = await this.processValidationResponse(validation_response)
					if(!silent) { this.updateErrorRender() }
					if(!is_valid){
						resolve(this.getValidationResponse())
						return
					}
				}
				const validations:undefined | Array<ValidationFunction> = this.props.validations
				if(validations) {
					for (const validation_fuction of validations) {
						const validation_response = validation_fuction( value )
						const is_valid:boolean = await this.processValidationResponse(validation_response)
						if(!silent) { this.updateErrorRender() }
						if(!is_valid){
							resolve(this.getValidationResponse())
							return
						}
					}
				}
				if(!silent) {
					this.updateErrorRender()
				}
				resolve(this.getValidationResponse())
				return
			})
		})
	}
}