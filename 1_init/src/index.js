import './scss/index.scss'

import {Map, View} from 'ol/index';
import {OSM} from 'ol/source';
import {Tile as TileLayer} from 'ol/layer';

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "app",
  view: new View({
    center: [0, 0],
    zoom: 2,
  })
});
