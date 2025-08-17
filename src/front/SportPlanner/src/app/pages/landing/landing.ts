import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { Subscriptions } from '../../components/subscriptions/subscriptions';
import { Marketplace } from '../../components/marketplace/marketplace';
import { Reviews } from '../../components/reviews/reviews';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, Features, Subscriptions, Marketplace, Reviews],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
