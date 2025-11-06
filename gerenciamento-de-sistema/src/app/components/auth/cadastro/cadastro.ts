import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  errorMessage: string = '';
  usuario = { nome: '', email: '', senha: ''};

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    this.errorMessage = '';
    this.authService.register(this.usuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Erro ao cadastrar usuário.';
      }
    });
  }

  logar() {
    this.router.navigate(['/login']);
  }
}
