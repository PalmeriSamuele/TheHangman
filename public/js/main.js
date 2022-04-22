var wordBank = ["BONJOUR","SALUT","MAITREYODA","TOILETTE","SAMUELE","CODINGSCHOOL","MOLENGEEK"];
var choosen_word = chooseAWord();
var button_liste = document.getElementById("words_input").children;
var taille_mots = choosen_word.length;
disabledButton(true);
function disabledButton(val) {
    for(let i = 0 ;i <  document.getElementsByClassName("word_item").length;i++) {
        document.getElementsByClassName("word_item")[i].disabled = val;
    }
}

function melangeMots(deck) {
    var i, j, tmp;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = deck[i];
        deck[i] = deck[j];
        deck[j] = tmp;
    }
    return deck;
}

var chance = 0;
var find_words = 0;
function startGame() {
    removeChild();
    document.getElementById("message_box").style.display = "none";
    document.getElementById("start_button").disabled = true;
    disabledButton(false);
    chooseAWord();
    fillRightWords();
    


}

function chooseAWord() {
    melangeMots(wordBank);
    return wordBank[0];
}
function fillRightWords() {

    let right_word;
    for (let i = 0; i < choosen_word.length; i++) {
        right_word = document.createElement("div");
        right_word.classList += "word_item" 
        document.getElementById('words_right').appendChild(right_word);
    }
}

function removeChild() {
    while ( document.getElementById('words_right').firstChild) { 
        document.getElementById('words_right').removeChild( document.getElementById('words_right').firstChild)

    }
}
function pressLetter(word) {
    let match = checkIfMatch(word);
    if (match[0] == true) {
        for (let i = 0; i < match[1].length; i++) {
            document.getElementById('words_right').children[match[1][i]].innerHTML = word;
            document.getElementById('words_right').children[match[1][i]].style.backgroundColor = "green";
            document.getElementById('words_right').children[match[1][i]].style.color = "white";
            find_words++;
            if (find_words == taille_mots) {
                disabledButton();
                document.getElementById("start_button").disabled = false;
                let text = document.createElement("p");
                text.innerHTML = "VOUS AVEZ GAGNE SHEEH";
                text.className = "text_win"
                document.getElementById("message_box").appendChild(text);
                document.getElementById("message_box").style.display = "block";
                setTimeout(function() {
                    location.reload();
                },3000);
                
            }

        }
        button_liste[getButton(word)].style.display = "none";


        
    }   
    else {
        let wrong_word = document.createElement("div");
        wrong_word.classList += "word_item";
        wrong_word.innerHTML = word;
        wrong_word.style.backgroundColor = "red";
        wrong_word.style.color = "white";
        document.getElementById("mots_rates").appendChild(wrong_word);
        chance++;
        button_liste[getButton(word)].style.display = "none";
        if (chance == 1){
            document.getElementById("hangman").children[chance].src = "public/img/tete.png"
        }
        else if (chance == 2){
            document.getElementById("hangman").children[chance].src = "public/img/corps.png"
        }
        else if (chance == 3){
            document.getElementById("hangman").children[chance].src = "public/img/bras_d.png"
        }
        else if (chance == 4){
            document.getElementById("hangman").children[chance].src = "public/img/bras_g.png"
        }
        else if (chance == 5){
            document.getElementById("hangman").children[chance].src = "public/img/jambe_d.png"
        }
        else if (chance == 6){
            document.getElementById("hangman").children[chance].src = "public/img/jambe_g.png"
        }
        else if (chance == 7){
            document.getElementById("hangman").children[chance].src = "public/img/dead.png"
        }
    }
    if (chance == 8 ) {
        
        disabledButton();
        document.getElementById("start_button").disabled = false;
        let text = document.createElement("p");
        text.innerHTML = "VOUS AVEZ PERDU BOOH";
        text.className = "text_win"
        document.getElementById("message_box").appendChild(text);
        document.getElementById("message_box").style.display = "block";

        setTimeout(function() {
            location.reload();
        },3000);
    
    }
}



function checkIfMatch(word) {
    let rep = [];
    for (let i = 0; i < choosen_word.length; i++) {
       if (choosen_word[i]==word) {
           rep.push(i);
       }
        
    }
    if (rep.length != 0 ) {
        return [true,rep];
    }
    else {
        return [false];
    }
}

function getButton(word){
    
    for(let i =0; i < button_liste.length;i++ ) {
        if (button_liste[i].innerHTML == word) {
            return i;
        }
    }
}