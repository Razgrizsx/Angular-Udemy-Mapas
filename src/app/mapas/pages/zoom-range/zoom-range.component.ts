import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa!: ElementRef
  
  mapa! : mapboxgl.Map 
  zoomLevel: number = 10
  center: [number, number] = [-58.551281317317226,-34.595456344660896]

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (e) => {
      const zoomActual = this.mapa.getZoom()
      this.zoomLevel = zoomActual
    })

    this.mapa.on('zoomend', () => {
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18)
      }
    })

  this.mapa.on('move', (e) => {
    const target = e.target
    const {lng, lat} = target.getCenter()
    this.center = [lng, lat]
  })
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {})
    this.mapa.off('zoomend', () => {})
    this.mapa.off('move', () => {})
  }

  zoomIn(){
    this.mapa.zoomIn()
    
  }

  zoomOut(){
    this.mapa.zoomOut()

  }

  zoomCambio(zoom: string){
    this.mapa.zoomTo(parseInt(zoom))
  }
}
