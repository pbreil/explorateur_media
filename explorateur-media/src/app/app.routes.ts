import { Routes } from '@angular/router';
import { PlanetTableComponent } from './planet-table/planet-table.component';

export const routes: Routes = [
  { path: '', component: PlanetTableComponent },
  {
    path: 'planet/:id',
    loadComponent: () => import('./planet-details/planet-details.component').then(m => m.PlanetDetailsComponent)
  },
  {
    path: 'satellite/:id',
    loadComponent: () => import('./satellite-details/satellite-details.component').then(m => m.SatelliteDetailsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
  },
  {
    path: 'server-info',
    loadComponent: () => import('./components/server-info/server-info.component').then(m => m.ServerInfoComponent)
  }
];
