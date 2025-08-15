import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  template: `
    <section class="max-w-2xl mx-auto my-16 bg-white p-8 rounded-xl shadow flex flex-col items-center">
      <h1 class="text-primary-500 font-bold text-2xl mb-2">¡Bienvenido a tu Dashboard!</h1>
      <p class="text-neutral-800 mb-8 text-center">Gestiona tus equipos deportivos, planifica entrenamientos y mantén el control total desde aquí.</p>
      <div class="flex flex-col gap-3 w-full">
        <a routerLink="/dashboard/teams" class="bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded shadow text-center">Ir a Equipos</a>
      </div>
      <p class="mt-12 text-neutral-400 text-center">Recuerda mantener siempre tu sesión activa para acceder a todas las funcionalidades.</p>
    </section>
  `,
  styles: []
})
export class HomePage {}

