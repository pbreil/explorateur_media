import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { catchError, of, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface ServerInfo {
  status: 'UP' | 'DOWN' | 'CHECKING';
  timestamp: Date;
  responseTime?: number;
  details?: any;
}

@Component({
  selector: 'app-server-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardModule, ButtonModule],
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerInfoComponent implements OnInit, OnDestroy {
  serverInfo: ServerInfo = {
    status: 'CHECKING',
    timestamp: new Date()
  };

  private subscription?: Subscription;
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkServer();
    // Auto-refresh every 10 seconds
    this.subscription = interval(10000)
      .pipe(switchMap(() => this.performHealthCheck()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  checkServer(): void {
    this.serverInfo.status = 'CHECKING';
    this.cdr.markForCheck();
    this.performHealthCheck().subscribe();
  }

  private performHealthCheck() {
    const startTime = Date.now();
    return this.http.get(`${this.serverUrl}/actuator/health`, { observe: 'response' })
      .pipe(
        catchError((error) => {
          this.serverInfo = {
            status: 'DOWN',
            timestamp: new Date(),
            responseTime: Date.now() - startTime,
            details: { error: error.message }
          };
          this.cdr.markForCheck();
          return of(null);
        })
      )
      .pipe(
        switchMap((response) => {
          if (response) {
            this.serverInfo = {
              status: 'UP',
              timestamp: new Date(),
              responseTime: Date.now() - startTime,
              details: response.body
            };
            this.cdr.markForCheck();
          }
          return of(null);
        })
      );
  }

  getStatusIcon(): string {
    switch (this.serverInfo.status) {
      case 'UP':
        return 'pi pi-check-circle';
      case 'DOWN':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-spin pi-spinner';
    }
  }

  getStatusClass(): string {
    switch (this.serverInfo.status) {
      case 'UP':
        return 'status-up';
      case 'DOWN':
        return 'status-down';
      default:
        return 'status-checking';
    }
  }

  getStatusText(): string {
    switch (this.serverInfo.status) {
      case 'UP':
        return 'serverInfo.statusUp';
      case 'DOWN':
        return 'serverInfo.statusDown';
      default:
        return 'serverInfo.statusChecking';
    }
  }
}
