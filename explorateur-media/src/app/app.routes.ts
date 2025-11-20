import { Routes } from '@angular/router';
import { PlanetTableComponent } from './planet-table/planet-table.component';

export const routes: Routes = [
  { path: '', component: PlanetTableComponent },
  {
    path: 'planet/:id',
    loadComponent: () => import('./planet-details/planet-details.component').then(m => m.PlanetDetailsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'server-info',
    loadComponent: () => import('./components/server-info/server-info.component').then(m => m.ServerInfoComponent)
  }
];
