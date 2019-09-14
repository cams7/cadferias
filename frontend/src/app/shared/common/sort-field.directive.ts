import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SortVO, Direction } from '../model/vo/pagination/sort-vo';

@Directive({
  selector: '[sortField]'
})
export class SortFieldDirective {

  private sort: SortVO;
  @Input() set sortField(sort: SortVO) {
    if(!!sort && (!this.sort || this.sort.direction != sort.direction)) { 
      if(!!this.sort && !!this.sort.direction)
        this.renderer.removeClass(this.el.nativeElement, this.sort.direction.toLowerCase());
      
      if(!!sort.direction)
        this.renderer.addClass(this.el.nativeElement, sort.direction.toLowerCase());
      
      this.sort = sort;
    }    
  }

  @Output() sortFieldChanged = new EventEmitter();
  
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {     
  }


  @HostListener('click') changeSortOrder() {          
    const direction =  (!this.sort.direction || this.sort.direction == Direction.DESC) ? Direction.ASC : Direction.DESC; 
    
    const sort = <SortVO> {
      property: this.sort.property, 
      direction: direction
    };

    this.sortFieldChanged.emit(sort);
  }
}
