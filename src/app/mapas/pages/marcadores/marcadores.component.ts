import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef
  
  mapa! : mapboxgl.Map 
  zoomLevel: number = 10
  center: [number, number] = [-58.551281317317226,-34.595456344660896]
  markers: MarcadorColor[] = []

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocal()
    /* const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa) */
  }

  agregarMarcador(){
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const marcador = new mapboxgl.Marker({draggable: true, color: color})
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.markers.push({color: color, marker: marcador})
    this.guardarLocal()
    marcador.on("dragend", () => {
      this.guardarLocal()
    })
  }

  irMarcador(marker : MarcadorColor){
    this.mapa.flyTo({
      center: marker?.marker?.getLngLat()
    })
  }

  guardarLocal(){

    const langlat : MarcadorColor[] = []

    this.markers.forEach(m => {
      const color = m.color
      const {lng, lat} = m.marker!.getLngLat()
      langlat.push({
        color: color,
        center: [lng, lat]
      })
    })
    localStorage.setItem('marcadores', JSON.stringify(langlat))
  }

  leerLocal(){
    if(!localStorage.getItem('marcadores')){
      return
    }
    const lnglat : MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)
    lnglat.forEach( m => {
      console.log(m)
      const marker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.center!)
        .addTo(this.mapa)
        this.markers.push({
          marker: marker,
          color: m.color
        })
        marker.on("dragend", () => {
          this.guardarLocal()
        })
    })
  }
  borrar(i : number){
    this.markers[i].marker?.remove()
    this.markers.splice(i, 1)
    this.guardarLocal()
  }

}
