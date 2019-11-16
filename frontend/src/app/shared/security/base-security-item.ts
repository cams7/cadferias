import { OnInit, OnDestroy, Input } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Conditional, AuthService } from '../auth/auth.service';

export abstract class BaseSecurityItem implements OnInit, OnDestroy {
    
    private _showItem$ = of(false); 
   
    /**
     * Recebe um array de roles para serem validados.
     */
    @Input() roles: string[];
  
    /**
     * Se a condicional for "AND", o usuário logado tem que esta vinculado a todas "roles" informadas. 
     * Caso contrário, o usuário logado precisa ter apenas uma dessas "roles". 
     */
    @Input() conditional: Conditional;
  
    private _disabled: boolean;

    @Input() set disabled(disabled: boolean) {        
      if(this._disabled != undefined && disabled != this._disabled) {                        
        this.disableOrEnable(disabled);
        this.init();
      }
      this._disabled = !!disabled;
    };

    get disabled() {
      return this._disabled;
    }
  
    constructor(
      protected authService: AuthService
    ) {}
  
    ngOnInit() {
      this.init();
    }

    private init() {
      if(this.roles) {      
        const roles = this.authService.getRoles(this.roles);
        const conditional = this.authService.getConditional(this.conditional);
  
        this._showItem$ = this.authService.validateRoles$(roles, conditional).pipe(
          shareReplay()
        );
      }
    }

    ngOnDestroy() {
    }

    protected abstract disableOrEnable(disabled: boolean): void;
  
    get showItem$() {
      return this._showItem$;
    }    
}
