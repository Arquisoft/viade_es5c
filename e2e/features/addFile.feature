Feature: AddFile

Scenario: Subir mi fichero ruta
  Given Soy un usuario logueado
  When  subo una ruta
  And   relleno el formulario
  Then nos redirige a la página de mis rutas