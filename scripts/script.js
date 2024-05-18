const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");

let searchList = [];
var movieNameofMoviecard ={
    movieName: 'hi'
 };

// fetch api
async function fetchData(search) {
    const url = `https://www.omdbapi.com/?t=${search}&apikey=492f61b3`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data)
      return data;
    } catch (err) {
      console.log(err);
    }
}
// function for displaying result

function createMovie(data){
    const movieCard = document.createElement("div");
    let isPresent = false;

    // to check if the movie is already present in the suggestionList array
    searchList.forEach((movie) => {
      if (movie.Title == data.Title) {
        isPresent = true;
      }
    });

    if (!isPresent && data.Title != undefined) {
        searchList.push(data);
        //console.log(data)
        movieCard.innerHTML = `
        <div class="card" data-id = " ${data.Title} ">
            
            <img
                src="${data.Poster} "
                class="card-img-top"
                alt="No Actual Picture Available"
                data-id = "${data.Title} " />
                <div class="card-body text-start">
                    <h5 class="cardTitle" >
                    <a  data-id = "${data.Title} "> ${data.Title}  </a>
                    </h5>

                    <p class="card-text">
                    <i class="fa-solid fa-star">
                        <span id="rating">&nbsp;${data.imdbRating}</span>
                    </i>

                    <button class="fav-btn">
                        <i id="heart" class="fa-solid fa-heart add-fav" data-id="${data.Title}"></i>
                    </button>
                    </p>
                </div>
            
        </div>
        `;
        movieCard.addEventListener('click',(event)=>{
            
            //console.log(event.target.id);
            //movieAssign(event);
            if(event.target.id != "heart"){
                localStorage.setItem("movieName", event.target.dataset.id);
                location.replace("/movie.html")
            }
            
        });
        movieContainer.prepend(movieCard);
    
    }
}
if(searchBtn){
    searchBtn.addEventListener('click',()=>{
        if(search.value === ""){
            alert("Please Enter Movie title.")
        }else{
            afterClick();
            
        }
    });
}

if(search){
    search.addEventListener('keyup',()=>{
        if(search.value == ""){
            movieContainer.innerHTML="";
            
        }else{
            afterClick();
            
        }
    });
}

// function
async function afterClick(){    
    let data = await fetchData(search.value) 
    createMovie(data);    
}

// Favourite button event

function favHandle(e){
    if(e.target.id =="heart"){
        let arrString = localStorage.getItem("favArray");
        
        if(arrString){
            let arr = Array.from(JSON.parse(arrString));
            if(arr.includes(e.target.dataset.id)){
                alert("Already Present Please choose another");
            }else{
                arr.push(e.target.dataset.id);
                //console.log(arr);
                favString = JSON.stringify(arr);
                //console.log(arr);
                localStorage.setItem("favArray",favString);
                console.log(localStorage.getItem("favArray"));
            }
        }else{
            let arr =[e.target.dataset.id];
            localStorage.setItem("favArray",JSON.stringify(arr));
            console.log(localStorage.getItem("favArray"));
        }

    }
}
document.addEventListener('click',favHandle);
