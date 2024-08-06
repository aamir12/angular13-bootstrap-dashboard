import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SingleAutocompleteComponent } from './single-autocomplete.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    SingleAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSelectModule
  ],
  exports:[SingleAutocompleteComponent]
})
export class SingleSelectAutoCompleteModule { }
