import { Component } from '@angular/core';
@Component({
  selector: 'app-landing',
  template: `
    <section class="min-h-screen flex flex-col justify-center items-center bg-neutral-100">
      <div class="max-w-md w-full p-8 rounded-xl shadow-xl bg-white text-center">
        <img src="/assets/logo.svg" class="w-32 mx-auto mb-8" alt="Logo SportPlaner">
        <h1 class="text-primary-500 text-3xl font-bold mb-4">Bienvenido a SportPlaner</h1>
        <p class="mb-8 text-neutral-800">Gestión deportiva fácil y profesional para entrenadores y clubes. Planifica, gestiona y comparte tus equipos.</p>
        <a routerLink="/auth" class="bg-primary-500 hover:bg-primary-700 transition text-neutral-100 font-semibold px-8 py-3 rounded-lg shadow mt-4 inline-block">Comenzar</a>
      </div>
    </section>
  `,
  styles: []
})
export class LandingPage {}

