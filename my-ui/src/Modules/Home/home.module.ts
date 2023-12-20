import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { components } from '.';
import { SharedModule } from '../Shared/shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class HomeModule {}
