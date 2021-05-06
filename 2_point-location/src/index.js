import './scss/index.scss'

import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Stroke, Style} from 'ol/style';

const place = [563836.2560250214, 6818208.299893484]; // Reykjavikplein 1

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "app",
});

const point = new Point(place);
const features = [new Feature(point)];

const featureLayer = new VectorLayer({
  source: new VectorSource({
    features,
  }),
  style: new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({ color: "black" })
    }),
  }),
});
map.addLayer(featureLayer)

const view = new View({
  center: point.getCoordinates(),
  zoom: 15,
});
map.setView(view);