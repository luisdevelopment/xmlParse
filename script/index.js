/*
	Control view
*/

var menu = new MainMenu();

/*

*/
let correctTable = function()
{
	let tabela;
	let actions;
	let expectedResults;
	let executionStepType;


	colunas = document.querySelectorAll('td');

	menu.stepClear();

	for(i=1; i<colunas.length; i+=4)
	{
		actions = colunas[i].textContent;
		expectedResults = colunas[i+1].textContent;
		executionStepType = colunas[i+2].textContent;

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
	menu.steps.replace(/step/g, "tr").replace(/tr_number/g, "td").replace(/actions/g, "td").replace(/expectedresults/g, "td").replace(/execution_type/g, "td").replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "") +
	'</tbody></table>'
	table = $("section[name=preView]")[0];
	//console.log(menu.steps);

	table.innerHTML = step;
}

let insertStep = function()
{
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
	nameFile = testName + ".xml";



	menu.addHeaderItem(order, externalId, fullExternalId, version, summary, preConditions, isOpen, active, estimatedDuration, executionType, importance, status);
	menu.headerBuild();
	menu.addTestParameter(testName);
	menu.testBuild();

	var blob = new Blob(menu.test,{type: "text/plain;charset=utf-8"});
	menu.testDownload(blob, nameFile);
	console.log(menu.test);	
}

$(document).ready(function(){

	$("input[name=insertButton]").click(insertStep);

	$("input[name=downloadButton]").click(downloadTest);

	$("input[name=updateButton]").click(correctTable);  

});