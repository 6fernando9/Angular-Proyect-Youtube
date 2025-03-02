import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  //parametros del formulario
  formData: any = {
    email: '',
    password: '',
  };

  message: string | null = null;

  async handleSubmit() {
    if (!this.formData.email || !this.formData.password) {
      this.showMessage('All fields are required');
      return;
    }

    // aqui el backend retorna un JWT llamado token, y bueno su backend de el lo que hace es retornar un rol tambien , el rol no esta en el JWT
    try {
      const response: any = await firstValueFrom(
        this.apiService.loginUser(this.formData)
      );
      if (response.status === 200) {
        //si todo fue correcto, entonces encriptamos el jwt y lo guardamos en localStorage
        this.apiService.encryptAndSaveTpStorage('token', response.token);
        this.apiService.encryptAndSaveTpStorage('role', response.role);
        //luego de logear se dirige al dashboard
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.log(error);
      this.showMessage(
        error?.error?.message ||
          error?.message ||
          'Unable to Login a user' + error
      );
    }
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 4000);
  }
}
