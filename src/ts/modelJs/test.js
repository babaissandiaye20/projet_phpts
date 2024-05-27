class client {
    _nom;
    _prenom;
    _numéro;
    constructor(nom, prenom, numéro) {
        this._nom = nom;
        this._prenom = prenom;
        this._numéro = numéro;
    }
    get nom() {
        return this._nom;
    }
    set nom(value) {
        this._nom = value;
    }
    get prenom() {
        return this._prenom;
    }
    set prenom(value) {
        this._prenom = value;
    }
    get numéro() {
        return this._numéro;
    }
    set numéro(value) {
        this._numéro = value;
    }
}
export class produit {
    nom;
    poids;
    _client;
    constructor(nom, poids, client) {
        this.nom = nom;
        this.poids = poids;
        this._client = client;
    }
}
export class produit_alimentaire extends produit {
    constructor(nom, poids, client) {
        super(nom, poids, client);
    }
}
export class produit_chimique extends produit {
    degre_toxite;
    constructor(nom, poids, degre_toxite, client) {
        super(nom, poids, client);
        this.degre_toxite = degre_toxite;
    }
}
export class produit_materiel extends produit {
    constructor(nom, poids, client) {
        super(nom, poids, client);
    }
}
export class produit_incassable extends produit_materiel {
    type = "incassable";
    constructor(nom, poids, type = "incassable", client) {
        super(nom, poids, client);
        this.type = type;
    }
}
export class produit_fragile extends produit_materiel {
    type = "fragile";
    constructor(nom, poids, type = "fragile", client) {
        super(nom, poids, client);
        this.type = type;
    }
}
function generateUniqueCode() {
    return 'CARGO-' + Math.floor(Math.random() * 300);
}
export class Cargaison {
    _code;
    _libelle;
    _type;
    _distance;
    _frais;
    _pays_depart;
    _pays_arrivee;
    _date_depart;
    _date_arrivee;
    _produits;
    _etat_avancement;
    constructor(code, libelle, type, distance, frais, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancement) {
        this._code = code || generateUniqueCode();
        this._libelle = libelle;
        this._type = type;
        this._distance = distance;
        this._frais = frais;
        this._pays_depart = pays_depart;
        this._pays_arrivee = pays_arrivee;
        this._date_depart = date_depart;
        this._date_arrivee = date_arrivee;
        this._produits = produits;
        this._etat_avancement = etat_avancement;
    }
    get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    }
    get libelle() {
        return this._libelle;
    }
    set libelle(value) {
        this._libelle = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get distance() {
        return this._distance;
    }
    set distance(value) {
        this._distance = value;
    }
    get frais() {
        return this._frais;
    }
    set frais(value) {
        this._frais = value;
    }
    get pays_depart() {
        return this._pays_depart;
    }
    set pays_depart(value) {
        this._pays_depart = value;
    }
    get pays_arrivee() {
        return this._pays_arrivee;
    }
    set pays_arrivee(value) {
        this._pays_arrivee = value;
    }
    get date_depart() {
        return this._date_depart;
    }
    set date_depart(value) {
        this._date_depart = value;
    }
    get date_arrivee() {
        return this._date_arrivee;
    }
    set date_arrivee(value) {
        this._date_arrivee = value;
    }
    get produits() {
        return this._produits;
    }
    set produits(value) {
        this._produits = value;
    }
    get etat_avancement() {
        return this._etat_avancement;
    }
    set etat_avancement(value) {
        this._etat_avancement = value;
    }
    ajouterProduit(produit) {
        if (this._produits.length <= 10) {
            this._produits.push(produit);
        }
        else {
            throw console.error("veuillez mettre une quantité plus petite ");
        }
    }
}
export class CargaisonMaritime extends Cargaison {
    constructor(code, libelle, type, distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancementt) {
        super(code, libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancementt);
    }
    ajouterProduit(produit) {
        super.ajouterProduit(produit);
    }
    calculerFrais(produit) {
        let tarif;
        if (produit instanceof produit_incassable) {
            tarif = 400;
        }
        else if (produit instanceof produit_alimentaire) {
            tarif = 90;
        }
        else if (produit instanceof produit_chimique) {
            tarif = 500;
        }
        else {
            throw new Error('Type de produit inconnu');
        }
        if (produit instanceof produit_chimique) {
            return this.distance * produit.degre_toxite * tarif;
        }
        else {
            return this.distance * produit.poids * tarif;
        }
    }
    sommetotal() {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }
    nbre_produit() {
        return this.produits.length;
    }
}
export class CargaisonRoutiere extends Cargaison {
    constructor(code, libelle, type, distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancement) {
        super(code, libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancement);
    }
    ajouterProduit(produit) {
        super.ajouterProduit(produit);
    }
    calculerFrais(produit) {
        let tarif;
        if (produit instanceof produit_incassable || produit instanceof produit_fragile) {
            tarif = 200;
        }
        else if (produit instanceof produit_alimentaire) {
            tarif = 100;
        }
        else {
            throw new Error('Type de produit inconnu');
        }
        return this.distance * produit.poids * tarif;
    }
    sommetotal() {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }
    nbre_produit() {
        return this.produits.length;
    }
}
export class Cargaisonaerin extends Cargaison {
    constructor(code, libelle, type, distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancement) {
        super(code, libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits, etat_avancement);
    }
    ajouterProduit(produit) {
        super.ajouterProduit(produit);
    }
    calculerFrais(produit) {
        let tarif;
        if (produit instanceof produit_incassable || produit instanceof produit_fragile) {
            tarif = 1000;
        }
        else if (produit instanceof produit_alimentaire) {
            tarif = 300;
        }
        else {
            throw new Error('Type de produit inconnu');
        }
        return this.distance * produit.poids * tarif;
    }
    sommetotal() {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }
    nbre_produit() {
        return this.produits.length;
    }
}
let cargaisons = [];
let currentPage = 1;
const itemsPerPage = 2;
// Function to save data
const save = (data) => {
    fetch("http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            alert("Les données ont été enregistrées avec succès.");
            loadData(); // Reload data to update the display
        }
        else {
            alert("Erreur lors de l'enregistrement des données : " + data.message);
        }
    })
        .catch(error => console.error("Erreur lors de la requête de sauvegarde:", error));
};
// Function to load data
function loadData() {
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
        .then(response => response.json())
        .then(data => {
        cargaisons = data.map((c) => {
            if (c._type === "Cargaison Maritime") {
                return new CargaisonMaritime(c._code, c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits, c._etat_avancement);
            }
            else if (c._type === "Cargaison Aerienne") {
                return new Cargaisonaerin(c._code, c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits, c._etat_avancement);
            }
            else {
                return new CargaisonRoutiere(c._code, c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits, c._etat_avancement);
            }
        });
        afficherCargaisons(cargaisons, currentPage);
    })
        .catch(error => console.error('Erreur lors du chargement des données:', error.message));
}
// Function to add a new cargaison
function ajouterCargaison(cargaison) {
    cargaisons.unshift(cargaison);
    afficherCargaisons(cargaisons, currentPage);
    save(cargaisons);
}
// Function to display cargaisons with pagination
function afficherCargaisons(cargo, page = 1) {
    const tableBody = document.getElementById('table-body');
    const cardsView = document.getElementById('cards-view');
    tableBody.innerHTML = '';
    cardsView.innerHTML = '';
    //pagination
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
        .then(response => response.json())
        .then(data => {
        let cargo = data;
    });
    let carga = cargo;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCargaisons = carga.slice(startIndex, endIndex);
    paginatedCargaisons.forEach(cargaison => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="px-6 py-4 text-primary text-1xl">${cargaison.code}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.libelle}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.type}</td> 
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.pays_depart}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.pays_arrivee}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.date_depart}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.date_arrivee}</td>
            <td class="px-6 py-4 text-primary text-1xl">${cargaison.distance} km</td>
            <td class="px-6 py-4 text-primary text-2xl "> 
            <button class="bg">${cargaison.etat_avancement}</button>
            </td>

        `;
        ;
        row.classList.add('bg-secondary');
        tableBody.appendChild(row);
        const card = document.createElement('div');
        card.className = 'card bg-secondary text-primary shadow-md rounded-lg p-4';
        card.innerHTML = `
            <h2 class="font-semibold">${cargaison.pays_depart} à ${cargaison.pays_arrivee}</h2>
            <p><strong>Départ:</strong> ${cargaison.date_depart}</p>
            <p><strong>Arrivée:</strong> ${cargaison.date_arrivee}</p>
            <p><strong>Distance:</strong> ${cargaison.distance} km</p>
            <p><strong>Frais Total:</strong> ${cargaison.sommetotal()} $</p>
            <p><strong>Nombre de Produits:</strong> ${cargaison.nbre_produit()}</p>
        `;
        const selectCargo = cargaison.constructor.name;
        const lete = document.createElement("img");
        if (selectCargo === "CargaisonMaritime") {
            lete.src = "src/php/public/image/bateaugp.jpeg";
        }
        else if (selectCargo === "Cargaisonaerin") {
            lete.src = "src/php/public/image/aviongp.jpeg";
        }
        else {
            lete.src = "src/php/public/image/camiongp.jpeg";
        }
        card.appendChild(lete);
        cardsView.appendChild(card);
    });
    updatePaginationControls(cargo);
}
// Function to update pagination controls
function updatePaginationControls(cargo) {
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
        .then(response => response.json())
        .then(data => {
        cargo = data;
    });
    let d = cargo;
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(cargaisons.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i.toString();
        pageButton.className = 'pagination-button';
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            afficherCargaisons(d, currentPage);
        });
        paginationControls.appendChild(pageButton);
    }
}
function validateLibelle(libelle) {
    return libelle.trim().length > 0;
}
function validateDistance(distance) {
    return !isNaN(distance) && distance > 0;
}
function validatePays(pays) {
    return pays.trim().length > 0;
}
function validateDate(date) {
    return !isNaN(Date.parse(date));
}
function clearFormFields() {
    (document.getElementById("lib_cargo").value = '');
    document.getElementById("select-cargo").value = '';
    document.getElementById("start-location").value = '';
    document.getElementById("end-location").value = '';
    document.getElementById("datefirtst").value = '';
    document.getElementById("dateend").value = '';
    document.getElementById("distance").value = '';
}
// Event listener for adding a new cargaison
const btn = document.getElementById("btn");
btn.addEventListener("click", function (event) {
    event.preventDefault();
    const selectCargo = document.getElementById("select-cargo").value;
    const lib = document.getElementById("lib_cargo").value;
    const selectCountry1 = document.getElementById("start-location").value;
    const selectCountry2 = document.getElementById("end-location").value;
    const heureDepart = document.getElementById("datefirtst").value;
    const heureArrivee = document.getElementById("dateend").value;
    const distance = parseFloat(document.getElementById("distance").value);
    let span_errorlib = document.getElementById("error_lib");
    let span_errorlselectcargo = document.getElementById("error_selectcargo");
    let span_errorldatefirst = document.getElementById("error_datefirst");
    let span_error_dateend = document.getElementById("error_dateend");
    let span_error_towndep = document.getElementById("error_towndep");
    let span_error_townar = document.getElementById("error_townar");
    let span_error_distance = document.getElementById("error_distance");
    let span_error_date_comparison = document.getElementById("error_date_comparison");
    let code = generateUniqueCode();
    let etat_avancement = "Ouvert";
    let isValid = true;
    // Validation
    if (lib === "") {
        span_errorlib.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_errorlib.classList.add("hidden");
    }
    if (selectCargo === "choice" || selectCargo === "") {
        span_errorlselectcargo.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_errorlselectcargo.classList.add("hidden");
    }
    if (selectCountry1 === "") {
        span_error_towndep.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_error_towndep.classList.add("hidden");
    }
    if (selectCountry2 === "") {
        span_error_townar.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_error_townar.classList.add("hidden");
    }
    if (heureDepart === "") {
        span_errorldatefirst.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_errorldatefirst.classList.add("hidden");
    }
    if (heureArrivee === "") {
        span_error_dateend.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_error_dateend.classList.add("hidden");
    }
    if (isNaN(distance)) {
        span_error_distance.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_error_distance.classList.add("hidden");
    }
    const currentDate = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD
    if (heureDepart < currentDate) {
        span_error_date_comparison.textContent = "La date de départ doit être égale ou supérieure à la date du jour.";
        span_error_date_comparison.classList.remove("hidden");
        isValid = false;
    }
    else if (heureDepart >= heureArrivee) {
        span_error_date_comparison.textContent = "La date de départ doit être inférieure à la date d'arrivée.";
        span_error_date_comparison.classList.remove("hidden");
        isValid = false;
    }
    else {
        span_error_date_comparison.classList.add("hidden");
    }
    if (!isValid) {
        return;
    }
    // Création de la nouvelle cargaison
    let nouvelleCargaison;
    let produit = [];
    if (selectCargo === "Cargaison Maritime") {
        nouvelleCargaison = new CargaisonMaritime(code, lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit, etat_avancement);
    }
    else if (selectCargo === "Cargaison Aerien") {
        nouvelleCargaison = new Cargaisonaerin(code, lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit, etat_avancement);
    }
    else {
        nouvelleCargaison = new CargaisonRoutiere(code, lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit, etat_avancement);
    }
    clearFormFields();
    // Ajout de la cargaison
    ajouterCargaison(nouvelleCargaison);
    console.log(nouvelleCargaison);
    loadData();
});
// Toggle view functions
document.getElementById('view-table')?.addEventListener('click', function () {
    document.getElementById('table-view')?.classList.remove('hidden');
    document.getElementById('cards-view')?.classList.add('hidden');
});
document.getElementById('view-cards')?.addEventListener('click', function () {
    document.getElementById('table-view')?.classList.add('hidden');
    document.getElementById('cards-view')?.classList.remove('hidden');
});
// Default view settings on page load
window.addEventListener('load', function () {
    loadData();
    document.getElementById('table-view')?.classList.remove('hidden');
    document.getElementById('cards-view')?.classList.add('hidden');
});
function rechercherCargaison(cargo, critereRecherche) {
    const resultatFiltre = cargo.filter(cargaison => cargaison.code.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.type.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.libelle.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.pays_depart.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.pays_arrivee.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.date_arrivee.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.date_depart.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.distance.toString().includes(critereRecherche));
    afficherCargaisons(resultatFiltre, currentPage);
}
// Événement d'entrée pour déclencher la recherche
const inputRecherche = document.getElementById("input-recherche");
inputRecherche.addEventListener("input", function () {
    const critereRecherche = inputRecherche.value;
    rechercherCargaison(cargaisons, critereRecherche);
});
function afficherCargaisons111(cargaisons, filtre, page = 1) {
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
        .then(response => response.json())
        .then(data => {
        cargaisons = data;
    });
    let result = cargaisons;
    /* console.log(result); */
    if (filtre) {
        if (filtre.code) {
            result = result.filter(cargaison => cargaison.code.toLowerCase().includes(filtre.code.toLowerCase()));
        }
        if (filtre.libelle) {
            result = result.filter(cargaison => cargaison.libelle.toLowerCase().includes(filtre.libelle.toLowerCase()));
        }
        if (filtre.type) {
            result = result.filter(cargaison => cargaison.type.toLowerCase().includes(filtre.type.toLowerCase()));
        }
        if (filtre.pays_depart) {
            result = result.filter(cargaison => cargaison.pays_depart.toLowerCase().includes(filtre.pays_depart.toLowerCase()));
        }
        if (filtre.pays_arrivee) {
            result = result.filter(cargaison => cargaison.pays_arrivee.toLowerCase().includes(filtre.pays_arrivee.toLowerCase()));
        }
        if (filtre.date_depart) {
            result = result.filter(cargaison => cargaison.date_depart.toLowerCase().includes(filtre.date_depart.toLowerCase()));
        }
        if (filtre.date_arrivee) {
            result = result.filter(cargaison => cargaison.date_arrivee.toLowerCase().includes(filtre.date_arrivee.toLowerCase()));
        }
        if (filtre.etat_avancement) {
            result = result.filter(cargaison => cargaison.etat_avancement.toLowerCase().includes(filtre.etat_avancement.toLowerCase()));
        }
        if (!isNaN(filtre.distance)) {
            result = result.filter(cargaison => cargaison.distance === filtre.distance);
        }
    }
    // Afficher les cargaisons filtrées
    afficherCargaisons(result, page);
}
// Récupérez une référence vers chaque champ de recherche
const searchFields = [
    "search-field-1",
    "search-field-2",
    "search-field-3",
    "search-field-4",
    "search-field-5",
    "search-field-6",
    "search-field-7",
    "search-field-8",
    "search-field-9"
];
// Ajoutez un écouteur d'événements "input" à chaque champ de recherche
searchFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('input', function () {
        // Récupérez les valeurs des champs de recherche
        const code = document.getElementById('search-field-1').value;
        const libelle = document.getElementById('search-field-2').value;
        const type = document.getElementById('search-field-3').value;
        const pays_depart = document.getElementById('search-field-4').value;
        const pays_arrivee = document.getElementById('search-field-5').value;
        const date_depart = document.getElementById('search-field-6').value;
        const date_arrivee = document.getElementById('search-field-7').value;
        const etat_avancement = document.getElementById('search-field-8').value;
        const distance = parseFloat(document.getElementById("search-field-9").value);
        // Créez un objet contenant les critères de filtrage
        const filtre = {
            code,
            libelle,
            type,
            pays_depart,
            pays_arrivee,
            date_depart,
            date_arrivee,
            etat_avancement,
            distance
        };
        // Appelez la fonction afficherCargaisons111 avec les cargaisons et les critères de filtrage
        afficherCargaisons111(cargaisons, filtre);
    });
});
