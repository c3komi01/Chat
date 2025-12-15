# Firebase Chat Application (React Native + Expo)

## Yleiskuvaus

Tämä projekti on React Native ‑pohjainen mobiilisovellus, joka käyttää **Firebasea** reaaliaikaiseen viestintään. Sovellus on rakennettu **Expo**‑ympäristössä ja se muistuttaa yksinkertaistettua WhatsApp‑tyyppistä chat‑sovellusta opetuskäyttöön.

Sovelluksen päätavoitteena on demonstroida Firebase‑toiminnallisuuksia käytännössä:

* käyttäjien tunnistautuminen
* tietojen lisääminen, hakeminen ja poistaminen
* reaaliaikainen synkronointi useiden käyttäjien välillä

Projekti on toteutettu Oulu University of Applied Sciences (OAMK) React Native ‑kurssin harjoitustyönä.

---

## Käytetyt teknologiat

* React Native
* Expo
* Firebase Firestore (reaaliaikainen tietokanta)
* Firebase Authentication (Email/Password)
* Expo Router
* TypeScript

---

## Sovelluksen ominaisuudet

### 1. Käyttäjän tunnistautuminen

* Kirjautuminen Firebase Authenticationin avulla (Email/Password)
* Käyttäjän sessio säilyy sovelluksen uudelleenkäynnistyksen jälkeen (AsyncStorage)
* Logout‑toiminto

### 2. Chat‑huoneet (Rooms)

Sovellus tukee useita chat‑huoneita:

* General
* Family
* Friends

Jokaisella huoneella on oma viestikokoelmansa Firestoressa.

Firestore‑rakenne:

```
rooms
 └── roomId
      └── messages
           └── messageId
```

### 3. Viestien lähettäminen (Adding data)

* Käyttäjät voivat lähettää viestejä valittuun huoneeseen
* Jokainen viesti sisältää:

  * tekstin
  * lähettäjän sähköpostin
  * palvelimen aikaleiman (serverTimestamp)

### 4. Viestien hakeminen (Retrieving data)

* Viestit haetaan reaaliaikaisesti Firestoresta
* onSnapshot‑kuuntelija päivittää käyttöliittymän automaattisesti
* Viestit järjestetään lähetysajan mukaan

### 5. Viestien poistaminen (Deleting data)

* Käyttäjä voi poistaa viestejä
* deleteDoc‑toiminto poistaa viestin Firestoresta
* UI päivittyy automaattisesti reaaliaikaisen kuuntelun ansiosta

### 6. WhatsApp‑tyylinen käyttöliittymä

* Omat viestit näkyvät oikealla
* Muiden käyttäjien viestit näkyvät vasemmalla
* Viestien yhteydessä näytetään:

  * käyttäjän sähköposti
  * lähetysaika

---

## Monen käyttäjän tuki

Sovellus tukee useita käyttäjiä samanaikaisesti:

* Useat käyttäjät voivat kirjautua eri laitteilla
* Kun käyttäjät ovat samassa chat‑huoneessa, viestit synkronoituvat reaaliajassa
* Testaus on tehty useilla laitteilla Expo Go ‑sovelluksen avulla

---

## Firestore‑turvasäännöt (kehitysvaihe)

Kehitystä ja testausta varten käytettiin yksinkertaistettuja sääntöjä:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId}/messages/{messageId} {
      allow read, write: if true;
    }
  }
}






## Sovelluksen käynnistäminen

1. Asenna riippuvuudet:

```bash
npm install
```

2. Käynnistä projekti:

```bash
npx expo start
```

3. Avaa sovellus:

* Expo Go (Android / iOS)
* Web‑selain (kehitystarkoituksiin)

---

## Projektin tarkoitus

Tämän projektin tarkoituksena on:

* oppia Firebase Firestore‑tietokannan käyttöä
* ymmärtää reaaliaikaisten sovellusten toimintaperiaatteet
* harjoitella React Native ‑kehitystä käytännön esimerkin kautta

Projekti toimii hyvänä pohjana laajemmille mobiilisovelluksille, kuten yksityisille chateille, käyttäjälistoille ja paremmalle tietoturvalle.

---


