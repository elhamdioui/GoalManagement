import { BehavioralSkill } from './../_models/behavioralSkill';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { PaginatedResult } from './../_models/pagination';
import { environment } from '../../environments/environment';
import { Strategy } from '../_models/strategy';
import { Axis } from '../_models/axis';
import { AxisPole } from '../_models/axisPole';
import { User } from '../_models/user';
import { EvaluationFile } from '../_models/evaluationFile';
import { EvaluationFileInstance } from '../_models/evaluationFileInstance';
import { AxisInstance } from '../_models/axisInstance';

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

  cloneStrategy(ownerId: number, strategyId: number) {
    return this.http.post(`${this.baseUrl}hr/strategies/clone/${ownerId}/${strategyId}`, {});
  }

  deleteStrategy(id: number) {
    return this.http.delete(`${this.baseUrl}hr/strategies/delete/${id}`);
  }

  updateStrategy(ownerId: number, strategy: Strategy) {
    return this.http.put(`${this.baseUrl}hr/strategies/edit/${ownerId}`, strategy);
  }

  getAxisList(strategyId: number) {
    return this.http.get<Axis[]>(
      this.baseUrl + 'hr/axisList/' + strategyId);
  }

  getAxisPoleList(axisId: number) {
    return this.http.get<AxisPole[]>(
      this.baseUrl + 'hr/axisPoleList/' + axisId);
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

  updateAxisPoleWeigth(axisId: number, poleId: number, weight: number) {
    return this.http.put(`${this.baseUrl}hr/updateAxisPole/${axisId}/${poleId}/${weight}`, {});
  }

  deleteStrategyDocument(id: number) {
    return this.http.post(this.baseUrl + 'hr/strategies/edit/' + id + '/documentation/delete', {});
  }

  getBehavioralSkills(createdById, filters?) {
    let params = new HttpParams();
    params = params.append('ownerId', createdById);
    if (filters != null) {
      params = params.append('status', filters.status);
      params = params.append('orderBy', filters.orderBy);
    }
    return this.http.get<BehavioralSkill[]>(`${this.baseUrl}hr/behavioralSkill`, { params });
  }

  cloneBehavioralSkill(ownerId: number, behavioralSkillId: number) {
    return this.http.post(`${this.baseUrl}hr/behavioralSkill/clone/${ownerId}/${behavioralSkillId}`, {});
  }

  deleteBehavioralSkill(id: number) {
    return this.http.delete(`${this.baseUrl}hr/behavioralSkill/delete/${id}`);
  }

  updateBehavioralSkill(createdById: number, behavioralSkill: BehavioralSkill) {
    return this.http.put(`${this.baseUrl}hr/behavioralSkill/edit/${createdById}`, behavioralSkill)
  }

  getBehavioralSkill(id: number) {
    return this.http.get<BehavioralSkill>(`${this.baseUrl}hr/behavioralSkill/${id}`);
  }

  createBehavioralSkill(createdById: number, behavioralSkill: BehavioralSkill) {
    return this.http.post(`${this.baseUrl}hr/behavioralSkill/new/${createdById}`, behavioralSkill);
  }

  getEvaluationFiles(ownerId, filters?) {
    let params = new HttpParams();
    params = params.append('ownerId', ownerId);
    if (filters != null) {
      params = params.append('status', filters.status);
      params = params.append('orderBy', filters.orderBy);
    }
    return this.http.get<EvaluationFile[]>(`${this.baseUrl}hr/evaluationfile`, { params });
  }

  updateEvaluationFile(ownerId: number, evaluationFile: any) {
    return this.http.put(`${this.baseUrl}hr/evaluationfile/edit/${ownerId}`, evaluationFile)
  }

  getEvaluationFile(id: number) {
    return this.http.get<EvaluationFile>(`${this.baseUrl}hr/evaluationfile/${id}`);
  }

  createEvaluationFile(ownerId: number, newEvaluationFile: any) {
    return this.http.post(`${this.baseUrl}hr/evaluationfile/new/${ownerId}`, newEvaluationFile);
  }

  generateEvaluationFile(evaluationFileId: number, users: User[]) {
    console.log('users: ', users);
    return this.http.post(`${this.baseUrl}hr/evaluationfile/generate/${evaluationFileId}`, users);
  }

  efiBSList = new BehaviorSubject<EvaluationFileInstance[]>([]);
  efiObservableList = this.efiBSList.asObservable();
  changeEfiList(efilist: EvaluationFileInstance[]) {
    this.efiBSList.next(efilist);
  }
  getEvaluationFileInstancesByEvaluationFileId(evaluationFileId: number) {
    return this.http.get<EvaluationFileInstance[]>(`${this.baseUrl}hr/evaluationFile/evaluationFileInstances/${evaluationFileId}`)
      .pipe(map((result: EvaluationFileInstance[]) => {
        this.changeEfiList(result);
      }));
  }

  updateAxisInstance(userId: number, axisInstanceId: number, userWeight: number) {
    return this.http.put(`${this.baseUrl}hr/evaluationfile/axisInstance/edit/${userId}/${axisInstanceId}/${userWeight}`, {})
  }

  deleteEvaluationFileInstance(id: number, userId: number) {
    return this.http.delete(`${this.baseUrl}hr/evaluationFile/evaluationFileInstance/${id}/delete/${userId}`);
  }
}
