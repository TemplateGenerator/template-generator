FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /src
COPY . /src
RUN dotnet restore "template-generator.csproj"
RUN dotnet build "template-generator.csproj" -c Release -o /app/build

FROM dotnet-build AS dotnet-publish
RUN dotnet publish "template-generator.csproj" -c Release -o /app/publish

FROM node AS node-builder
WORKDIR /node
COPY ./ClientApp /node
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
EXPOSE 5050
RUN mkdir /app/wwwroot
COPY --from=dotnet-publish /app/publish .
COPY --from=node-builder /node/build ./wwwroot
ENTRYPOINT ["dotnet", "template-generator.dll"]