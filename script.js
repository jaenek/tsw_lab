// Lab 1 - Zadanie 1
let el = document.getElementsByClassName("header")[0].children[0].children[1]
el.style.fill = "#d42123d"
el.style.fontWeight = "bold"

// Lab 2 - Zadanie 2
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

// Lab 3 - Zadanie 3
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    let name = cname + "="
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function checkCookie() {
    let visits = getCookie("visits")
    if (visits != "") {
        visits++
        setCookie("visits", visits, 30)
    } else {
        setCookie("visits", 1, 30)
    }
    document.getElementById("visit-counter").innerHTML = visits
}

checkCookie()

// Lab 4 - Zadanie 1
function showModels(models) {
  const table = document.querySelector('.models')
  table.innerHTML += `
    <thead>
      <th>Producent</th>
      <th>Model</th>
      <th>Rok Produkcji</th>
      <th>Przebieg</th>
      <th>Pozostałe parametry</th>
    </thead>
  `

  rows = ''
  for (model of models) {
    let parameters = ''
    model.parameters.forEach((parameter, i) => {
      parameters += (i != 0 ? ', ' : '') + parameter
    })

    rows += `
      <tr>
        <td>${model.maker}</td>
        <td>${model.model}</td>
        <td>${model.production_year}</td>
        <td>${model.mileage}km</td>
        <td>${parameters}</td>
    `
    rows += '</tr>'
  }
  table.innerHTML += `<tbody>${rows}</tbody>`
}

fetch('models.json')
  .then((res) => res.json())
  .then((models) => showModels(models))
  .catch((err) => console.log(err))

// Lab 4 - Zadanie 2
// $(document).ready(() => {
//   $('#facebook').click(() => {
//     $('#facebook-visited').show()
//   })
//   $('#instagram').click(() => {
//     $('#facebook-visited').show()
//   })
//   $('.socials').css('color', 'blue')
// })

// XML utilities
function fetchXML(url, callback) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this)
    }
  }
  xhttp.open('GET', url, true)
  xhttp.send()
}

function transformXMLDoc(xml, xsl) {
  var xsltProcessor, parser, resultDocument
  try {
    //For IE
    if(window.ActiveXObject || "ActiveXObject" in window || xml.responseType == "msxml-document") {
      resultDocument = new ActiveXObject("MSXML2.DOMDocument")
      resultDocument = xml.transformNode(xsl)
      //resultDocument = xml.transformToDocument(xsl)
      //xml.transformNodeToObject(xsl, resultDocument)
      parser = new DOMParser()
      resultDocument = parser.parseFromString(resultDocument, "text/xml")
    }
    //For Chrome, Firefox, Opera, etc.
    else if(document.implementation && document.implementation.createDocument) {
      xsltProcessor = new XSLTProcessor()
      xsltProcessor.importStylesheet(xsl)
      resultDocument = xsltProcessor.transformToDocument(xml, document)
      //resultDocument = xsltProcessor.transformToFragment(xml, document)
    }
  }
  catch (err) {
    if(typeof(err) == "object") {
      if(err.message) {
        alert(err.message)
      }
    }
    else {
      alert(err)
    }
  }

  return resultDocument
}

// Lab 5
function displayMenu(xml) {
  console.log(xml)
  let x = xml.responseXML
  let nav = '<ul>'
  for (item of Array.from(x.getElementsByTagName('item'))) {
    let title = item.getElementsByTagName('title')[0]
    let link =  item.getElementsByTagName('link')[0]

    nav += `
      <a href="${link.textContent}">
        <li>${title.textContent}</li>
      </a>
    `
  }
  nav += '</ul>'
  document.getElementsByTagName('nav')[0].innerHTML += nav
}

function changeLanguage(language) {
  window.localStorage.setItem('language', language)
  window.reload()
}

fetchXML(`menu-${window.localStorage.getItem('language') ?? 'pl'}.xml`, displayMenu)

// Lab 6
function displayMap(xmlDoc) {
  const dealerships = Array.from(xmlDoc.getElementsByTagName("salon"))
  console.log(dealerships)

  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.02838799374642, lng: 22.011409756579955 },
    zoom: 8,
  })

  dealerships.forEach((el) => {
    console.log(el)
    const name = el.getElementsByTagName('nazwa')[0].textContent
    const location = el.getElementsByTagName('lokacja')[0].textContent.split(', ')
    const position = { lat: parseFloat(location[0]), lng: parseFloat(location[1]) }
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${name}`,
      optimized: false,
    })

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close()
      infoWindow.setContent(marker.getTitle())
      infoWindow.open(marker.getMap(), marker)
    })
  })
}

function initMap() {
  let xmlDoc
  fetchXML('salony-xform.xsl', (xsl) => {
    fetchXML('salony.xml', (xml) => {
      xmlDoc = transformXMLDoc(xml.responseXML, xsl.responseXML)
      displayMap(xmlDoc)
    })
  })
}

// Lab 9
$(document).ready(function() {
  let i = 0;
  let images = [
    ['img/fiat_125p.jpg', 'Fiat 125p z silnkiem 1300 OHV'],
    ['img/fiat_126p.jpg', 'Fiat 126p 1974r.'],
    ['img/fiat_126p_cabrio.jpg', 'Fiat 126p w wersji cabrio']
  ];
  let timer = setInterval(next, 5000);

  function prev() {
    i--;
    if (i == -1) i = images.length - 1;
    changeImage(500);
  }

  function next() {
    i++;
    if (i == images.length) i = 0;
    changeImage(500);
  }

  $('#control-prev').click(() => {
    clearInterval(timer);
    timer = setInterval(next, 5000);
    prev();
  });

  $('#control-next').click(() => {
    clearInterval(timer);
    timer = setInterval(next, 5000);
    next();
  });

  function changeImage(delay) {
    $('#current-img').fadeOut(delay, () => {
      $('#current-img').attr('src',images[i][0]).attr('alt', images[i][1]);
      $('#current-img').fadeIn(delay);
    });
  }
  changeImage(1);
});
