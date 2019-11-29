import React from 'react'
import classnames from 'classnames'

class CheckboxGroup extends React.Component {
	state = {
		invalid: false,
		invalidMsg: false,
	}
	_change = e => {
		let currValue = this.props.value
		currValue[e.target.value] = e.target.checked
		this.props.onChange({target:{name:this.props.name, value:currValue}})
		this.validate()
	}
	validate = () => {
		return this._checkValid(this.props.value)
	}
	_checkValid = () => {
		const {validation} = this.props;
		const value = this.props.value
		if(this.props.validation) {
			for(let i=0; i < validation.length; i++) {
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
		}
	}
	_setInvalid = (invalid, invalidMsg=false) => {
		this.setState(()=>({ invalid, invalidMsg }));
		return({valid: !invalid, invalid, invalidMsg})
	}
	render() {
		return (
			<div className={classnames('SUI SUI-checkboxGroup', {
				'SUI-checkboxGroup-invalid': this.state.invalid
			}, this.props.className)}>
				{this.props.label ?
					<label className="SUI-checkboxGroup-label">{this.props.label}{this.props.required?'*':''}</label>
				: false}
				<div className='SUI-checkboxGroup-inputContainer'>
					{
						React.Children.map(this.props.children, (child, i) => {
							if(child) {
								return React.cloneElement(child, {
									checked: this.props.value[child.props.value],
									onChange: this._change
								})
							} else {
								return child
							}
						})
					}
				</div>
				{this.props.helperText ?
					<div className="SUI-helper">
						<label>{this.props.helperText}</label>
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

export { CheckboxGroup }