import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { useGeographic } from 'ol/proj';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { Map as OpenMap, View } from 'ol';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile';
import GeoTIFF from 'ol/source/GeoTIFF';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

@Component({
  selector: 'SLGA-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map2.component.html',
  styles: ``,
})
export class Map2Component implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLElement>;
  mapComponent: OpenMap | undefined;

  ngOnInit() {
    useGeographic();
    this.registerProjections();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    const centerCoordinates = [133.775136, -25.274399]; // Center of Australia

    const rasterSource = new GeoTIFF({
      sources: [
        {
          url: 'https://apikey:NklvVXE3NWhvQ1piTHUzZC5nV31jLlE/aE4oZnddcSIkdk0mW3N9Um5PVEY5IUtNX0cqQEk6fnBmPzIpJHxFay5xVj8mXi1iayZiZlZLMU1y@data.tern.org.au/landscapes/slga/NationalMaps/SoilAndLandscapeGrid/AWC/AWC_000_005_EV_N_P_AU_TRN_N_20210614.tif',
        },
      ],
    });

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const rasterLayer = new TileLayer({
      source: rasterSource,
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.9)', // Red color with 20% opacity
        }),
        stroke: new Stroke({
          color: 'red', // Red color
          width: 2, // Stroke width
        }),
      }),
    });

    this.mapComponent = new OpenMap({
      layers: [tileLayer, rasterLayer, vectorLayer],
      target: this.mapContainer.nativeElement,
      maxTilesLoading: 64,
      view: new View({
        center: centerCoordinates,
        zoom: 4,
      }),
    });
  }

  registerProjections() {
    register(proj4);
  }
}
