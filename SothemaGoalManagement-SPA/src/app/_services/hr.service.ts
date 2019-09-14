import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PaginatedResult } from './../_models/pagination';
import { environment } from '../../environments/environment';
import { Strategy } from '../_models/strategy';
import { Axis } from '../_models/axis';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getStrategy(id: number, ownerId) {
    let params = new HttpParams();
    params = params.append('ownerId', ownerId);
    return this.http.get<Strategy>(`${this.baseUrl}hr/${id}`, { params });
  }

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

  getAxisList(strategyId: number) {
    return this.http.get<Axis[]>(
      this.baseUrl + 'hr/axisList/' + strategyId);
  }

  addAxis(axis: Axis) {
    return this.http.post(this.baseUrl + 'hr/addAxis', axis);
  }

  updateAxis(id: number, axis: Axis) {
    return this.http.put(this.baseUrl + 'hr/updateAxis/' + id, axis);
  }

  deleteAxis(id: number, userId: number) {
    return this.http.delete(`${this.baseUrl}hr/axis/${id}/delete/${userId}`);
  }
}
