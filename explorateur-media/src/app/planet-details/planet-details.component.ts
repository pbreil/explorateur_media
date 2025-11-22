import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../planet.service';
import { Planet, Satellite } from '../models/planet.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { CelestialBodyDetailsComponent } from '../shared/celestial-body-details/celestial-body-details.component';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TableModule, TranslateModule, CelestialBodyDetailsComponent],
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent implements OnInit {

  planet: Planet | undefined;
  satellites: Satellite[] = [];

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const planetId = this.route.snapshot.paramMap.get('id');
    if (planetId) {
      this.planet = this.planetService.getPlanet(planetId);
      this.satellites = this.planetService.getSatellitesForPlanet(planetId);
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToSatelliteDetails(satellite: Satellite): void {
    this.router.navigate(['/satellite', satellite.id]);
  }

}
