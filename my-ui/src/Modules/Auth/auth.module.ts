import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { components } from '.';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../Shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { effects } from './store/effects';
import { featureKey, reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [...components],
})
export class AuthModule {}
