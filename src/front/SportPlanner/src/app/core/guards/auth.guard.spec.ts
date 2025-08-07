import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@supabase/supabase-js';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let userSubject: BehaviorSubject<User | null>;

  beforeEach(() => {
    userSubject = new BehaviorSubject<User | null>(null);
    
    const authSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser'], {
      user$: userSubject.asObservable()
    });
    
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    guard = TestBed.inject(AuthGuard);
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', (done) => {
    const mockUser = { id: '1', email: 'test@test.com' } as User;
    userSubject.next(mockUser);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should redirect to auth when user is not authenticated', (done) => {
    const mockUrlTree = {} as any;
    mockRouter.createUrlTree.and.returnValue(mockUrlTree);
    
    userSubject.next(null);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(mockUrlTree);
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/auth']);
      done();
    });
  });
});