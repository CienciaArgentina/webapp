// institutes
import InstituteName from './institutes/InstituteName'
import InstituteHeader from './institutes/InstituteHeader'
import LabList from './institutes/LabList'
import {Tabs, Tab, TabDisplay, DesktopTabs} from './institutes/Tabs'
import ProjectPage from './institutes/ProjectPage'

// jobs
import JobPost from './jobs/JobPost'
import Tag from './jobs/Tag'

import Mapbox from './MapBox';

// ui
import Input from './ui/Input'

const APIBase = 'https://cienciaargentinamicroservices20190313100734.azurewebsites.net/api/';

export {
	JobPost,
	Tag,
	InstituteName,
	Mapbox,
	Tabs,
	Tab,
	TabDisplay,
	ProjectPage,
	LabList,
	InstituteHeader,
	DesktopTabs,
	APIBase,
	Input
}