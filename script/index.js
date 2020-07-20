/*
	Control view
*/

var menu = new MainMenu();

/*
 
*/
let correctTable = function()
{
	let columActions;
	let actions;
	let expectedResults;
	let executionStepType;
	let stepCounter;

	stepCounter = document.querySelectorAll('td[name=actions]');

	menu.stepClear();

	for(i=0; i<stepCounter.length; i++)
	{
		actions = $('td[name=actions]').eq(i).html();
		expectedResults = $('td[name=expectedResults]').eq(i).html();
		executionStepType = $('td[name=executionStepType]').eq(i).html();

		console.log(actions)

		menu.addStepItem(actions, expectedResults, executionStepType);
		menu.stepBuild();
	}
	showSteps();
//	console.log(menu.steps);
}

let showSteps = function()
{
	let table;
	let step;
	
	step = '<table border="2" border-style="solid" contentEditable="true" name="tableSteps"><thead><th>STEP NUMBER</th><th>ACTIONS</th><th>EXPECTED RESULTS</th><th>EXECUTION STEP TYPE</th></thead><tbody>' +
	menu.steps.replace(/step/g, "tr").replace(/tr_number/g, "td name=\"stepnumber\" ").replace(/actions/g, "td name=\"actions\" ").replace(/expectedresults/g, "td name=\"expectedResults\"").replace(/execution_type/g, "td name=\"executionStepType\" ").replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "") +
	'</tbody></table>'
	table = $("div[name=preView]")[0];
	//console.log(menu.steps);

	table.innerHTML = step;
}
 
let insertStep = function()
{
	correctTable();
	//
	//Get rendering elements
	let actions = $("div[name=actions]").html();
	let expectedResults = $("div[name=expectedResults]").html();
	let executionStepType = $("select[name=executionStepType]")[0].value;

	menu.addStepItem(actions, expectedResults, executionStepType);
	menu.stepBuild();

	$("div[name=actions]").html("");
	$("div[name=expectedResults]").html("");

	showSteps();
}

let downloadTest = function()
{
	let testName;
	let order;
	let externalId;
	let fullExternalId;
	let version;
	let summary;
	let preConditions;
	let isOpen;
	let active;
	let estimatedDuration;
	let executionType;
	let importance;
	let status;
	let nameFile; //Storage the name file

	testName = $("input[name=testName]")[0].value;
	order = $("input[name=order]")[0].value;
	externalId = $("input[name=externalId]")[0].value;
	fullExternalId = $("input[name=fullExternalId]")[0].value;
	version = $("input[name=version]")[0].value;
	summary = $("input[name=summary]")[0].value;
	preConditions = $("input[name=preConditions]")[0].value;
	isOpen = $("input[name=isOpen]")[0].value;
	active = $("input[name=active]")[0].value;
	estimatedDuration = $("input[name=estimatedDuration]")[0].value;
	executionType = $("select[name=executionType]")[0].selectedIndex;
	importance = $("select[name=importance]")[0].selectedIndex;
	status = $("select[name=status]")[0].selectedIndex;
	testName==""?testName="test":testName=testName;
	nameFile = testName + ".xml";


	correctTable();
	menu.addHeaderItem(order, externalId, fullExternalId, version, summary, preConditions, isOpen, active, estimatedDuration, executionType, importance, status);
	menu.headerBuild();
	menu.addTestParameter(testName);
	menu.testBuild();

	var blob = new Blob(menu.test,{type: "text/plain;charset=utf-8"});
	menu.testDownload(blob, nameFile);
	//console.log(menu.test);	
}

editHeader = function(blockNone)
{
	let divExternalId;
	let divFullExternalId;
	let divVersion;
	let divSummary;
	let divPreConditions;
	let inputExternalId;
	let inputFullExternalId;
	let inputVersion;
	let inputSummary;
	let inputPreConditions;
	let ch;
	let ch1;

	divExternalId = $("div[name=divExternalId]")[0];
	divFullExternalId = $("div[name=divFullExternalId]")[0];
	divVersion = $("div[name=divVersion]")[0];
	divSummary = $("div[name=divSummary]")[0];
	divPreConditions = $("div[name=divPreConditions]")[0];
	inputExternalId = $("input[name=externalId]")[0];
	inputFullExternalId = $("input[name=fullExternalId]")[0];
	inputVersion = $("input[name=version]")[0];
	inputSummary = $("input[name=summary]")[0];
	inputPreConditions = $("input[name=preConditions]")[0];
	buttonShow = $("input[name=editHeaderButton]")[0];
	buttonHidden = $("input[name=hiddenHeaderButton")[0];

	blockNone.data.param1==1 ? ch="block" : ch="none" ;
	blockNone.data.param1==1 ? ch1="none" : ch1="block" ;
	
	divExternalId.style.display = ch;
	divFullExternalId.style.display = ch;
	divVersion.style.display = ch;
	divSummary.style.display = ch;
	divPreConditions.style.display = ch;
	inputExternalId.style.display = ch;
	inputFullExternalId.style.display = ch;
	inputVersion.style.display = ch;
	inputSummary.style.display = ch;
	inputPreConditions.style.display = ch;
	buttonShow.style.display = ch1;
	buttonHidden.style.display = ch;
}

editXml = function()
{
	let xmlFile;
	let preView;
	let testName;
	let order;
	let externalId;
	let fullExternalId;
	let version;
	let summary;
	let preConditions;
	let isOpen;
	let active;
	let estimatedDuration;
	let executionType;
	let importance;
	let status;
	let actions;
	let xmlActions;
	let expectedResults;
	let executionStepType;
	let importedXml;
	let textXml;

	
	xmlFile = $("input[name=xmlFile]")[0];
    preView = $("div[name=preView]")[0];
	importedXml = new FileReader();
    parser = new DOMParser();
    preView.innerHTML = "";//[0].childNodes[0].nodeValue;

    
    

    importedXml.onload = function()
    {
    	textXml = importedXml.result;
    	xmlDoc = parser.parseFromString(textXml,"text/xml"); //storage in xmlDoc xml Dom elements
    	//testName = $("input[name=testName]")[0].value;
		order = xmlDoc.getElementsByTagName("node_order")[0].childNodes[0].nodeValue;
		externalId = xmlDoc.getElementsByTagName("externalid")[0].childNodes[0].nodeValue;
		fullExternalId = xmlDoc.getElementsByTagName("fullexternalid")[0].childNodes[0].nodeValue;
		version = xmlDoc.getElementsByTagName("version")[0].childNodes[0].nodeValue;
		summary = xmlDoc.getElementsByTagName("summary")[0].childNodes[0].nodeValue;
		preConditions = xmlDoc.getElementsByTagName("preconditions")[0].childNodes[0].nodeValue;
		isOpen = xmlDoc.getElementsByTagName("execution_type")[0].childNodes[0].nodeValue;
		active = xmlDoc.getElementsByTagName("importance")[0].childNodes[0].nodeValue;
		//estimatedDuration = xmlDoc.getElementsByTagName("estimated_exec_duration")[0].childNodes[0].nodeValue;
		executionType = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
		importance = xmlDoc.getElementsByTagName("is_open")[0].childNodes[0].nodeValue;
		status = xmlDoc.getElementsByTagName("active")[0].childNodes[0].nodeValue;
    	
    	menu.addHeaderItem(order, externalId, fullExternalId, version, summary, preConditions, isOpen, active, estimatedDuration, executionType, importance, status);

		for(let i=0; i<xmlDoc.getElementsByTagName("actions").length; i++)
		{
			actions = xmlDoc.getElementsByTagName("actions")[i].childNodes[0].nodeValue;
			expectedResults = xmlDoc.getElementsByTagName("expectedresults")[i].childNodes[0].nodeValue;
			executionStepType = xmlDoc.getElementsByTagName("execution_type")[i+1].childNodes[0].nodeValue;
			console.log(actions, expectedResults, executionStepType);

			menu.addStepItem(actions, expectedResults, executionStepType);
			menu.stepBuild();
		}

		showSteps();
		console.log(importedXml.result);
		
    };
    
    importedXml.readAsText(xmlFile.files[0]);
      
}




$(document).ready(function(){

	$("input[name=insertButton]").click(insertStep);

	$("input[name=downloadButton]").click(downloadTest);

//	$("input[name=updateButton]").click(correctTable);
	$("input[name=editHeaderButton]").click({param1:1}, editHeader);

	$("input[name=hiddenHeaderButton]").click({param1:0}, editHeader);

//	$("input[name=editXmlButton]").click(editXml);
	$("input[name=xmlFile]").change(editXml);

});