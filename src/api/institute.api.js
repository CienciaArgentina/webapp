import axiosInstance from "./utils/axiosInstance";

const instituteExample = {
	'instituteId': 'csa123',
	'instituteName': 'Fundación Instituto Leloir',
	'instituteDescription': 'La Fundación Instituto Leloir es un centro de investigación científica dedicada a la investigación básica y a la formación de jóvenes investigadores en bioquímica y biología celular y molecular. La misión del Instituto es fomentar los más altos estándares de excelencia tanto en los proyectos de investigación como en la docencia.',
	'instituteUrl': 'https://www.leloir.org.ar/',
	'logo': '/static/img/logos-labos/leloir_logo.png',
	'acronyms': false, //abreviacion
	'coordinates': [-58.4330264,-34.6020053],
	'city': 'Buenos Aires',
	'country': 'Argentina',
	'locationName': 'Callao 86, Ciudad Autónoma de Buenos Aires, Argentina',
	'labs': [
		{
			'labId': 'gsd789',
			'labName': 'Biología Celular del RNA',
			'labDescription': 'Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular. Esta reacción se da en todos los organismos y es denominada “respuesta al estrés celular”.\rEl estrés celular es importante en diversas patologías humanas, y la intervención del balance muerte-sobrevida es la base racional de numerosas terapias. Empleando modelos in vitro de estrés celular que recapitulan lo que ocurre en condiciones patológicas, estudiamos cómo la célula detiene la generación de las proteínas que normalmente sintetiza para estimular la producción de proteínas protectivas.',
			'labHead': 'Giuliano Antelo',
			'projects': [
				{
					'projectId': 'asdds789',
					'projectName': 'Mutaciones y deleciones de genes de interés, y complementación de las mismas.',
					'projectDescription': 'Nos interesa entender cómo funcionan las nuevas organelas celulares denominadas cuerpos de silenciamiento de ARN mensajero (ARNm) que identificamos recientemente. Existen distintos tipos de cuerpos de silenciamiento de ARNm.\rLos “Gránulos de Estrés” (SGs) se ensamblan transitoriamente durante la respuesta de estrés celular y almacenan moléculas de ARNm que se encuentran transitoriamente inactivas durante la reacción de estrés celular. Los “Cuerpos de Procesamiento” (PBs)',
					'experimentalModel': 'Cuando las células se encuentran en condiciones poco favorables o adversas despliegan una respuesta protectiva para ayudar a la supervivencia y evitar la muerte celular. Esta reacción se da en todos los organismos y es denominada “respuesta al estrés celular”. El estrés celular es importante en diversas patologías humanas, y la intervención del balance muerte-sobrevida es la base racional de numerosas terapias.',
					'projectHead': 'Lucas Lopez'
				}
			]
		},
	].map(o=>[o,{...o, labId:'gad123'}])[0]
}

export class InstituteApi {
	// id: instituteId
	static async getInstitute(id) {
		return instituteExample
		const response = axiosInstance.get(`/institute/getById/${id}`);
		return response;
	}

	// id: id of lab
	static async getInstituteFromLab(id) {
		return instituteExample
		const response = axiosInstance.get(`/institute/getByLab/${id}`);
		return response;
	}
}