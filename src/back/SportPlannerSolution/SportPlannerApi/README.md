# SportPlanner API

## Requisitos
- .NET 8 SDK

## Buenas prácticas aplicadas
- Nullable habilitado (Directory.Build.props en src/back)
- Versionado de API (v1)
- Swagger disponible en desarrollo
- Serilog para logging

## Ejecutar
```pwsh
dotnet restore
dotnet build
dotnet run --project src/back/SportPlannerSolution/SportPlannerApi/SportPlannerApi.csproj
```

## Entorno
- appsettings.json y appsettings.Development.json
- Variables de entorno para secretos (no commitear secretos)
