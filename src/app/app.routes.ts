import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { CartComponent } from './pages/dashboard/cart/cart.component';
import { OrdersComponent } from './pages/dashboard/orders/orders.component';
import { UsersComponent } from './pages/dashboard/users/users.component';

export const routes: Routes = [
    { path: 'pages/dashboard', component: DashboardComponent },
    { path: 'pages/login', component: LoginComponent },
    { path: 'pages/register', component: RegisterComponent },
    { path: 'pages/verification', component: VerificationComponent },
    { path: 'pages/profile', component: ProfileComponent },
    { path: 'pages/cart', component: CartComponent },
    { path: 'pages/orders', component: OrdersComponent },
    { path: 'pages/users', component: UsersComponent },
    { path: '', redirectTo: '/pages/login', pathMatch: 'full' },

];
