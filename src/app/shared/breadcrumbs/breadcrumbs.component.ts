import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta

  ) { 
    this.getDataRoute()
      .subscribe(data => {

        this.label = data.titulo;
        //this.title.setTitle(this.label);   // Muestra el título de cada pagina o de cada ruta
        this.title.setTitle('KAYA');

        let metaTag: MetaDefinition = {
          name: 'Descripción',
          content: this.label,
        };

        let metaTagDos: MetaDefinition = {
          name: 'Autor',
          content: 'Hector Cendoya Mitta',
        };

        this.meta.updateTag(metaTag);
        this.meta.updateTag(metaTagDos);

      });
  }

  getDataRoute() {
    return this.router.events
      .filter(evento => evento instanceof ActivationEnd )
      .filter((evento: ActivationEnd) => evento.snapshot.firstChild === null )
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }

  ngOnInit() {
  }
  

}
