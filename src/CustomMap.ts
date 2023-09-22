import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';

const mapContainer = document.getElementById('map') as HTMLDivElement
const popupContainer = document.getElementById('popup') as HTMLDivElement

interface Mappable {
  location: {
    lat: number;
    lng: number;
  }

   marketContent(): string
}

export class CustomMap {
  private map: Map

  constructor() {
    this.map = new Map({
      target: mapContainer,
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


  addMarker(mappable: Mappable): void {
    const markerSource = new VectorSource();
   
    const markerLayer = new VectorLayer({
      source: markerSource
    });

    const marker = new Feature({
      geometry: new Point(fromLonLat([mappable.location.lng, mappable.location.lat])),
      name: `${mappable.constructor.name}`,
      info: `${mappable.marketContent()}`
    });

    marker.setStyle(new Style({
      image: new Icon({
        src: `https://cdn-icons-png.flaticon.com/128/5188/5188014.png`,
        scale: 0.5
      })
    }));

    markerSource.addFeature(marker);    
    this.map.addLayer(markerLayer); 

    this.map.on('click', (evt) => {
      const features = this.map.getFeaturesAtPixel(evt.pixel);
      popupContainer.classList.remove('active')
      if (features && features.length > 0) {
        popupContainer.innerHTML = features[0].get('info'); 
        popupContainer.classList.contains('active') ? popupContainer.classList.remove('active') : popupContainer.classList.add('active');
      } else {
       return
      }
    });
  }
}
    
