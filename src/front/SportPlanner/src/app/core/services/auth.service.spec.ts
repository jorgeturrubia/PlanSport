import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockSupabaseService: jasmine.SpyObj<SupabaseService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const supabaseSpy = jasmine.createSpyObj('SupabaseService', {
      signUp: Promise.resolve({ data: { user: { id: '1', email: 'test@test.com' } }, error: null }),
      signIn: Promise.resolve({ data: { user: { id: '1', email: 'test@test.com' } }, error: null }),
      signOut: Promise.resolve({ error: null }),
      getSession: Promise.resolve({ data: { session: { user: { id: '1', email: 'test@test.com' } } }, error: null }),
      getUser: Promise.resolve({ data: { user: { id: '1', email: 'test@test.com' } }, error: null })
    });
    
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: SupabaseService, useValue: supabaseSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    service = TestBed.inject(AuthService);
    mockSupabaseService = TestBed.inject(SupabaseService) as jasmine.SpyObj<SupabaseService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should register user and auto-login', async () => {
      const email = 'test@test.com';
      const password = 'password123';
      
      const result = await service.register(email, password);
      
      expect(mockSupabaseService.signUp).toHaveBeenCalledWith(email, password);
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
    });

    it('should handle registration error', async () => {
      mockSupabaseService.signUp.and.returnValue(
        Promise.resolve({ data: { user: null, session: null }, error: { message: 'Registration failed' } as any })
      );
      
      const result = await service.register('test@test.com', 'password123');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Registration failed');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const email = 'test@test.com';
      const password = 'password123';
      
      const result = await service.login(email, password);
      
      expect(mockSupabaseService.signIn).toHaveBeenCalledWith(email, password);
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
    });

    it('should handle login error', async () => {
      mockSupabaseService.signIn.and.returnValue(
        Promise.resolve({ data: { user: null, session: null }, error: { message: 'Invalid credentials' } as any })
      );
      
      const result = await service.login('test@test.com', 'wrongpassword');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      const result = await service.logout();
      
      expect(mockSupabaseService.signOut).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('should handle logout error', async () => {
      mockSupabaseService.signOut.and.returnValue(
        Promise.resolve({ error: { message: 'Logout failed' } as any })
      );
      
      const result = await service.logout();
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Logout failed');
    });
  });

  describe('user state management', () => {
    it('should emit user state changes', (done) => {
      service.user$.subscribe(user => {
        if (user) {
          expect(user.id).toBe('1');
          expect(user.email).toBe('test@test.com');
          done();
        }
      });
      
      // Trigger user state change
      service.login('test@test.com', 'password123');
    });

    it('should return current user', () => {
      const user = service.getCurrentUser();
      expect(user).toBeNull(); // Initially null
    });

    it('should check if user is authenticated', () => {
      expect(service.isAuthenticated()).toBe(false); // Initially false
    });
  });
});