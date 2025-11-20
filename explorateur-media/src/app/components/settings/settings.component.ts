import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

interface Language {
  code: string;
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

  constructor(private languageService: LanguageService) {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  onHide(): void {
    this.visibleChange.emit(false);
  }

  async onLanguageChange(): Promise<void> {
    await this.languageService.setLanguage(this.selectedLanguage);
    // Auto-close the dialog after language change
    this.close();
  }

  close(): void {
    this.visibleChange.emit(false);
  }
}
