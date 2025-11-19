import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { SettingsComponent } from './components/settings/settings.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, SettingsComponent, ButtonModule, TooltipModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showSettings = false;
  translationsLoaded = false;

  constructor(public languageService: LanguageService) {
    this.initializeTranslations();
  }

  private async initializeTranslations(): Promise<void> {
    await this.languageService.waitForInitialization();
    this.translationsLoaded = true;
  }

  openSettings(): void {
    this.showSettings = true;
  }
}
