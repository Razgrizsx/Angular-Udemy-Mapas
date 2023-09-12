import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.css']
})
export class MiniMapaComponent implements AfterViewInit{

  @Input() lnglat: [number, number] = [0, 0]
  @ViewChild('mapa') divMapa!: ElementRef

  ngAfterViewInit(): void {
    var map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lnglat,
      zoom: 14,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lnglat)
      .addTo(map)
  }
}
