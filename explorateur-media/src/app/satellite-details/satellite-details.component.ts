import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../planet.service';
import { Satellite } from '../models/planet.model';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { CelestialBodyDetailsComponent } from '../shared/celestial-body-details/celestial-body-details.component';

@Component({
  selector: 'app-satellite-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, CelestialBodyDetailsComponent],
  templateUrl: './satellite-details.component.html',
  styleUrls: ['./satellite-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SatelliteDetailsComponent implements OnInit {

  satellite: Satellite | undefined;
  planetName: string = '';

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const satelliteId = this.route.snapshot.paramMap.get('id');
    if (satelliteId) {
      this.satellite = this.planetService.getSatellite(satelliteId);
      if (this.satellite) {
        const planet = this.planetService.getPlanet(this.satellite.planetId);
        this.planetName = planet?.name || '';
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToPlanet(): void {
    if (this.satellite) {
      this.router.navigate(['/planet', this.satellite.planetId]);
    }
  }

}
