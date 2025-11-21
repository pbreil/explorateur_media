import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule, DrawerModule, TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;
  serverStatus: 'active' | 'inactive' | 'checking' = 'checking';

  menuItems = [
    {
      label: 'sidebar.planets',
      icon: 'pi pi-globe',
      route: '/'
    },
    {
      label: 'sidebar.settings',
      icon: 'pi pi-cog',
      route: '/settings'
    },
    {
      label: 'sidebar.serverInfo',
      icon: 'pi pi-server',
      route: '/server-info'
    }
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkServerStatus();
    // Check server status every 30 seconds
    setInterval(() => this.checkServerStatus(), 30000);
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  checkServerStatus(): void {
    this.http.get('http://localhost:8080/actuator/health', { responseType: 'text' })
      .pipe(
        catchError(() => of('error'))
      )
      .subscribe((response) => {
        this.serverStatus = response !== 'error' ? 'active' : 'inactive';
        this.cdr.markForCheck();
      });
  }

  getServerStatusIcon(): string {
    switch (this.serverStatus) {
      case 'active':
        return 'pi pi-check-circle';
      case 'inactive':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-spin pi-spinner';
    }
  }

  getServerStatusClass(): string {
    switch (this.serverStatus) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
}
