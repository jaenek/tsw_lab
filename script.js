// Zadanie 1
let el = document.getElementsByClassName("header")[0].children[0].children[1]
el.style.fill = "#d42123d"
el.style.fontWeight = "bold"

// Zadanie 2
class SalonSamochodowy {
    constructor(name, city, street, streetNr, postalCode, NIP, phoneNumber) {
        this.name = name || '--'
        this.city = city || '--'
        this.street = street || '--'
        this.streetNr = streetNr || '--'
        this.postalCode = postalCode || '--'
        this.NIP = NIP || '--'
        this.phoneNumber = phoneNumber || '--'
    }

    getName() {
        return `Nazwa: ${this.name}`
    }

    getAddress() {
        return `Adres: ${this.city}, ${this.street} ${this.streetNr} ${this.postalCode}`
    }

    getNIP() {
        return `NIP: ${this.NIP}`
    }

    getPhoneNumber() {
        return `Numer kontaktowy: ${this.phoneNumber}`
    }

    printContactInfo() {
        document.getElementById("contact-info").innerHTML = `
            ${this.getName()}<br>
            ${this.getPhoneNumber()}<br>
            ${this.getAddress()}<br>
            ${this.getNIP()}<br><br
        `
    }
}

let salon = new SalonSamochodowy("Salon Polskiego Fiata sp. z o.o.", "Rzeszów", "Żwirki Wigury", 69, "35-103", "813-13-87-742", "+48 170 323 981")
salon.printContactInfo()

// Zadanie 3
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let visits = getCookie("visits");
    if (visits != "") {
        visits++;
        setCookie("visits", visits, 30)
    } else {
        setCookie("visits", 1, 30);
    }
    document.getElementById("visit-counter").innerHTML = visits;
}

checkCookie()