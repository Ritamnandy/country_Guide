const userinput = document.querySelector("#input");
const search = document.querySelector("#enter");
const details = document.querySelector(".details");

search.addEventListener('click',() =>{
    const name = userinput.value.trim();
    if(name=='')
    {
       alert("Please Enter Country name.");
      return;
    }
    countrydetails(name);
    userinput.value = '';   
});

userinput.addEventListener('keydown',(e) =>{
    if(e.key === "Enter")
    {
      const name = userinput.value.trim();
      if(userinput.value.trim() == ''){
          alert("Please Enter Country name.");
           return;
      }
    countrydetails(name);
    userinput.value = '';   
    }
});


function countrydetails(name){
    const API_URL = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    fetch(API_URL)
    .then(response => response.json())
    .then( (data) =>{
        console.log(data);
         if(data.status==404)
        {
             alert(`Country name not found`);
             return;
        }
        document.querySelector(".country").style.display = "block";
        details.querySelector('#copital').innerHTML = `${data[0].capital[0]}`;
        document.querySelector('.country-name').innerHTML = `${data[0].name.common}`;
        details.querySelector('#Continent').innerHTML =`${data[0].continents[0]}`;
        details.querySelector('#Population').innerHTML= `${data[0].population}`;
        let currenciesname = data[0].currencies[Object.keys(data[0].currencies)[0]].name;
        details.querySelector('#Currency').innerHTML= `${currenciesname}`;
        let symbol =  data[0].currencies[Object.keys(data[0].currencies)[0]].symbol ;
        document.getElementById('symbol').innerHTML = `" ${symbol} "`;
        let lan = Object.values(data[0].languages).toString().split(",").join(","); 
        details.querySelector('#Common-languages').innerHTML = `${lan}`;
        document.getElementById("flag").src= `${data[0].flags.svg}`;
         console.log(data[0].flags.svg);
        





    })
    .catch((error) => {
    console.error('Error:', error);
  });
}