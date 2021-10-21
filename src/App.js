import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App= () => {

  const APP_ID= "e32a6226";
  const APP_KEY= "ed62830c07824493cb342b48b43f9c54";
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('Sample');


  useEffect(() => {
    getRecipes();
    //console.log("Effect has been run");
  },[query]);
const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  //console.log(data.hits);
  setRecipes(data.hits);

}
const updateSearch = e => {
  setSearch(e.target.value);
  //console.log(search);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch("");
}
  return(
    <div className="App">
      <h1 align="center">Here is Your Recipe Kit!</h1>
      <h2 align="center">Search Some Food to get the recipe</h2>
      <form onSubmit={getSearch} className="search-form">
        <input 
          className ="search-bar" placeholder="Search what your going to make..."
          type="text" 
          value={search}
          onChange={updateSearch}/>
          <button className="search-button" type="submit">Search</button>
        </form>
          <div className="recipes">
            {recipes.map(recipe=>(
              <Recipe 
              key={recipe.recipe.label}
              Name={recipe.recipe.label} 
              Calories={recipe.recipe.calories.toFixed(0)} 
              image={recipe.recipe.image}
              ingredients = {recipe.recipe.ingredients}     
              />
        ))}
          </div>
    </div>
  );  
}

export default App;