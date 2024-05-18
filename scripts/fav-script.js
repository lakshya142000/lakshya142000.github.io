(function () {

const favContainer = document.querySelector('#favContainer');
let favData = localStorage.getItem("favArray");
let favArr = JSON.parse(favData); 

listHandle(favArr);
function listHandle(arr){
    favArr.forEach(movieName => {
        favTab(movieName)
    });

}

async function favTab(search){
    const favCard = document.createElement("div");
    const url = `https://www.omdbapi.com/?t=${search}&type=movie&apikey=d19cd846`;
    try {
    const response = await fetch(url);
    const data = await response.json();
    favCard.innerHTML = `
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

                    <div class="delete-btn my-4">
                        <i id="del" class="fa-solid fa-trash-can" data-id="${data.Title}"></i>
                    </div>
                    </p>
                </div>
            
        </div>
        `;
        favContainer.append(favCard);
    }catch (err){
        console.log(err);
    }
}
// Delete functionality
function delHandle(e){
    if(e.target.id == 'del'){
        console.log("Delete");
        // let nameList = localStorage.getItem("favArray");
        // let Arr = JSON.parse(nameList);
        let target = e.target;
        let ind = favArr.indexOf(target.dataset.id);
        console.log(ind);
        favArr.splice(ind, 1);

        localStorage.setItem("favArray",JSON.stringify(favArr));
    
        favContainer.innerHTML ='';
        listHandle(favArr);
        alert("Successfully Deleted");
    }
} 
document.addEventListener('click',delHandle);

})();