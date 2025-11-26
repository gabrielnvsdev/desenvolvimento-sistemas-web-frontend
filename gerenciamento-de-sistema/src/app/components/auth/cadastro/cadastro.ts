import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule,CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  errorMessage: string = '';
  usuario = { nome: '', cpf: '', email: '', senha: ''};

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

  formatarCPF() {
    let cpf = this.usuario.cpf.replace(/\D/g, "");
  
    if (cpf.length > 11) cpf = cpf.substring(0, 11);
  
    // aplica máscara automaticamente
    if (cpf.length > 9) {
      this.usuario.cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    } else if (cpf.length > 6) {
      this.usuario.cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/,
        "$1.$2.$3"
      );
    } else if (cpf.length > 3) {
      this.usuario.cpf = cpf.replace(/(\d{3})(\d{3})/,
        "$1.$2"
      );
    } else {
      this.usuario.cpf = cpf;
    }
  }

  logar() {
    this.router.navigate(['/login']);
  }
}
