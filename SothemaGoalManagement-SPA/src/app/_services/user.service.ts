import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { PaginatedResult } from './../_models/pagination';
import { Message } from '../_models/message';
import { Goal } from '../_models/goal';
import { Strategy } from '../_models/strategy';
import { Approver } from '../_models/approver';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  searchForUsers(searchTerm: string): Observable<Approver[]> {
    return this.http.get<Approver[]>(this.baseUrl + 'users/searchApprovers?searchTerm=' + searchTerm);
  }

  updateProfile(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  getMessages(
    id: number,
    page?,
    itemsPerPage?,
    messageContainer?
  ): Observable<PaginatedResult<Message[]>> {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
      >();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {
        observe: 'response',
        params
      })
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

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId
    );
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/messages/' + id,
      {}
    );
  }

  markAsRead(userId: number, messageId: number) {
    this.http
      .post(
        this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read',
        {}
      )
      .subscribe();
  }

  getGoals(id: number,
    page?,
    itemsPerPage?): Observable<PaginatedResult<Goal[]>> {
    const paginatedResult: PaginatedResult<Goal[]> = new PaginatedResult<
      Goal[]
      >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Goal[]>(this.baseUrl + 'users', { observe: 'response', params })
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

  getStrategies(id: number,
    page?,
    itemsPerPage?): Observable<PaginatedResult<Strategy[]>> {
    const paginatedResult: PaginatedResult<Strategy[]> = new PaginatedResult<
      Strategy[]
      >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Strategy[]>(this.baseUrl + 'users', { observe: 'response', params })
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
}
