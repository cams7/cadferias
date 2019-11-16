import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { BaseSecurityItem } from './base-security-item';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

const DISABLED_CLASS = 'disabled';
@Directive({
  selector: '[securityItem]'
})
export class SecurityItemDirective extends BaseSecurityItem implements AfterViewInit {

  private elementNode: any;
  private parentNode: any;
  private elementClasses: string[];
  
  constructor(
    private element: ElementRef, 
    private renderer: Renderer2,
    protected authService: AuthService
  ) { 
    super(authService);
  }

  ngAfterViewInit() {
    this.elementNode = this.element.nativeElement;
    this.elementClasses = this.elementNode.classList;
    
    this.parentNode = this.renderer.parentNode(this.elementNode);    

    const disableByRoles = () => {
      if(this.roles) {
        this.showItem$.pipe(
          take(1)
        ).subscribe(showItem => {
          if(!showItem)
            this.disableItem();
        });   
      }
    };

    this.disableWithCallback(this.disabled, disableByRoles);
  }

  protected disableOrEnable(disabled: boolean) {        
    const enableItem = () => {
      if(this.elementNode && this.parentNode) {
        if(this.roles) {
          this.showItem$.pipe(
            take(1)
          ).subscribe(showItem => {
            if(showItem)
              this.enableItem();
          });
        } else 
          this.enableItem();
      }
    }
    this.disableWithCallback(disabled, enableItem);      
  }

  private disableWithCallback(disabled: boolean, enableCallback: any) {
    if(disabled) {
      this.disableItem();
    } else if(enableCallback) {
      enableCallback();
    }
  }

  private disableItem() {           
    this.renderer.removeChild(this.parentNode, this.elementNode);
    this.renderer.appendChild(this.parentNode, this.elementNode.children[0]);
    if(this.elementClasses && this.elementClasses.length > 0)
      this.elementClasses.forEach(className => this.renderer.addClass(this.parentNode, className));    
    this.renderer.addClass(this.parentNode, DISABLED_CLASS);    
  }

  private enableItem() {  
    this.renderer.appendChild(this.elementNode, this.parentNode.children[0]);       
    this.renderer.appendChild(this.parentNode, this.elementNode);
    if(this.elementClasses && this.elementClasses.length > 0)
      this.elementClasses.forEach(className => this.renderer.removeClass(this.parentNode, className));
    this.renderer.removeClass(this.parentNode, DISABLED_CLASS);
  }

}
