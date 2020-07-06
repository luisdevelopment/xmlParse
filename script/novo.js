/*
Writting by Luis at 06/06/2020
*/


var MainMenu = function()
{
	var order;
	var externalId;
	var fullExternalId;
	var version;
	var summary;
	var preConditions;
	var isOpen;
	var active;
	var estimatedDuration;
	var executionType;
	var importance;
	var status;
	var testHeader; //Storage a string with Test set up
	var steps;		//Storage an array with the all step test
	var stepNumber;		//int to count stepNumber
	var actions;
	var expectedResults;
	var executionStepType;
	var test; 		//Storage a string with the whole test

	this.order = "";
	this.externalId = "";
	this.fullExternalId = "";
	this.version = "";
	this.summary = "";
	this.preConditions = "";
	this.isOpen = "";
	this.active = "";
	this.estimatedDuration = "";
	this.executionType = "";
	this.importance = "";
	this.status = "";
	this.testHeader = "";
	this.steps = [];
	this.stepNumber = 0;
	this.actions = "";
	this.expectedResults = "";
	this.executionStepType = "manual";
	this.test = [];
}

MainMenu.prototype = 
{
	/*
	addItem() set test properties
	*/
	addHeaderItem : function(order,externalId,fullExternalId,version,summary,preConditions,isOpen,active,estimatedDuration,executionType,importance,status)
	{
		this.order = order;
		this.externalId = externalId;
		this.fullExternalId = fullExternalId;
		this.version = version;
		this.summary = summary;
		this.preConditions = preConditions;
		this.isOpen = isOpen;
		this.active = active;
		this.estimatedDuration = estimatedDuration;
		this.executionType = executionType;
		this.importance = importance;
		this.status = status;
	},

	/*
		headerBuild() return a test header
	*/

	headerBuild : function()
	{
		this.testHeader = '\n\t\t\t<node_order><![CDATA[' + this.order + ']]></node_order>' +
    					'\n\t\t\t<externalid><![CDATA[' + this.externalId + ']]></externalid>' +
    					'\n\t\t\t<fullexternalid><![CDATA[' + this.fullExternalId + ']]></fullexternalid>' +
    					'\n\t\t\t<version><![CDATA[' + this.version + ']]></version>' +
    					'\n\t\t\t<summary><![CDATA[' + this.summary + ']]></summary>' +
    					'\n\t\t\t<preconditions><![CDATA[' + this.preConditions + ']]></preconditions>' +
    					'\n\t\t\t<execution_type><![CDATA[' + this.executionType + ']]></execution_type>' +
    					'\n\t\t\t<importance><![CDATA[' + this.importance + ']]></importance>' +
    					'\n\t\t\t<estimated_exec_duration><![CDATA[' + this.estimatedDuration + ']]></estimated_exec_duration>' +
    					'\n\t\t\t<status><![CDATA[' + this.status + ']]></status>' +
    					'\n\t\t\t<is_open><![CDATA[' + this.isOpen + ']]></is_open>' +
    					'\n\t\t\t<active><![CDATA[' + this.active + ']]></active>';
	},

	/*
		addStepItem() set step items
	*/
	addStepItem : function(actions, expectedResults, executionStepType)
	{
		this.actions = actions;
		this.expectedResults = expectedResults;
		this.executionStepType = executionStepType;
	},


	/*
		stepBuild() return an array with the test step
	*/

	stepBuild : function()
	{
		this.stepNumber++;

		if(this.stepNumber == 0)
		{
			this.steps = "";
		}else
		{
			this.steps += '\n\t\t\t<step>' +
			 			'\n\t\t\t\t<step_number><![CDATA[' + this.stepNumber + ']]></step_number>' +
			 			'\n\t\t\t\t<actions><![CDATA[' + this.actions + ']]></actions>' +
			 			'\n\t\t\t\t<expectedresults><![CDATA[' + this.expectedResults + ']]></expectedresults>' +
			 			'\n\t\t\t\t<execution_type><![CDATA[' + this.executionStepType + ']]></execution_type>' +
			 			'\n\t\t\t</step>';

		}
		
	},

	/*
		testBuilder() return an array with the test steps
	*/

	testBuild : function()
	{
		this.test[0] = '<?xml version="1.0" encoding="UTF-8"?>' ; 
		this.test[1] = '\n\n\t <testcases>' + '\n\t\t<testcase>' ;
		this.test[2] = this.testHeader ;
		this.test[3] = '\n\t\t\t<steps>' + this.steps + '\n\t\t</steps>' ;
		this.test[4] = '\n\n\t\t </testcase>' + '\n\t</testcases>';

	},
	/*
		testDownload download the testArray as xmlfile
	*/
	testDownload : function(blob,name)
	{
		var url = URL.createObjectURL(blob),
		div = document.createElement("div"),
		anch = document.createElement("a");
 	
		document.body.appendChild(div);
		div.appendChild(anch);
 
		anch.innerHTML = "&nbsp;";
		div.style.width = "0";
		div.style.height = "0";
		anch.href = url;
		anch.download = name;
			
		var ev = new MouseEvent("click",{});
		anch.dispatchEvent(ev);
		document.body.removeChild(div);
	}

}

/*
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

/*$(document).ready(function(){
  $("input[name=parse]").click(function(){
    $("div[name=actionBox]").hide();
  });
});*/

