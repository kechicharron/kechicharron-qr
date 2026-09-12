# K.E. Chicharrón QR

Aplicación web para pedidos por QR, cocina y reportes de ventas.

## Accesos

- `/` es el menú público para los clientes y se puede convertir en QR.
- `/cocina.html` es el panel que se abre en la tablet de cocina.
- `/reportes.html` es el reporte privado para el dueño.

## Ejecutar en un computador

1. Instala Node.js LTS desde https://nodejs.org.
2. Abre PowerShell en esta carpeta.
3. Ejecuta `npm start`.
4. Abre `http://localhost:3000`.

Para que un celular o tablet conectados al mismo Wi-Fi puedan entrar, usa la dirección IP del computador, por ejemplo `http://192.168.1.20:3000`.

## Reportes privados

El usuario de reportes es `admin` por defecto. Antes de publicar la aplicación cambia la contraseña con variables de entorno:

```powershell
$env:REPORT_USER = "tu_usuario"
$env:REPORT_PASSWORD = "una-clave-larga-y-segura"
npm start
```

El navegador solicitará esos datos únicamente al entrar a `/reportes.html`. El menú y la cocina no los solicitan.

## Publicarlo para usar QR desde cualquier lugar

El servidor debe quedar publicado con una URL HTTPS permanente, por ejemplo en Render, Railway o un VPS. Esa URL será la que se convierta en QR. La tablet usará `https://tu-dominio/cocina.html` y tu teléfono `https://tu-dominio/reportes.html`.

El archivo `orders.json` guarda los pedidos localmente. Para producción, el servidor debe usar almacenamiento persistente o una base de datos, porque algunos alojamientos borran archivos locales al reiniciar.

## Publicar en Render

1. Crea una cuenta en https://render.com.
2. Sube este proyecto a un repositorio privado de GitHub.
3. En Render elige **New > Web Service** y conecta ese repositorio.
4. Configura `Environment: Node`, `Build Command: npm install` y `Start Command: npm start`.
5. Agrega `REPORT_USER` y `REPORT_PASSWORD` en las variables de entorno.
6. Crea un disco persistente para `orders.json` o cambia el almacenamiento por una base de datos antes de recibir pedidos reales.
7. Render entregará una dirección como `https://kechicharron-qr.onrender.com`.

## Instalar en tablet y teléfono

Abre la URL pública en Chrome. Para cocina entra en `/cocina.html`, abre el menú de Chrome y elige **Instalar aplicación** o **Agregar a pantalla de inicio**. En el teléfono haz lo mismo con `/reportes.html`; el navegador pedirá el usuario y contraseña una sola vez. El menú `/` se comparte como QR y los clientes no ven cocina ni reportes.