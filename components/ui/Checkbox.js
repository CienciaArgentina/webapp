import classnames from 'classnames'

class Checkbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			checked: props.checked!==undefined?props.checked:false
		}
	}
	_change = (e) => {
		if(this.props.checked!==undefined) {
			if(this.props.onChange){
				this.props.onChange(event)
			} else {
				console.error('onChange not defined in Checkbox')
			}
		} else {
			const checked = e.target.checked
			this.setState(()=>({checked}));
		}
	}
	render() {
		const checked = this.props.checked !== undefined ? this.props.checked : this.state.checked;
		return(
			<label className={classnames('SUI-checkbox', {'SUI-checkbox--selected':checked})}>
				<div className='SUI-checkbox-input-root'>
					<div className='SUI-checkbox-container'>
						<input value={this.props.value} checked={checked} onChange={this._change} type='checkbox' className='SUI-checkbox-input'/>
						<div className='SUI-checkbox-background'>
							<svg className="SUI-checkbox-checkmark" viewBox="0 0 24 24">
								<path className="SUI-checkbox-checkmark-path"fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
							</svg>
						</div>
					</div>
				</div>
				{this.props.label &&
					<span className='SUI-checkbox-label'>
						{this.props.label}
						{this.props.required?'*':''}
					</span>
				}
			</label>
		)
	}
}

export { Checkbox }