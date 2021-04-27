import './scss/index.scss'

import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';

import MyImage from './gtav-map-roadmap-huge.jpg';

// the image extent in pixels.
var extent = [0, 0, 2000, 2000];
var projection = new Projection({
  units: 'pixels',
  extent: extent,
});

const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        url: MyImage,
        projection: projection,
        imageExtent: extent,
      }),
    }) 
  ],
  target: "app",
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8,
    extent,
  }),
});
