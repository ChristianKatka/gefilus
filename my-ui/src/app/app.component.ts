import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticatedActions } from '../Modules/Auth/store/actions';
import { State } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthenticatedActions.checkOldUserSession());
  }
}
