//* Declaring variables
/* #region//*  Variables */
const countryLenght = document.querySelector("#country-lenght");
const searchCriteria = document.querySelector("#search-criteria");
const searchField = document.querySelector("#search-field");
const btnName = document.querySelector("#btn-Name");
const btnCapital = document.querySelector("#btn-Capital");
const btnPopulation = document.querySelector("#btn-Population");
const btnPopulationChart = document.querySelector("#btnPopulationChart");
const btnLanguagesChart = document.querySelector("#btnLanguagesChart");
const ArrowImg = document.createElement("img");
const countryChart = document.querySelector("#country-chart");
const countryContainer = document.querySelector("#countries-container");
let allSearchResults = [];
/* #endregion */
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
// Populations Chart Event
btnPopulationChart.addEventListener("click", (e) => {
  return setTimeout(() => {
    createChart(search());
  }, 700);
});
// Languages Chart Event
btnLanguagesChart.addEventListener("click", (e) => {
  return setTimeout(() => {
    createLangChart();
  }, 700);
});

//** Fuctions */
// Create country elements
const createCountries = (arr) => {
  if (arr.length == 0) arr = country_data;
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
    if (location == btnName) {
      sortName("ascending");
    }
    if (location == btnCapital) {
      sortCapital("ascending");
    }
    if (location == btnPopulation) {
      sortPopulation("ascending");
    }
    return location.classList.add("down");
  }

  ArrowImg.src = "assets/arrow-up.svg";
  location.classList.add("up");
  location.classList.remove("down");
  if (location == btnName) {
    sortName("descending");
  }
  if (location == btnCapital) {
    sortCapital("descending");
  }
  if (location == btnPopulation) {
    sortPopulation("descending");
  }
  return location.appendChild(ArrowImg);
};
// sort countries
const sortName = (order) => {
  if (order == "ascending") {
    return createCountries(
      search().sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
    );
  } else {
    return createCountries(
      search().reverse((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
    );
  }
};

const sortCapital = (order) => {
  const countriArray = search().filter((a) => a.capital != undefined);
  if (order == "ascending") {
    return createCountries(
      countriArray.sort((a, b) => {
        const capitalA = a.capital.toLocaleLowerCase();
        const capitalB = b.capital.toLocaleLowerCase();
        if (capitalA < capitalB) return -1;
        if (capitalA > capitalB) return 1;
        return 0;
      })
    );
  } else {
    return createCountries(
      countriArray.sort((a, b) => {
        const capitalA = a.capital.toLocaleLowerCase();
        const capitalB = b.capital.toLocaleLowerCase();
        if (capitalA < capitalB) return 1;
        if (capitalA > capitalB) return -1;
        return 0;
      })
    );
  }
};

const sortPopulation = (order) => {
  const countryArray = search().filter((a) => a.population != undefined);
  if (order == "ascending") {
    return createCountries(
      countryArray.sort((a, b) => {
        if (a.population < b.population) return -1;
        if (a.population > b.population) return 1;
        return 0;
      })
    );
  } else {
    return createCountries(
      countryArray.sort((a, b) => {
        if (a.population < b.population) return 1;
        if (a.population > b.population) return -1;
        return 0;
      })
    );
  }
};
//search for countries
const search = () => {
  const word = searchField.value.toLocaleLowerCase().trim();
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
  //Adding & Filtering the array
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
  createChart(allSearchResults);
  return allSearchResults;
};

// Create chart
const createChart = (arr) => {
  countryChart.innerHTML = ``;
  const data = [...arr]
    .sort((a, b) => {
      if (a.population > b.population) return -1;
      if (a.population < b.population) return 1;
      return 0;
    })
    .splice(0, arr.length > 9 ? 9 : arr.length);
  // total population
  const totalPopulation = country_data.reduce((a, b) => {
    return a + b.population;
  }, 0);
  // elements
  const world = document.createElement("p");
  const Worldwidth = document.createElement("div");
  const popu = document.createElement("p");
  world.textContent = "World";
  Worldwidth.classList.add("w-full", "bg-yellow-300", "hidden", "md:grid");
  popu.textContent = totalPopulation;
  countryChart.appendChild(world);
  countryChart.appendChild(Worldwidth);
  countryChart.appendChild(popu);
  for (const con of data) {
    const conName = document.createElement("p");
    const conWidth = document.createElement("div");
    const conPopulation = document.createElement("p");
    conName.textContent = con.name;
    const width = con.population;
    const widthPercentage = `${((width / totalPopulation) * 100 + 20).toFixed(
      2
    )}%`;
    conWidth.classList.add("bg-yellow-300", "hidden", "md:grid");
    conWidth.style.width = widthPercentage;
    conPopulation.textContent = con.population;
    countryChart.appendChild(conName);
    countryChart.appendChild(conWidth);
    countryChart.appendChild(conPopulation);
  }
  return;
};

const createLangChart = () => {
  const langChart = search().reduce((ret, itm) => {
    itm = itm.languages;
    for (const item of itm) {
      ret[item] = (ret[item] || 0) + 1;
    }
    return ret;
  }, {});
  let Tenlangs = Object.keys(langChart)
    .map((a) => {
      return { Language: a, Count: langChart[a] };
    })
    .sort((a, b) => {
      if (a.Count < b.Count) return 1;
      if (a.Count > b.Count) return -1;
      return 0;
    });
  const TotalLanguages = Tenlangs.reduce((ind, itm) => {
    return ind + itm.Count;
  }, 0);
  Tenlangs = Tenlangs.splice(0, 9);
  countryChart.innerHTML = ``;
  const worldLang = document.createElement("p");
  const WorldLangWidth = document.createElement("div");
  const lang = document.createElement("p");
  worldLang.textContent = "World";
  WorldLangWidth.classList.add("w-full", "bg-yellow-300", "hidden", "md:grid");
  lang.textContent = TotalLanguages;
  countryChart.appendChild(worldLang);
  countryChart.appendChild(WorldLangWidth);
  countryChart.appendChild(lang);
  for (const lang of Tenlangs) {
    const conName = document.createElement("p");
    const conWidth = document.createElement("div");
    const LangCount = document.createElement("p");
    conName.textContent = lang.Language;
    const width = lang.Count;
    const widthPercentage = `${((width / TotalLanguages) * 100 + 20).toFixed(
      2
    )}%`;
    conWidth.classList.add("bg-yellow-300", "hidden", "md:grid");
    conWidth.style.width = widthPercentage;
    LangCount.textContent = lang.Count;
    countryChart.appendChild(conName);
    countryChart.appendChild(conWidth);
    countryChart.appendChild(LangCount);
  }
};
// Search- key up event
searchField.addEventListener("keyup", (e) => {
  createCountries(search());
});

//Window -load event
window.addEventListener("load", (e) => {
  createCountries(country_data);
  searchCriteria.innerHTML = ``;
  createChart(country_data);
});
