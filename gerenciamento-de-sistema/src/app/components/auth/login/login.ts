import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  logar() {
    this.errorMessage = '';
    const credentials = { email: this.email, senha: this.senha };

    this.authService.login(credentials).subscribe({
      next: (usuario) => {
        localStorage.setItem('token', 'logado'); // por enquanto, token fake
        localStorage.setItem('usuario', JSON.stringify(usuario)); // salva info do usuário
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos!';
        } else {
          this.errorMessage = 'Erro inesperado ao tentar login.';
        }
      }
    });
  }

  cadastrar() {
    this.router.navigate(['/cadastro']);
  }
}
