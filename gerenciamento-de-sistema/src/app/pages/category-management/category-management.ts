import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Categoria, CategoryService } from '../../services/category/category-service';

@Component({
  selector: 'app-category-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './category-management.html',
  styleUrl: './category-management.scss',
})
export class CategoryManagement implements OnInit {

  categorias: Categoria[] = [];
  novaCategoria: Categoria = { nome: '' };
  editando: Categoria | null = null;

  constructor(private categoriaService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.listar().subscribe(data => this.categorias = data);
  }

  salvar() {
    if (!this.novaCategoria.nome.trim()) return;

    this.categoriaService.criar(this.novaCategoria).subscribe(() => {
      this.novaCategoria = { nome: '' };
      this.loadCategorias();
    });
  }

  selecionarEdicao(cat: Categoria) {
    this.editando = { ...cat };
  }

  atualizar() {
    if (!this.editando) return;

    this.categoriaService.atualizar(this.editando.id!, this.editando).subscribe(() => {
      this.editando = null;
      this.loadCategorias();
    });
  }

  excluir(id: number) {
    this.categoriaService.excluir(id).subscribe(() => {
      this.loadCategorias();
    });
  }

  cancelar() {
    this.editando = null;
  }
}
