import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

const userDataExample = {
	'id': 'userIdDataSting',
	'email': 'matiasngf@gmail.com',
	'profileImage': '/static/img/equipo/mati.jpg',
	'fname': 'Matias',
	'lname': 'Gonzalez Fernandez',
	'bday':  moment('1996-09-03', 'YYYY-MM-DD').unix(),
	'sex': 'm',
	'rol': 'user',
	'locaition': {
		'country': 'Argentina',
		'province': 'CABA',
		'street': 'Bogota',
		'stNumber': '311'
	},
	'contact': {
		'phone': '+54 11 60998640',
		'altMail': false,
		'facebook': 'matiasgf',
		'twitter': 'matiNotFound',
		'website': 'https://matiasgf.com',
	},
	'studies': [
		{
			'studieType': 'secondary', //primary secondary degree posgraduate
			'state': 3, //0 1 2 3
			'career': 'Diseño gráfico',
			'institutionName': 'UCES',
			'dateFrom': moment('2009-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			'dateTo': moment('2014-12-01', 'YYYY-MM-DD').format('MM-YYYY')
		},
		{
			'studieType': 'degree', //primary secondary degree posgraduate doctoral postdoctoral
			'state': 2, //0 1 2 3
			'career': 'Diseño gráfico',
			'institutionName': 'UCES',
			'dateFrom': moment('2015-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			'dateTo': moment('2019-12-01', 'YYYY-MM-DD').format('MM-YYYY')
		},
	],
	'work': [
		{

		},
	]
}

export class UserApi {
	static async getMyData() {
		return userDataExample;
		const { data } = await axiosInstance.get(`/user/me`, {
			params
		});
		return data;
	}
}