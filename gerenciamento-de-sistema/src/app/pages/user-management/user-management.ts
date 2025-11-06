import { Component, OnInit } from '@angular/core';
import { UserService, Usuario } from '../../services/user/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {

  usuarios: Usuario[] = [];
  novoUsuario: Usuario = { nome: '', email: '', senha: '' };
  editando: Usuario | null = null;

  constructor(private usuarioService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  salvar() {
    this.usuarioService.criar(this.novoUsuario).subscribe(() => {
      this.novoUsuario = { nome: '', email: '', senha: '' };
      this.loadUsuarios();
    });
  }

  selecionarEdicao(u: Usuario) {
    this.editando = { ...u };
  }

  atualizar() {
    if (!this.editando) return;
    this.usuarioService.atualizar(this.editando.id!, this.editando)
      .subscribe(() => {
        this.editando = null;
        this.loadUsuarios();
      });
  }

  excluir(id: number) {
    this.usuarioService.excluir(id).subscribe(() => this.loadUsuarios());
  }

  cancelar() {
    this.editando = null;
  }
}
