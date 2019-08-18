import classnames from 'classnames'
import Cleave from 'cleave.js/react'
require('cleave.js/dist/addons/cleave-phone.ar');

class Input extends React.Component {
	state = {
		focused: false,
		hasValue: this.props.value?true:false,
		invalid: this.props.invalid?true:false,
		invalidMsg: false,
		preInputWidth: false,
	}
	constructor(props) {
		super(props);
		this.preInput = React.createRef();
		this.inputBase = React.createRef();
		this.cleaveInput = React.createRef();
	}
	_focus = (focused) => {
		this.setState(()=>({focused}));
		if(!focused && this.props.required && !this.state.hasValue) {
			this._setInvalid(true, false)
		}
	}
	_change = (event) => {
		this.validate();
		if(this.props.onChange) {
			this.props.onChange(event)
		}
	}
	validate = () => {
		//validate function
		let input = this.props.formatInput ? this.inputBase.current.element : this.inputBase.current
		const value = input.value;
		return this._checkValid(value); //response to formControl
	}
	_checkValid = (value) => {
		// return if valid or not
		const {validation} = this.props;
		const hasValue = !!value;
		this.setState(()=>({hasValue}))

		if(!value && !this.props.required) {
			return this._setInvalid(false, false)
		}

		if(!value && this.props.required) {
			return this._setInvalid(true, false)
		}

		if(this.props.validation) {
			for(let i=0; i < validation.length; i++) {
				let valid = validation[i]( value );
				if(valid!==true) {
					let invalidMsg = valid
					return this._setInvalid(true, invalidMsg)
				}
			}
			return this._setInvalid(false, false);
		}

		return this._setInvalid(false, false);
	}
	_setInvalid = (invalid, invalidMsg=false) => {
		this.setState(()=>({ invalid, invalidMsg }));
		return({valid: !invalid, invalid, invalidMsg})
	}
	componentDidMount() {
		if(!!this.props.preInput) {
			const preInputWidth = ((this.preInput.current.offsetWidth + 1 + 12) / 10) +'rem';
			this.setState(()=>({preInputWidth}))
		}
		const inputBase = this.props.formatInput ? this.inputBase.current.element : this.inputBase.current;
		if(!!inputBase.value && inputBase.tagName.toLowerCase()!='select') {
			this.validate(inputBase.value)
		}
		if(inputBase.value!='undefined' && inputBase.tagName.toLowerCase()=='select') {
			this.validate(inputBase.value)
		}
		
	}
	render () {
		const props = this.props
		const variant = props.variant?props.variant:'filled'
		const color = props.color?props.color:'gray'
		const type = props.type?props.type:'text'
		const inputProps = {...props.inputProps}
		const {placeholder} = props;
		return (
			<div className={classnames(
				'SUI-input',`SUI-input-${variant}`,`SUI-input-color-${color}`,
				{
					'SUI-input-focused': this.state.focused,
					'SUI-input-hasValue': this.state.hasValue,
					'SUI-input-invalid': this.state.invalid,
					'SUI-input-labelUp': this.state.focused||this.state.hasValue||props.labelUp,
					'SUI-input-hasPreInput':props.preInput,
					'SUI-width-full': props.fullWidth
				},
				props.className
			)}>
				<div className="SUI-input-container">
					{props.label ?
						<label className="SUI-input-label">{props.label}{props.required?'*':''}</label>
					: false}
					<div className='SUI-input-inputContainer'>
						{props.preInput ?
							<div ref={this.preInput} className="SUI-input-pre">
								<label>{props.preInput}</label>
							</div>
						: false}
						{type == 'select' &&
							<select
								className="SUI-input-select SUI-input-main" 
								value={props.value ? props.value : 'undefined'}
								onFocus={()=>(this._focus(true))}
								onBlur={()=>(this._focus(false))}
								onChange={this._change}
								name={props.name}
								{...props.inputProps}
								ref={this.inputBase}
								>
								{!props.value?
									<option value="undefined" disabled></option>
								:false}
								{props.options}
							</select>
						}
						{type == 'text' && (
							props.formatInput ?
								<Cleave
									className="SUI-input-input SUI-input-main"
									type={type}
									value={props.value?props.value:''}
									onFocus={()=>(this._focus(true))}
									onBlur={()=>(this._focus(false))}
									onChange={this._change}
									name={props.name}
									{...inputProps}
									placeholder={(this.state.focused||props.labelUp)?placeholder:undefined}
									options={props.formatInput}
									style={{paddingLeft:this.state.preInputWidth}}
									ref={this.inputBase}
								/>
							:
								<input
									className="SUI-input-input SUI-input-main" 
									type={type}
									value={props.value?props.value:''}
									onFocus={()=>(this._focus(true))}
									onBlur={()=>(this._focus(false))}
									onChange={this._change}
									name={props.name}
									{...inputProps}
									placeholder={(this.state.focused||props.labelUp)?placeholder:undefined}
									style={{paddingLeft:this.state.preInputWidth}}
									ref={this.inputBase}
								/>
						)
						}
						{type == 'textarea' &&
							<textarea
								className="SUI-input-textarea SUI-input-main"
								value={props.value!==undefined ? props.value : undefined}
								onFocus={()=>(this._focus(true))}
								onBlur={()=>(this._focus(false))}
								onChange={this._change}
								name={props.name}
								{...inputProps}
								placeholder={(this.state.focused||props.labelUp)?placeholder:undefined}
								style={{paddingLeft:this.state.preInputWidth}}
								ref={this.inputBase}
							/>
						}
					</div>
					<div className="SUI-input-selector"></div>
				</div>
				{props.helperText ?
					<div className="SUI-helper">
						<label>{props.helperText}</label>
					</div>
				:false}
				{this.state.invalid && this.state.invalidMsg ?
					<div className="SUI-errorMsg">
						<label>{this.state.invalidMsg}</label>
					</div>
				:false}
			</div>
		)

	}
}

export {
	Input
}