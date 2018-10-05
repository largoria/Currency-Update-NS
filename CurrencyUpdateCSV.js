function CurrencyUpdateCSV() {
	//csvLine represents a line of comma separated values of price information

	var mappingFileId = "CUSTIMPORT_rate_csv"; // this references a saved CSV import map with header info below

	// add a header to the import
	var primaryFileAsString = CSVlines();
	//nlapiLogExecution('DEBUG', 'CurrencyUpdateCSV', primaryFileAsString); 

	// create the CSV import job with a description that leverages the date
	var job = nlapiCreateCSVImport();
	job.setMapping(mappingFileId);
	job.setPrimaryFile(primaryFileAsString);
	job.setOption("jobName", "CURRENCY_UPDATE: " + new Date());

	nlapiSubmitCSVImport(job);
	nlapiLogExecution('DEBUG', 'CurrencyUpdateCSV', 'Success!');
}
function getExchange(symbol){
	var URL_API = 'https://api.nbp.pl/api/exchangerates/rates/A/'; //api to provider
	var header={"User-Agent-x": "SuiteScript-Call"};
	var response = nlapiRequestURL(URL_API+symbol, header, "POST");
	response = response.getBody();
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(response,"text/xml");	
	var obj = {
		rate : xmlDoc.getElementsByTagName("Mid")[0].childNodes[0].nodeValue,
		edate : xmlDoc.getElementsByTagName("EffectiveDate")[0].childNodes[0].nodeValue
	}
	
	debug('Exchange: '+symbol+': '+ obj.rate);
 	return obj;
}
function CSVlines(){
	//array with currency symbols to update
	var currency = ['EUR','USD','GBP','AUD'];
	var csv = "Currency,Exchange Rate,Effective Date\n";
	for(i = 0 ; i < currency.length; i++ ){
		var cur = getExchange(currency[i]);
		csv+=currency[i]+","+cur.rate+","+cur.edate+"\n";
	}
	return csv;
}
