import {Component, OnInit} from '@angular/core';

import {Observable, of} from "rxjs";
;
import {startWith, catchError, map} from "rxjs/operators";
import { DataState } from 'src/app/enum/data-state.enum';
import { AppState } from 'src/app/interface/app-state';
import { CustomResponse } from 'src/app/interface/custom-response';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'table',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web4.0';
  appState$: Observable<AppState<CustomResponse>> | undefined;
  constructor(private serverService: ServerService) {
  }
  ngOnInit(): void{
    this.appState$ = this.serverService.results$
      .pipe(
        map(response => {
          return {dataState: DataState.LOADED_STATE, appData: response}
        }),
        startWith({dataState: DataState.LOADING_STATE}),
        catchError((error:string) => {
          return of({dataState: DataState.ERROR_STATE, error})
        })
      );
  }
}
