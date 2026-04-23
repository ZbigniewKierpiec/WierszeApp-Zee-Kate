

// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// export const appConfig: ApplicationConfig = {
//   providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideHttpClient()],
// };
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './services/auth-interceptor'; 
// export const appConfig: ApplicationConfig = {

//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),

//     importProvidersFrom(
//       TranslateModule.forRoot({
//         defaultLanguage: 'pl'
//       })
//     ),

//     // 🔥 TO JEST KLUCZ
//     provideTranslateHttpLoader({
//       prefix: '/assets/i18n/',
//       suffix: '.json'
//     })
//   ],
// };


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 🔥 KLUCZ #1
    provideHttpClient(withInterceptorsFromDi()),

    // 🔥 KLUCZ #2
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'pl' // 🔥 fix deprecation
      })
    ),

    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    })
  ],
};