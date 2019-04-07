import Page from '../layouts/main/main'
import { Input, Tag } from '../components/Science'

export default class serch extends React.Component {
	state = {
		searchStr: '',
		tags:[
			'leloir',
			'virus',
			'CABA'
		]
	}
	changeSearch= (x) => {
		const str = x.target.value;
		this.setState(()=>({
			searchStr: str
		}))
		
	}
	deleteSearchStr = () => {
		this.setState(()=>({
			searchStr: ''
		}))
	}
	deleteTag = (key)=>{
		this.setState(prevState=>({
			tags: prevState.tags.filter((o,k)=>(k!=key))
		}))
	}
	render() {
		return (
			<Page contentClass="bg--gray">
				<div id='buscador' className='mt-5'>
					<div className='__filters'>
						<div></div>
					</div>
					<div className='__main'>
						<div className='searchBox'>
							<div className='__input'>
								<Input
									fullWidth
									color='white'
									onChange={this.changeSearch}
									value={this.state.searchStr}
								/>
							</div>
							<div className='__controlls'>
								<div className='__lControll'>
									<div className='__tags'>
										{this.state.searchStr ?
											<Tag delete={this.deleteSearchStr}>"{this.state.searchStr}"</Tag>
										: false}
										{this.state.tags.map((o,k)=>(
											<Tag key={k} delete={(()=>{this.deleteTag(k)})}>{o}</Tag>
										))}
									</div>
									<div className='__resultCount'></div>
								</div>
								<div className='_rControll'>
									<Input
										type='select'
										label='Ordenar por'
										name='sortBy'
										options={['Relevancia', 'Cercanía', 'Nuevos'].map((o,k)=>(
											<option value={k} key={k}>{o}</option>
										))}
										value='0'
										variant='filled'
										color='white'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		)
	}
}