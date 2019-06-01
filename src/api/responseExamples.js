import moment from 'moment'

export const jobExample = {
	id: 'ZALALAAAAA',
	title: 'Regulación de la N-glicosilación de proteínas eucariotas',
	isFav: false,
	isOpen: true,
	type: 'doctorate',
	typeName: 'Pasantía',
	posibleThesis: true,
	scholarship: 'CONICET',
	salary: 18900,
	dateCreated: moment('2018-12-5', 'YYYY-MM-DD').unix(),
	endOffer: moment().add('3', 'd').unix(),
	tags: [
		'Biología',
		'Plantas',
		'ADN'
	],

	contactEmail: 'matias@ciencia.com',
	projectManager: 'Giuliano Antelo',
	researchTopics: 'These topics all rely on a solid background in mathematics, physics, and chemistry. The program also has a biotechnology dimension with courses on the exploitation of biological systems for developing new technologies and industrial applications. We educate future bioengineers who benefit from interdisciplinary undergraduate courses to build an understanding of engineering concepts and techniques.\nStudents learn to apply engineering principles to the re-conceptualization of of biological phenomena and are trained to acquire skills for developing new materials and processes, including genetic modification of agriculturally important plants and human cells.',
	experimentalModel: 'Most of the graduates of the BIO program continue on with graduate education in Turkey and abroad. All of our graduates are equipped with in depth knowledge of modern molecular biology. Our graduates attain research and management positions in industrial and research institutions operating in various areas of the biological sciences and biotechnology.',
	
	//requirements
	careerState: 3,
	labExperience: true,	// true=obligatorio,  false=preferente,  null=no pedir
	presentationLetter: false,
	requirements: 'Tener buena predisposicion.\nTener visa para viajar a la luna.',
	optionalRequirements: 'Tener experiencia con python y 3D max',

	organization: {
		instituteId: 'csa123',
		instituteName: 'Fundación Instituto Leloir',
		instituteDescription: 'La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.',
		instituteUrl: 'https://www.leloir.org.ar/',
		logo: '/static/img/logos-labos/leloir_logo.png',
		acronyms: false, //abreviacion
		labId: 'gsd789',
		labName: 'Biología Celular del RNA',
		projectId: 'asdds789',
		projectName: 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
		coordinates: [-58.4330264,-34.6020053],
		city: 'Buenos Aires',
		country: 'Argentina',
		locationName: 'Callao 86, Ciudad Autónoma de Buenos Aires, Argentina'
	}
}

export const userDataExample = {
	id: 'userIdDataSting',
	username: 'matiasgf',
	rol: 'user',
	personalData: {
		email: 'matiasngf@gmail.com',
		profileImage: '/static/img/equipo/mati.jpg',
		fname: 'Matias',
		lname: 'Gonzalez Fernandez',
		birthday:  moment('1996-09-03', 'YYYY-MM-DD').unix(),
		age: 22,
		sex: 'm',
		sexString: 'Hombre',
	},
	address: {
		country: 'Argentina',
		province: 'CABA',
		street: 'Bogota',
		stNumber: '311'
	},
	contact: {
		phone: '+54 11 60998640',
		altMail: 'matiasngf@hotmail.com',
		facebook: 'matiasgf',
		twitter: 'matiNotFound',
		website: 'https://matiasgf.com',
	},
	studies: [
		{
			studieType: 'secondary', //primary secondary degree posgraduate
			state: 3, //0 1 2 3
			career: 'Diseño gráfico',
			institutionName: 'UCES',
			dateFrom: moment('2009-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			dateTo: moment('2014-12-01', 'YYYY-MM-DD').format('MM-YYYY')
		},
		{
			studieType: 'degree', //primary secondary degree posgraduate doctoral postdoctoral
			state: 2, //0 1 2 3
			career: 'Diseño gráfico',
			institutionName: 'UCES',
			dateFrom: moment('2015-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			dateTo: moment('2019-12-01', 'YYYY-MM-DD').format('MM-YYYY')
		},
	],
	userInstitutes: {
		institutes: [  //institutos a los que pertenece
			'csa123'
		],
		labs: [ //a que laboratorios se agrego el usuario
			'gsd789',
		]
	},
	work: [
		{
			workType: 'laboratory',
			instituteName: 'Fundación Insituto Leloir',
			rol: 'asdasd',
			description: 'asds',
			dateFrom: moment('2016-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			dateTo: moment('2018-12-01', 'YYYY-MM-DD').format('MM-YYYY'),
		},
		{
			workType: 'laboratory',
			instituteName: 'Fundación Insituto Leloir',
			rol: 'asdasd',
			description: 'asds',
			dateFrom: moment('2016-01-01', 'YYYY-MM-DD').format('MM-YYYY'),
			dateTo: false, //actualidad
		}
	]
}

export const jobWithCandidates = {
	...jobExample,
	jobStatistics: {
		uniqueViews: 305, //personas que vieron la postulacion
		totalFavCount: 20,
		noAppliedFav: 3, //personas que marcaron en fav y no aplicaron
		newApplies: 2
	},
	candidates: [
		{
			applyDate: moment('2019-05-20', 'YYYY-MM-DD').unix(),
			userData: {
				id: userDataExample.id, //heredo las propiedades de userDataExample
				username: userDataExample.username,
				address: {
					country: 'Argentina',
					province: 'CABA',
				},
				personalData: userDataExample.personalData,
				contact: userDataExample.contact,
				studies: userDataExample.studies,
				work: userDataExample.work
			}
		}
	]
}
