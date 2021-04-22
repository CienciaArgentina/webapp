import { connect } from "react-redux";
import { StoreState } from '@store/index'

const IndexPage = (props:any) => {
	console.log(props);
	
	return (
		<div></div>
	)
}
export default connect((state: StoreState) => state)(IndexPage);
