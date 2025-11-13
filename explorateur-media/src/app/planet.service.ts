import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor() { }

  getPlanets() {
    return [
      { id: 'mercury', name: 'Mercury', diameter: '4,879 km', distanceFromSun: '57.9 million km', numberOfMoons: 0 },
      { id: 'venus', name: 'Venus', diameter: '12,104 km', distanceFromSun: '108.2 million km', numberOfMoons: 0 },
      { id: 'earth', name: 'Earth', diameter: '12,742 km', distanceFromSun: '149.6 million km', numberOfMoons: 1 },
      { id: 'mars', name: 'Mars', diameter: '6,779 km', distanceFromSun: '227.9 million km', numberOfMoons: 2 },
      { id: 'jupiter', name: 'Jupiter', diameter: '139,822 km', distanceFromSun: '778.6 million km', numberOfMoons: 79 },
      { id: 'saturn', name: 'Saturn', diameter: '116,464 km', distanceFromSun: '1,433.5 million km', numberOfMoons: 82 },
      { id: 'uranus', name: 'Uranus', diameter: '50,724 km', distanceFromSun: '2,872.5 million km', numberOfMoons: 27 },
      { id: 'neptune', name: 'Neptune', diameter: '49,244 km', distanceFromSun: '4,495.1 million km', numberOfMoons: 14 }
    ];
  }

  getPlanet(id: string) {
    return this.getPlanets().find(planet => planet.id === id);
  }
}
