import { produit_alimentaire, produit_chimique, produit_incassable, produit_fragile } from 'produit.js';
export class Cargaison {
    _distance;
    _frais;
    _pays_depart;
    _pays_arrivee;
    _date_depart;
    _date_arrivee;
    _produits;
    constructor(distance, frais, pays_depart, pays_arrivee, date_depart, date_arrivee, produits) {
        this._distance = distance;
        this._frais = frais;
        this._pays_depart = pays_depart;
        this._pays_arrivee = pays_arrivee;
        this._date_depart = date_depart;
        this._date_arrivee = date_arrivee;
        this._produits = produits;
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
    constructor(distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits) {
        super(distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits);
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
    constructor(distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits) {
        super(distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits);
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
    constructor(distance, pays_depart, pays_arrivee, date_depart, date_arrivee, produits) {
        super(distance, 0, pays_depart, pays_arrivee, date_depart, date_arrivee, produits);
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
