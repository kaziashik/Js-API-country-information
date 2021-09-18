const searchInput = document.getElementById("searchInput");
const searchbtn = document.getElementById("searchBtn")
const countryContainer = document.getElementById("country-container")
const error = document.getElementById('error')
const spinner = document.getElementById('spinner')
const counntrydetails = document.getElementById("counntry-details")

searchbtn.addEventListener('click', function () {
    const serchbtnValu = searchInput.value;
    if (serchbtnValu === '') {
        error.innerText = ' Search field connot be empty'
        return;
    }


    //clear
    countryContainer.innerHTML = "";
    error.innerText = "";
    searchInput.value = ''
    counntrydetails.innerHTML = ''

    const url = `https://restcountries.eu/rest/v2/name/${serchbtnValu}`
    spinner.classList.remove('d-none')

    fetch(url)
        .then((res) => res.json())
        .then((data) => showData(data))
        .finally(() => searchInput.value == "");
});


function showData(countryArray) {
    //Error Handing
    if (countryArray.status == 404) {
        error.innerText = "No Result Found";
    }
    else {
        error.innerText = "";
    }


    countryArray.forEach((item) => {

        //will repate until elemen number because of for loop
        // console.log(item.name)
        const div = document.createElement('div')
        div.classList.add('col-md-3')

        div.innerHTML = `<div class="rounded overflow-hidden border p-2">
                <img src="${item.flag}" class="w-100" alt="" />
            </div>
            
            <div class="
            py-2
            d-flex
            justify-content-between
            align-items-center
            d-md-block
            text-md-center
            ">
                <h1>${item.name}</h1>
                
                <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
            </div>`


        countryContainer.appendChild(div)



    });

};

function showDetails(qlphq3Code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${qlphq3Code}`)
        .then(res => res.json())
        .then(data => {

            //data->OBJECT
            //data.currencies->array
            //data.currencies[0]->array
            //data.currencies[0].name

            counntrydetails.innerHTML = `  <div class="col-md-12">
            <h1>Country name:${data.name}</h1>
            <p>Country population:${data.population}</p>
            <p>country area:${data.area}</p>
            <p> currencies symbol:${data.currencies[0].symbol}</p>

        </div>`
        })
}





