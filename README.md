# kioskweb

## Description


The **Kiosk Comedy** project is a local stand-up comedy open mic shows' aggregator. This is my first project, its purpose is to solve the problem of comedy fans not being aware of all the comedy events in the city due to fragmented information from different comedy groups. The project aims to provide a centralized platform where comedy fans can easily find and plan their visits to comedy events, benefiting both the fans and the comedians by increasing the total number of viewers at events.
![Screenshot](https://github.com/eeershov/kioskweb/assets/38592029/67cfb1d9-4ba9-418c-806a-c4736cbf6bf9)


---

The project is built using the following technologies:
- Typescript
- Node.js backend with Express
- PostgreSQL database
- React frontend with Vite
- Docker for containerization

- Nginx and Nginx Proxy Manager for reverse proxying
- Umami Analytics for light website analytics


## Installation
---


### Development
1. Running dev at http://localhost is easy with just:
```
docker-compose --file docker-compose.dev.yml up --build -d
```


### Production
This part is a reminder for myself in the future.

1. Creating `.env` inside the root directory
Inside TP_ (TimePad) block the only secret info is `TP_API_TOKEN`, everything else is in here for convenience.
Change everything accordingly. 
**.env**
```
POSTGRES_USER=pguser
POSTGRES_PASSWORD=pgpassword
POSTGRES_DB=pgdbname

TP_API_URL=https://api.timepad.ru/v1/events.json
TP_API_TOKEN=secrettimepadapitoken
TP_orgIdKiosk=237025
TP_orgIdGrky=234802
TP_orgIdStand=168316
TP_orgId52=250270

UMAMI_POSTGRES_DB=umamidb
UMAMI_POSTGRES_USER=userumami
UMAMI_POSTGRESS_PASS=passumami

UMAMI_DATABASE_URL=postgresql://userumami:passumami@umami_db:5432/umami
UMAMI_APP_SECRET=randomsecretstring
```

2. Docker compose
Build and run docker containers from the file named `docker-compose.prod.yml` 
```
docker-compose --file docker-compose.prod.yml up --build -d
```

3. Nginx Proxy Manager
Previous step makes website online (at vps_ip).
Access vps_ip:81 the Nginx Proxy Manager GUI with `admin@example.com changeme`, get prompted and update your profile with viable email and password. If you own domain name or use dynamic DNS service, it's time to add DNS records. And create SSL cert for `kioskcomedy.org, *.kioskcomedy.org`.
Now go to Hosts tab -> Proxy Hosts, add a new one. 
```
Domain Names: kioskcomedy.org
Scheme: http
Forward Hostname / IP: client
Forward Port: 3000

in custom locations add new
Define location: /api
Scheme: http
Forward Hostname / IP: backend
Forward Port: 8080

SSL - add ssl with all checkmarks
```
Another one:
```
Domain Names: npm.kioskcomedy.org
Scheme: http
Forward Hostname / IP: nginxpm
Forward Port: 81

SSL - same as previous
```
And another one:
```
Domain Names: umami.kioskcomedy.org
Scheme: http
Forward Hostname / IP: umami
Forward Port: 3000

SSL - same as previous
```

4. Umami Analytics
Visit umami.kioskcomedy.org with `admin umami`, update login details. Get tracker code and update `client/src/components/Seo/umamiTracker.tsx`

5. Finally
Run the Docker Compose command again to start the containers
```
docker-compose --file docker-compose.prod.yml up --build -d
```

## Tests
---

There are currently no tests implemented for the project.
