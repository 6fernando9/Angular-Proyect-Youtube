import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';

interface Category{
  id: string,
  name: string
}

@Component({
  selector: 'app-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit{
  categories: Category[] = [];
  categoryName: string = '';//para una busqueda
  message: string | null = ''; //mensajes de confirmacion o errores
  isEditing: boolean = false; // no se
  editingCategoryId: string | null = null; // no se

  constructor(private apiService:ApiService){

  }
  ngOnInit(): void {
    this.getCategories();
  }

  /*
  Explicacion breve del subscribe

  se usa para recibir respuesta cuando el Observable emite un valor
  Dentro del subscribe

  se divide en 2 partes, el next, que es cuando la peticion es exitosa
  y el error, que se ejecuta cuando la peticion falla

  entonces si la respuesta es exitosa, el valor que extrajo del backend en este caso esta en res

  se lo puede hacer de esa manera o tambien usando el firstValueForm(), pero implica que al usarlo la funcion debe ser asincrona y usamos await

   */


  getCategories(){
    this.apiService.getAllCategory().subscribe({
      next:(res:any) => {
        if(res.status === 200){
          this.categories = res.categories;
        }
      },
      error:(error) => {
          this.showMessage(
        error?.error?.message || error?.message ||
          'Hubo un error al Obtener las caterogias' + error
          );
      }
    })
  }


  addCategory(): void{
    if(!this.categoryName){
      this.showMessage('cAtegroy name is required');
      return;
    }
    this.apiService.createCategory({name: this.categoryName}).subscribe({
      next:(res:any) => {
        if(res.status === 200){
          this.showMessage("Category added successfully");
          this.categoryName = '';
          this.getCategories();
        }
      }
      ,
      error:(error) => {
            this.showMessage(
          error?.error?.message || error?.message ||
            'Hubo un error al crear la caterogias' + error
            );
      }
    })
  }


  //Edit Category

  editCategory(){
    if( !this.editingCategoryId || !this.categoryName){
      return;
    }
    this.apiService
      .updateCategory(this.editingCategoryId, { name: this.categoryName })
      .subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.showMessage('Categroy updated successfully');
            this.isEditing = false;
            this.getCategories();
          }
        },
        error: (error) => {
          this.showMessage(
            error?.error?.message ||
              error?.message ||
              'Hubo un error al actualizar las caterogias' + error
          );
        },
      });
  }


  //cuando presionane el boton de editar categoria

  handleEditCategory(category : Category){
    this.isEditing = true;
    this.editingCategoryId = category.id;
    this.categoryName = category.name;
  }


  //cuando presionen en boton de eliminar la categoria

  handleDeleteCategory(categoryId: string){
    if(window.confirm("Are you sure you want to delete this category")){
      this.apiService.deleteCategory(categoryId).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this.showMessage('Category delete successfully');
            this.categoryName = '';
            this.getCategories();
          }
        },
        error: (error) => {
          this.showMessage(
            error?.error?.message ||
              error?.message ||
              'Hubo un error al eliminar la caterogia' + error
          );
        }
      });
    }
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 4000);
  }


}
