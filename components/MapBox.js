import React from 'react'

var Map,
ReactMapboxGl,
Layer,
Feature,
Image,
Marker,
GeoJSONLayer = false;

if(process.browser){
	ReactMapboxGl = require("react-mapbox-gl");
	Layer = ReactMapboxGl.Layer;
	Feature = ReactMapboxGl.Feature;
	Image = ReactMapboxGl.Image;
	GeoJSONLayer = ReactMapboxGl.GeoJSONLayer;
	Marker = ReactMapboxGl.Marker;
	Map = ReactMapboxGl.Map({
		accessToken: "pk.eyJ1IjoibWF0aWFzZ2YiLCJhIjoiY2pnc205Mmo2MDJsdzMzbjI2dHVsZnNhYSJ9.GHBkK7xLQz1C6DYDmQqXTw",
		attributionControl: true,
		compact:true
	});
}

class MapBox extends React.Component {
	state = {
		renderMap: false,
		geoJsonData: {},
	}
	componentDidMount() {
		this.setState(()=>({renderMap:true}));
		this.initData();
	}
	initData = () => {
		this.setState(() => ({
			geoJsonData: this.props.geoJsonData ? this.props.geoJsonData : false
		}));
	}
	render() {
		return (
			<div className="MapBox">
				{this.state.renderMap? //if Map exists
					<Map
						style="mapbox://styles/matiasgf/cjllfnq6u4bpa2slodaj13yjd"
						center={this.props.center?this.props.center:[-58.4330264,-34.6020053]}
						zoom={this.props.zoom?this.props.zoom:[10]}
						onStyleLoad={(map) => { //map loaded
							// map.showCollisionBoxes = true;
							map.loadImage('/static/img/icons/map-marker-institute.png', (error, image) => {
								if(map && !error) {
									map.addImage('LabIcon',  image);
									map.addLayer({
										"id": "points",
										"type": "symbol",
										"source": {
											"type": "geojson",
											"data": this.state.geoJsonData
										},
										"layout": {
											"icon-image": "{icon}",
											"text-field": "{title}",
											"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
											"text-offset": [0, 0],
											"text-anchor": "top",
											"icon-anchor": "bottom",
											"icon-size": 0.5
										}
									});
								}
							});
						}}
					>
					</Map>
				:<p>Loading map...</p>}
			</div>
		)
	}
}

const LabMap = (props) => (
	<MapBox
		geoJsonData = {{
			"type": "FeatureCollection",
			"features": [{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": props.coordinates
				},
				"properties": {
					"title": props.instituteName,
					"icon": "LabIcon"
				}
			}]
		}}
		center= {props.coordinates}
	/>
)

export {
	LabMap,
	MapBox
}