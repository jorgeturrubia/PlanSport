import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  
  onStartFree(): void {
    // TODO: Implement registration flow
    console.log('Starting free registration...');
  }
  
  onViewDemo(): void {
    // TODO: Implement demo modal or navigation
    console.log('Opening demo...');
  }
}
