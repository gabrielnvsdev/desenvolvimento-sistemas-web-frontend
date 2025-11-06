import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authentication/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null');
}
