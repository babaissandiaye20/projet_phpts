 abstract class client { 
     private _nom: string;
   private  _prenom: string;
    private _numéro:number;

constructor(nom:string,prenom:string,numéro:number){
    this._nom=nom;
    this._prenom=prenom;
    this._numéro=numéro;
}
get nom():string{
    return this._nom;
}
set nom(value:string){
    this._nom=value;
}
get prenom():string{
    return this._prenom;
}
set prenom(value:string){
    this._prenom=value;
}
get numéro():number{
    return this._numéro;
}
set numéro(value:number){
    this._numéro=value;
}


}
export abstract class produit {
    
    nom: string;
    poids: number;
    _client:client

    constructor(nom: string, poids: number,client:client) {
        this.nom = nom;
        this.poids = poids;
        this._client=client;
    }
}

export class produit_alimentaire extends produit {
    constructor(nom: string, poids: number,client:client) {
        super(nom, poids,client);
    }
}

export class produit_chimique extends produit {
    degre_toxite: number;
    constructor(nom: string, poids: number, degre_toxite: number,client:client) {
        super(nom, poids,client);
        this.degre_toxite = degre_toxite;
    }
}

export abstract class produit_materiel extends produit {
    constructor(nom: string, poids: number,client:client) {
        super(nom, poids,client);
    }
}

export class produit_incassable extends produit_materiel {
    type: string = "incassable";
    constructor(nom: string, poids: number, type: string = "incassable", client:client) {
        super(nom, poids,client);
        this.type = type;
    }
}

export class produit_fragile extends produit_materiel {
    type: string = "fragile";
    constructor(nom: string, poids: number, type: string = "fragile",client:client) {
        super(nom, poids,client);
        this.type = type;
    }
}
function generateUniqueCode(): string {
    return 'CARGO-' + Math.floor(Math.random()*300);
}

export abstract class Cargaison {
    private _code:string;
    private _libelle: string;
    private _type: string;
    private _distance: number;
    private _frais: number;
    private _pays_depart: string;
    private _pays_arrivee: string;
    private _date_depart: string;
    private _date_arrivee: string;
    private _produits: produit[];
    private _etat_avancement:string;

    constructor(code:string,libelle: string, type: string, distance: number, frais: number, pays_depart: string, pays_arrivee: string, date_depart: string, date_arrivee: string, produits: produit[],etat_avancement:string) {
        this._code=  code ||generateUniqueCode();
        this._libelle = libelle;
        this._type = type;
        this._distance = distance;
        this._frais = frais;
        this._pays_depart = pays_depart;
        this._pays_arrivee = pays_arrivee;
        this._date_depart = date_depart;
        this._date_arrivee = date_arrivee;
        this._produits = produits;
        this._etat_avancement=etat_avancement;
    }
get code():string{
    return this._code;
}
set code(value:string){
     this._code=value
}
    get libelle(): string {
        return this._libelle;
    }
    set libelle(value: string) {
        this._libelle = value;
    }

    get type(): string {
        return this._type;
    }
    set type(value: string) {
        this._type = value;
    }

    get distance(): number {
        return this._distance;
    }
    set distance(value: number) {
        this._distance = value;
    }

    get frais(): number {
        return this._frais;
    }
    set frais(value: number) {
        this._frais = value;
    }

    get pays_depart(): string {
        return this._pays_depart;
    }
    set pays_depart(value: string) {
        this._pays_depart = value;
    }

    get pays_arrivee(): string {
        return this._pays_arrivee;
    }
    set pays_arrivee(value: string) {
        this._pays_arrivee = value;
    }

    get date_depart(): string {
        return this._date_depart;
    }
    set date_depart(value: string) {
        this._date_depart = value;
    }

    get date_arrivee(): string {
        return this._date_arrivee;
    }
    set date_arrivee(value: string) {
        this._date_arrivee = value;
    }

    get produits(): produit[] {
        return this._produits;
    }
    set produits(value: produit[]) {
        this._produits = value;
    }
    get etat_avancement():string{
        return this._etat_avancement;
    }
    set etat_avancement(value:string){
        this._etat_avancement=value;
    }
    public ajouterProduit(produit: produit): void {
        if (this._produits.length <= 10) {
            this._produits.push(produit);
        } else {
            throw console.error("veuillez mettre une quantité plus petite ");
        }
    }

    // Méthodes abstraites
    abstract calculerFrais(produit: produit): number;
    abstract sommetotal(): number;
    abstract nbre_produit(): number;
}

export class CargaisonMaritime extends Cargaison {
    constructor(code:string,libelle: string, type: string, distance: number, pays_depart: string, pays_arrivee: string, date_depart: string, date_arrivee: string, produits: produit[],etat_avancementt:string) {
        super(code,libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits,etat_avancementt);
    }

    ajouterProduit(produit: produit) {
        super.ajouterProduit(produit);
    }

    calculerFrais(produit: produit) {
        let tarif;
        if (produit instanceof produit_incassable) {
            tarif = 400;
        } else if (produit instanceof produit_alimentaire) {
            tarif = 90;
        } else if (produit instanceof produit_chimique) {
            tarif = 500;
        } else {
            throw new Error('Type de produit inconnu');
        }
        if (produit instanceof produit_chimique) {
            return this.distance * produit.degre_toxite * tarif;
        } else {
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
    constructor(code:string,libelle: string, type: string, distance: number, pays_depart: string, pays_arrivee: string, date_depart: string, date_arrivee: string, produits: produit[],etat_avancement:string) {
        super(code,libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits,etat_avancement)
    }

    public ajouterProduit(produit: produit): void {
        super.ajouterProduit(produit);
    }

    calculerFrais(produit: produit): number {
        let tarif: number;

        if (produit instanceof produit_incassable || produit instanceof produit_fragile) {
            tarif = 200;
        } else if (produit instanceof produit_alimentaire) {
            tarif = 100;
        } else {
            throw new Error('Type de produit inconnu');
        }

        return this.distance * produit.poids * tarif;
    }

    sommetotal(): number {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }

    nbre_produit(): number {
        return this.produits.length;
    }
}

export class Cargaisonaerin extends Cargaison {
    constructor(code:string,libelle: string, type: string, distance: number, pays_depart: string, pays_arrivee: string, date_depart: string, date_arrivee: string, produits: produit[],etat_avancement:string) {
        super(code,libelle, type, distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits,etat_avancement);
    }

    public ajouterProduit(produit: produit): void {
        super.ajouterProduit(produit);
    }

    calculerFrais(produit: produit): number {
        let tarif: number;

        if (produit instanceof produit_incassable || produit instanceof produit_fragile) {
            tarif = 1000;
        } else if (produit instanceof produit_alimentaire) {
            tarif = 300;
        } else {
            throw new Error('Type de produit inconnu');
        }

        return this.distance * produit.poids * tarif;
    }

    sommetotal(): number {
        return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
    }

    nbre_produit(): number {
        return this.produits.length;
    }
}

let cargaisons: Cargaison[] = [];
let currentPage = 1;
const itemsPerPage = 2;

// Function to save data
const save = (data: any) => {
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
            loadData();  // Reload data to update the display
        } else {
            alert("Erreur lors de l'enregistrement des données : " + data.message);
        }
    })
    .catch(error => console.error("Erreur lors de la requête de sauvegarde:", error));
}
// Function to load data
function loadData() {
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
        .then(response => response.json())
        .then(data => {
            cargaisons = data.map((c:any) => {
                if (c._type === "Cargaison Maritime") {
                    return new CargaisonMaritime(c._code,c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits,c._etat_avancement);
                } else if (c._type === "Cargaison Aerienne") {
                    return new Cargaisonaerin(c._code,c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits,c._etat_avancement);
                } else {
                    return new CargaisonRoutiere(c._code,c._libelle, c._type, c._distance, c._pays_depart, c._pays_arrivee, c._date_depart, c._date_arrivee, c._produits,c._etat_avancement);
                }
            });
            afficherCargaisons(cargaisons,currentPage);
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error.message));
}
        


// Function to add a new cargaison
function ajouterCargaison(cargaison: Cargaison) {
    cargaisons.unshift(cargaison);
    afficherCargaisons(cargaisons,currentPage);
    save(cargaisons);
}

// Function to display cargaisons with pagination
function afficherCargaisons(cargo: Cargaison[],page:number=1): void {
    const tableBody = document.getElementById('table-body') as HTMLTableSectionElement;
    const cardsView = document.getElementById('cards-view') as HTMLDivElement;
    tableBody.innerHTML = '';
    cardsView.innerHTML = '';
//pagination

fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
.then(response => response.json())
.then(data => {
    let  cargo = data;
   
})
 let carga=cargo
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
        } else if (selectCargo === "Cargaisonaerin") {
            lete.src = "src/php/public/image/aviongp.jpeg";
        } else {
            lete.src = "src/php/public/image/camiongp.jpeg";
        }

        card.appendChild(lete);
        cardsView.appendChild(card);
    }); 

    updatePaginationControls( cargo);
}

// Function to update pagination controls
function updatePaginationControls(cargo:Cargaison[]) {
    fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
.then(response => response.json())
.then(data => {
     cargo = data;
    
})
let d:Cargaison[]=cargo;

    const paginationControls = document.getElementById('pagination-controls') as HTMLDivElement;
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
            afficherCargaisons(d,currentPage);
        });
        paginationControls.appendChild(pageButton);
    }
}
function validateLibelle(libelle: string): boolean {
    return libelle.trim().length > 0;
}

function validateDistance(distance: number): boolean {
    return !isNaN(distance) && distance > 0;
}

function validatePays(pays: string): boolean {
    return pays.trim().length > 0;
}

function validateDate(date: string): boolean {
    return !isNaN(Date.parse(date));
}

function clearFormFields() {
    ((document.getElementById("lib_cargo") as HTMLInputElement).value = '');
    (document.getElementById("select-cargo") as HTMLSelectElement).value = '';
    (document.getElementById("start-location") as HTMLInputElement).value = '';
    (document.getElementById("end-location") as HTMLInputElement).value = '';
    (document.getElementById("datefirtst") as HTMLInputElement).value = '';
    (document.getElementById("dateend") as HTMLInputElement).value = '';
    (document.getElementById("distance") as HTMLInputElement).value = '';
}

// Event listener for adding a new cargaison

const btn = document.getElementById("btn") as HTMLButtonElement;
btn.addEventListener("click", function (event) {
    event.preventDefault();
    
    const selectCargo: string = (document.getElementById("select-cargo") as HTMLSelectElement).value;
    const lib: string = (document.getElementById("lib_cargo") as HTMLInputElement).value;

    const selectCountry1: string = (document.getElementById("start-location") as HTMLInputElement).value;
    const selectCountry2: string = (document.getElementById("end-location") as HTMLInputElement).value;
    const heureDepart: string = (document.getElementById("datefirtst") as HTMLInputElement).value;
    const heureArrivee: string = (document.getElementById("dateend") as HTMLInputElement).value;
    const distance: number = parseFloat((document.getElementById("distance") as HTMLInputElement).value);

    let span_errorlib = document.getElementById("error_lib") as HTMLSpanElement;
    let span_errorlselectcargo = document.getElementById("error_selectcargo") as HTMLSpanElement;
    let span_errorldatefirst = document.getElementById("error_datefirst") as HTMLSpanElement;
    let span_error_dateend = document.getElementById("error_dateend") as HTMLSpanElement;
    let span_error_towndep = document.getElementById("error_towndep") as HTMLSpanElement;
    let span_error_townar = document.getElementById("error_townar") as HTMLSpanElement;
    let span_error_distance = document.getElementById("error_distance") as HTMLSpanElement;
    let span_error_date_comparison = document.getElementById("error_date_comparison") as HTMLSpanElement;
    let code:string=generateUniqueCode();
    let etat_avancement="Ouvert"

    let isValid = true;

    // Validation
    if (lib === "") {
        span_errorlib.classList.remove("hidden");
        isValid = false;
    } else {
        span_errorlib.classList.add("hidden");
    }

    if (selectCargo === "choice"|| selectCargo === "")  {
        span_errorlselectcargo.classList.remove("hidden");
        isValid = false;
    } else {
        span_errorlselectcargo.classList.add("hidden");
    }

     if (selectCountry1 === "") {
        span_error_towndep.classList.remove("hidden");
        isValid = false;
    } else {
         span_error_towndep.classList.add("hidden");
    }

     if (selectCountry2 === "") {
        span_error_townar.classList.remove("hidden");
        isValid = false;
    } else {
        span_error_townar.classList.add("hidden");
    }
 
    if (heureDepart === "") {
        span_errorldatefirst.classList.remove("hidden");
        isValid = false;
    } else {
        span_errorldatefirst.classList.add("hidden");
    }

    if (heureArrivee === "") {
        span_error_dateend.classList.remove("hidden");
        isValid = false;
    } else {
        span_error_dateend.classList.add("hidden");
    }

    if (isNaN(distance)) {
        span_error_distance.classList.remove("hidden");
        isValid = false;
    } else {
        span_error_distance.classList.add("hidden");
    }

    const currentDate = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD
    if (heureDepart < currentDate) {
        span_error_date_comparison.textContent = "La date de départ doit être égale ou supérieure à la date du jour.";
        span_error_date_comparison.classList.remove("hidden");
        isValid = false;
    } else if (heureDepart >= heureArrivee) {
        span_error_date_comparison.textContent = "La date de départ doit être inférieure à la date d'arrivée.";
        span_error_date_comparison.classList.remove("hidden");
        isValid = false;
    } else {
        span_error_date_comparison.classList.add("hidden");
    }

    if (!isValid) {
        return;
    }

    // Création de la nouvelle cargaison
    let nouvelleCargaison;
    let produit: produit[] = [];

    if (selectCargo === "Cargaison Maritime") {
        nouvelleCargaison = new CargaisonMaritime(code,lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit,etat_avancement);
    } else if (selectCargo === "Cargaison Aerien") {
        nouvelleCargaison = new Cargaisonaerin(code,lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit,etat_avancement);
    } else {
        nouvelleCargaison = new CargaisonRoutiere(code,lib, selectCargo, distance, selectCountry1, selectCountry2, heureDepart, heureArrivee, produit,etat_avancement);
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

function rechercherCargaison(cargo: Cargaison[], critereRecherche: string) {
    const resultatFiltre = cargo.filter(cargaison =>
        cargaison.code.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.type.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.libelle.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.pays_depart.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.pays_arrivee.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.date_arrivee.toLowerCase().includes(critereRecherche.toLowerCase()) ||
        cargaison.date_depart.toLowerCase().includes(critereRecherche.toLowerCase()) ||  
        cargaison.distance.toString().includes(critereRecherche)
    );
    afficherCargaisons(resultatFiltre,currentPage);
}


// Événement d'entrée pour déclencher la recherche
const inputRecherche = document.getElementById("input-recherche") as HTMLInputElement;
inputRecherche.addEventListener("input", function () {
    const critereRecherche = inputRecherche.value;
    rechercherCargaison(cargaisons, critereRecherche);
});


function afficherCargaisons111(cargaisons: Cargaison[], filtre: { [key: string]: string | number },page=1) {
fetch('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/templates/load_data.php')
.then(response => response.json())
.then(data => {
    cargaisons = data;
   
})
    let result = cargaisons;
/* console.log(result); */
    if (filtre) {
        if (filtre.code) {
            result = result.filter(cargaison => cargaison.code.toLowerCase().includes((filtre.code as string).toLowerCase()));
        }
        if (filtre.libelle) {
            result = result.filter(cargaison => cargaison.libelle.toLowerCase().includes((filtre.libelle as string).toLowerCase()));
        }
        if (filtre.type) {
            result = result.filter(cargaison => cargaison.type.toLowerCase().includes((filtre.type as string).toLowerCase()));
        }
        if (filtre.pays_depart) {
            result = result.filter(cargaison => cargaison.pays_depart.toLowerCase().includes((filtre.pays_depart as string).toLowerCase()));
        }
        if (filtre.pays_arrivee) {
            result = result.filter(cargaison => cargaison.pays_arrivee.toLowerCase().includes((filtre.pays_arrivee as string).toLowerCase()));
        }
        if (filtre.date_depart) {
            result = result.filter(cargaison => cargaison.date_depart.toLowerCase().includes((filtre.date_depart as string).toLowerCase()));
        }
        if (filtre.date_arrivee) {
            result = result.filter(cargaison => cargaison.date_arrivee.toLowerCase().includes((filtre.date_arrivee as string).toLowerCase()));
        }
        if (filtre.etat_avancement) {
            result = result.filter(cargaison => cargaison.etat_avancement.toLowerCase().includes((filtre.etat_avancement as string).toLowerCase()));
        }
        if (!isNaN(filtre.distance as number)) {
            result = result.filter(cargaison => cargaison.distance === (filtre.distance as number));
        }
    }

    // Afficher les cargaisons filtrées
    afficherCargaisons(result,page);
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
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.addEventListener('input', function() {
        // Récupérez les valeurs des champs de recherche
        const code: string = (document.getElementById('search-field-1') as HTMLInputElement).value;
        const libelle: string = (document.getElementById('search-field-2') as HTMLInputElement).value;
        const type: string = (document.getElementById('search-field-3') as HTMLInputElement).value;
        const pays_depart: string = (document.getElementById('search-field-4') as HTMLInputElement).value;
        const pays_arrivee: string = (document.getElementById('search-field-5') as HTMLInputElement).value;
        const date_depart: string = (document.getElementById('search-field-6') as HTMLInputElement).value;
        const date_arrivee: string = (document.getElementById('search-field-7') as HTMLInputElement).value;
        const etat_avancement: string = (document.getElementById('search-field-8') as HTMLInputElement).value;
        const distance: number = parseFloat((document.getElementById("search-field-9") as HTMLInputElement).value);

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
