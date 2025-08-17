# Dependencias - Landing Page Setup

## Dependencias Técnicas

### Dependencias de NPM Requeridas

#### Producción
```json
{
  "@angular/animations": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/compiler": "^17.0.0",
  "@angular/core": "^17.0.0",
  "@angular/platform-browser": "^17.0.0",
  "@angular/platform-browser-dynamic": "^17.0.0",
  "@angular/router": "^17.0.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.14.0"
}
```

#### Desarrollo
```json
{
  "tailwindcss": "^3.4.0",
  "@tailwindcss/postcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

#### Iconos (Elegir una opción)

**Opción A: Angular Material**
```json
{
  "@angular/material": "^17.0.0",
  "@angular/cdk": "^17.0.0"
}
```

**Opción B: Lucide Angular (Recomendado)**
```json
{
  "lucide-angular": "^0.300.0"
}
```

### Dependencias del Sistema

- **Node.js:** >= 18.13.0
- **npm:** >= 9.0.0
- **Angular CLI:** >= 17.0.0

## Dependencias de Módulos/Specs

### Specs Prerequisitos

#### ✅ Ninguno
Este spec es independiente y no requiere otros specs completados previamente.

### Specs Dependientes

Los siguientes specs dependerán de este:

#### 🔄 Sistema de Autenticación
- **Dependencia:** Botones de Login/Register del header
- **Integración:** Los placeholders serán reemplazados por funcionalidad real
- **Archivos afectados:** `header.component.ts`, `header.component.html`

#### 🔄 Dashboard de Usuario
- **Dependencia:** Navegación desde landing page
- **Integración:** Enlaces del header redirigirán al dashboard
- **Archivos afectados:** `navigation.service.ts`

#### 🔄 Sistema de Suscripciones
- **Dependencia:** Sección de suscripciones en landing
- **Integración:** Botones de suscripción serán funcionales
- **Archivos afectados:** `landing.component.html`

#### 🔄 Marketplace
- **Dependencia:** Sección de marketplace en landing
- **Integración:** Preview del marketplace será navegable
- **Archivos afectados:** `landing.component.html`

#### 🔄 Sistema de Reseñas
- **Dependencia:** Sección de reseñas en landing
- **Integración:** Reseñas reales reemplazarán contenido estático
- **Archivos afectados:** `landing.component.html`

## Dependencias de Infraestructura

### Desarrollo

#### Servidor de Desarrollo
- **Comando:** `ng serve`
- **Puerto:** 4200 (por defecto)
- **Hot Reload:** Habilitado

#### Build System
- **Angular CLI:** Para compilación y optimización
- **PostCSS:** Para procesamiento de Tailwind CSS
- **TypeScript:** Para transpilación

### Producción

#### Hosting
- **Servidor Web:** Nginx, Apache, o similar
- **HTTPS:** Requerido para producción
- **Compresión:** Gzip habilitado

#### CDN (Opcional)
- **Imágenes:** Para optimización de carga
- **Assets estáticos:** CSS, JS minificados

## Dependencias de Contenido

### Assets Requeridos

#### Imágenes
- **Logo de PlanSport:** SVG o PNG de alta resolución
- **Hero Image:** Imagen principal para la sección hero
- **Características:** Iconos o ilustraciones para cada característica
- **Testimonios:** Fotos de usuarios (placeholder inicialmente)

#### Contenido Textual
- **Textos de marketing:** Para todas las secciones
- **Información legal:** Términos, privacidad, etc.
- **Información de contacto:** Email, teléfono, dirección

### Fuentes
- **Google Fonts:** Inter (recomendado)
- **Fallback:** System fonts (system-ui, sans-serif)

## Dependencias de Configuración

### Archivos de Configuración Requeridos

```
├── .postcssrc.json          # Configuración PostCSS
├── tailwind.config.js       # Configuración Tailwind
├── angular.json            # Configuración Angular (modificar si necesario)
├── tsconfig.json           # Configuración TypeScript
└── package.json            # Dependencias NPM
```

### Variables de Entorno

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'PlanSport',
  version: '1.0.0'
};
```

## Orden de Implementación Recomendado

### Fase 1: Configuración Base
1. ✅ Instalar y configurar Tailwind CSS
2. ✅ Instalar sistema de iconos
3. ✅ Configurar estructura de componentes
4. ✅ Configurar estilos globales

### Fase 2: Componentes Core
1. ✅ Desarrollar HeaderComponent
2. ✅ Desarrollar FooterComponent
3. ✅ Implementar NavigationService
4. ✅ Crear LandingComponent base

### Fase 3: Contenido
1. ✅ Implementar Hero Section
2. ✅ Desarrollar sección Características
3. ✅ Crear sección Suscripciones
4. ✅ Implementar sección Marketplace
5. ✅ Añadir sección Reseñas

### Fase 4: Optimización
1. ✅ Implementar responsive design
2. ✅ Optimizar rendimiento
3. ✅ Testing y debugging
4. ✅ Documentación

## Riesgos y Mitigaciones

### Riesgos Técnicos

#### 🚨 Conflictos de CSS
- **Riesgo:** Tailwind puede conflictuar con estilos existentes
- **Mitigación:** Usar prefijos CSS, configurar purge correctamente

#### 🚨 Rendimiento en Móvil
- **Riesgo:** Carga lenta en dispositivos móviles
- **Mitigación:** Lazy loading, optimización de imágenes, code splitting

#### 🚨 Compatibilidad de Navegadores
- **Riesgo:** Funcionalidades no soportadas en navegadores antiguos
- **Mitigación:** Polyfills, testing en múltiples navegadores

### Riesgos de Dependencias

#### 🚨 Actualizaciones de Angular
- **Riesgo:** Breaking changes en nuevas versiones
- **Mitigación:** Versionado fijo, testing antes de actualizar

#### 🚨 Dependencias de Terceros
- **Riesgo:** Librerías descontinuadas o con vulnerabilidades
- **Mitigación:** Auditorías regulares, alternativas preparadas

## Checklist de Dependencias

### Pre-desarrollo
- [ ] Node.js y npm instalados
- [ ] Angular CLI actualizado
- [ ] Proyecto Angular creado
- [ ] Git configurado

### Durante desarrollo
- [ ] Tailwind CSS instalado y configurado
- [ ] Sistema de iconos seleccionado e instalado
- [ ] Estructura de componentes creada
- [ ] Assets de contenido preparados

### Pre-producción
- [ ] Build de producción exitoso
- [ ] Testing completado
- [ ] Optimizaciones aplicadas
- [ ] Documentación actualizada

### Post-implementación
- [ ] Monitoreo de rendimiento configurado
- [ ] Analytics implementado (opcional)
- [ ] SEO básico configurado
- [ ] Backup y versionado establecido