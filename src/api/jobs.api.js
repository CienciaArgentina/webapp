

import axiosInstance from './utils/axiosInstance';
import moment from 'moment';

const jobExample = {
	'id': 'ZALALAAAAA',
	'title': 'Regulación de la N-glicosilación de proteínas eucariotas',
	'isFav': false,
	'type': 'doctorate',
	'typeStr': 'Doctorado',
	'posibleThesis': false,
	'scholarship': 'CONICET',
	'salary': 18900,
	'dateCreated': moment('2018-12-5').unix(),
	'durationOffer': moment('2019-05-15').unix(),
	'tags': [
		'Bioloía',
		'Plantas',
		'ADN'
	],

	'contactEmail': 'matias@ciencia.com',
	'projectManager': 'Giuliano Antelo',
	'researchTopics': 'These topics all rely on a solid background in mathematics, physics, and chemistry. The program also has a biotechnology dimension with courses on the exploitation of biological systems for developing new technologies and industrial applications. We educate future bioengineers who benefit from interdisciplinary undergraduate courses to build an understanding of engineering concepts and techniques.\nStudents learn to apply engineering principles to the re-conceptualization of of biological phenomena and are trained to acquire skills for developing new materials and processes, including genetic modification of agriculturally important plants and human cells.',
	'experimentalModel': 'Most of the graduates of the BIO program continue on with graduate education in Turkey and abroad. All of our graduates are equipped with in depth knowledge of modern molecular biology. Our graduates attain research and management positions in industrial and research institutions operating in various areas of the biological sciences and biotechnology.',
	
	//requirements
	'careerState': 0,
	'labExperience': true,	// true=obligatorio,  false=preferente,  null=no pedir
	'presentationLetter': false,
	'requirements': 'Tener buena predisposicion.\nTener visa para viajar a la luna.',
	'optionalRequirements': 'Tener experiencia con python y 3D max',

	'organization': {
		'instituteId': 'csa123',
		'institutenName': 'Fundación Instituto Leloir',
		'instituteDescription': 'La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.',
		'instituteUrl': 'https://www.leloir.org.ar/',
		'acronyms': false, //abreviacion
		'labId': 'gsd789',
		'labName': 'Biología Celular del RNA',
		'proyectId': 'asdds789',
		'proyectName': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
		'latLon': [1234564, 4564564],
		'city': 'Buenos Aires',
		'country': 'Argentina',
		'locationString': 'Callao 86, Ciudad Autónoma de Buenos Aires, Argentina',
	}
}

export class JobsApi {
	// id: int
	static async getJob(id) {
		return jobExample //fakeReturn
		const { data } = await axiosInstance.get(`/jobs`, {
			id
		});
		return data;
	}

	static async searchJob(params) {
		return [
			jobExample,
			jobExample,
			jobExample
		]
		const { data } = await axiosInstance.get(`/jobs/search`, {
			params
		});
		return data;
	}

	static async getRecentJobs() { // jobs para index
		return [
			jobExample,
			jobExample,
			jobExample
		]
		const { data } = await axiosInstance.get(`/jobs/home`, {
			params
		});
		return data;
	}
}