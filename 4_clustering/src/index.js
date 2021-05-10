import './scss/index.scss'

import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, XYZ, Vector as VectorSource, Cluster} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer, VectorImage} from 'ol/layer';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import LayerGroup from 'ol/layer/group';
import {GeoJSON} from 'ol/format';
import geojsonObject from './data/map.json';

const place = [563836.2560250214, 6818208.299893484]; // Reykjavikplein 1
const point = new Point(place);
const styleCache = {};

const map = new Map({
  target: "app",
});

const featureLayer = new VectorLayer({
  source: new Cluster({
    distance: 20,
    source: new VectorSource({
      features: new GeoJSON({
        featureProjection: "EPSG:900913",
      }).readFeatures(geojsonObject),
    }),
  }),
  style: function (feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new Circle({
          radius: size > 1 ? 16 : 9,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "black" })
        }),
        text: new Text({
          text: size > 1 ? size.toString() : '',
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
  title: 'Locations'
});

const baseLayerOSM = new TileLayer({
  source: new OSM(),
  visible: false,
  title: 'osm',
});
const baseLayerToner = new  TileLayer({
  source: new XYZ({
    url: 'http://b.tile.stamen.com/toner/{z}/{x}/{y}.png',
    attributions: 'This belongs to stamen.com'
  }),
  visible: true,
  title: 'toner',
});
const baseLayerGroup = new LayerGroup({
  layers: [
    baseLayerOSM,
    baseLayerToner
  ]
});

map.addLayer(baseLayerGroup);
map.addLayer(featureLayer);

const view = new View({
  center: point.getCoordinates(),
  zoom: 15,
});
map.setView(view);

const setLayerVisible = (layerName) => {
  baseLayerGroup.getLayers().forEach((el, index) => {
    el.setVisible(el.get('title') === layerName)
  })
}

// button behaviour
document.querySelectorAll('#controls button').forEach(el => {
  el.addEventListener("click", e => {
    setLayerVisible(e.target.dataset.layer);
  })
})