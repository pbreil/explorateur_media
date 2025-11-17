import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../planet.service';
import { Planet } from '../models/planet.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  imports: [CommonModule, TableModule, ButtonModule, CheckboxModule, FormsModule]
})
export class PlanetTableComponent implements OnInit {

  planets: Planet[] = [];
  columns: ColumnConfig[] = [
    { field: 'name', header: 'Name', visible: true },
    { field: 'diameter', header: 'Diameter', visible: true },
    { field: 'distanceFromSun', header: 'Distance from Sun', visible: true },
    { field: 'numberOfMoons', header: 'Number of Moons', visible: true },
    { field: 'surfaceGravity', header: 'Surface Gravity', visible: true },
    { field: 'atmosphericPressure', header: 'Atmospheric Pressure', visible: true },
    { field: 'averageTemperature', header: 'Average Temperature', visible: true },
    { field: 'mass', header: 'Mass', visible: true }
  ];

  showFilters: boolean = false;

  constructor(private planetService: PlanetService, private router: Router) { }

  ngOnInit(): void {
    this.planets = this.planetService.getPlanets();
    this.loadColumnPreferences();
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
    const cookies = document.cookie.split(';');
    const preferenceCookie = cookies.find(cookie => cookie.trim().startsWith('planetColumnPreferences='));

    if (preferenceCookie) {
      try {
        const value = preferenceCookie.split('=')[1];
        const preferences = JSON.parse(decodeURIComponent(value));

        preferences.forEach((pref: any) => {
          const column = this.columns.find(col => col.field === pref.field);
          if (column) {
            column.visible = pref.visible;
          }
        });
      } catch (e) {
        console.error('Error loading column preferences:', e);
      }
    }
  }

  goToPlanetDetails(planetId: string): void {
    this.router.navigate(['/planet', planetId]);
  }

  getFieldValue(planet: Planet, field: string): any {
    return (planet as any)[field];
  }

}
