import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { useGeographic } from 'ol/proj';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { Map as OpenMap, View } from 'ol';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'vegetation-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styles: ``,
})
export class MapComponent implements OnInit, AfterViewInit {
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
    const vectorSource = new VectorSource({
      url: '../assets/vegetation-datawa.geojson',
      format: new GeoJSON(),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    this.mapComponent = new OpenMap({
      layers: [tileLayer, vectorLayer],
      target: this.mapContainer.nativeElement,
      maxTilesLoading: 64,
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  registerProjections() {
    register(proj4);
  }
}
