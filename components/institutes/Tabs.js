import { Children } from 'react';

const Tab = (props) => (
	<div onClick={()=>{props.onChange(props.tabKey)}} className={'tab'+(props.selected===true?' selected':'')}>
		<label>{props.children}</label>
	</div>
);

const DesktopTabs = props => (
	<div className="desktopTabs">
		{Children.map(props.children, (child, i)=>{
			return React.cloneElement(child, {
				selected: props.selected===i,
				onChange: props.onChange,
				tabKey: i
			});
		})}
	</div>
)

const Tabs = (props) => (
	<div className="tabs">
		{Children.map(props.children, (child, i)=>{
			return React.cloneElement(child, {
				selected: props.selected===i,
				onChange: props.onChange,
				tabKey: i
			});
		})}
	</div>
);
const TabDisplay = (props) => (
	<div className={'tabDisplay ' + (props.className&&props.className)}>
		{
			Children.map(props.children, (child, i) => {
				return React.cloneElement(child, {
					className: (!!child.props.className?child.props.className:'') + (props.selected==i?' selected':' notSelected'),
				});
			})
		}
	</div>
)

export {
	Tabs,
	Tab,
	TabDisplay,
	DesktopTabs
}