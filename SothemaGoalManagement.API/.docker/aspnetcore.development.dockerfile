FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS build-env
WORKDIR /publish
COPY SothemaGoalManagement.API.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish --output ./out

FROM mcr.microsoft.com/dotnet/core/aspnet:2.1
LABEL author="Elmehdi Aitbrahim"
WORKDIR /var/www/goalmanagementapi
COPY --from=build-env /publish/out .
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=development
EXPOSE 5000
ENTRYPOINT ["dotnet", "SothemaGoalManagement.API.dll"]