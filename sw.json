// Service worker da Folha RH PRO 2026 — cache básica para permitir instalação e uso offline.
var CACHE_NAME = 'rh-pro-2026-v1';
var FICHEIROS_PARA_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(FICHEIROS_PARA_CACHE);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(nomes){
      return Promise.all(
        nomes.filter(function(nome){ return nome !== CACHE_NAME; })
             .map(function(nome){ return caches.delete(nome); })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

// Estratégia: tenta a rede primeiro (para ter sempre a versão mais recente);
// se falhar (offline), usa a cópia guardada em cache.
self.addEventListener('fetch', function(event){
  event.respondWith(
    fetch(event.request).then(function(resposta){
      var respostaClone = resposta.clone();
      caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, respostaClone); });
      return resposta;
    }).catch(function(){
      return caches.match(event.request);
    })
  );
});
