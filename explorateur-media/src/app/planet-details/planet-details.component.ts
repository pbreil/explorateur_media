import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanetService } from '../planet.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  planet: any;

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
