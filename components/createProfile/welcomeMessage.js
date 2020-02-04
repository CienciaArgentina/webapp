import React from 'react'
import { connect } from 'react-redux'
import Logo from './logoSvg'
import classnames from 'classnames'
import Link from 'next/link'

export default class WelCommeMessage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0
		}
	}
	componentDidMount() {
		setTimeout(()=>{
			this.setState(()=>({step:1}))
		}, 3000)
	}
	start = () => {
		this.setState(()=>({step:2}))
	}
	render() {
		return(
			<div id='welcomeMessagePage'>
				<Logo className={classnames({
					'--finished': this.state.step >= 1,
					'--stage2': this.state.step >= 2
				})}/>
				<p className={classnames('__welcome', {
					'--visible': this.state.step >= 1,
					'--stage2': this.state.step >= 2
				})}>Bienvenido<br/>a Ciencia<br/>Argentina</p>
				<button onClick={this.start} className={classnames('__start', {
					'--visible': this.state.step >= 1,
					'--stage2': this.state.step >= 2
				})}>Comencemos</button>
				<p className={classnames('__motivo', {
					'--stage2': this.state.step >= 2
				})}>
					¿En qué podemos ayudarte?
				</p>
				<div className={classnames('__options', {
					'--stage2': this.state.step >= 2
				})}>
					<div>
						<p>Quiero buscar trabajo.<br/>(pasantías, becas doctorales, etc.)</p>
					</div>
					<div>
						<p>Quiero reclutar personas para mi instituto.</p>
					</div>
				</div>
				<Link href='/'>
					<p className={classnames('__omitir', {
						'--stage1': this.state.step >= 1
					})}>Omitir</p>
				</Link>
			</div>
		)
	}
}