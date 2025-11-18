import { Injectable } from '@angular/core';
import { Planet, Satellite } from './models/planet.model';

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
        mass: '3.3011 × 10²³ kg',
        discoveryYear: 'Antiquity',
        discoverer: 'Known to ancient civilizations',
        orbitalPeriod: '88 days'
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
        mass: '4.8675 × 10²⁴ kg',
        discoveryYear: 'Antiquity',
        discoverer: 'Known to ancient civilizations',
        orbitalPeriod: '225 days'
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
        mass: '5.97237 × 10²⁴ kg',
        discoveryYear: 'Prehistoric',
        discoverer: 'N/A',
        orbitalPeriod: '365.25 days'
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
        mass: '6.4171 × 10²³ kg',
        discoveryYear: 'Antiquity',
        discoverer: 'Known to ancient civilizations',
        orbitalPeriod: '687 days'
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
        mass: '1.8982 × 10²⁷ kg',
        discoveryYear: 'Antiquity',
        discoverer: 'Known to ancient civilizations',
        orbitalPeriod: '11.86 years'
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
        mass: '5.6834 × 10²⁶ kg',
        discoveryYear: 'Antiquity',
        discoverer: 'Known to ancient civilizations',
        orbitalPeriod: '29.46 years'
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
        mass: '8.6810 × 10²⁵ kg',
        discoveryYear: '1781',
        discoverer: 'William Herschel',
        orbitalPeriod: '84.01 years'
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
        mass: '1.02413 × 10²⁶ kg',
        discoveryYear: '1846',
        discoverer: 'Johann Galle, Urbain Le Verrier',
        orbitalPeriod: '164.79 years'
      }
    ];
  }

  getPlanet(id: string): Planet | undefined {
    return this.getPlanets().find(planet => planet.id === id);
  }

  getSatellites(): Satellite[] {
    return [
      // Moon (Earth)
      {
        id: 'moon',
        name: 'Moon',
        planetId: 'earth',
        diameter: '3,474 km',
        distanceFromPlanet: '384,400 km',
        orbitalPeriod: '27.3 days',
        mass: '7.342 × 10²² kg',
        discoveryYear: 'Prehistoric',
        discoverer: 'N/A'
      },
      // Mars satellites
      {
        id: 'phobos',
        name: 'Phobos',
        planetId: 'mars',
        diameter: '22.4 km',
        distanceFromPlanet: '9,376 km',
        orbitalPeriod: '7.65 hours',
        mass: '1.0659 × 10¹⁶ kg',
        discoveryYear: '1877',
        discoverer: 'Asaph Hall'
      },
      {
        id: 'deimos',
        name: 'Deimos',
        planetId: 'mars',
        diameter: '12.4 km',
        distanceFromPlanet: '23,463 km',
        orbitalPeriod: '30.3 hours',
        mass: '1.4762 × 10¹⁵ kg',
        discoveryYear: '1877',
        discoverer: 'Asaph Hall'
      },
      // Jupiter satellites (Galilean moons)
      {
        id: 'io',
        name: 'Io',
        planetId: 'jupiter',
        diameter: '3,643 km',
        distanceFromPlanet: '421,700 km',
        orbitalPeriod: '1.77 days',
        mass: '8.93 × 10²² kg',
        discoveryYear: '1610',
        discoverer: 'Galileo Galilei'
      },
      {
        id: 'europa',
        name: 'Europa',
        planetId: 'jupiter',
        diameter: '3,122 km',
        distanceFromPlanet: '671,034 km',
        orbitalPeriod: '3.55 days',
        mass: '4.80 × 10²² kg',
        discoveryYear: '1610',
        discoverer: 'Galileo Galilei'
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        planetId: 'jupiter',
        diameter: '5,268 km',
        distanceFromPlanet: '1,070,412 km',
        orbitalPeriod: '7.15 days',
        mass: '1.48 × 10²³ kg',
        discoveryYear: '1610',
        discoverer: 'Galileo Galilei'
      },
      {
        id: 'callisto',
        name: 'Callisto',
        planetId: 'jupiter',
        diameter: '4,821 km',
        distanceFromPlanet: '1,882,709 km',
        orbitalPeriod: '16.69 days',
        mass: '1.08 × 10²³ kg',
        discoveryYear: '1610',
        discoverer: 'Galileo Galilei'
      },
      // Saturn satellites
      {
        id: 'titan',
        name: 'Titan',
        planetId: 'saturn',
        diameter: '5,150 km',
        distanceFromPlanet: '1,221,870 km',
        orbitalPeriod: '15.95 days',
        mass: '1.35 × 10²³ kg',
        discoveryYear: '1655',
        discoverer: 'Christiaan Huygens'
      },
      {
        id: 'rhea',
        name: 'Rhea',
        planetId: 'saturn',
        diameter: '1,527 km',
        distanceFromPlanet: '527,108 km',
        orbitalPeriod: '4.52 days',
        mass: '2.31 × 10²¹ kg',
        discoveryYear: '1672',
        discoverer: 'Giovanni Cassini'
      },
      {
        id: 'iapetus',
        name: 'Iapetus',
        planetId: 'saturn',
        diameter: '1,469 km',
        distanceFromPlanet: '3,560,820 km',
        orbitalPeriod: '79.32 days',
        mass: '1.81 × 10²¹ kg',
        discoveryYear: '1671',
        discoverer: 'Giovanni Cassini'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        planetId: 'saturn',
        diameter: '504 km',
        distanceFromPlanet: '237,948 km',
        orbitalPeriod: '1.37 days',
        mass: '1.08 × 10²⁰ kg',
        discoveryYear: '1789',
        discoverer: 'William Herschel'
      },
      // Uranus satellites
      {
        id: 'titania',
        name: 'Titania',
        planetId: 'uranus',
        diameter: '1,578 km',
        distanceFromPlanet: '435,910 km',
        orbitalPeriod: '8.71 days',
        mass: '3.53 × 10²¹ kg',
        discoveryYear: '1787',
        discoverer: 'William Herschel'
      },
      {
        id: 'oberon',
        name: 'Oberon',
        planetId: 'uranus',
        diameter: '1,523 km',
        distanceFromPlanet: '583,520 km',
        orbitalPeriod: '13.46 days',
        mass: '3.01 × 10²¹ kg',
        discoveryYear: '1787',
        discoverer: 'William Herschel'
      },
      {
        id: 'ariel',
        name: 'Ariel',
        planetId: 'uranus',
        diameter: '1,158 km',
        distanceFromPlanet: '190,900 km',
        orbitalPeriod: '2.52 days',
        mass: '1.35 × 10²¹ kg',
        discoveryYear: '1851',
        discoverer: 'William Lassell'
      },
      // Neptune satellites
      {
        id: 'triton',
        name: 'Triton',
        planetId: 'neptune',
        diameter: '2,707 km',
        distanceFromPlanet: '354,759 km',
        orbitalPeriod: '5.88 days',
        mass: '2.14 × 10²² kg',
        discoveryYear: '1846',
        discoverer: 'William Lassell'
      },
      {
        id: 'proteus',
        name: 'Proteus',
        planetId: 'neptune',
        diameter: '420 km',
        distanceFromPlanet: '117,647 km',
        orbitalPeriod: '1.12 days',
        mass: '5.0 × 10¹⁹ kg',
        discoveryYear: '1989',
        discoverer: 'Voyager 2'
      }
    ];
  }

  getSatellitesForPlanet(planetId: string): Satellite[] {
    return this.getSatellites().filter(satellite => satellite.planetId === planetId);
  }
}
