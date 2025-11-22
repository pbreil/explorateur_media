import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../../services/football.service';
import { Team } from '../../models/team.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pronofoot',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './pronofoot.component.html',
  styleUrls: ['./pronofoot.component.css']
})
export class PronofootComponent implements OnInit {
  teams = signal<Team[]>([]);
  loading = signal<boolean>(false);

  constructor(
    private footballService: FootballService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadClassement();
  }

  loadClassement(): void {
    this.loading.set(true);
    this.footballService.getClassement().subscribe({
      next: (data) => {
        this.teams.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading classement:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger le classement'
        });
        this.loading.set(false);
      }
    });
  }

  refreshClassement(): void {
    this.loading.set(true);
    this.messageService.add({
      severity: 'info',
      summary: 'Rafraîchissement',
      detail: 'Mise à jour du classement en cours...'
    });

    this.footballService.refreshClassement().subscribe({
      next: (data) => {
        this.teams.set(data);
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Classement mis à jour avec succès'
        });
      },
      error: (error) => {
        console.error('Error refreshing classement:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de rafraîchir le classement'
        });
        this.loading.set(false);
      }
    });
  }
}
