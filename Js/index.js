//* Declaring variables
const countryLenght = document.querySelector("#country-lenght");
const searchCriteria = document.querySelector("#search-criteria");
const searchField = document.querySelector("#search-field");
const btnName = document.querySelector("#btn-Name");
const btnCapital = document.querySelector("#btn-Capital");
const btnPopulation = document.querySelector("#btn-Population");
const ArrowImg = document.createElement("img");
const countryContainer = document.querySelector("#countries-container");
let allSearchResults = [];
//* Assigning varibales
countryLenght.textContent = country_data.length;
//* Event Listeners
// Name event
btnName.addEventListener("click", (e) => {
  // call arrow event
  Arrow(btnName, btnCapital, btnPopulation);
});
// Capital event
btnCapital.addEventListener("click", (e) => {
  Arrow(btnCapital, btnName, btnPopulation);
});
//Population event
btnPopulation.addEventListener("click", (e) => {
  Arrow(btnPopulation, btnName, btnCapital);
});
//** Fuctions */
// Create country elements
const createCountries = (arr) => {
  countryContainer.innerHTML = "";
  for (const country of arr) {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add(
      "flex",
      "flex-col",
      "justify-start",
      "bg-slate-100",
      "break-words",
      "w-32",
      "m-auto",
      "h-full",
      "pt-2",
      "text-xs",
      "px-1"
    );
    const countryFlag = document.createElement("img");
    countryFlag.classList.add(
      "h-16",
      "w-18",
      "md:h-18",
      "md:w-20",
      "self-center"
    );
    countryFlag.src = country.flag;
    const countryName = document.createElement("h1");
    countryName.classList.add(
      "text-center",
      "text-sm",
      "text-yellow-600",
      "uppercase"
    );
    countryName.textContent = country.name;
    const countryCapital = document.createElement("p");
    const countryLanguages = document.createElement("p");
    const countryPopulation = document.createElement("p");
    countryDiv.appendChild(countryFlag);
    countryDiv.appendChild(countryName);
    if (country.capital) {
      countryCapital.textContent = `Capital: ${country.capital}`;
      countryDiv.appendChild(countryCapital);
    }
    if (country.languages) {
      countryLanguages.textContent = `Languages: ${country.languages.join(
        ", "
      )}`;
      countryDiv.appendChild(countryLanguages);
    }
    countryPopulation.textContent = `Population: ${country.population}`;
    countryDiv.appendChild(countryPopulation);
    countryContainer.appendChild(countryDiv);
  }
};
// return Arrow
const Arrow = (location, ...others) => {
  for (const elem of others) {
    if (elem.contains(ArrowImg)) elem.removeChild(ArrowImg);
  }
  if (location.classList.contains("up")) {
    ArrowImg.src = "assets/arrow-down.svg";
    location.appendChild(ArrowImg);
    location.classList.remove("up");
    return location.classList.add("down");
  }
  ArrowImg.src = "assets/arrow-up.svg";
  location.classList.add("up");
  location.classList.remove("down");
  return location.appendChild(ArrowImg);
};
//search for countries
const search = () => {
  const word = searchField.value.toLocaleLowerCase();
  const wordLenght = word.length;
  // Name
  const sortCountriesByName = country_data.filter((con) => {
    let ConName = con.name.toLocaleLowerCase();
    ConName = ConName.split("");
    let searchWord = ``;
    for (let i = 0; i < wordLenght; i++) {
      searchWord += ConName[i];
    }
    return searchWord == word;
  });
  // Capital
  const sortCountriesByCapital = country_data.filter((con) => {
    if (con.capital) {
      let conCap = con.capital.toLocaleLowerCase();
      conCap = conCap.split("");
      let searchWord = ``;
      for (let i = 0; i < wordLenght; i++) {
        searchWord += conCap[i];
      }
      return searchWord == word;
    }
  });
  // Languages

  const getLanguages = () => {
    let arr = [];
    let searchWord;
    for (let a = 0; a < country_data.length; a++) {
      for (const lan of country_data[a].languages) {
        let lang = lan.toLocaleLowerCase();
        lang = lang.split("");
        searchWord = ``;
        for (let i = 0; i < wordLenght; i++) {
          searchWord += lang[i];
        }
        if (searchWord == word) {
          arr.push(lan);
        }
      }
    }
    return arr;
  };

  const lang = () => {
    let arr = [];
    getLanguages().forEach((element) => {
      const sortCountriesByLanguages = country_data.filter((con) => {
        return con.languages.includes(element);
      });
      for (const a of sortCountriesByLanguages) {
        arr.push(a);
      }
    });
    return arr;
  };
  //Adding the array
  allSearchResults = sortCountriesByName.concat(sortCountriesByCapital, lang());
  const filterResults = new Set(allSearchResults);
  searchCriteria.textContent = `${
    filterResults.size > 0 ? filterResults.size : ""
  } ${
    filterResults.size > 1
      ? `Countries`
      : filterResults.size == 0
      ? `No country`
      : `Country`
  } satisfied the search criteria `;
  allSearchResults = [...filterResults];
  return createCountries(filterResults);
};

// Search- key up event
searchField.addEventListener("keyup", (e) => {
  search();
});
//Window -load event
window.addEventListener("load", (e) => {
  createCountries(country_data);
  searchCriteria.innerHTML = ``;
});
