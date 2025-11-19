import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_COOKIE_NAME = 'preferredLanguage';
  private readonly AVAILABLE_LANGUAGES = ['en', 'fr', 'es', 'pt', 'it', 'de'];
  private readonly DEFAULT_LANGUAGE = 'fr';
  private initialized = false;

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private async initLanguage(): Promise<void> {
    this.translate.addLangs(this.AVAILABLE_LANGUAGES);

    const savedLanguage = this.getLanguageFromCookie();
    const browserLanguage = this.translate.getBrowserLang();

    let languageToUse = this.DEFAULT_LANGUAGE;

    if (savedLanguage && this.AVAILABLE_LANGUAGES.includes(savedLanguage)) {
      languageToUse = savedLanguage;
    } else if (browserLanguage && this.AVAILABLE_LANGUAGES.includes(browserLanguage)) {
      languageToUse = browserLanguage;
    }

    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);

    // Wait for translations to load
    try {
      await firstValueFrom(this.translate.use(languageToUse));
      this.initialized = true;
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to default language
      await firstValueFrom(this.translate.use(this.DEFAULT_LANGUAGE));
      this.initialized = true;
    }
  }

  async setLanguage(language: string): Promise<void> {
    if (this.AVAILABLE_LANGUAGES.includes(language)) {
      try {
        await firstValueFrom(this.translate.use(language));
        this.saveLanguageToCookie(language);
      } catch (error) {
        console.error('Error setting language:', error);
      }
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  getAvailableLanguages(): string[] {
    return this.AVAILABLE_LANGUAGES;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async waitForInitialization(): Promise<void> {
    if (this.initialized) return;

    // Wait up to 5 seconds for initialization
    const maxWait = 5000;
    const interval = 100;
    let waited = 0;

    while (!this.initialized && waited < maxWait) {
      await new Promise(resolve => setTimeout(resolve, interval));
      waited += interval;
    }
  }

  private saveLanguageToCookie(language: string): void {
    document.cookie = `${this.LANGUAGE_COOKIE_NAME}=${language}; path=/; max-age=31536000`; // 1 year
  }

  private getLanguageFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    const languageCookie = cookies.find(cookie =>
      cookie.trim().startsWith(`${this.LANGUAGE_COOKIE_NAME}=`)
    );

    if (languageCookie) {
      return languageCookie.split('=')[1].trim();
    }

    return null;
  }
}
