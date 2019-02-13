import Link from 'next/link';
import Page from '../layouts/main/main'
import { Component } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import { JobPost } from '../components/Science';

export default class Index extends Component {
    state = {
        x: 0,
        y: 0,
        activateIndexParallax: false,
        newJobs: this.props.newJobs
    }
    _onMouseMove = (e) => {
        this.setState({
            x: -(e.screenX - this.state.w_width/2) / this.state.w_width * 2,
            y: -(e.screenY - this.state.w_height/2) / this.state.w_height * 2
        });
    }
    componentDidMount() {
        this.setState( () => ({w_width: window.innerWidth, w_height: window.innerHeight}) );
        if(window.innerWidth > 769){
            this.setState(() => ({activateIndexParallax: true}))
        } else {
            this.setState(() => ({activateIndexParallax: false}))
        }
    }
    render(){
        const backgroundStyle = {
            transform: `translate(${this.state.x}%, ${this.state.y}%)`
            }
        return (
            <Page contentClass="bg--gray" pageprops={ this.state.activateIndexParallax ? {onMouseMove:this._onMouseMove} : {} } >
                <div className="Index">
                    <div className="hero">
                        <div className="background-desktop" style={backgroundStyle}></div>
                        <div className="container--m">
                            <h1>Encontrá tu lugar en la ciencia</h1>
                            <div className="whiteSearchBar">
                                ¿Qué estas buscando?
                            </div>
                            <div className="tipoDeBusquedas">
                                <div>
                                    <div className="tipo__content"><p className="tipo">Pasantías</p></div>
                                </div>
                                <div>
                                    <div className="tipo__content"><p className="tipo">Doctorados</p></div>
                                </div>
                                <div>
                                    <div className="tipo__content"><p className="tipo">Posdoctorados</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nuevasBusquedas container--m" style={{marginTop:30, marginBottom:30}}>
                        <h3 className="pb-2">Nuevas búsquedas</h3>
                        <div>
                            {this.state.newJobs.map( (o,k)=>(
                                <JobPost key={k}
                                    title={o.title}
                                    type={o.type}
                                    instituteName={o.instituteName}
                                    place={o.place}
                                    boss={o.boss}
                                    logo={o.logo}
                                    earn={o.earn}
                                    duration={o.duration}
                                    deadline={o.deadline}
                                    closeDeadline={o.closeDeadline}
                                    favorite={o.favorite}
                                    prefetch
                                />
                                
                            ) )}
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

Index.getInitialProps = async function() {
	return {
		newJobs: [
            {
                title: "Regulación de la N-glicosilación de proteínas eucariotas",
                type: "Doctorado",
                instituteName: "Insituto Leloir",
                place: "Ciudad Autónoma de Buenos Aires",
                boss: "Dra. Jeanette Acosta",
                logo: "leloir_logo.png",
                earn: "$18.900",
                duration: "4 años",
                deadline: "10 Ago.",
                closeDeadline: false,
                favorite: true
            },
            {
                title: "Inmunoterapia en la tuberculosis de la humana",
                type: "Doctorado",
                instituteName: "IFIBYNE",
                place: "Ciudad Autónoma de Buenos Aires",
                boss: "Dra. Jeanette Acosta",
                logo: "ifibyne_logo.png",
                earn: "$18.900",
                duration: "4 años",
                deadline: "en 2 días",
                closeDeadline: true,
                favorite: false
            },
            {
                title: "Nuevos genes de expresión asimétrica temprana y su rol en el establecimineto de ejes corporales",
                type: "Doctorado",
                instituteName: "Insituto Leloir",
                place: "Ciudad Autónoma de Buenos Aires",
                boss: "Dra. Jeanette Acosta",
                logo: "leloir_logo.png",
                earn: "$18.900",
                duration: "4 años",
                deadline: "6 Oct.",
                closeDeadline: false,
                favorite: false
            },
        ]
	}
	const res = await fetch('')
	const data = await res.json()
  
	return data
}