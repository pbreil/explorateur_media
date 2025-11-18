export interface Planet {
  id: string;
  name: string;
  diameter: string;
  distanceFromSun: string;
  numberOfMoons: number;
  surfaceGravity: string;
  atmosphericPressure: string;
  averageTemperature: string;
  mass: string;
  discoveryYear: string;
  discoverer: string;
  orbitalPeriod: string;
}

export interface Satellite {
  id: string;
  name: string;
  planetId: string;
  diameter: string;
  distanceFromPlanet: string;
  orbitalPeriod: string;
  mass: string;
  discoveryYear: string;
  discoverer: string;
}
