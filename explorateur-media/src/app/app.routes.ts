import { Routes } from '@angular/router';
import { PlanetTableComponent } from './planet-table/planet-table.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

export const routes: Routes = [
  { path: '', component: PlanetTableComponent },
  { path: 'planet/:id', component: PlanetDetailsComponent }
];
