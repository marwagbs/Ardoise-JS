// **********************************************************************************
// ********************************* Classe Program *********************************
// **********************************************************************************
import ColorPalette from "./ColorPalette.class.js"
import Pen from "./Pen.class.js"
import Slate from "./Slate.class.js"
class Program {

    constructor() {
        //composition
        
        this.pen = new Pen();
        this.colorPalette = new ColorPalette(this.pen);
        this.canvas = new Slate(this.pen);
    }


    // Gestionnaire d'évènement de clic pour sélectionner une couleur de crayon prédéfinie.
    onClickPenColor(event) {

        // Récupération de la <div> qui a déclenché l'évènement.
        const div = event.currentTarget;

        // Récupération de l'attribut HTML5 data-color.
        const penColor = div.dataset.color; // Avec jQuery cela donnerait $(div).data('color')

        // Modification de la couleur du crayon.
        this.pen.setColor(penColor);
    }

    // Gestionnaire d'évènement de clic pour changer la taille du crayon.
    onClickPenSize(event) {

        // Récupération du <button> qui a déclenché l'évènement.
        const button = event.currentTarget;

        // Récupération de l'attribut HTML5 data-size.
        const penSize = button.dataset.size; // Avec jQuery cela donnerait $(button).data('size')

        // Modification de l'épaisseur du crayon.
        this.pen.setSize(penSize);
    }

    // Gestionnaire d'évènement de changement de la couleur du crayon.
  

    // Méthode appelée au démarrage de l'application.
    start() {
        let clearButton = document.querySelector("#tool-clear-canvas");
        let colorPicker = document.querySelector("#color-palette");
       
        let colorButtons = document.querySelectorAll(".pen-color");
        let sizeButtons = document.querySelectorAll(".pen-size");
        clearButton.addEventListener('click', this.canvas.clear.bind(this.canvas));
     
        for (const color of colorButtons) {
            color.addEventListener("click", this.onClickPenColor.bind(this));
        }

        for (const size of sizeButtons) {
            size.addEventListener("click", this.onClickPenSize.bind(this));
        }

    }
}

export default Program;