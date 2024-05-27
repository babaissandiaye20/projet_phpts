export class produit {
    nom;
    poids;
    constructor(nom, poids) {
        this.nom = nom;
        this.poids = poids;
    }
}
export class produit_alimentaire extends produit {
    constructor(nom, poids) {
        super(nom, poids);
    }
}
export class produit_chimique extends produit {
    degre_toxite;
    constructor(nom, poids, degre_toxite) {
        super(nom, poids);
        this.degre_toxite = degre_toxite;
    }
}
export class produit_materiel extends produit {
    constructor(nom, poids) {
        super(nom, poids);
    }
}
export class produit_incassable extends produit_materiel {
    type = "incassable";
    constructor(nom, poids, type = "incassable") {
        super(nom, poids);
        this.type = type;
    }
}
export class produit_fragile extends produit_materiel {
    type = "fragile";
    constructor(nom, poids, type = "fragile") {
        super(nom, poids);
        this.type = type;
    }
}
