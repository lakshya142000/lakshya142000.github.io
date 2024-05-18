(function () {
    const mImage = document.getElementById("mImage");
    const mTitle = document.querySelector("#mTitle");
    const mPlot = document.getElementById("mPlot");
    const DName = document.getElementById("DName");
    const mCast = document.getElementById("mCast");
    const mGenre = document.getElementById("mGenre");
    const rating = document.getElementById("rating");

    let movieName =  localStorage.getItem("movieName");
    //console.log(movieName);
    movieAssign(movieName)
    async function movieAssign(search){
        const url = `https://www.omdbapi.com/?t=${search}&type=movie&apikey=d19cd846`;
        try {
        const response = await fetch(url);
        const data = await response.json();

            mImage.src = data.Poster;
            DName.textContent = data.Director;
            rating.textContent = data.imdbRating;
            mTitle.textContent = data.Title;
            mPlot.textContent = data.Plot;
            mCast.textContent = data.Actors
            mGenre.textContent = data.Genre;
        }catch(err) {
            console.log(err);
        }
    }
})();