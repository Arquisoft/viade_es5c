Feature: RoutesView

Scenario: Crear una nueva ruta
  Given Soy un usuario logueado
  When  relleno el formulario
  And   marco los puntos en el mapa
  Then nos muestra una notificación correcta