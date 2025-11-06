import { Component, OnInit } from '@angular/core';
import { ProductService, Produto } from '../../services/product/product-service';
import { Categoria, CategoryService } from '../../services/category/category-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.scss',
})
export class ProductManagement implements OnInit {

  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  novoProduto: Produto = { nome: '', preco: 0, estoque: 0 };
  editando: Produto | null = null;

  constructor(
    private produtoService: ProductService,
    private categoriaService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadCategorias();
  }

  loadProdutos() {
    this.produtoService.listar().subscribe(data => this.produtos = data);
  }

  loadCategorias() {
    this.categoriaService.listar().subscribe(data => this.categorias = data);
  }

  salvar() {
    this.produtoService.criar(this.novoProduto).subscribe(() => {
      this.novoProduto = { nome: '', preco: 0, estoque: 0 };
      this.loadProdutos();
    });
  }

  selecionarEdicao(prod: Produto) {
    this.editando = { ...prod };
  }

  atualizar() {
    if (!this.editando) return;
    this.produtoService.atualizar(this.editando.id!, this.editando)
      .subscribe(() => {
        this.editando = null;
        this.loadProdutos();
      });
  }

  excluir(id: number) {
    this.produtoService.excluir(id).subscribe(() => this.loadProdutos());
  }

  cancelar() {
    this.editando = null;
  }
}