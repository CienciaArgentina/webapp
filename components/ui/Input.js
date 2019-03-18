import classnames from 'classnames'
import Cleave from 'cleave.js/react'
require('cleave.js/dist/addons/cleave-phone.ar');

export default class Input extends React.Component {
	state = {
		focused: false,
		hasValue: this.props.value?true:false,
		invalid: this.props.invalid?true:false,
		invalidMsg: false,
		preInputWidth: false,
	}
	constructor(props) {
		super(props);
		this.preInput = React.createRef()
	}
	_focus = (focused) => {
		this.setState(()=>({focused}));
		if(!focused && this.props.required && !this.state.hasValue) {
			this.setState(()=>({invalid: true}))
		}
	}
	_change = (event) => {
		const hasValue = !!event.target.value
		this.setState(()=>({hasValue}))
		if(this.props.required) {
			this.setState(()=>({invalid: !hasValue}))
		}
		this.validate(event.target.value);
		if(this.props.onChange) {
			this.props.onChange(event)
		}
	}
	validate = (value) => {
		const {validation} = this.props
		if(this.props.validation) {
			for(let i=0; i < validation.length; i++) {
				let valid = validation[i]( value );
				if(valid!==true) {
					let invalidMsg = valid
					this.setState(()=>({
						invalid: true,
						invalidMsg
					}))
					return false
				}
			}
			this.setState(()=>({
				invalid: false,
				invalidMsg: false
			}));
			return false
		}
	}
	componentDidMount() {
		if(!!this.props.preInput) {
			const preInputWidth = ((this.preInput.current.offsetWidth + 1 + 12) / 10) +'rem';
			this.setState(()=>({preInputWidth}))
			console.log(preInputWidth);
		}
	}
	render () {
		const props = this.props
		const variant = props.variant?props.variant:'filled'
		const type = props.type?props.type:'text'
		const inputProps = {...props.inputProps}
		const {placeholder} = props;
		return (
			<div className={classnames(
				'SUI-input',`SUI-input-${variant}`,
				{
					'SUI-input-focused': this.state.focused,
					'SUI-input-hasValue': this.state.hasValue,
					'SUI-input-invalid': this.state.invalid,
					'SUI-input-labelUp': this.state.focused||this.state.hasValue||props.labelUp,
					'SUI-input-hasPreInput':props.preInput
				},
				props.className
			)}>
				<div className="SUI-input-container">
					{props.label ?
						<label className="SUI-input-label">{props.label}{props.required?'*':''}</label>
					: false}
					{props.preInput ?
						<div ref={this.preInput} className="SUI-input-pre">
							<label>{props.preInput}</label>
						</div>
					: false}
					{type != 'select' ?
						props.formatInput ?
							<Cleave
								className="SUI-input-input SUI-input-main" 
								type={type}
								defaultValue={props.value?props.value:undefined}
								onFocus={()=>(this._focus(true))}
								onBlur={()=>(this._focus(false))}
								onChange={this._change}
								name={props.name}
								{...inputProps}
								placeholder={(this.state.focused||props.labelUp)?placeholder:undefined}
								options={props.formatInput}
								style={{paddingLeft:this.state.preInputWidth}}
							/>
						:
							<input
								className="SUI-input-input SUI-input-main" 
								type={type}
								defaultValue={props.value?props.value:undefined}
								onFocus={()=>(this._focus(true))}
								onBlur={()=>(this._focus(false))}
								onChange={this._change}
								name={props.name}
								{...inputProps}
								placeholder={(this.state.focused||props.labelUp)?placeholder:undefined}
								style={{paddingLeft:this.state.preInputWidth}}
							/>
						
					:
						<select
							className="SUI-input-select SUI-input-main" 
							defaultValue={props.value ? props.value : 'undefined'}
							onFocus={()=>(this._focus(true))}
							onBlur={()=>(this._focus(false))}
							onChange={this._change}
							name={props.name}
							{...props.inputProps}
						>
							{!props.value?
								<option value="undefined" disabled></option>
							:false}
							{props.options}
						</select>
					}
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