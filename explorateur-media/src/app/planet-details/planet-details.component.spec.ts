import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanetDetailsComponent } from './planet-details.component';
import { PlanetService } from '../planet.service';
import { of } from 'rxjs';

// Mocks
class MockPlanetService {
  getPlanet(id: string) {
    if (id === '1') {
      return { id: '1', name: 'Tatooine', diameter: 10465, climate: 'arid' };
    }
    return undefined;
  }
}

class MockLocation {
  back(): void {}
}

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1',
    },
  },
};

describe('PlanetDetailsComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDetailsComponent],
      providers: [
        { provide: PlanetService, useClass: MockPlanetService },
        { provide: Location, useClass: MockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get planet details on init', () => {
    expect(component.planet).toBeDefined();
    expect(component.planet.name).toBe('Tatooine');
  });

  it('should call location.back on goBack', () => {
    const backSpy = spyOn(location, 'back');
    component.goBack();
    expect(backSpy).toHaveBeenCalled();
  });
});
