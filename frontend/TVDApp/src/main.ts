import { enableProdMode, ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/compiler';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(module => {
        if (!environment.production) {
            const applicationRef = module.injector.get(ApplicationRef);
            const appComponent = applicationRef.components[0];
            enableDebugTools(appComponent);
        }
    })
    .catch(err => console.error(err));
