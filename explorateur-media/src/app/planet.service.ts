import { Injectable } from '@angular/core';
import { Planet } from './models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor() { }

  getPlanets(): Planet[] {
    return [
      {
        id: 'mercury',
        name: 'Mercury',
        diameter: '4,879 km',
        distanceFromSun: '57.9 million km',
        numberOfMoons: 0,
        surfaceGravity: '3.7 m/s²',
        atmosphericPressure: '~0 Pa (trace)',
        averageTemperature: '167°C',
        mass: '3.3011 × 10²³ kg'
      },
      {
        id: 'venus',
        name: 'Venus',
        diameter: '12,104 km',
        distanceFromSun: '108.2 million km',
        numberOfMoons: 0,
        surfaceGravity: '8.87 m/s²',
        atmosphericPressure: '92 bar',
        averageTemperature: '464°C',
        mass: '4.8675 × 10²⁴ kg'
      },
      {
        id: 'earth',
        name: 'Earth',
        diameter: '12,742 km',
        distanceFromSun: '149.6 million km',
        numberOfMoons: 1,
        surfaceGravity: '9.807 m/s²',
        atmosphericPressure: '1.01325 bar',
        averageTemperature: '15°C',
        mass: '5.97237 × 10²⁴ kg'
      },
      {
        id: 'mars',
        name: 'Mars',
        diameter: '6,779 km',
        distanceFromSun: '227.9 million km',
        numberOfMoons: 2,
        surfaceGravity: '3.721 m/s²',
        atmosphericPressure: '0.00636 bar',
        averageTemperature: '-65°C',
        mass: '6.4171 × 10²³ kg'
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        diameter: '139,822 km',
        distanceFromSun: '778.6 million km',
        numberOfMoons: 79,
        surfaceGravity: '24.79 m/s²',
        atmosphericPressure: '>1000 bar',
        averageTemperature: '-110°C',
        mass: '1.8982 × 10²⁷ kg'
      },
      {
        id: 'saturn',
        name: 'Saturn',
        diameter: '116,464 km',
        distanceFromSun: '1,433.5 million km',
        numberOfMoons: 82,
        surfaceGravity: '10.44 m/s²',
        atmosphericPressure: '>1000 bar',
        averageTemperature: '-140°C',
        mass: '5.6834 × 10²⁶ kg'
      },
      {
        id: 'uranus',
        name: 'Uranus',
        diameter: '50,724 km',
        distanceFromSun: '2,872.5 million km',
        numberOfMoons: 27,
        surfaceGravity: '8.87 m/s²',
        atmosphericPressure: '>1000 bar',
        averageTemperature: '-195°C',
        mass: '8.6810 × 10²⁵ kg'
      },
      {
        id: 'neptune',
        name: 'Neptune',
        diameter: '49,244 km',
        distanceFromSun: '4,495.1 million km',
        numberOfMoons: 14,
        surfaceGravity: '11.15 m/s²',
        atmosphericPressure: '>1000 bar',
        averageTemperature: '-200°C',
        mass: '1.02413 × 10²⁶ kg'
      }
    ];
  }

  getPlanet(id: string): Planet | undefined {
    return this.getPlanets().find(planet => planet.id === id);
  }
}
