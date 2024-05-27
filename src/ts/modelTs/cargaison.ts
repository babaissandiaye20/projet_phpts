import { produit,produit_alimentaire,produit_chimique, produit_materiel,produit_incassable,produit_fragile} from 'produit.js';


 export  abstract class Cargaison {
    private _distance: number;
    private _frais: number;
    private _pays_depart:string;
    private _pays_arrivee:string;
     private _date_depart:string;
     private _date_arrivee:string;
    private _produits: produit[];

    constructor(distance: number, frais: number,pays_depart:string,pays_arrivee:string,date_depart:string,date_arrivee:string, produits: produit[]) {
        this._distance = distance;
        this._frais = frais;
        this._pays_depart=pays_depart;
        this._pays_arrivee=pays_arrivee;
        this._date_depart=date_depart;
        this._date_arrivee=date_arrivee;
        this._produits = produits;
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
    get  pays_depart():string{
        return this._pays_depart;
    }
    set pays_depart(value:string){
        this._pays_depart=value;
    }
    get  pays_arrivee():string{
        return this._pays_arrivee;
    }
    set pays_arrivee(value:string){
        this._pays_arrivee=value;
    }
    get  date_depart():string{
        return this._date_depart;
    }
    set date_depart(value:string){
        this._date_depart=value;
    }
    get  date_arrivee():string{
        return this._date_arrivee;
    }
    set date_arrivee(value:string){
        this._date_arrivee=value;
    }

    get produits(): produit[] {
        return this._produits;
    }

    set produits(value: produit[]) {
        this._produits = value;
    }

    
    public ajouterProduit(produit: produit): void {
        if (this._produits.length <= 10) {
            
            this._produits.push(produit);
        }else{
            throw console.error ("veuillez mettre une quantité plus petite ");
        }

    
    }

    // Méthodes abstraites
    abstract calculerFrais(produit: produit): number;
    abstract sommetotal(): number;
    abstract nbre_produit(): number;
}
export class CargaisonMaritime extends Cargaison {
    constructor(distance:number,pays_depart:string,pays_arrivee:string,date_depart:string,date_arrivee:string ,produits:produit []) {
        super(distance, 0,pays_depart,pays_arrivee,date_depart,date_arrivee, produits);
    }
    ajouterProduit(produit:produit) {
        super.ajouterProduit(produit);
    }
    calculerFrais(produit:produit) {
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
    constructor(distance:number,pays_depart:string,pays_arrivee:string,date_depart:string,date_arrivee:string ,produits:produit []) {
        super(distance, 0,pays_depart,pays_arrivee,date_depart,date_arrivee, produits);
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
    constructor(distance:number,pays_depart:string,pays_arrivee:string,date_depart:string,date_arrivee:string ,produits:produit []) {
        super(distance, 0,pays_depart,pays_arrivee,date_depart,date_arrivee, produits); 
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