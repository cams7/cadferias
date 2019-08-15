import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[sortField]'
})
export class SortFieldDirective {

  private _sortField: SortField;
  @Input() set sortField(sortField: SortField) {
    if(!!sortField && (!this._sortField || this._sortField.order != sortField.order)) { 
      if(!!this._sortField && !!this._sortField.order)
        this.renderer.removeClass(this.el.nativeElement, this._sortField.order);
      
      if(!!sortField.order)
        this.renderer.addClass(this.el.nativeElement, sortField.order);
      
      this._sortField = sortField;
    }    
  }

  @Output() sortFieldChanged = new EventEmitter();
  
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {     
  }


  @HostListener('click') changeSortOrder() {          
    const sortOrder =  (!this._sortField.order || this._sortField.order == SortOrder.DESC) ? SortOrder.ASC : SortOrder.DESC; 
    
    const sortField = <SortField> {
      fieldName: this._sortField.fieldName, 
      order: sortOrder
    };

    this.sortFieldChanged.emit(sortField);
  }
}

export interface SortField {
  fieldName: string;
  order: SortOrder;
}

export enum SortOrder {
  ASC='asc',
  DESC='desc'
}
