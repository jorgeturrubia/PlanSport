# SportPlanner - Script de Instalación de Dependencias Angular
# Ejecutar con: .\install-dependencies.ps1

Write-Host "🚀 Iniciando instalación de dependencias para SportPlanner Angular..." -ForegroundColor Green
Write-Host ""

# 1. Tailwind CSS v4
Write-Host "📦 Instalando Tailwind CSS v4..." -ForegroundColor Yellow
npm install tailwindcss @tailwindcss/postcss postcss --force

# 2. Font Awesome
Write-Host "📦 Instalando Font Awesome..." -ForegroundColor Yellow
npm install @fortawesome/fontawesome-free @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons

# 3. Supabase
Write-Host "📦 Instalando Supabase..." -ForegroundColor Yellow
npm install @supabase/supabase-js

# 4. Angular CDK
Write-Host "📦 Instalando Angular CDK..." -ForegroundColor Yellow
npm install @angular/cdk

# 5. Angular Animations
Write-Host "📦 Instalando Angular Animations..." -ForegroundColor Yellow
npm install @angular/animations

# 6. Charts
Write-Host "📦 Instalando librerías de gráficos..." -ForegroundColor Yellow
npm install chart.js ng2-charts

# 7. Date utilities
Write-Host "📦 Instalando date-fns..." -ForegroundColor Yellow
npm install date-fns

# 8. Dev Dependencies
Write-Host "📦 Instalando herramientas de desarrollo..." -ForegroundColor Yellow
npm install --save-dev eslint prettier @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser

# 9. Git Hooks
Write-Host "📦 Instalando Husky y lint-staged..." -ForegroundColor Yellow
npm install --save-dev husky lint-staged

# 10. Playwright for E2E testing
Write-Host "📦 Instalando Playwright..." -ForegroundColor Yellow
npm install --save-dev @playwright/test

Write-Host ""
Write-Host "✅ Instalación de dependencias completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Crear archivo .postcssrc.json en la raíz del proyecto"
Write-Host "2. Actualizar src/styles.css con @import 'tailwindcss';"
Write-Host "3. Configurar variables de entorno en src/environments/"
Write-Host ""
