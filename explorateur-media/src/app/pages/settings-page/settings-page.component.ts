import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { CardModule } from 'primeng/card';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, Select, FormsModule, TranslateModule, CardModule],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  selectedLanguage: string;
  languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' }
  ];

  constructor(private languageService: LanguageService) {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  async onLanguageChange(): Promise<void> {
    await this.languageService.setLanguage(this.selectedLanguage);
  }
}
