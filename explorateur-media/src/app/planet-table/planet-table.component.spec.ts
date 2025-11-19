import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PlanetTableComponent } from './planet-table.component';
import { PlanetService } from '../planet.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mocks
class MockPlanetService {
  getPlanets() {
    return [
      {
        id: '1',
        name: 'Tatooine',
        diameter: '10,465 km',
        distanceFromSun: '1 AU',
        orbitalPeriod: '365 days',
        numberOfMoons: 1,
        surfaceGravity: '1 g',
        atmosphericPressure: '1 atm',
        averageTemperature: '15°C',
        mass: '5.97 × 10²⁴ kg',
        discoveryYear: 'N/A',
        discoverer: 'N/A'
      },
      {
        id: '2',
        name: 'Alderaan',
        diameter: '12,500 km',
        distanceFromSun: '2 AU',
        orbitalPeriod: '687 days',
        numberOfMoons: 2,
        surfaceGravity: '0.38 g',
        atmosphericPressure: '0.01 atm',
        averageTemperature: '-60°C',
        mass: '6.42 × 10²³ kg',
        discoveryYear: 'N/A',
        discoverer: 'N/A'
      },
    ];
  }

  getSatellites() {
    return [];
  }
}

class MockRouter {
  navigate(commands: any[]): void {}
}

class MockLanguageService {
  async waitForInitialization(): Promise<void> {
    return Promise.resolve();
  }
}

class MockTranslateService {
  instant(key: string): string {
    const translations: { [key: string]: string } = {
      'planetTable.filterAll': 'All celestial bodies',
      'planetTable.filterPlanets': 'Planets only',
      'planetTable.filterSatellites': 'Satellites only',
      'planetTable.columns.name': 'Name',
      'planetTable.columns.diameter': 'Diameter',
      'planetTable.columns.distanceFromSun': 'Distance from Sun',
      'planetTable.columns.orbitalPeriod': 'Orbital Period',
      'planetTable.columns.numberOfMoons': 'Number of Moons',
      'planetTable.columns.surfaceGravity': 'Surface Gravity',
      'planetTable.columns.atmosphericPressure': 'Atmospheric Pressure',
      'planetTable.columns.averageTemperature': 'Average Temperature',
      'planetTable.columns.mass': 'Mass',
      'planetTable.columns.discoveryYear': 'Discovery Year',
      'planetTable.columns.discoverer': 'Discoverer',
    };
    return translations[key] || key;
  }

  get onLangChange() {
    return {
      subscribe: () => ({ unsubscribe: () => {} })
    };
  }
}

describe('PlanetTableComponent', () => {
  let component: PlanetTableComponent;
  let fixture: ComponentFixture<PlanetTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlanetTableComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: PlanetService, useClass: MockPlanetService },
        { provide: Router, useClass: MockRouter },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load celestial bodies on init', () => {
    expect(component.celestialBodies).toBeDefined();
    expect(component.celestialBodies.length).toBe(2);
    expect(component.celestialBodies[0].name).toBe('Tatooine');
  });

  it('should navigate to planet details on goToDetails call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const planet = component.celestialBodies[0];
    component.goToDetails(planet);
    expect(navigateSpy).toHaveBeenCalledWith(['/planet', '1']);
  });
});
