import {
	Input
} from "../Science";
import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

export default class EditPublicationsData extends React.Component {
	constructor(props) {
		super(props);
		this.paperId = React.createRef()
	}
	state = {
		paperModalOpen: false,
		paperByIdResult: {
			id: '30886393',
			title: 'Visualizing DNA folding and RNA in embryos at single-cell resolution.',
			description: 'The establishment of cell types during development requires precise interactions between genes and distal regulatory sequences. We have a limited understanding of how these interactions look in three dimensions, vary across cell types in complex tissue, and relate to transcription. Here we describe optical reconstruction of chromatin architecture (ORCA),',
			authors: [
				'Mateo'
			],
			coauthors: [
				'Murphy', 'Hafner', 'Cinquini', 'Walker'
			],
			corresponding: ['Boettiger']
		},
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
	searchPaperById = (e) => {
		e.preventDefaut
		if(this.paperId.current.validate().valid) {
			const id = this.paperId.current.inputBase.current.value;
			this.setState(()=>({
				showResultsById: true
			}))
		}
	}
	addPaperById = (authorType, authorKey) => {
		const author = this.state.paperByIdResult[authorType][authorKey];
		const id = this.state.paperByIdResult.id
		this.closeModal();
		this.setState()
	}
	render() {
		return (
			<div>
				<h3 className='mb-2'>Pubmed papers</h3>
				<button onClick={this.openModalPapers} className='bn--text'>+ Agregar paper</button>
				<Modal
					isOpen={this.state.paperModalOpen}
					onRequestClose={this.closeModal}
					className='addPaperModal'
				>
					<h3 className='mb-3'>Agregar paper de pubmed.gov</h3>
					<form onSubmit={e => {this.searchPaperById(e)}}>
						<Input
							label='pubmed ID'
							type='text'
							required={true}
							preInput='https://www.ncbi.nlm.nih.gov/pubmed/'
							fullWidth
							ref={this.paperId}
						/>
						<button className='mt-5' type='submit'>Buscar</button>
						<button className='mt-5 ml-2 bn--gray' type='button' onClick={this.closeModal}>Cancelar</button>
					</form>
					{this.state.showResultsById &&
						<div className='mt-3'>
							<div>
								<h3>{this.state.paperByIdResult.title}</h3>
								<p className='mt-1'>
								{[this.state.paperByIdResult.authors,this.state.paperByIdResult.coauthors,this.state.paperByIdResult.corresponding].map((o,k)=>{
									return o.map((oo,kk)=>{
										return(<label key={k+'-'+kk}>{k!=0||kk!=0 ? ', ':''} {oo}</label>)

									})
								})}
								</p>
								<p className='text mt-2'>{this.state.paperByIdResult.description}</p>
							</div>
							<h4>Seleccioná tu nombre en la lista de autores:</h4>
							<div>
								{[this.state.paperByIdResult.authors,
								this.state.paperByIdResult.coauthors,
								this.state.paperByIdResult.corresponding].map((o,k)=>{
									return o.map((oo,kk)=>(
										<div key={k+'-'+kk} className='mb-1 mt-1'>
											<button
												onClick={()=>{this.addPaperById(['authors', 'coauthors', 'corresponding'][k], kk)}} 
												className='bn--text'>
													{oo}
											</button>
										</div>
									))
								})}
							</div>
						</div>
					}
				</Modal>
			</div>
		)
	}
}