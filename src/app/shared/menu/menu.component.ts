import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      ruta: 'fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: 'zoom-range',
      nombre: 'Zoom Range'
    },
    {
      ruta: 'marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: 'propiedades',
      nombre: 'Propiedades'
    },
  ];


}