import Link from 'next/link';
import Page from '../layouts/main/main'
import { Component } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Busqueda from '../components/search/Busqueda'

export default class Index extends Component {
    state = {
        x: 0,
        y: 0,
        activateIndexParallax: false
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
                        <div className="container">
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
                            <Busqueda logo="leloir_logo.png" favorites={false} />
                            <Busqueda logo="leloir_logo.png" favorites={true} />
                            <Busqueda logo="leloir_logo.png" favorites={false} />
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}