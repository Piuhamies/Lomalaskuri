# [Lomalaskuri](https://lomalaskuri.tk/)


Lomalaskuri on jokaisen espoolaisen koululaisen paras kaveri. Se kertoo milloin on seuraava loma, mitä on kouluruokana ja paljon muuta.

Tämä projekti on tehty [create-react-app](https://create-react-app.dev/) JavaScript -"framewörkillä"

## Kehittäminen

### Aloittaminen
Kehittääksesi Lomalaskuria, sinun tulee asentaa riippuvuudet(dependency:t). Tähän suosittelemme käyttämään [NPM](https://www.npmjs.com/):ää.

Asentaaksesi riippuvuudet aja seuraavat komennot "lomalaskuri" -kansiossa ("src" -kansion siältävä kansio)
`npm install`

Kehitysympäristön käynistämiseksi aja komento `netlify dev`

### Tiedostorakenne
Jokaista uutta sivua varten tehdään oma kansio kansioon `src`. Kansioon lisätään vähintään kaksi tiedostoa.
`Quick...js` tiedosto on etusivulle tulevaa sivun sisällön tiivistelmää varten.
`...Page.js` tiedosto on erillistä sivua varten.
Lisäksi tähän erityisesti tähän sivuun liittyvät muut tiedostot lisätään samaan kansioon.

Yleispätevät tiedostot lisätään kansioon `src/Components`.

## Lomalaskurin asetukset

### Koulujen tiedot
Lomalaskuri on suunniteltu tukemaan suurta määrää kouluja, joiden sivut sisältävät paljon samankaltaista sisältöä.
Siksi koulujen tiedot tallennetaan kaikki yhteen suureen listaan tiedostossa `src/SchoolData.js`.
Listan avulla voidaan valita esim:
* Mistä ruokalistat haetaan
* Mitä loma-aikoja koulu käyttää(katso loma-aikojen asettaminen alta)
* Mitä ominaisuuksia koulun sivulla on näkyvillä
### Loma-ajat
Loma-ajat tallennetaan tiedostoon `src/holidays.json`.
Alkion juuriobketiin tallennetut objektit ovat eri mahdollisia loma-aikoja.

### Teemat
Teemoja koskevat asetukset ovat tiedostossa `src/themes.json`.
Tiedoston juuriobjektilla on aina kaksi juuri-alkiota:
`Default` ja `ThemeOverrides`. Default sisältää kaikki teemat. Teeman väriarvot lisätään listassa oleviin objekteihin.
`ThemeOverrides` listaan lisätään eri css-muuttujiin tehtäviä sivukohtaisia muutoksia. 
Uusi teema luodaan lisäämällä arvot kaikkiin properties listan objekteihin uusi alkio, jonka avaimena on teeman nimi ja arvona teeman määrittämä väriarvo.

