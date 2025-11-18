import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanetService } from '../planet.service';
import { Planet } from '../models/planet.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TranslateModule],
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  planet: Planet | undefined;

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const planetId = this.route.snapshot.paramMap.get('id');
    if (planetId) {
      this.planet = this.planetService.getPlanet(planetId);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
