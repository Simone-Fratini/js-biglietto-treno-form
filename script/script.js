"use strict";

const standardPrice = 0.21;
const juniorPrice = 0.21 - (0.21 * 0.20);
const overPrice = 0.21 - (0.21 * 0.40);

const form = document.getElementById("ticket");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("nameSurname").value;
    const date = document.getElementById("date").value;
    const km = document.getElementById("km").value;
    const age = document.getElementById("age").value;

    let {ticketPrice, cabinNumber, cpNumber} = ticketInfo(age, km);
    createHtml(name, date, age, ticketPrice, cabinNumber, cpNumber);
});

form.addEventListener("reset", function (event){
    const oldTicket = document.getElementById("ticket-generated");
    if (oldTicket) {
        oldTicket.remove();
    }
});

function ticketInfo(age, km) {
    let ticketPrice;
    let cabinNumber;
    let cpNumber = "";
    const alphaLetter = "ABOPQRSTUVWXYZ12234567890";

    cabinNumber = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < 4; i++) {
        cpNumber += alphaLetter.charAt(Math.floor(Math.random() * alphaLetter.length));
    }

    if (age === "Adulto") {
        ticketPrice = standardPrice * km;
    } else if (age === "Senior") {
        ticketPrice = overPrice * km;
    } else if (age === "Junior") {
        ticketPrice = juniorPrice * km;
    }

    return {ticketPrice, cabinNumber, cpNumber};

}

function createHtml(name, date, age, ticketPrice, cabinNumber, cpNumber) {

    const oldTicket = document.getElementById("ticket-generated");
    if (oldTicket) {
        oldTicket.remove();
    }

    let htmlContent = `
    <div id="ticket-generated" class="bg-box border rounded-3 container px-5 py-3">
        <div class="text-white d-flex justify-content-between">
            <h2>Dettagli passeggero:</h2>
            <div class="d-flex">
                <h2>Codice PNR:</h2>
                <h2 class="text-center mycl-grey ms-2">${cpNumber}</h2>
            </div>
        </div>
        <div class="table-responsive mt-3">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td class="bg-secondary text-white text-uppercase fw-bold" rowspan="2">
                            <div class="d-flex align-items-center" style="height: 100%;">
                                <div>
                                    Nome Passeggero<br>
                                    <span class="fw-normal">${name}</span>
                                    <div>${date}</div>
                                </div>
                            </div>
                        </td>
                        <th>Offerta</th>
                        <th>Carrozza</th>
                        <th>Codice CP</th>
                        <th>Costo biglietto</th>
                    </tr>
                    <tr>
                        <td>${age}</td>
                        <td>${cabinNumber}</td>
                        <td>${cpNumber}</td>
                        <td>${ticketPrice.toFixed(2)} €</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;

    
    const container = document.body; 

    
    container.insertAdjacentHTML('beforeend', htmlContent);
}
