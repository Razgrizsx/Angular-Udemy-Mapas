import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef
  
  mapa! : mapboxgl.Map 

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-58.551281317317226,-34.595456344660896],
      zoom: 14
    });
  }

  zoomIn(){
    this.mapa.zoomIn()
  }

  zoomOut(){
    this.mapa.zoomOut()
  }
}
