<p align="center">
<img src=https://izum.si/wp-content/uploads/2020/08/izum_slo.svg width="500px" height="100px" alt="IZUM logo" />
</p>

# Lokator Knjig (translation: "Book locator") :books::mag:

## Description (English)

Lokator Knjig is a project/solution in collaboration with IZUM with which a person can find their desired book more easily in a library. The book is found through its UDC (Universal Decimal Classificator). The user is then presented with a graphic display of the selected library, where the approximate location of the book is highlighted.

## Opis (Slovenščina)

Lokator knjig je projekt/rešitev, s katero lahko oseba v knjižnici lažje najde svojo želeno knjigo. Knjigo najdete s pomočjo njenega UDK (Univerzalna Decimalna Klasifikacija). Uporabniku se nato prikaže grafični prikaz izbrane knjižnice, kjer je označena približna lokacija knjige.

## Website
Our website is available at: [Lokator Knjig](https://lokator-knjig.herokuapp.com/ "Lokator Knjig link")

## Technologies & libraries used

Technologies and libraries that are used in this project: 

- Frontend:
  - ReactJS (v18.1.0)
  - Typescript (v4.6.4)
  - react-three-fiber (v6.0.13)
  - axios (v0.27.2)

- Backend:
  - NodeJS
  - mongoose (v6.3.4)

## Getting started (local installation)
After downloading all the necessary code for the project you will need to install all required packages. To do that just run the next commands in the terminal:

```
cd backend
npm i

cd reactapp
npm i
```

After the installation process is complete you will need two .env files (one for backend and one for frontend).

For your backend you will need a firebase service account and its data, which should be in this format:
```
{
  "type": "service_account",
  "project_id": <project_id>,
  "private_key_id": <private_key_id>,
  "private_key": <private_key>,
  "client_email": <client_email>,
  "client_id": <client_id>,
  "auth_uri": <auth_uri>,
  "token_uri": <token_uri>,
  "auth_provider_x509_cert_url": <auth_provider_url>,
  "client_x509_cert_url": <client_url>
}
```
Your service key will need to include all the values, separated by !

Your backend .env file should be located in the Backend directory and should include:
```
MONGO_URI=mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority
PORT=5000
SERVICE_KEY=service_account!<project_id>!<private_key_id>!<private_key>!<client_email>!<client_id>!<auth_uri>!<token_uri>!<auth_provider_url>!<client_url>
```

Your frontend .env file should be located in the ReactApp directory and should include:
```
REACT_APP_BACKEND_URI=http://localhost:5000/
```

To start the application you should run the backend and frontend, which you can do by running these commands:
```
cd backend
npm start
```
In another terminal:
```
cd reactapp
npm start
```

Your application should now be running and available on this link: http://localhost:3000
