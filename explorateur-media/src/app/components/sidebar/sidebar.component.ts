import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  serverStatus: 'active' | 'inactive' | 'checking' = 'checking';
  menuItems: MenuItem[] = [];
  isSidebarOpen = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkServerStatus();
    // Check server status every 30 seconds
    setInterval(() => this.checkServerStatus(), 30000);

    // Initialize menu items with translations
    this.initializeMenuItems();

    // Re-initialize menu items when language changes
    this.translateService.onLangChange.subscribe(() => {
      this.initializeMenuItems();
    });
  }

  private initializeMenuItems(): void {
    this.menuItems = [
      {
        label: this.translateService.instant('sidebar.planets'),
        icon: 'pi pi-globe',
        command: () => this.router.navigate(['/']),
        styleClass: 'menu-item-custom'
      },
      {
        label: this.translateService.instant('sidebar.settings'),
        icon: 'pi pi-cog',
        command: () => this.router.navigate(['/settings']),
        styleClass: 'menu-item-custom'
      },
      {
        label: this.translateService.instant('sidebar.serverInfo'),
        icon: 'pi pi-server',
        command: () => this.router.navigate(['/server-info']),
        styleClass: 'menu-item-custom'
      }
    ];
    this.cdr.markForCheck();
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
        return 'text-green-400';
      case 'inactive':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.cdr.markForCheck();
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.cdr.markForCheck();
  }
}
