# Netsuite Script - Currency Rate Update
Netsuite Scheduled Script - Automaticlly update currency exchange rate from API

## Used API
http://api.nbp.pl/

## How to install

1. Preapare "Saved CSV Imports" to corectly mam filds from CSV 
2. Upload CurrencyUpdateCSV.js to SuiteScripts folder
3. Save map as "CUSTIMPORT_rate_csv"
4. Create scripts, type: Scheduled, Script file: CurrencyUpdateCSV.js
5. Deploy Script and set execute schedule
