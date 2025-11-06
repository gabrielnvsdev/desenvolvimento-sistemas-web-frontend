import { Routes } from '@angular/router';
import { CategoryManagement } from './pages/category-management/category-management';
import { ProductManagement } from './pages/product-management/product-management';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './components/auth/login/login';
import { Cadastro } from './components/auth/cadastro/cadastro';
import { UserManagement } from './pages/user-management/user-management';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
  
    { path: 'usuarios', component: UserManagement, canActivate: [AuthGuard] },
    { path: 'produtos', component: ProductManagement, canActivate: [AuthGuard] },
    { path: 'categorias', component: CategoryManagement, canActivate: [AuthGuard] },

  
    { path: '**', redirectTo: 'login' }
];
