<?php
// Chemin vers le fichier JSON
$file_path = '../../data/data.json'; 

// Fonction pour lire les données du fichier JSON
function readData() {
    global $file_path;
    if (file_exists($file_path)) {
        $data = file_get_contents($file_path);
        return json_decode($data, true);
    } else {
        return [];
    }
}

// Lire les données du fichier JSON
$data = readData();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <title>Document</title>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#6D28D9',
                        'secondary': '#EDE9FE',
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer utilities {
            .bg-secondary {
                background-color: #EDE9FE;
            }
            .sidebar, nav {
                border-radius: 15px; /* Ajout de border-radius */
            }
            .sidebar a:hover {
                background-color: #EDE9FE; /* Changement de couleur au survol */
            }
        }
        .bg{
          background-color: red;
          color:white;
          padding: 0.5rem 2rem;
          border-radius: 0.5rem;
        }

    </style>
    <style>
      /* Styles pour le modal et les messages d'erreur */
#add-cargaison-modal .relative .text-red-600 {
  position: absolute;
  bottom: -1.25rem; /* Ajustez cette valeur pour espacer les messages d'erreur sous les champs */
  left: 0;
}

#close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #EDE9FE;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 50%;
}

#close-modal:hover {
  background-color:#6D28D9 ;
}

    

      pagination-controls {
        position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  top:80%;

}

.pagination-button {
    margin: 0 5px;
    padding: 10px 15px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 16px;
}

.pagination-button.active {
    background-color: #007bff;
    color: white;
}

.pagination-button:hover:not(.active) {
    background-color: #ddd;
}

      

    </style>
</head>
<body class="flex flex-col min-h-screen bg-secondary">
<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div class="navbar bg-primary text-white p-4">
        <div class="flex-1">
          <div class="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="">
          </div>
          <marquee behavior="" direction=""  class="shadow-dark-900 text-4xl text-secondary ml-2 marquee">Sénégal Gp votre transport efficace</marquee>
        </div>
        <div class="flex-none gap-2">
          <div class="form-control">
            <input type="text" class="rounded-lg"  id="global-search" placeholder="rechercher">
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-secondary rounded-box w-52">
              <li>
                <a class="justify-between text-primary hover:bg-secondary-dark rounded">
                  Profile
                  <span class="badge bg-primary text-white">New</span>
                </a>
              </li>
              <li><a class="text-primary hover:bg-secondary-dark rounded">Settings</a></li>
              <li><a class="text-primary hover:bg-secondary-dark rounded">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
</nav>
<div class="flex flex-grow pt-20">
  <aside class="sidebar bg-primary text-white p-4 rounded-l-lg">
    <ul class="space-y-4">
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Home</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Rate plans</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Bookings</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Apartments</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Pricing</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">Support</a></li>
      <li><a href="#" class="block py-2 px-4 hover:bg-secondary-dark rounded hover:text-primary">LogOut</a></li>
    </ul>
  </aside>
  <main class="flex-grow p-8 bg-secondary rounded-lg ml-4">
  <h1 class="text-3xl font-semibold mb-6 text-primary">Informations sur les Cargaisons</h1>
  

  <div class="mb-6 flex items-center justify-end">
  <input type="text" class="rounded-lg" id="input-recherche" placeholder="rechercher">
  <div id="additional-search-fields" class=" space-x-2">
    <input type="text" class="rounded-lg" id="search-field-1" placeholder="Champ 1">
    <input type="text" class="rounded-lg" id="search-field-2" placeholder="Champ 2">
    <input type="text" class="rounded-lg" id="search-field-3" placeholder="Champ 3">
    <input type="text" class="rounded-lg" id="search-field-4" placeholder="Champ 4">
    <input type="text" class="rounded-lg" id="search-field-5" placeholder="Champ 5">
    <input type="text" class="rounded-lg" id="search-field-6" placeholder="Champ 6">
    <input type="text" class="rounded-lg" id="search-field-7" placeholder="Champ 7">
    <input type="text" class="rounded-lg" id="search-field-8" placeholder="Champ 8">
    <input type="text" class="rounded-lg" id="search-field-9" placeholder="Champ 9">
  </div>
  <button id="show-form" class="btn btn-primary text-white hover:bg-secondary hover:text-primary mr-1">Ajouter Cargaison</button>
  <button id="view-table" class="btn btn-primary text-white hover:bg-secondary hover:text-primary mr-1">Format tableau</button>
  <button id="view-cards" class="btn btn-primary text-white hover:bg-secondary hover:text-primary mr-1">Format Carte</button>
</div>

    <div id="table-view" class="relative overflow-x-auto shadow-md sm:rounded-lg hidden bg-white">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-700">
          <tr>
          <th scope="col" class="px-6 py-3 bg-primary text-white">Code</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Libelle</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Type de Cargaison</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Pays de départ</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Pays d'arrivée</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Date de départ</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Date d'arrivée</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Distance</th>
            <th scope="col" class="px-6 py-3 bg-primary text-white">Etat d'avancement</th>
          </tr>
        </thead>
        <tbody id="table-body">
        <?php foreach ($data as $cargaison): ?>
          <tr>
            <td><?php echo htmlspecialchars($cargaison['_code']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_libelle']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_type']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_pays_depart']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_pays_arrivee']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_date_depart']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_date_arrivee']); ?></td>
            <td><?php echo htmlspecialchars($cargaison['_distance']); ?></td>

          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <div id="cards-view" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 hidden bg-white"></div>
    <div id="pagination-controls" class="pagination-controls"></div>

  </main>
</div>
<div id="add-cargaison-modal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded shadow-lg w-full max-w-4xl relative">
    <button type="button" id="close-modal" class="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full">&times;</button>
    <h2 class="text-2xl font-semibold mb-4 bg-primary text-white p-4 rounded-t-lg">Ajout Cargaison</h2>
    <form method="post" id="add-cargaison-form">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="relative">
          <label for="lib_cargo" class="block text-gray-700">Libellé</label>
          <input type="text" id="lib_cargo" name="libelle" class="input input-bordered w-full mt-2" placeholder="Ajoutez un Libellé">
          <span id="error_lib" class="text-red-600 hidden absolute -bottom-5 left-0">Libellé requis !</span>
        </div>
        <div class="relative">
          <label for="select-cargo" class="block text-gray-700">Type de Cargaison</label>
          <select id="select-cargo" name="type" class="input input-bordered w-full mt-2">
            <option value="choice">Choisir un type de cargaison</option>
            <option value="Cargaison Maritime">Cargaison Maritime</option>
            <option value="Cargaison Aerien">Cargaison Aerien</option>
            <option value="Cargaison Routier">Cargaison Routier</option>
          </select>
          <span id="error_selectcargo" class="text-red-600 hidden absolute -bottom-5 left-0">Sélection requise !</span>
        </div>
        <div class="relative">
          <label for="datefirtst" class="block text-gray-700">Date de départ</label>
          <input type="date" name="date_depart" id="datefirtst" class="input input-bordered w-full mt-2">
          <span id="error_datefirst" class="text-red-600 hidden absolute -bottom-5 left-0">Date de départ requise !</span>
        </div>
        <div class="relative">
          <label for="dateend" class="block text-gray-700">Date d'arrivée</label>
          <input type="date" id="dateend" name="date_arrivee" class="input input-bordered w-full mt-2">
          <span id="error_dateend" class="text-red-600 hidden absolute -bottom-5 left-0">Date d'arrivée requise !</span>
        </div>
        <div class="relative col-span-2">
          <span id="error_date_comparison" class="text-red-600 hidden absolute bottom-0 left-0"></span>
        </div>
      </div>
      <div id="map" style="height: 300px; width: 100%;" class="mb-4"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="relative">
          <label for="start-location" class="block text-gray-700">Ville de départ</label>
          <input type="text" id="start-location" name="pays_depart" class="input input-bordered w-full mt-2">
          <span id="error_towndep" class="text-red-600 hidden absolute -bottom-5 left-0">Zone de départ requise !</span>
        </div>
        <div class="relative">
          <label for="end-location" class="block text-gray-700">Ville d'arrivée</label>
          <input type="text" id="end-location" name="pays_arrivee" class="input input-bordered w-full mt-2" >
          <span id="error_townar" class="text-red-600 hidden absolute -bottom-5 left-0">Zone d'arrivée requise !</span>
        </div>
        <div class="relative">
          <label for="distance" class="block text-gray-700">Distance (km)</label>
          <input type="text" id="distance" name="distance" class="input input-bordered w-full mt-2" readonly>
          <span id="error_distance" class="text-red-600 hidden absolute -bottom-5 left-0">Distance requise !</span>
        </div>
        <div class="relative">
          <label for="choiceimit" class="block text-gray-700">type de Limitation</label>
          <select name="" id="select_limit" class="input input-bordered w-full mt-2">
            <option value="">choisir une option d elimita</option>
            <option value="poids">Poids</option>
            <option value="">Nombre</option>
          </select>
          
          <span id="error_poids" class="text-red-600 hidden absolute -bottom-5 left-0">champsrequise !</span>
        </div>
      </div>
      <button type="submit" id="btn" class="btn bg-primary w-full text-white hover:bg-secondary-dark hover:text-primary mb-4">Ajouter Cargaison</button>
    </form>
  </div>
</div>

<script src="../ts/modelJs/test.js" type="module"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<script>
let map, startMarker, endMarker;
let startPoint, endPoint;

map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

map.on('click', function(e) {
  if (!startPoint) {
    startPoint = e.latlng;
    startMarker = L.marker(startPoint, { draggable: true }).addTo(map);
    reverseGeocode(startPoint, 'start-location');
    startMarker.on('click', function() {
      map.removeLayer(startMarker);
      startPoint = null;
      document.getElementById('start-location').value = '';
      document.getElementById('distance').value = '';
    });
  } else if (!endPoint) {
    endPoint = e.latlng;
    endMarker = L.marker(endPoint, { draggable: true }).addTo(map);
    reverseGeocode(endPoint, 'end-location');
    calculateDistance();
    endMarker.on('click', function() {
      map.removeLayer(endMarker);
      endPoint = null;
      document.getElementById('end-location').value = '';
      document.getElementById('distance').value = '';
    });
  }
});

function reverseGeocode(latlng, elementId) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
    .then(response => response.json())
    .then(data => {
      if (data.address) {
        document.getElementById(elementId).value = data.address.city || data.address.town || data.address.village || data.address.country || '';
      } else {
        document.getElementById(elementId).value = '';
        console.error('Address not found for the provided coordinates.');
      }
    })
    .catch(error => {
      console.error('Error fetching address data:', error);
      document.getElementById(elementId).value = '';
    });
}

function calculateDistance() {
  if (startPoint && endPoint) {
    const distance = map.distance(startPoint, endPoint) / 1000;
    document.getElementById('distance').value = distance.toFixed(2);
  }
}

document.getElementById('show-form').addEventListener('click', function() {
  document.getElementById('add-cargaison-modal').classList.remove('hidden');
  map.invalidateSize();
});

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('add-cargaison-modal').classList.add('hidden');
  resetMap();
});

function resetMap() {
  if (startMarker) map.removeLayer(startMarker);
  if (endMarker) map.removeLayer(endMarker);
  startPoint = null;
  endPoint = null;
  document.getElementById('start-location').value = '';
  document.getElementById('end-location').value = '';
  document.getElementById('distance').value = '';
}
document.getElementById('dropdownDividerButton').addEventListener('click', function() {
            document.getElementById('dropdown-divider-modal').classList.remove('hidden');
        });

        // Fonction pour masquer le modal de filtre
        document.getElementById('close-dropdown-modal').addEventListener('click', function() {
            document.getElementById('dropdown-divider-modal').classList.add('hidden');
        });
        
    
  
    const toggleSearchFieldsButton = document.getElementById('toggle-search-fields');
    const additionalSearchFields = document.getElementById('additional-search-fields');

</script>

</script>
</body>
</html>
