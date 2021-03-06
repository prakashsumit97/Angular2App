﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SearchLocationComponent } from './searchLocation/searchLocation';
import { AllLocationComponent } from './allLocation/allLocation';
import { AuthGuard } from './_guards/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'searchLocation', component: SearchLocationComponent },
    { path: 'allLocation', component: AllLocationComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);