import {
	Input
} from "../Science";
import React from 'react'
import Modal from 'react-modal'
import { UserApi } from '../../src/api/api'

Modal.setAppElement('#app')

export default class EditPublicationsData extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		paperModalOpen: false,
		paperInputId: '',
		paperByIdResult: false,
		showResultsById: false
	}
	openModalPapers = () => {
		this.setState(()=>({paperModalOpen:true}))
	}
	closeModal = () => {
		this.setState(()=>({
			paperModalOpen:false,
			showResultsById: false
		}))		
	}
	searchPaperById = e => {
		e.preventDefault();
		console.log(this.paperInputId);
		if(this.paperInputId.validate().valid) {
			const id = this.state.paperInputId;
			UserApi.getArticleByPMID(id).then(response=>{
				console.log(response);
				this.setState(()=>({
					showResultsById: true,
					paperByIdResult: response.data
				}))
			})
		}
	}
	addPaperById = (authorType, authorKey) => {
		const author = this.state.paperByIdResult[authorType][authorKey];
		const id = this.state.paperByIdResult.id
		this.closeModal();
		this.setState()
	}
	handleChange = x => {
		console.log(x.target.name);
		const name = x.target.name;
		const value = x.target.value;
		this.setState(()=>({
			[name]: value
		}))
	}
	render() {
		return (
			<div className='profileForm'>
				<div>
					<h3 className='mb-2'>Pubmed papers</h3>
					<button onClick={this.openModalPapers} className='bn--text'>+ Agregar paper</button>
					<Modal
						isOpen={this.state.paperModalOpen}
						onRequestClose={this.closeModal}
						className='addPaperModal'
					>
						<h3 className='mb-3'>Agregar paper de pubmed.gov</h3>
						<form onSubmit={this.searchPaperById}>
							<Input
								label='pubmed ID'
								type='text'
								required={true}
								preInput='https://www.ncbi.nlm.nih.gov/pubmed/'
								fullWidth
								onChange={this.handleChange}
								name='paperInputId'
								ref={ref=>this.paperInputId = ref}
								value={this.state.paperInputId}
							/>
							<button className='mt-5' type='submit'>Buscar</button>
							<button className='mt-5 ml-2 bn--gray' type='button' onClick={this.closeModal}>Cancelar</button>
						</form>
						{this.state.showResultsById &&
							<div className='mt-3'>
								<div>
									<h3>{this.state.paperByIdResult.title}</h3>
									<p className='mt-1'>
									{[this.state.paperByIdResult.authors,
									this.state.paperByIdResult.coauthors,
									this.state.paperByIdResult.corresponding].map((o,k)=>{
										if(Array.isArray(o)){
											return o.map((oo,kk)=>{
												return(<label key={k+'-'+kk}>{k!=0||kk!=0 ? ', ':''} {oo}</label>)
	
											})
										}
									})}
									</p>
									<p className='text mt-2'>{this.state.paperByIdResult.description}</p>
								</div>
								<h4>Seleccioná tu nombre en la lista de autores:</h4>
								<div>
									{[this.state.paperByIdResult.authors,
									this.state.paperByIdResult.coauthors,
									this.state.paperByIdResult.corresponding].map((o,k)=>{
										if(Array.isArray(o)){
											return o.map((oo,kk)=>(
												<div key={k+'-'+kk} className='mb-1 mt-1'>
													<button
														onClick={()=>{this.addPaperById(['authors', 'coauthors', 'corresponding'][k], kk)}} 
														className='bn--text'>
															{oo}
													</button>
												</div>
											))
										}
									})}
								</div>
							</div>
						}
					</Modal>
				</div>
			</div>
		)
	}
}