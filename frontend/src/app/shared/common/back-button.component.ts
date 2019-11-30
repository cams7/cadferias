import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'back-button',
  template: `
  <button type="button" class="btn btn-primary float-left mr-1" (click)="goBack()" tooltip="Voltar à página" placement="top" [adaptivePosition]="false" [delay]="tooltipDelay"><i class="fa fa-arrow-left"></i>&nbsp;Voltar</button>
  `,
  styles: []
})
export class BackButtonComponent implements OnInit, AfterViewInit {
  
  private url: string;

  @Input() tooltipDelay: number;
  
  constructor(
    private element: ElementRef, 
    private renderer: Renderer2,
    private router: Router,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.url = this.router.url;
  }

  ngAfterViewInit() {
    if(this.historyService.isEmptyOrSingle)
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
  } 

  goBack() {  
    this.historyService.back();
    if(this.url.match(/^\/\w+\/(register|\d+)$/g)) 
      this.historyService.isUnchangedPage$.subscribe(_ => this.goForward());    
  }

  private goForward() {
    this.historyService.isForward = true;
    this.historyService.forward();
  }

}
