// fonction pour recupérer le texte de la partie  memoire
function getMemoire(){
    return document.getElementById("memoire-valeur").innerText;

}
//fonction pour affecter un texte à la partie memoire
function printMemoire(num){
    document.getElementById("memoire-valeur").innerText=num;

}
//fonction pour affecter un texte à la partie entree
function printEntree(num){
    if(num==""){
        document.getElementById("entree-valeur").innerText=num;
    }
    else{
          document.getElementById("entree-valeur").innerText=getNombreFormat(num);
    }
  
}
//fonction pour recuperer le texte de la partie entree
function getEntree(){
    return document.getElementById("entree-valeur").innerText;
}

//fonction pour formater le texte avec une ecriture avec vergule de separtion de milliers
function getNombreFormat(num){
   //le if au cas ou on a un chiffre negatif et on clique sur le boutton retour ça va supprimer le chiffre et le - du signe 
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var valeure = n.toLocaleString("en");
    return valeure; 
}
//fonction inverse de la fonction de formatage
function reverseNombreFormat(num){
    return Number(num.replace(/,/g,''));
}
// un tableau des element operateurs
var operateur= document.getElementsByClassName("operateur");
for (var i=0; i<operateur.length; i++){
    // ajouter un addeventlistner à chaque operateur qui au cas du click excute la fonction
    operateur[i].addEventListener('click', function()
    {
        // on traite les deux operateur supprimer et retour
        if(this.id=="clear")
        {
            printMemoire("");
            printEntree("");
            
        }
        else if (this.id=="retour") 
        {
            var entree= reverseNombreFormat(getEntree()).toString();//on recupere entree on enleve le formatage puis on transforme en string
            if(entree) // si entree n'est pas vide
            {
                entree= entree.substr(0, entree.length-1); //enlever le dernier caractere d'entree
                printEntree(entree);
            }

        }
        
        else // le cas des autres operateurs
        {
            var entree =getEntree();
            var memoire = getMemoire();
            // dans le cas ou le dernier click etait sur un autre operateur cad entree est vide mais memoire ne l'est pas on doit changer le dernier operateur par ce nouveau 
            if(entree=="" && memoire!=""){
                if(isNaN(memoire[memoire.length-1])){
                   memoire= memoire.substr(0,memoire.length-1);
                   
                }
            }
            if(entree!="" || memoire!=""){
                // variable= condition ? si true: si false
                entree= entree==""? 
                entree:reverseNombreFormat(entree);
                memoire=memoire +entree;
                if (this.id=="="){
                    var resultat= eval (memoire);
                    printEntree(resultat);
                    printMemoire("");
                }
                else{
                    memoire= memoire + this.id;
                    printMemoire(memoire);
                    printEntree("");
                }

            }

        }
    })
}
// le cas de click sur les nombres 
var nombre= document.getElementsByClassName("nombre");
for (var i=0; i<nombre.length; i++){
    nombre[i].addEventListener('click', function(){
        var entree= reverseNombreFormat(getEntree());
        if(entree!=NaN ){
            entree=entree + this.id;
            printEntree(entree);
        }
    })
}


