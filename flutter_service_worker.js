'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "6c83f84652b997e414a80fd36112b152",
"index.html": "d35e30275e24dcaf25ac26c4ba3495a2",
"/": "d35e30275e24dcaf25ac26c4ba3495a2",
"main.dart.js": "7088489441b12299fd00a5c373882341",
"assets/AssetManifest.json": "6b1f63db1f8612d93a89ec0da45deebf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_tindercard/assets/welcome0.png": "97e534de38f2045e9f22ea0c707a2c96",
"assets/packages/flutter_tindercard/assets/welcome2.png": "b8a1d4b4e68e4413c7d791d742bb97c2",
"assets/packages/flutter_tindercard/assets/welcome1.png": "0e88dad1f73f380fddd50c74a42ae6e8",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/icons/edit.png": "bf646c038600c2c09d93aa451d49df75",
"assets/assets/icons/celendar.png": "1edc1e57c4cb8ef73bfd43a325efcfbe",
"assets/assets/icons/delete_profilr.png": "b74019f2f921aed54742e40db1fe68c1",
"assets/assets/icons/no_like_found.png": "08e750066e9b3a627aba0bfc67a7662f",
"assets/assets/icons/back_icn.png": "db8eeb683e0ca19092a8057c83b9d02a",
"assets/assets/icons/filters.png": "c409667dac47c0e7ed7b3f8e51d7753f",
"assets/assets/icons/next_icn.png": "ff6aff4aaeb6f51b6a869f4312d20dba",
"assets/assets/icons/like_select.png": "4a125c6629e7bdb1618ec5fee6009d6b",
"assets/assets/icons/chat_icon.png": "cdd83bc1c7468d00aeefde7cb7742227",
"assets/assets/icons/help_icn.png": "7ad98f153c1e1a4fe28ecec17c3ed8f5",
"assets/assets/icons/like_icon.png": "01e04015fd4f4a72e9f7bd70779973d2",
"assets/assets/icons/btn_bg.png": "bfb498f1cfc1685aa878a17a7e699e77",
"assets/assets/icons/dating.png": "8e89baa6c8ace068a534da2732c395a9",
"assets/assets/icons/city.png": "4028f88cfdfee93ac1f35454ca7653ca",
"assets/assets/icons/model.png": "214a582ad7914aa309aee066d1384a8c",
"assets/assets/icons/user_profile.png": "42888df4fe99211da58d0ae756da0e3a",
"assets/assets/icons/right_arrow.png": "0b0004199912e179111db0ec76246464",
"assets/assets/icons/gender.png": "118ae1b884585783b0f4566ff0f3a73a",
"assets/assets/icons/privacy_icn.png": "a31b5373fbf1a3c3c4c9ab578ba0be5f",
"assets/assets/icons/birthdate.png": "94381c626f8e64f3a49988182d51e210",
"assets/assets/icons/like.png": "ebc2bc59a026a65d8c7fa340e61d6e42",
"assets/assets/icons/chat_select.png": "99e0ba78b063452fbd2fb1e98e25ed45",
"assets/assets/icons/profile.png": "bfcfc0ab73ec5ba6577d3fa5563b61f4",
"assets/assets/icons/profile_select.png": "fa19805a8178e50ac0ca66fb0affc4ad",
"assets/assets/icons/chat.png": "33e2d2e8366a7fe6e5581b1ad3211433",
"assets/assets/icons/chat_iconn.png": "b07a195766284191306d55bdf99b79fc",
"assets/assets/icons/online.png": "34e2323460eadc8e2fb53e7cd3e14092",
"assets/assets/icons/dating_select.png": "917820614c4ade57d16ba04e718b680e",
"assets/assets/animation/error.flr": "ab25ba66d2310fea587b9016485f0ec4",
"assets/assets/animation/young-pretty-woman-black-hat-beige-coat-walking-by-mall%25201.png": "805fa443ee47294b6d8453ee4cc8c2df",
"assets/assets/Models/model4.png": "72f3c82369ff8242b086a7727b993095",
"assets/assets/Models/model3.png": "508622ccdbda603323648256835e6710",
"assets/assets/Models/model.png": "805fa443ee47294b6d8453ee4cc8c2df",
"assets/assets/Models/model2.png": "a80fdcf81b51d370a0a81b65a138fc43",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "0a5ee52ad016591428e5477f20961158",
"manifest.json": "1ddf671646ed754f5f95e401f15ce4b6"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
