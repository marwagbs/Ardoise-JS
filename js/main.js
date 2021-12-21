// **********************************************************************************
// ********************************* Code Principal *********************************
// **********************************************************************************

/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 * Le gestionnaire d'évènement est une fonction anonyme que l'on donne directement à jQuery.
 */
 import Program from "./classes/Program.class.js"
document.addEventListener("DOMContentLoaded", function(){
    // Création puis démarrage de l'application.
    const program = new Program();
    program.start();
    
    
});