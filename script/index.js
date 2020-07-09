/*
	Control view
*/


/*
order,
externalId,
fullExternalId,
version,
summary,
preConditions,
isOpen,
active,
estimatedDuration,
executionType,
importance,
status
var menu = new MainMenu();
console.log("Before: ", menu.test)
menu.addHeaderItem("1 ","2 ","3 ","4 ","5 ","6 ","7 ","8 ","9 ","10 ","11 ","12 ");
menu.headerBuild();
menu.addStepItem("place jump","","manual");
menu.stepBuild();
menu.addStepItem("facmode","enable","automated");
menu.stepBuild();
menu.addStepItem("clear all","","automated");
menu.stepBuild();
menu.testBuild();
console.log("Later: ", menu.test);

*/

var menu = new MainMenu();


let showSteps = function()
{
	let table;
	let step;
	
	step = '<table border="2" border-style="solid"><thead><th>STEP NUMBER</th><th>ACTIONS</th><th>EXPECTED RESULTS</th><th>EXECUTION STEP TYPE</th></thead><tbody>' +
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
/*
	switch(status)
	{
		case 'Draft':
			status = "1";
		break;
	}
*/
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

});