import {Component, OnInit} from '@angular/core';
import {ServerService} from "./service/server.service";
import {Observable, of} from "rxjs";
import {AppState} from "./interface/app-state";
import {CustomResponse} from "./interface/custom-response";
import {DataState} from "./enum/data-state.enum";
import {startWith, catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-table',
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
