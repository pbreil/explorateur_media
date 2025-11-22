// Modèle de base pour tous les corps célestes
export interface CelestialBody {
  id: string;
  name: string;
  diameter: string;
  mass: string;
  discoveryYear: string;
  discoverer: string;
  orbitalPeriod: string;
}

// Planète hérite de CelestialBody
export interface Planet extends CelestialBody {
  distanceFromSun: string;
  numberOfMoons: number;
  surfaceGravity: string;
  atmosphericPressure: string;
  averageTemperature: string;
}

// Satellite hérite de CelestialBody
export interface Satellite extends CelestialBody {
  planetId: string;
  distanceFromPlanet: string;
}
