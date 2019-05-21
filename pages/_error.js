import React from 'react'
import Page from '../layouts/main/main';


export default class Error extends React.Component {
  // static getInitialProps({ res, err }) {
  //   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  //   return { statusCode }
  // }

  render() {
    return (
		<Page>
			{(this.props.message||this.props.title) ?
				<div className="errorPage">
					{this.props.statusCode && <p className="errorCode">Error {this.props.statusCode}</p>}
					<p className="errorName">{this.props.title}</p>
					<p className="errorDesc">{this.props.message}</p>
				</div>
			:
				<div className="errorPage">
					<img src="/static/img/404.svg" />
					<p className="errorCode">Error {this.props.statusCode}</p>
					<p className="errorName">
						{this.props.statusCode == 404 ? 'Page not found' :''}
					</p>
					<p className="errorDesc">
						{this.props.statusCode == 404 ? 'El diccionario lo define como una página que no se puede encontrar... Que NO se puede encontrar.' :''}
					</p>
				</div>
			}
			{/* <p>
			{this.props.statusCode
				? `An error ${this.props.statusCode} occurred on server`
				: 'An error occurred on client'}
			</p> */}
		</Page>
    )
  }
}