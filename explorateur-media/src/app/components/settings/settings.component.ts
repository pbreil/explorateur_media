import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { UserPreferencesService, AccelerationUnit, DistanceUnit } from '../../services/user-preferences.service';

interface Language {
  code: string;
  label: string;
}

interface UnitOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, Select, FormsModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  selectedLanguage: string;
  languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' }
  ];

  selectedAccelerationUnit: AccelerationUnit;
  accelerationUnits: UnitOption<AccelerationUnit>[] = [
    { value: 'm/s²', label: 'm/s² (mètres par seconde carrée)' },
    { value: 'g', label: 'g (gravité terrestre)' }
  ];

  selectedDistanceUnit: DistanceUnit;
  distanceUnits: UnitOption<DistanceUnit>[] = [
    { value: 'Mkm', label: 'Millions de km' },
    { value: 'ua', label: 'ua (unité astronomique)' }
  ];

  constructor(
    private languageService: LanguageService,
    private userPreferencesService: UserPreferencesService,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedLanguage = this.languageService.getCurrentLanguage();

    // Initialiser les unités sélectionnées
    const prefs = this.userPreferencesService.preferences;
    this.selectedAccelerationUnit = prefs.accelerationUnit;
    this.selectedDistanceUnit = prefs.distanceUnit;
  }

  onHide(): void {
    this.visibleChange.emit(false);
  }

  async onLanguageChange(): Promise<void> {
    await this.languageService.setLanguage(this.selectedLanguage);
    this.cdr.markForCheck();
  }

  onAccelerationUnitChange(): void {
    this.userPreferencesService.setAccelerationUnit(this.selectedAccelerationUnit);
    this.cdr.markForCheck();
  }

  onDistanceUnitChange(): void {
    this.userPreferencesService.setDistanceUnit(this.selectedDistanceUnit);
    this.cdr.markForCheck();
  }

  close(): void {
    this.visibleChange.emit(false);
  }
}
