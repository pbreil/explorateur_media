import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../planet.service';
import { Planet } from '../models/planet.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface ColumnConfig {
  field: string;
  header: string;
  visible: boolean;
}

@Component({
  selector: 'app-planet-table',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CheckboxModule, FormsModule, TranslateModule]
})
export class PlanetTableComponent implements OnInit {

  planets: Planet[] = [];
  columns: ColumnConfig[] = [];

  private columnDefinitions = [
    { field: 'name', translationKey: 'planetTable.columns.name' },
    { field: 'diameter', translationKey: 'planetTable.columns.diameter' },
    { field: 'distanceFromSun', translationKey: 'planetTable.columns.distanceFromSun' },
    { field: 'numberOfMoons', translationKey: 'planetTable.columns.numberOfMoons' },
    { field: 'surfaceGravity', translationKey: 'planetTable.columns.surfaceGravity' },
    { field: 'atmosphericPressure', translationKey: 'planetTable.columns.atmosphericPressure' },
    { field: 'averageTemperature', translationKey: 'planetTable.columns.averageTemperature' },
    { field: 'mass', translationKey: 'planetTable.columns.mass' }
  ];

  showFilters: boolean = false;

  constructor(
    private planetService: PlanetService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.planets = this.planetService.getPlanets();
    this.initializeColumns();
    this.loadColumnPreferences();

    // Re-initialize columns when language changes
    this.translate.onLangChange.subscribe(() => {
      this.initializeColumns();
    });
  }

  private initializeColumns(): void {
    const savedPreferences = this.getSavedPreferences();

    this.columns = this.columnDefinitions.map(def => ({
      field: def.field,
      header: this.translate.instant(def.translationKey),
      visible: savedPreferences[def.field] !== undefined ? savedPreferences[def.field] : true
    }));
  }

  private getSavedPreferences(): { [key: string]: boolean } {
    const cookies = document.cookie.split(';');
    const preferenceCookie = cookies.find(cookie => cookie.trim().startsWith('planetColumnPreferences='));

    if (preferenceCookie) {
      try {
        const value = preferenceCookie.split('=')[1];
        const preferences = JSON.parse(decodeURIComponent(value));
        const result: { [key: string]: boolean } = {};
        preferences.forEach((pref: any) => {
          result[pref.field] = pref.visible;
        });
        return result;
      } catch (e) {
        console.error('Error loading column preferences:', e);
      }
    }

    return {};
  }

  get visibleColumns(): ColumnConfig[] {
    return this.columns.filter(col => col.visible);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onColumnToggle(): void {
    this.saveColumnPreferences();
  }

  saveColumnPreferences(): void {
    const preferences = this.columns.map(col => ({
      field: col.field,
      visible: col.visible
    }));
    document.cookie = `planetColumnPreferences=${JSON.stringify(preferences)}; path=/; max-age=31536000`; // 1 year
  }

  loadColumnPreferences(): void {
    // Preferences are now loaded in initializeColumns
  }

  goToPlanetDetails(planetId: string): void {
    this.router.navigate(['/planet', planetId]);
  }

  getFieldValue(planet: Planet, field: string): any {
    return (planet as any)[field];
  }

}
