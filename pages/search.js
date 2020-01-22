import Page from '../layouts/main/main'
import { Input, Tag } from '../components/Science'
import { SearchApi } from '../src/api/search.api'
import Router from 'next/router'
import Modal from 'react-modal'
Modal.setAppElement('#app')

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import SearchFilters from '../components/search/SearchFilters'
import SearchTags from '../components/search/SearchTags'

export default class Search extends React.Component {
	constructor(props) {
		super(props)
		let filters = props.filters
		let tagsFilters = props.searchTerms.tags ? props.searchTerms.tags.split(',') : []
		filters.map((o, section) => Object.entries(o.values).map((obj, k)=>{
			if(tagsFilters.includes(obj[0])){
				filters[section].values[obj[0]].selected = true
			} else {
				filters[section].values[obj[0]].selected = false
			}
		}))
		let sort = ''
		if(props.searchTerms.sort){
			sort = props.searchTerms.sort
		} else {
			sort = 'relevance'
		}
		this.state = {
			searchStr: props.searchTerms.q ? props.searchTerms.q : '',
			filters,
			sort,
			isMobileFiltersOpen: false
		}
	}
	inputRefs = {}
	changeSearch= (x) => {
		const str = x.target.value;
		this.setState(()=>({
			searchStr: str
		}))
		
	}
	deleteSearchStr = () => {
		this.setState(()=>({
			searchStr: ''
		}), this.inputRefs.searchBar.validate)
	}
	deleteTag = (sec, key)=>{
		this.setState(prevState => {
			let filters = prevState.filters
			filters[sec].values[key].selected = false
			// tags: prevState.tags.filter((o,k)=>(k!=key))
			return {
				filters
			}
		})
	}
	encodeQueryData = data => {
		const ret = [];
		for (let d in data)
			if(!!data[d]) {
				ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
			}
		return ret.join('&');
	 }
	buildUrlQuery = () => {
		let activeFilters = []
		Object.values(this.state.filters).map(sec=>{
			Object.entries(sec.values).filter(o=>o[1].selected).map(o=>{
				activeFilters.push(o[0])
			})
		})
		activeFilters = activeFilters.flat().join(',')
		const url = '/search?'+this.encodeQueryData({
			q: this.state.searchStr,
			tags: activeFilters,
			sort: this.state.sort
		})
		window.history.replaceState('','',url)
	}
	componentDidMount() {
		this.buildUrlQuery()
	}
	componentDidUpdate(prevProps, prevState){
		if(prevState != this.state) {
			this.buildUrlQuery()
		}
	}
	selectFilter = (e, obj) => {
		const checked = e.target.checked
		const value = e.target.value
		const section = obj.props.__custom__section
		this.setState(prevState => {
			let filters = prevState.filters
			filters[section].values[value].selected = checked
			return {
				filters
			}
		})
		
	}
	changeSort = e => {
		const value = e.target.value
		this.setState(()=>({sort:value}))
	}
	closeMobileFilters = () => {
		this.setState(()=>({
			isMobileFiltersOpen:false
		}))
	}
	openMobileFilters = () => {
		this.setState(()=>({
			isMobileFiltersOpen:true
		}))
	}
	render() {
		return (
			<Page contentClass="bg--gray">
				<Modal
					isOpen={this.state.isMobileFiltersOpen}
					className='__mobileFilters'
				>
					<i onClick={this.closeMobileFilters} className="fas fa-times __closeButton"></i>
					<SearchFilters
						filters = {this.state.filters}
						onChange = {this.selectFilter}
					/>
				</Modal>
				<div id='seachPage' className='mt-5'>
					<div className='__filters'>	
						<SearchFilters
							filters = {this.state.filters}
							onChange = {this.selectFilter}
						/>
					</div>
					<div className='__main'>
						<div className='searchBox'>
							<div className='__input'>
								<Input
									fullWidth
									color='white'
									onChange={this.changeSearch}
									value={this.state.searchStr}
									label='¿Qué buscas?'
									ref={ref=>this.inputRefs.searchBar = ref}
								/>
							</div>
							<div className='__controlls'>
								<div className='__lControll'>
									<div className='__tags'>
										{this.state.searchStr ?
											<Tag delete={this.deleteSearchStr}>"{this.state.searchStr}"</Tag>
										: false}
										<SearchTags
											filters = {this.state.filters}
											delete={this.deleteTag}
										/>
										{/* {this.state.tags.map((o,k)=>(
											<Tag key={k} delete={(()=>{this.deleteTag(k)})}>{o}</Tag>
										))} */}
									</div>
									<div className='__resultCount'></div>
								</div>
								<div className='__rControll'>
									<select value={this.state.sort} className='__selectOrder' onChange={this.changeSort}>
										<option value='relevance'>Relevancia</option>
										<option value='closest'>Cercanía</option>
										<option value='newest'>Nuevos</option>
									</select>
									<div onClick={this.openMobileFilters} className='__mobileFilters'>
										<i className="fas fa-filter mr-1"></i>
										Filtros
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		)
	}
}

Search.getInitialProps = async function(context) {
	const filters = await SearchApi.getFilters()
    return {
		filters,
		searchTerms: context.query
    }
}