export abstract class produit{
    nom:string;
    poids:number;
    constructor(nom:string,poids:number){
        this.nom=nom;
      this.poids=poids;

    }
}
export class produit_alimentaire extends produit{
    constructor(nom:string,poids:number){
        super(nom,poids);
    }
}


 export class produit_chimique extends produit{
  degre_toxite:number;
  constructor(nom:string,poids:number,degre_toxite:number){
      super(nom,poids);
 this.degre_toxite=degre_toxite;
} 
}


   export abstract class produit_materiel extends produit{
     constructor(nom:string,poids:number){
         super(nom,poids);
     }
 }
export class produit_incassable extends produit_materiel{
    type:string="incassable";
        constructor(nom:string,poids:number,type:string="incassable"){
            super(nom,poids);
            this.type=type;
    }
}

export class produit_fragile extends produit_materiel{
 type:string="fragile";
     constructor(nom:string,poids:number,type:string="fragile"){
         super(nom,poids);
         this.type=type;
 }
}