import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  selectedLanguage: string;
  languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];

  constructor(private languageService: LanguageService) {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  onHide(): void {
    this.visibleChange.emit(false);
  }

  onLanguageChange(): void {
    this.languageService.setLanguage(this.selectedLanguage);
  }

  close(): void {
    this.visibleChange.emit(false);
  }
}
