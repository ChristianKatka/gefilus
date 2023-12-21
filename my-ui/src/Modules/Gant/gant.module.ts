import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { components } from '.';
import { SharedModule } from '../Shared/shared.module';
import { MaterialModule } from '../../material.module';
import { BryntumGanttModule } from '@bryntum/gantt-angular';

@NgModule({
  imports: [CommonModule, MaterialModule, SharedModule, BryntumGanttModule],
  declarations: [...components],
  exports: [...components],
})
export class GantModule {}
