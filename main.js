let allPrayers = document.querySelectorAll("span");
let selectInput = document.querySelector("select");
let cities = ["Cairo", "Alexandria", "Aswan", "Beheira", "Beni Suef", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr el-Sheikh", "Luxor", "Matrouh", "Minya", "Monufia", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sohag", "South Sinai", "Suez"]
cities.forEach(city => {
    selectInput.innerHTML += `<option>${city}</option>`
});

selectInput.addEventListener("change", () => {
    document.querySelector(".city").innerHTML = selectInput.value
    getTime(`${selectInput.value}`)
})

function getTime(cityVal) {
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
            params: {
                country: "EG",
                city: `${cityVal}`
            }
        })
        .then(function(response) {
            // timing
            let timings = response.data.data.timings
            allPrayers[0].innerHTML = timings.Fajr
            allPrayers[1].innerHTML = timings.Sunrise
            allPrayers[2].innerHTML = timings.Dhuhr
            allPrayers[3].innerHTML = timings.Asr
            allPrayers[4].innerHTML = timings.Maghrib
            allPrayers[5].innerHTML = timings.Isha
                // date and day
            document.querySelector(".date").innerHTML = ` ${response.data.data.date.gregorian.weekday.en} <br>${response.data.data.date.readable} / ${response.data.data.date.hijri.date}`
        })
}
getTime("cairo")