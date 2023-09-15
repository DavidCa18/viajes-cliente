# AngularSpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build projects different environments

En caso de realizar la publicación del proyecto de manera manual se debe ejecutar con el uso de los siguientes comandos

# Desarrollo
  Run `npm run develop` to build the project. The build artifacts will be stored in the `dist/` directory.

# Pruebas
  Run `npm run testing` to build the project. The build artifacts will be stored in the `dist/` directory.

# Producción
  Run `npm run production` to build the project. The build artifacts will be stored in the `dist/` directory.

En caso de realizar la publicación del proyecto a través de la herramienta Visual Studio 2019 se debe crear un perfil de publicación donde se asigne la configuración de la siguiente manera

# Desarrollo
  Seleccionar como configuración => ReleaseDesarrolloViajes

# Pruebas
  Seleccionar como configuración => ReleasePruebasViajes

# Producción
  Seleccionar como configuración => ReleaseProduccionViajes


## Nota
 Para ambos casos de publicación en cualquier ambiente se debe modificar el archivo index.html, ubicado dentro de la siguiente carpeta ClientApp\dist
  Añadiendo un signo de punto (.) en la etiqueta <base>

# Ejemplo
- Archivo Compilado
     <base href="/">
- Cambio
     <base href="./">


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
