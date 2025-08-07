import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from './navigation.service';
import { NavigationConfig } from './navigation.interface';
import { Subject } from 'rxjs';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: jasmine.SpyObj<Router>;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    routerEventsSubject = new Subject();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      events: routerEventsSubject.asObservable(),
      url: '/dashboard'
    });

    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    routerEventsSubject.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigation', () => {
    it('should navigate to specified route', () => {
      service.navigateTo('/dashboard/equipos');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard/equipos']);
    });
  });

  describe('config updates', () => {
    it('should update navigation configuration', () => {
      const newConfig: NavigationConfig = {
        sections: [{
          id: 'custom',
          label: 'Custom Section',
          items: [{
            id: 'custom-item',
            label: 'Custom Item',
            icon: 'star',
            route: '/custom'
          }]
        }]
      };

      service.updateNavigationConfig(newConfig);
      
      const config = service.navigationConfig();
      expect(config).toEqual(newConfig);
    });
  });
});
