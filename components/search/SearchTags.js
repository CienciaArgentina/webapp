import { Tag } from '../Science'

const SearchTags = props => (
	props.filters.map((sec, ksec) => (
		Object.entries(sec.values).filter(o => o[1].selected).map((o,k)=>(
			<Tag
				key={o[0]}
				delete={()=>{props.delete(ksec, o[0])}}
			>
				{o[1].text}
			</Tag>
		))
	))
)

export default SearchTags