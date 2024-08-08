document.addEventListener("DOMContentLoaded", () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const characters = [...data.results];
      const randomCharacters = [];

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCharacters.push(characters.splice(randomIndex, 1)[0]);
      }
      const cards = document.querySelectorAll(".card");

      randomCharacters.forEach((character, index) => {
        let charImage = cards[index].querySelector(".img");
        charImage.src = character.image;

        let charName = cards[index].querySelector(".name");
        charName.textContent = character.name;

        let charStatus = cards[index].querySelector(".status");
        charStatus.textContent = character.status + " - " + character.species;

        charStatus.classList.remove("alive", "dead", "unknown");
        if (character.status === "Alive") {
          charStatus.classList.add("alive");
        } else if (character.status === "Dead") {
          charStatus.classList.add("dead");
        } else {
          charStatus.classList.add("unknown");
        }

        let charLocation = cards[index].querySelector(".loc");
        charLocation.textContent ="Last known location : "+ character.location.name;

        let charEpisode = cards[index].querySelector(".ep");

        fetch(character.episode[0])
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }
            return response.json();
          })
          .then((episodeData) => {
            charEpisode.textContent = "First seen in : " + episodeData.name;
          })
          .catch((error) => {
            console.error("Fetch: ", error);
            charEpisode.textContent = "First seen in: Unknown";
          });
      });
    })
    .catch((error) => {
      console.error("Fetch: ", error);
    });
});