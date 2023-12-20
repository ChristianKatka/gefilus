import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { components, pipes, directives } from '.';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  declarations: [...components, ...pipes, ...directives],
  exports: [...components, ...pipes, ...directives],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
