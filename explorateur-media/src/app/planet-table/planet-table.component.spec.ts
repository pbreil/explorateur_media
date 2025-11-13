import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PlanetTableComponent } from './planet-table.component';
import { PlanetService } from '../planet.service';

// Mocks
class MockPlanetService {
  getPlanets() {
    return [
      { id: '1', name: 'Tatooine', diameter: 10465, climate: 'arid' },
      { id: '2', name: 'Alderaan', diameter: 12500, climate: 'temperate' },
    ];
  }
}

class MockRouter {
  navigate(commands: any[]): void {}
}

describe('PlanetTableComponent', () => {
  let component: PlanetTableComponent;
  let fixture: ComponentFixture<PlanetTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetTableComponent], // Import standalone component
      providers: [
        { provide: PlanetService, useClass: MockPlanetService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges(); // This triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get planets on init', () => {
    expect(component.planets).toBeDefined();
    expect(component.planets.length).toBe(2);
    expect(component.planets[0].name).toBe('Tatooine');
  });

  it('should navigate to planet details on goToPlanetDetails call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const planetId = '1';
    component.goToPlanetDetails(planetId);
    expect(navigateSpy).toHaveBeenCalledWith(['/planet', planetId]);
  });
});
