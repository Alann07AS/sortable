// This function is called only after the data has been fetched, and parsed.
const loadData = heroes => {
  console.log(heroes)
  var searchbar = document.getElementById("search");
  searchbar.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (searchbar.value.length < 2) {
      var allTable = document.getElementsByClassName("tableRes");
      for (var i = 0; i < allTable.length; i++) {
        allTable[i].remove();
      }
      showHeroes(10, heroes);
      return
    }

    var allTable = document.getElementsByClassName("tableRes");
    for (var i = 0; i < allTable.length; i++) {
      allTable[i].remove();
    }
    var Filteredheroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchbar.value.toLowerCase()));
    //revserse the array
    Filteredheroes = Filteredheroes.reverse();
    showHeroes(10, Filteredheroes);
    /* Filteredheroes.forEach(hero => {
      MakeTable(hero)
    }) */
  });
  showHeroes(10, heroes);
}

// Request the file with fetch, the data will downloaded to your browser cache.
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then((response) => response.json()) // parse the response from JSON
  .then(loadData) // .then will call the `loadData` function with the JSON value.
const showHeroes = (limitNumber, heroes) => {
  var counter = 0;
  heroes.forEach(hero => {
    if (counter < limitNumber) {
      MakeTable(hero)
    } else {
      return
    }
    counter++;
  })
}
const MakeTable = (Hero) => {
  const table = document.createElement('table');
  table.className = "tableRes";
  const tableRow = document.createElement('tr');

  const icontd = document.createElement('td');
  const iconimg = document.createElement('img');
  const name = document.createElement('td');
  const fullName = document.createElement('td');
  const powerstats = document.createElement('td');
  const race = document.createElement('td');
  const gender = document.createElement('td');
  const height = document.createElement('td');
  const weight = document.createElement('td');
  const placeOfBirth = document.createElement('td');
  const alignment = document.createElement('td');

  iconimg.src = Hero.images.xs;
  icontd.appendChild(iconimg);
  name.innerHTML = Hero.name;
  fullName.innerHTML = Hero.biography.fullName;
  //powerstats.innerHTML = (Hero.powerstats);
  for (const [key, value] of Object.entries(Hero.powerstats)) {
    powerstats.innerHTML += `${key}: ${value} `;
  }
  race.innerHTML = Hero.appearance.race
  gender.innerHTML = Hero.appearance.gender
  height.innerHTML = Hero.appearance.height
  weight.innerHTML = Hero.appearance.weight
  placeOfBirth.innerHTML = Hero.biography.placeOfBirth
  alignment.innerHTML = Hero.biography.alignment

  tableRow.appendChild(icontd);
  tableRow.appendChild(name);
  tableRow.appendChild(fullName);
  tableRow.appendChild(powerstats);
  tableRow.appendChild(race)
  tableRow.appendChild(gender)
  tableRow.appendChild(height)
  tableRow.appendChild(weight)
  tableRow.appendChild(placeOfBirth)
  tableRow.appendChild(alignment)

  table.appendChild(tableRow);

  document.body.appendChild(table);


}