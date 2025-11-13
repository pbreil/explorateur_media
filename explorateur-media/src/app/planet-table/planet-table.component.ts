import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../planet.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planet-table',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule]
})
export class PlanetTableComponent implements OnInit {

  planets: any[] = [];

  constructor(private planetService: PlanetService, private router: Router) { }

  ngOnInit(): void {
    this.planets = this.planetService.getPlanets();
  }

  goToPlanetDetails(planetId: string): void {
    this.router.navigate(['/planet', planetId]);
  }

}
