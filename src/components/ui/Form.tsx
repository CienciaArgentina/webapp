import serialize from "form-serialize";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { CSSProperties } from "styled-components";
import { ScienceInput } from "./Input/ScienceInput";

interface FormBaseProps {
	noPrevent?: boolean
	prevent?: boolean
	autoComplete?: boolean
	className?: string
	style?: CSSProperties
}

type SerializedFormParams<T_RESULT> = {
	e:FormEvent<HTMLFormElement>,
	values:T_RESULT
}
type UnserializedFormParams = {
	e:FormEvent<HTMLFormElement>
}

export type SerializedFormEvent<T_RESULT> = (result:SerializedFormParams<T_RESULT>) => void
export type UnserializedFormEvent = (result:UnserializedFormParams) => void

export type FormSerializedProps = FormBaseProps & {
	serialize: true
	hash?: boolean
	empty?: boolean
	onSubmit?: SerializedFormEvent<any>
}

export type FormUnserializedProps = FormBaseProps & {
	serialize?: false
	onSubmit?: UnserializedFormEvent
}


export type FormProps = FormSerializedProps | FormUnserializedProps

export const FormContext = React.createContext<{
	addFormChildRef:(id:string, ref:ScienceInput<any>) => void,
	removeFormChildRef:(id:string) => void
}|null>(null)

export const Form:FunctionComponent<FormProps> = ({
	noPrevent,
	prevent,
	autoComplete,
	children,
	className,
	style,
	...props
}) => {
	//Science childs
	const [ formChilds, setFormChilds ] = useState< { [id:string]: ScienceInput<any> } >({})
	const addFormChildRef = (id:string, ref:ScienceInput<any>) => {
		setFormChilds((prevState) => {
			return {
				...prevState,
				[id]: ref
			}
		})
	}
	const removeFormChildRef = (id:string) => {
		setFormChilds((prevState) => {
			let newState = {...prevState}
			delete newState[id]
			return newState
		})
	}
	//Submit FN
	const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
		if((typeof props.onSubmit == 'function' && !noPrevent) || prevent) {
			e.preventDefault()
		}
		const form = e.currentTarget
		let validations = Object.values(formChilds).map(input => input.validateInput())
		Promise.all(validations).then(values => {
			const validForm = values.every( v => v.is_valid)
			if(validForm) {
				if(props.onSubmit) {
					if(props.serialize === true) {
						//default true
						const hash:boolean = (typeof props.hash == 'undefined') ? true : props.hash
						const empty:boolean = (typeof props.empty == 'undefined') ? true : props.empty
						const values = serialize(form, {hash, empty})
						props.onSubmit({e, values})
					} else {
						props.onSubmit({e})
					}
				}
			}
		})
		
	}
	const autoCompleteValue = typeof autoComplete == 'undefined' ? undefined : (autoComplete ? 'on' : 'off')
	return (
		<FormContext.Provider value={{addFormChildRef, removeFormChildRef}}>
			<form
				className={className}
				style={style}
				onSubmit={handleSubmit}
				autoComplete={autoCompleteValue}
			>
				{children}
			</form>
		</FormContext.Provider>
	) 
}