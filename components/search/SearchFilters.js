import { Checkbox } from '../Science'

const SearchFilters = props => (
	<div className='SearchFilters'>
		{props.filters.map((filSection, kSection)=>(
			<div className='__filterSection' key={kSection}>
				<div className='__secitonTitle'>
					{filSection.title}
				</div>
				{Object.entries(filSection.values).map((o,k)=>(
					<div className='__filter' key={k}>
						<Checkbox
							label={o[1].text}
							noPadding
							checked={o[1].selected}
							value={o[0]}
							onChange={props.onChange}
							__custom__section={kSection}
						/>
					</div>
				))}
			</div>
		))}
	</div>
)

export default SearchFilters