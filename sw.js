// Service worker mínimo — necessário apenas para o browser permitir "Instalar app".
// Não faz cache agressiva: deixa o browser buscar sempre a versão mais recente do ficheiro.
self.addEventListener('install', function(event){
  self.skipWaiting();
});
self.addEventListener('activate', function(event){
  self.clients.claim();
});
self.addEventListener('fetch', function(event){
  event.respondWith(fetch(event.request));
});
