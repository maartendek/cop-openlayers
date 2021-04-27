import './scss/index.scss'

import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Style} from 'ol/style';

const place = [5.06487985805064, 52.10009048913261]; // Reykjavikplein 1

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "app",
});

const point = new Point(place).transform("EPSG:4326", "EPSG:900913");
const features = [new Feature(point)];

const featureLayer = new VectorLayer({
  source: new VectorSource({
    features,
  }),
  style: new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({ color: "red" }),
    }),
  }),
});
map.addLayer(featureLayer)

const view = new View({
  center: point.getCoordinates(),
  zoom: 5,
});
map.setView(view);