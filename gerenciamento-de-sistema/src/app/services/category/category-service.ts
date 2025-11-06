import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria {
  id?: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  
  private apiUrl = 'https://desenvolvimento-sistemas-web-backend.onrender.com/api/gerenciamento/categorias';

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  atualizar(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
