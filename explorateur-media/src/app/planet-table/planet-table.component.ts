import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../planet.service';
import { Planet, Satellite } from '../models/planet.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface ColumnConfig {
  field: string;
  header: string;
  visible: boolean;
}

interface CelestialBody {
  id: string;
  name: string;
  type: 'planet' | 'satellite';
  diameter: string;
  distanceFromSun?: string;
  distanceFromPlanet?: string;
  orbitalPeriod: string;
  numberOfMoons?: number;
  planetName?: string;
  surfaceGravity?: string;
  atmosphericPressure?: string;
  averageTemperature?: string;
  mass: string;
  discoveryYear: string;
  discoverer: string;
}

@Component({
  selector: 'app-planet-table',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CheckboxModule, SelectModule, FormsModule, TranslateModule]
})
export class PlanetTableComponent implements OnInit {

  celestialBodies: CelestialBody[] = [];
  columns: ColumnConfig[] = [];
  bodyTypeFilter: 'all' | 'planets' | 'satellites' = 'all';
  bodyTypeOptions: Array<{label: string, value: string}> = [];

  private planetColumnDefinitions = [
    { field: 'name', translationKey: 'planetTable.columns.name' },
    { field: 'diameter', translationKey: 'planetTable.columns.diameter' },
    { field: 'distanceFromSun', translationKey: 'planetTable.columns.distanceFromSun' },
    { field: 'orbitalPeriod', translationKey: 'planetTable.columns.orbitalPeriod' },
    { field: 'numberOfMoons', translationKey: 'planetTable.columns.numberOfMoons' },
    { field: 'surfaceGravity', translationKey: 'planetTable.columns.surfaceGravity' },
    { field: 'atmosphericPressure', translationKey: 'planetTable.columns.atmosphericPressure' },
    { field: 'averageTemperature', translationKey: 'planetTable.columns.averageTemperature' },
    { field: 'mass', translationKey: 'planetTable.columns.mass' },
    { field: 'discoveryYear', translationKey: 'planetTable.columns.discoveryYear' },
    { field: 'discoverer', translationKey: 'planetTable.columns.discoverer' }
  ];

  private satelliteColumnDefinitions = [
    { field: 'name', translationKey: 'planetTable.columns.name' },
    { field: 'planetName', translationKey: 'planetTable.columns.planetName' },
    { field: 'diameter', translationKey: 'planetTable.columns.diameter' },
    { field: 'distanceFromPlanet', translationKey: 'planetTable.columns.distanceFromPlanet' },
    { field: 'orbitalPeriod', translationKey: 'planetTable.columns.orbitalPeriod' },
    { field: 'mass', translationKey: 'planetTable.columns.mass' },
    { field: 'discoveryYear', translationKey: 'planetTable.columns.discoveryYear' },
    { field: 'discoverer', translationKey: 'planetTable.columns.discoverer' }
  ];

  showFilters: boolean = false;

  constructor(
    private planetService: PlanetService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadCelestialBodies();
    this.initializeBodyTypeOptions();
    this.initializeColumns();
    this.loadColumnPreferences();

    // Re-initialize columns when language changes
    this.translate.onLangChange.subscribe(() => {
      this.initializeBodyTypeOptions();
      this.initializeColumns();
    });
  }

  private initializeBodyTypeOptions(): void {
    this.bodyTypeOptions = [
      { label: this.translate.instant('planetTable.filterAll'), value: 'all' },
      { label: this.translate.instant('planetTable.filterPlanets'), value: 'planets' },
      { label: this.translate.instant('planetTable.filterSatellites'), value: 'satellites' }
    ];
  }

  private loadCelestialBodies(): void {
    const planets = this.planetService.getPlanets();
    const satellites = this.planetService.getSatellites();

    // Convert planets to CelestialBody
    const planetBodies: CelestialBody[] = planets.map(planet => ({
      id: planet.id,
      name: planet.name,
      type: 'planet' as const,
      diameter: planet.diameter,
      distanceFromSun: planet.distanceFromSun,
      orbitalPeriod: planet.orbitalPeriod,
      numberOfMoons: planet.numberOfMoons,
      surfaceGravity: planet.surfaceGravity,
      atmosphericPressure: planet.atmosphericPressure,
      averageTemperature: planet.averageTemperature,
      mass: planet.mass,
      discoveryYear: planet.discoveryYear,
      discoverer: planet.discoverer
    }));

    // Convert satellites to CelestialBody
    const satelliteBodies: CelestialBody[] = satellites.map(satellite => {
      const planet = planets.find(p => p.id === satellite.planetId);
      return {
        id: satellite.id,
        name: satellite.name,
        type: 'satellite' as const,
        diameter: satellite.diameter,
        distanceFromPlanet: satellite.distanceFromPlanet,
        orbitalPeriod: satellite.orbitalPeriod,
        planetName: planet?.name || '',
        mass: satellite.mass,
        discoveryYear: satellite.discoveryYear,
        discoverer: satellite.discoverer
      };
    });

    this.celestialBodies = [...planetBodies, ...satelliteBodies];
  }

  private initializeColumns(): void {
    const savedPreferences = this.getSavedPreferences();
    const columnDefs = this.bodyTypeFilter === 'satellites' ? this.satelliteColumnDefinitions : this.planetColumnDefinitions;

    this.columns = columnDefs.map(def => ({
      field: def.field,
      header: this.translate.instant(def.translationKey),
      visible: savedPreferences[def.field] !== undefined ? savedPreferences[def.field] : true
    }));
  }

  get filteredBodies(): CelestialBody[] {
    if (this.bodyTypeFilter === 'planets') {
      return this.celestialBodies.filter(body => body.type === 'planet');
    } else if (this.bodyTypeFilter === 'satellites') {
      return this.celestialBodies.filter(body => body.type === 'satellite');
    }
    return this.celestialBodies;
  }

  onBodyTypeFilterChange(): void {
    this.initializeColumns();
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

  goToDetails(body: CelestialBody): void {
    if (body.type === 'planet') {
      this.router.navigate(['/planet', body.id]);
    }
    // For satellites, we could navigate to the planet details page
    // or do nothing for now
  }

  getFieldValue(body: CelestialBody, field: string): any {
    return (body as any)[field];
  }

}
