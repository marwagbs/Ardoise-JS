// **********************************************************************************
// ********************************* Classe Slate ***********************************
// **********************************************************************************
import {} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

class Slate {

    constructor(pen) {

        this.canvas = document.getElementById('slate');    // Récupération du <canvas>
        this.context = this.canvas.getContext('2d');        // Récupération du contexte du canvas
        this.currentLocation = null;                                // Au début on ne sait pas où se trouve la souris
        this.isDrawing = false;                               // Au début on ne dessine pas
        this.pen = pen;                                 // Stockage de l'objet crayon

        // Installation des gestionnaires d'évènements de l'ardoise.
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        const firebaseConfig = {
            apiKey: "AIzaSyBUfdNNimq2WW9t-5EIVbWVct7_G7-Ylvo",
            authDomain: "firefsd22.firebaseapp.com",
            projectId: "firefsd22",
            storageBucket: "firefsd22.appspot.com",
            messagingSenderId: "84083496752",
            appId: "1:84083496752:web:4ad7eb315de3b965f8daf5",
            databaseURL: "https://firefsd22-default-rtdb.europe-west1.firebasedatabase.app/"
        }
        this.app = firebase.initializeApp(firebaseConfig);

        this.db = firebase.database();
        this.datas = this.db.ref("Coordonnees/");
        this.datas.on("child_added", function (data) {
            const line = data.val();
            console.log(line.Position);
            console.log(line.Position2);
            console.log(line.Color);
            console.log(line.Size);

            //début de dessin
            this.context.beginPath();

            // Dessine un trait entre les précédentes coordonnées de la souris et les nouvelles.
            this.context.moveTo(line.Position.x, line.Position.y);
            this.context.lineTo(line.Position2.x, line.Position2.y);
            this.context.strokeStyle = line.Color;
            this.context.lineWidth = line.Size;
            // Fin du dessin.
            this.context.closePath();

            // Applique les changements dans le canvas.
            this.context.stroke();
             
           
           
}.bind(this));
            this.datas.on("child_removed", function(data) {
                //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.clear();
    }.bind(this));
        
    }

    // Méthode de nettoyage de l'ardoise
    clear() {
       
        // Effacement de tout le contenu de l'ardoise.
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        this.datas.remove();
    }

    // Méthode de récupération des coordonnées X,Y de la souris relative à l'ardoise
    getMouseLocation(event) {

        // Récupération des coordonnées de l'ardoise.
        const rectangle = this.canvas.getBoundingClientRect();

        // Création d'un objet contenant les coordonnées X,Y de la souris relative à l'ardoise.
        const location = {
            x: event.clientX - rectangle.left,
            y: event.clientY - rectangle.top
        };

        return location;
    }

    // Gestionnaire d'évènement d'appui sur un bouton de la souris.
    onMouseDown(event) {
        // On peut dessiner sur l'ardoise.
        this.isDrawing = true;

        // Enregistrement de la position actuelle de la souris.
        this.currentLocation = this.getMouseLocation(event);
    }

    // Gestionnaire d'évènement de sortie de l'ardoise par la souris.
    onMouseLeave() {
        // On ne peut plus dessiner sur l'ardoise.
        this.isDrawing = false;
    }

    // Gestionnaire d'évènement de déplacement de la souris sur l'ardoise.
    onMouseMove(event) {

        // Récupération de la position actuelle de la souris.
        const location = this.getMouseLocation(event);

        // Est-ce qu'on peut dessiner sur l'adoise ?
        if (this.isDrawing == true) {

            // Préparation de l'ardoise à l'exécution d'un dessin.
            this.pen.configure(this.context);


            // Début du dessin.
            this.context.beginPath();

            // Dessine un trait entre les précédentes coordonnées de la souris et les nouvelles.
            this.context.moveTo(this.currentLocation.x, this.currentLocation.y);
            this.context.lineTo(location.x, location.y);

            // Fin du dessin.
            this.context.closePath();

            // Applique les changements dans le canvas.
            this.context.stroke();

            //stocker les données dans la BDD
            const timestamp = Date.now();
            this.db.ref("Coordonnees/" + timestamp).set({
                Position: this.currentLocation,
                Position2:location,
                Color:this.pen.color,
                Size: this.pen.size
            });
            
            // Enregistrement de la nouvelle position de la souris.
            this.currentLocation = location;
        }
    }

    // Gestionnaire d'évènement de relachement d'un bouton de la souris.
    onMouseUp() {
        // On ne peut plus dessiner sur l'ardoise.
        this.isDrawing = false;
    }

}

export default Slate;