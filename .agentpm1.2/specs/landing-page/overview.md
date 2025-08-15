# Feature: Landing Page

## Descripción
Página de inicio (landing page) de PlanSport que presenta la plataforma a usuarios potenciales, mostrando las características principales, el marketplace, los planes de suscripción y opciones para iniciar sesión o registrarse.

## Objetivos de Negocio
- Convertir visitantes en usuarios registrados
- Comunicar claramente la propuesta de valor de PlanSport
- Mostrar las características principales de la plataforma
- Presentar los diferentes planes de suscripción
- Destacar el marketplace como diferenciador competitivo
- Facilitar el acceso rápido a login/registro

## Entidades del Dominio
- **Landing Content**: Contenido estático de la página (textos, imágenes)
- **Features**: Características destacadas del producto
- **Subscription Plans**: Planes disponibles (Gratuito, Entrenador, Club)
- **Marketplace Preview**: Vista previa del marketplace

## Componentes del Sistema

### Backend (.NET API)
- Endpoints: No requiere endpoints específicos (contenido estático)
- Servicios: N/A para esta fase inicial
- Validaciones: N/A

### Frontend (Angular)
- Componentes:
  - LandingComponent (contenedor principal)
  - LandingHeaderComponent (navegación y auth)
  - HeroSectionComponent (sección principal)
  - FeaturesSectionComponent (características)
  - MarketplaceSectionComponent (preview del marketplace)
  - SubscriptionsSectionComponent (planes y precios)
  - FooterComponent (pie de página)
- Servicios:
  - ScrollService (navegación suave entre secciones)
- Rutas:
  - `/` (ruta raíz pública)
- **Iconos Font Awesome**:
  - Navegación: `faBars` (mobile menu), `faTimes` (cerrar menu)
  - Hero: `faFutbol`, `faBasketballBall`, `faSwimmer` (deportes)
  - Features: `faCheck`, `faRocket`, `faUsers`, `faChartLine`
  - Marketplace: `faStar`, `faDownload`, `faShare`
  - Suscripciones: `faCrown`, `faCheckCircle`
  - CTAs: `faArrowRight`, `faSignInAlt`, `faUserPlus`

## Dependencias
- Router de Angular para navegación a login/register
- Tailwind CSS para estilos responsive
- Font Awesome para iconografía
- Angular Animations para efectos de scroll

## Consideraciones de Seguridad
- La landing page es completamente pública
- Los botones de login/register redirigen a rutas protegidas
- No se expone información sensible

## Consideraciones de Accesibilidad
- Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- Navegación completa por teclado
- Skip links para saltar a contenido principal
- Textos alternativos en todas las imágenes
- Estructura semántica HTML5
- Aria-labels en todos los elementos interactivos
- Responsive design para todos los dispositivos