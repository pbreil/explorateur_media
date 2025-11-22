import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = `${environment.apiUrl}/api/football`;

  constructor(private http: HttpClient) { }

  getClassement(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/classement`);
  }

  refreshClassement(): Observable<Team[]> {
    return this.http.post<Team[]>(`${this.apiUrl}/classement/refresh`, {});
  }
}
