import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PaginatedResult } from './../_models/pagination';
import { environment } from '../../environments/environment';
import { Strategy } from '../_models/strategy';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getStrategies(
    id,
    page?,
    itemsPerPage?,
    strategyParams?
  ): Observable<PaginatedResult<Strategy[]>> {
    const paginatedResult: PaginatedResult<Strategy[]> = new PaginatedResult<
      Strategy[]
      >();
    let params = new HttpParams();
    params = params.append('ownerId', id);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (strategyParams != null) {
      params = params.append('status', strategyParams.status);
      params = params.append('orderBy', strategyParams.orderBy);
    }

    return this.http
      .get<Strategy[]>(this.baseUrl + 'hr/strategies', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  createStrategy(ownerId: number, strategy: Strategy) {
    return this.http.post(`${this.baseUrl}hr/strategies/new/${ownerId}`, strategy);
  }
}
