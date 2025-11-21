import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  translationsLoaded = false;

  constructor(
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeTranslations();
  }

  private async initializeTranslations(): Promise<void> {
    await this.languageService.waitForInitialization();
    this.translationsLoaded = true;
    this.cdr.markForCheck();
  }
}
