import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../core/services/team.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-teams',
  template: `
    <section class="max-w-3xl mx-auto mt-16">
      <h1 class="text-2xl text-primary-500 font-bold mb-6">Tus Equipos</h1>
      <form (ngSubmit)="createTeam()" #createTeamForm="ngForm" class="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4">
        <input required [(ngModel)]="teamName" name="teamName" placeholder="Nombre del equipo" class="border rounded px-3 py-2" />
        <button class="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold p-3 rounded transition">Crear equipo</button>
      </form>
      <ul>
        <li *ngFor="let t of teams" class="py-2 border-b text-neutral-800 font-medium">{{t.name}}</li>
      </ul>
    </section>
  `,
  styles: []
})
export class TeamsPage implements OnInit {
  teamName = '';
  teams: any[] = [];
  owner = '';

  constructor(private teamService: TeamService, private auth: AuthService) {}

  async ngOnInit() {
    // Supón que el userId está en el payload del currentUser session
    this.auth.getSession().subscribe(session => {
      if(session && session.user) {
        this.owner = session.user.id;
        this.loadTeams();
      }
    });
  }
  async loadTeams() {
    if(this.owner) {
      this.teams = await this.teamService.listTeams(this.owner);
    }
  }
  async createTeam() {
    if (this.teamName && this.owner) {
      const team = await this.teamService.createTeam({ name: this.teamName, owner: this.owner });
      this.teams.push(team);
      this.teamName = '';
    }
  }
}

