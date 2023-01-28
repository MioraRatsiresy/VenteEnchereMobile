export default class MesEncheres {
    idEnchere: number;
    libelle: string;
    categorie: string;
    dateHeure: string;
    dateFin: string;
    produitEnchere: string;
    constructor() {
        this.idEnchere = 0;
        this.libelle='';
        this.categorie='';
        this.dateHeure='';
        this.dateFin='';
        this.produitEnchere='';
    }
}