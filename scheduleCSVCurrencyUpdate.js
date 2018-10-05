function scheduleCSVCurrencyUpdate() {
	//csvLine represents a line of comma separated values of price information

	var mappingFileId = "CUSTIMPORT_rate_trx_csv"; // this references a saved CSV import map with header info below

	// add a header to the import
	var primaryFileAsString =  CSVlines();
	//var rate = getExchange('EUR');
	nlapiLogExecution('DEBUG', 'scheduleCSVCurrencyUpdate', primaryFileAsString); 

	// create the CSV import job with a description that leverages the date
	var job = nlapiCreateCSVImport();
	job.setMapping(mappingFileId);
	job.setPrimaryFile(primaryFileAsString);
	job.setOption("jobName", "MY_CURRENCY_UPDATE: " + new Date());

	nlapiSubmitCSVImport(job);
	nlapiLogExecution('DEBUG', 'scheduleCSVCurrencyUpdate', 'Job submited!');
}
function getExchange(cur){
  var header={"User-Agent-x": "SuiteScript-Call"};
  var response = nlapiRequestURL('https://oztilia.uk/getExchange.php', {currency:cur} , header, "POST");
  response = response.getBody();
  if(cur!='DATE')
  	var exchange = parseFloat(response);
  else
    var exchange = response;
  debug('Exchange: '+cur+': '+ exchange);
  return exchange;
}
function CSVlines(){
  var eDate = getExchange('DATE');
  var csv = "Currency,Exchange Rate,Effective Date\n";
  var ceur = getExchange('EUR')
  if(ceur) csv+="EUR,"+ceur+","+eDate+"\n";
  var cusd = getExchange('USD')
  if(cusd) csv+="USD,"+cusd+","+eDate+"\n";
  var cgbp = getExchange('GBP')
  if(cgbp) csv+="GBP,"+cgbp+","+eDate+"\n";
  var caud = getExchange('AUD')
  if(caud) csv+="AUD,"+caud+","+eDate+"\n";
  
  return csv;
}