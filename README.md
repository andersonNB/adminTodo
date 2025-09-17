# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos
2. Renombar el .env.example a .env
3. Remplazar las variables de entorno
4. Instalas las dependiencias con `npm install`
5. Verificar que ya tengamos un init con prisma si no ejecuta `npx prims init`
6. Luego de tener nuestro modelo hacer `npx prisma migrate nombre`
7. Por último `npx prisma generate`
8. Ejecutar el SEED para [crear la base de datos local](https://localhost:3000/api/seed)

```
docker compose up -d
```

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
