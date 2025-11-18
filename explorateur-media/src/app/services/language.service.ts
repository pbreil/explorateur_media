import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_COOKIE_NAME = 'preferredLanguage';
  private readonly AVAILABLE_LANGUAGES = ['en', 'fr'];
  private readonly DEFAULT_LANGUAGE = 'fr';

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
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
    this.translate.use(languageToUse);
  }

  setLanguage(language: string): void {
    if (this.AVAILABLE_LANGUAGES.includes(language)) {
      this.translate.use(language);
      this.saveLanguageToCookie(language);
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  getAvailableLanguages(): string[] {
    return this.AVAILABLE_LANGUAGES;
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
