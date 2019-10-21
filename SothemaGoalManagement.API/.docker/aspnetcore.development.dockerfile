FROM microsoft/dotnet:sdk

LABEL author="Elmehdi Aitbrahim" 

ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=development

EXPOSE 5000

WORKDIR /var/www/goalmanagementapi

CMD ["/bin/bash", "-c", "dotnet restore && dotnet watch run"]