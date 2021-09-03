// Fetch r alternative version (Async await)

const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    // load data 
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url);

    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
    }

    catch (error) {
        console.log(error);
    }

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySearchResult(data.meals));
}

const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = ''; // for clear previous data
    searchResult.textContent = ''; // (OR we use) For clear previous data
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}

const loadMealDetail = async mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    // mealDetails.innerHTML = ''; // for clear previous data
    mealDetails.textContent = ''; // (OR we use) For clear previous data
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                <a href="${meal.strYoutube}" class="btn btn-secondary">Go somewhere</a>
            </div>
    `;
    mealDetails.appendChild(div);
}