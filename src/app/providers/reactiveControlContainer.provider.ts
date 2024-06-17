
import {  Optional, Provider, SkipSelf } from "@angular/core";
import { ControlContainer, FormArray, FormGroup } from "@angular/forms";

export const reactiveViewProvider: Provider = {
    provide: ControlContainer,
    useFactory: function(controlContainer: ControlContainer) {
      return controlContainer ||  null;
    },
    deps: [
      [new Optional(),new SkipSelf(), ControlContainer],
    ]
    
};
   
  