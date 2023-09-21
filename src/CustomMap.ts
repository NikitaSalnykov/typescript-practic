import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const mapContainer  = document.getElementById('map') as HTMLDivElement

export class CustomMap {
  private map: Map
  constructor() {
   this.map = new Map({
  target: mapContainer ,
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
 }
}