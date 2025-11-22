import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { Planet, Satellite } from '../../models/planet.model';

@Component({
  selector: 'app-celestial-body-details',
  standalone: true,
  imports: [CommonModule, CardModule, TranslateModule],
  templateUrl: './celestial-body-details.component.html',
  styleUrls: ['./celestial-body-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CelestialBodyDetailsComponent {
  @Input() body?: Planet | Satellite;
  @Input() type: 'planet' | 'satellite' = 'planet';
  @Input() planetName?: string; // For satellites, the name of the parent planet

  get isPlanet(): boolean {
    return this.type === 'planet';
  }

  get isSatellite(): boolean {
    return this.type === 'satellite';
  }

  get planet(): Planet | undefined {
    return this.isPlanet ? this.body as Planet : undefined;
  }

  get satellite(): Satellite | undefined {
    return this.isSatellite ? this.body as Satellite : undefined;
  }
}
