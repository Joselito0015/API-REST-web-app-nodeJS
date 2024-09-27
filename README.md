# Servidor de Gestión Producto HarkAI

---

## Descripción del Proyecto

Esta API proporciona una plataforma robusta para la gestión y supervisión de la detección de Equipos de Protección Personal (EPP's) a través de cámaras con inteligencia artificial. Permite a las empresas controlar la seguridad de sus trabajadores al monitorear el uso adecuado de equipos de protección en áreas específicas.

---

## Funcionalidades Principales

- **Gestión de Empresas:**
  - Registro, actualización y eliminación de empresas.
  - Consulta de detalles de empresas.

- **Gestión de Áreas:**
  - Asociación de áreas a empresas.
  - Creación, edición y eliminación de áreas.

- **Usuarios y Roles:**
  - Administración de usuarios con roles definidos (administrador, supervisor, etc.).
  - Asignación de usuarios a áreas y empresas.

- **Registro de Incidentes:**
  - Registro automático de incidentes detectados por las cámaras.
  - Almacenamiento de imágenes y detalles relevantes.

- **Reportes y Estadísticas:**
  - Generación de informes sobre incidentes y cumplimiento del uso de EPP's.

- **Mensajería entre colaboradores**
  - Servicio de mensajería dentro del aplicativo movil para atención rápida de incidentes.

---

## Funcionalidades en desarrollo

- **Asistente IA**
  - Asistente virtual en plataforma web con servicios de AWS y modelos de Meta 3.1

- **Generación de reporte por voz**
  - Utilizar modelos denominados Speech2Text para completar formularios.

---

## Tecnologías Utilizadas

- **Node.js y Express.js:** Plataforma y marco de trabajo para el desarrollo del backend.
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png" alt="Node.js logo" width="400" height="auto">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*i2fRBk3GsYLeUk_Rh7AzHw.png" alt="Express logo" width="400" height="auto">
</div>

- **MongoDB:** Base de datos NoSQL para el almacenamiento de datos.
<div align="center">
  <img src="https://niixer.com/wp-content/uploads/2023/03/mongoimagen-1280x600.png" alt="MongoDB logo" width="400" height="auto">
</div>

- **Supabase:** Base de datos basada en PostgreSQL alojada completamente en la nube que almacena los mensajes del aplicativo movil.
<div align="center">
  <img src="https://getlogo.net/wp-content/uploads/2020/11/supabase-logo-vector.png" alt="Supabase logo" width="400" height="auto">
</div>

- **Mongoose:** Biblioteca de modelado de objetos MongoDB para Node.js.

- **Cloudinary:** Plataforma de gestión de medios en la nube para el almacenamiento de imágenes.
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Cloudinary_logo.svg/2560px-Cloudinary_logo.svg.png" alt="Cloudinary logo" width="400" height="auto">
</div>

- **Integración de IA:** Integración con sistemas de inteligencia artificial para detección de EPP's.

- **Open AI API:** Biblioteca de herramientas para uso de modelos de inteligencia artificial
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png" alt="Open AI logo" width="400" height="auto">
</div>

- **MQTT:** Protocolo de información para comunicar la aplicación movil con los dispositivos, pero solo para los roles administrativos/desarrolladores.

---

## Arquitectura del Proyecto

La arquitectura de **HarkAI** está diseñada bajo el principio de **modularidad** y sigue el patrón **MVC (Modelo-Vista-Controlador)**, lo que facilita la separación de responsabilidades y permite que cada módulo tenga un enfoque claro y bien definido. Esta estructura ha sido diseñada teniendo en mente una futura migración a una arquitectura de **microservicios**, que garantizará una mayor escalabilidad, disponibilidad y un mantenimiento más eficiente.

### Disponibilidad
- **Módulos Independientes**: Al ser modular, los diferentes componentes pueden funcionar de manera autónoma. Esto asegura que fallas en un módulo específico no afecten a todo el sistema, incrementando así la disponibilidad.
- **Base de Datos NoSQL con MongoDB**: Al utilizar MongoDB para la persistencia de datos, aprovechamos la replicación de datos y la alta disponibilidad que ofrece este motor de base de datos, permitiendo que las operaciones críticas permanezcan en línea incluso en casos de interrupciones.

### Performance
- **Comunicación Eficiente con MQTT**: Para las interacciones en tiempo real, como el monitoreo a través de dispositivos conectados (cámaras, sensores, etc.), se utiliza el protocolo MQTT, que es ligero y eficiente en el uso de ancho de banda, optimizando la comunicación en aplicaciones distribuidas.
- **Uso de Node.js y Express.js**: La elección de Node.js para el backend garantiza un rendimiento asíncrono eficiente, mientras que Express.js proporciona una capa ligera para manejar peticiones HTTP de manera ágil, permitiendo gestionar grandes volúmenes de tráfico.

### Interoperabilidad
- **API REST con JSON**: El backend expone servicios RESTful que se comunican utilizando JSON, facilitando la interoperabilidad con sistemas de terceros, clientes móviles, web apps, y otros servicios de backend.
- **Integración con Servicios de Terceros**: La integración con servicios en la nube como **Cloudinary** para la gestión de medios y **Supabase** para la base de datos de mensajería facilita una arquitectura que es fácilmente extensible y compatible con otros servicios en el futuro.

### Componentes Principales del Sistema

1. **API Gateway**
   - Punto de entrada único para todas las peticiones. Gestiona la distribución de las solicitudes a los módulos correspondientes y realiza validaciones iniciales como la verificación de tokens de acceso.

2. **Módulo de Autenticación**
   - Responsable de la autenticación de los usuarios mediante JWT (JSON Web Tokens). Gestiona el login, la creación de tokens y la validación de roles.

3. **Módulo de Gestión de Empresas y Áreas**
   - Maneja las operaciones CRUD relacionadas con empresas y áreas supervisadas.

4. **Módulo de Usuarios y Roles**
   - Administra los usuarios del sistema y define los roles. Asigna usuarios a áreas específicas.

5. **Módulo de Detección de Incidentes**
   - Detecta automáticamente incidentes relacionados con EPPs a través de sistemas de inteligencia artificial.

6. **Módulo de Reportes y Estadísticas**
   - Genera reportes sobre el estado de cumplimiento del uso de EPPs.

7. **Módulo de Mensajería**
   - Proporciona un sistema de mensajería interna entre colaboradores dentro del aplicativo móvil, gestionado por Supabase.
<div align="center">
  <img src="https://res.cloudinary.com/dmbtlv0hg/image/upload/v1727439688/Artist/HarkAI/Capa_de_presentaci%C3%B3n_1_ncp8vo.png" alt="Arquitectura" width="800" height="auto">
</div>

### Migración a Microservicios

La estructura actual está diseñada para facilitar la migración hacia microservicios. Cada módulo puede evolucionar hacia un servicio independiente que interactúa a través de API REST o eventos, permitiendo una mayor independencia en el desarrollo y la implementación.

- **Escalabilidad Independiente**: Escalar los módulos según sea necesario sin afectar el sistema completo.
- **Despliegue Autónomo**: Cada microservicio podrá ser desplegado y actualizado de manera independiente.

---

## Uso de la API

La API está documentada en detalle en una serie de colecciones de Postman. Las rutas utilizadas dentro de estas colecciones cuentan con un metodo de autorización para evitar su uso por usuarios ajenos al proyecto.

---

## Contacto

Para cualquier consulta o comentario, por favor contáctanos a través de [area.innovacion@consultoriacarranza.com.pe](mailto:area.innovacion@consultoriacarranza.com.pe).

---

## Agradecimientos

Agradecemos a todas las personas que han contribuido y apoyado en el desarrollo de esta API.

---
