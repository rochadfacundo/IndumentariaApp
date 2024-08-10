import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { VerificationComponent } from './pages/verification/verification.component';

export const routes: Routes = [
    { path: 'pages/dashboard', component: DashboardComponent },
    { path: 'pages/login', component: LoginComponent },
    { path: 'pages/register', component: RegisterComponent },
    { path: 'pages/verification', component: VerificationComponent },

];
