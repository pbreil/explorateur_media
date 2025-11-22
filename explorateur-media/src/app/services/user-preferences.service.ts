import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AccelerationUnit = 'm/s²' | 'g';
export type DistanceUnit = 'Mkm' | 'ua';

export interface UserPreferences {
  accelerationUnit: AccelerationUnit;
  distanceUnit: DistanceUnit;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  accelerationUnit: 'm/s²',
  distanceUnit: 'Mkm'
};

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private readonly STORAGE_KEY = 'user-preferences';
  private preferencesSubject: BehaviorSubject<UserPreferences>;

  constructor() {
    const stored = this.loadPreferences();
    this.preferencesSubject = new BehaviorSubject<UserPreferences>(stored);
  }

  get preferences$(): Observable<UserPreferences> {
    return this.preferencesSubject.asObservable();
  }

  get preferences(): UserPreferences {
    return this.preferencesSubject.value;
  }

  setAccelerationUnit(unit: AccelerationUnit): void {
    const newPreferences = {
      ...this.preferences,
      accelerationUnit: unit
    };
    this.updatePreferences(newPreferences);
  }

  setDistanceUnit(unit: DistanceUnit): void {
    const newPreferences = {
      ...this.preferences,
      distanceUnit: unit
    };
    this.updatePreferences(newPreferences);
  }

  /**
   * Convertit l'accélération de m/s² vers g
   * 1g = 9.80665 m/s²
   */
  convertAcceleration(value: number, from: AccelerationUnit, to: AccelerationUnit): number {
    if (from === to) return value;

    if (from === 'm/s²' && to === 'g') {
      return value / 9.80665;
    } else {
      return value * 9.80665;
    }
  }

  /**
   * Convertit la distance de millions de km vers ua
   * 1 ua = 149.597870 millions de km
   */
  convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
    if (from === to) return value;

    if (from === 'Mkm' && to === 'ua') {
      return value / 149.597870;
    } else {
      return value * 149.597870;
    }
  }

  /**
   * Formate une valeur d'accélération selon l'unité préférée
   */
  formatAcceleration(valueInMetersPerSecondSquared: number): string {
    const unit = this.preferences.accelerationUnit;
    let displayValue = valueInMetersPerSecondSquared;

    if (unit === 'g') {
      displayValue = this.convertAcceleration(valueInMetersPerSecondSquared, 'm/s²', 'g');
    }

    return `${displayValue.toFixed(2)} ${unit}`;
  }

  /**
   * Formate une valeur de distance selon l'unité préférée
   */
  formatDistance(valueInMillionsKm: number): string {
    const unit = this.preferences.distanceUnit;
    let displayValue = valueInMillionsKm;

    if (unit === 'ua') {
      displayValue = this.convertDistance(valueInMillionsKm, 'Mkm', 'ua');
    }

    return `${displayValue.toFixed(2)} ${unit}`;
  }

  private updatePreferences(preferences: UserPreferences): void {
    this.preferencesSubject.next(preferences);
    this.savePreferences(preferences);
  }

  private loadPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
    }
    return DEFAULT_PREFERENCES;
  }

  private savePreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  }
}
