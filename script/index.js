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

var blob = new Blob(menu.test,{type: "text/plain;charset=utf-8"});
menu.testDownload(blob,"test.xml");
*/

var menu = new MainMenu();

let insertStep = function()
{
	//Get rendering elements
	let actions = $("td[name=actions]").html();
	let expectedResults = $("td[name=expectedResults]").html();
	let executionStepType = $("select[name=executionStepType]")[0].value;

	menu.addStepItem(actions, expectedResults, executionStepType);
	menu.stepBuild();

	$("td[name=actions]").html("");
	$("td[name=expectedResults]").html("");
}

let downloadTest = function()
{
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

	order = $("input[name=order]")[0].value;
	externalId = $("input[name=externalId]")[0].value;
	fullExternalId = $("input[name=fullExternalId]")[0].value;
	version = $("input[name=version]")[0].value;
	summary = $("input[name=summary]")[0].value;
	preConditions = $("input[name=preConditions]")[0].value;
	isOpen = $("input[name=isOpen]")[0].value;
	active = $("input[name=active]")[0].value;
	estimatedDuration = $("input[name=estimatedDuration]")[0].value;
	executionType = $("select[name=executionType]")[0].value;
	importance = $("select[name=importance]")[0].value;
	status = $("select[name=status]")[0].value;

	menu.addHeaderItem(order, externalId, fullExternalId, version, summary, preConditions, isOpen, active, estimatedDuration, executionType, importance, status);
	menu.headerBuild();
	menu.testBuild();

	var blob = new Blob(menu.test,{type: "text/plain;charset=utf-8"});
	menu.testDownload(blob,"test.xml");
	console.log(menu.test);	
}

$(document).ready(function(){

	$("input[name=insertButton]").click(insertStep);

	$("input[name=downloadButton]").click(downloadTest);  

});