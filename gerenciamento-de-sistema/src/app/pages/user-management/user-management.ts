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
  novoUsuario: Usuario = { nome: '',cpf:'', email: '', senha: '' };
  editando: Usuario | null = null;

  constructor(private usuarioService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  salvar() {

    const usuarioParaEnviar = {
      ...this.novoUsuario,
      cpf: this.novoUsuario.cpf.replace(/\D/g, "") // REMOVE MÁSCARA AQUI
    };

    this.usuarioService.criar(usuarioParaEnviar).subscribe(() => {
      this.novoUsuario = { nome: '', cpf: '', email: '', senha: '' };
      this.loadUsuarios();
    });
  }

  selecionarEdicao(u: Usuario) {
    this.editando = { ...u };
  }

  atualizar() {
    if (!this.editando) return;

    const usuarioParaEnviar = {
      ...this.editando,
      cpf: this.editando.cpf.replace(/\D/g, "")
    };

    this.usuarioService.atualizar(this.editando.id!, usuarioParaEnviar)
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

  aplicarMascaraCPF(event: any) {
    let cpf = event.target.value.replace(/\D/g, "");

    if (cpf.length > 11) cpf = cpf.slice(0, 11);

    if (cpf.length <= 3) {
      event.target.value = cpf;
    } else if (cpf.length <= 6) {
      event.target.value = cpf.replace(/(\d{3})(\d+)/, "$1.$2");
    } else if (cpf.length <= 9) {
      event.target.value = cpf.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else {
      event.target.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    }

    if (!this.editando) {
      this.novoUsuario.cpf = event.target.value;
    } else {
      this.editando.cpf = event.target.value;
    }
  }

}
