/*function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => {
            console.error("Veri çekme hatası:", error);
        });
        
}*/

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Veri çekme hatası:", error);
    }
}
async function getEpisodeData(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Veri çekme hatası:", error);
    }
}

function cardArray(randomCharacters, datas) {
    for (var i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * datas.length);
        if(randomCharacters.includes(datas[randomIndex])){
            i--;
            console.log("AYNI VERİ",datas[randomIndex]);
            
        }
        else{
            randomCharacters.push(datas[randomIndex]);
            console.log("FARKLI VERİ",datas[randomIndex]);
        }
        
    }
    return randomCharacters;
    
}

function putIntoCards(randomCharacters){
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        let character = randomCharacters[index];

        let charImage = card.querySelector(".img");
        charImage.src = character.image;

        let charName = card.querySelector(".name");
        charName.textContent = character.name;

        let charStatus = card.querySelector(".status");
        charStatus.textContent = character.status + " - " + character.species;
        
        charStatus.classList.remove("alive", "dead", "unknown");
        if (character.status === "Alive") {
            charStatus.classList.add("alive");
        } else if (character.status === "Dead") {
            charStatus.classList.add("dead");
        } else {
            charStatus.classList.add("unknown");
        }

        let charLocation = card.querySelector(".loc");
        charLocation.textContent = "Last known location : " + character.location.name;

        let charEpisode = card.querySelector(".ep");

        getEpisodeData(character.episode[0])
            .then((episodeData) => {
                charEpisode.textContent = "First seen in : " + episodeData.name;
            })
            .catch((error) => {
                console.error("Fetch: ", error);
                charEpisode.textContent = "First seen in: Unknown";
            });
     
    });
}

async function main() {
    const url = "https://rickandmortyapi.com/api/character";
    const randomCharacters = [];
    const datas = await getData(url);
    cardArray(randomCharacters, datas);
    putIntoCards(randomCharacters);
}

main();