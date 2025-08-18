import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { Subscriptions } from '../../components/subscriptions/subscriptions';
import { Marketplace } from '../../components/marketplace/marketplace';
import { Reviews } from '../../components/reviews/reviews';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, Features, Subscriptions, Marketplace, Reviews, Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
