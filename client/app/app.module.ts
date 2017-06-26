import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,FormControl,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService,LocationService,PagerService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { AllLocationComponent } from './allLocation/allLocation';
import { SearchLocationComponent } from './searchLocation/searchLocation';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDWGiaNqmGsVs9Zp1WRTRn4Jldjt_AT1d0',
            libraries: ["places"]
        }),
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        SearchLocationComponent,
        AllLocationComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        LocationService,
        PagerService
    ],
    bootstrap: [AppComponent]
})


export class AppModule { }