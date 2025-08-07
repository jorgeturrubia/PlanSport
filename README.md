# SportPlanner - Sports Planning Platform

> A comprehensive sports planning platform that helps coaches and sports clubs manage training programs, teams, and provide a collaborative marketplace for sports knowledge sharing.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for Angular frontend)
- **.NET 8.0 SDK** (for backend API)
- **PostgreSQL** (local or Supabase)
- **Git** for version control

### Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/jorgeturrubia/PlanSport.git
cd SportAgentoos
```

#### 2. Frontend Setup (Angular + Tailwind CSS)
```bash
# Navigate to frontend directory
cd src/front/SportPlanner/

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at: **http://localhost:4200**

#### 3. Backend Setup (.NET + Entity Framework)
```bash
# Navigate to backend directory  
cd src/back/SportPlannerSolution/SportPlannerApi/

# Restore packages
dotnet restore

# Run the API
dotnet run --launch-profile https
```

Backend API will be available at:
- **HTTPS**: https://localhost:7213
- **HTTP**: http://localhost:5262
- **Swagger UI**: https://localhost:7213/swagger

## 🏗️ Project Architecture

```
SportAgentoos/
├── 📁 src/
│   ├── 📁 front/SportPlanner/        # Angular 20.1 Frontend
│   │   ├── 🎨 Tailwind CSS 4.1.11   # Styling framework
│   │   ├── 📱 Responsive design      # Mobile-first approach
│   │   └── ⚡ Hot reload enabled     # Development efficiency
│   │
│   └── 📁 back/SportPlannerSolution/ # .NET 8.0 Backend
│       ├── 🛠️ Entity Framework 9.0.8 # ORM for database
│       ├── 🐘 PostgreSQL support     # Database provider
│       └── 📊 Swagger/OpenAPI        # API documentation
│
├── 📁 supabase/                      # Database migrations
│   ├── 📄 migrations/               # SQL migration files
│   └── 🔐 RLS policies              # Row-level security
│
└── 📁 .agent-os/                     # Project configuration
    ├── 📋 specs/                     # Feature specifications
    ├── 📚 standards/                 # Development standards
    └── 📖 product/                   # Product documentation
```

## 🛠️ Technology Stack

### ✅ Frontend (Configured & Ready)
- **Framework**: Angular 20.1.0
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS 4.1.11
- **Build Tool**: Angular CLI with Webpack
- **Development Server**: http://localhost:4200

### ✅ Backend (Configured & Ready)
- **Framework**: ASP.NET Core 8.0
- **Language**: C# with .NET 8.0
- **ORM**: Entity Framework Core 9.0.8
- **Database Provider**: Npgsql 9.0.4 (PostgreSQL)
- **API Documentation**: Swagger/OpenAPI
- **Development Server**: https://localhost:7213

### 🗄️ Database & Storage
- **Database**: PostgreSQL (Supabase managed)
- **ORM**: Entity Framework Core with snake_case conventions
- **Migrations**: EF Core migrations
- **Authentication**: Supabase Auth (planned)

## 🔧 Development Commands

### Frontend Development
```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Backend Development
```bash
# Start API server
dotnet run

# Build project
dotnet build

# Run tests
dotnet test

# Database migrations
dotnet ef migrations add <MigrationName>
dotnet ef database update
```

## 🚦 Health Checks

The API provides health check endpoints:

- **General Health**: `GET /health`
- **Database Health**: `GET /health/database`
- **EF Core Tests**: `GET /api/DatabaseTest/connectivity`

## 📚 Documentation

### Setup Guides
- [Tailwind CSS Setup Guide](./.agent-os/standards/frontend/tailwind-setup-guide.md)
- [Entity Framework Setup Guide](./.agent-os/standards/backend/entityframework-setup-guide.md)

### Architecture Documentation
- [Technical Stack Details](./.agent-os/product/tech-stack.md)
- [Project Mission & Goals](./.agent-os/product/mission.md)

### Development Standards
- [CSS & Tailwind Style Guide](./.agent-os/standards/code-style/css-tailwind-style.md)
- [Angular Best Practices](./.agent-os/standards/frontend/)
- [.NET API Standards](./.agent-os/standards/backend/)

## 🎯 Current Status

### ✅ Infrastructure Setup Complete (2025-08-07)

**Frontend Ready**
- ✅ Angular 20.1 project created and configured
- ✅ Tailwind CSS 4.1.11 fully integrated
- ✅ PostCSS configuration optimized
- ✅ Development server with hot reload
- ✅ Production build optimization verified

**Backend Ready**
- ✅ .NET 8.0 Web API project configured
- ✅ Entity Framework Core 9.0.8 integrated
- ✅ PostgreSQL provider (Npgsql) configured
- ✅ Database context with snake_case conventions
- ✅ Health check endpoints implemented
- ✅ CORS configured for Angular frontend

### 🚧 Next Development Phase

**Immediate Next Steps:**
1. Connect to actual Supabase PostgreSQL database
2. Create initial database models (Teams, Players, Training)
3. Implement authentication integration
4. Build core Angular components with Tailwind
5. Set up Entity Framework migrations

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Workflow

1. **Check Agent OS**: Always verify `.agent-os/` configuration
2. **Follow Standards**: Use established coding standards and conventions
3. **Test Thoroughly**: Ensure both frontend and backend tests pass
4. **Document Changes**: Update relevant documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** for the robust frontend framework
- **Tailwind Labs** for the utility-first CSS framework
- **Microsoft** for .NET and Entity Framework Core
- **Supabase** for managed PostgreSQL and authentication services

---

**Project Status**: 🟢 Active Development  
**Last Updated**: 2025-08-07  
**Version**: Infrastructure Setup Complete
