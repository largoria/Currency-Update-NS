# Netsuite Script - Currency Rate Update
Netsuite Scheduled Script - Automaticlly update currency exchange rate from API

## Used API
http://api.nbp.pl/

## How to install

1. Preapare "Saved CSV Imports" to corectly map fields from CSV 
2. Save map as "CUSTIMPORT_rate_csv"
3. Upload CurrencyUpdateCSV.js to SuiteScripts folder
4. Create new scheduled script
5. Set script file: CurrencyUpdateCSV.js
6. Deploy Script and set execute schedule
