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
	var testName;

	this.order = "";
	this.externalId = "";
	this.fullExternalId = "";
	this.version = "1";
	this.summary = "";
	this.preConditions = "";
	this.isOpen = "1";
	this.active = "1";
	this.estimatedDuration = "";
	this.executionType = "1";
	this.importance = "2";
	this.status = "1";
	this.testHeader = "";
	this.steps = [];
	this.stepNumber = 0;
	this.actions = "";
	this.expectedResults = "";
	this.executionStepType = "Manual";
	this.test = [];
	this.testName = "";
}

MainMenu.prototype = 
{
	/*
	addItem() set test properties. Update same values is is not empty
	*/
	addHeaderItem : function(order,externalId,fullExternalId,version,summary,preConditions,isOpen,active,estimatedDuration,executionType,importance,status)
	{
		if(order!=""){this.order = order};
		if(externalId!=""){this.externalId = externalId};
		if(fullExternalId!=""){this.fullExternalId = fullExternalId};
		if(version!=""){this.version = version};
		if(summary!=""){this.summary = summary};
		if(preConditions!=""){this.preConditions = preConditions};
		if(isOpen!=""){this.isOpen = isOpen};
		if(active!=""){this.active = active};
		if(estimatedDuration!=""){this.estimatedDuration = estimatedDuration};
		if(executionType!=""){this.executionType = executionType};
		if(importance!=""){this.importance = importance};
		if(status!=""){this.status = status};
	},

	/*
		headerBuild() return a test header
	*/

	headerBuild : function()
	{
		this.testHeader = '\n\t<node_order><![CDATA[' + this.order + ']]></node_order>' +
    					'\n\t<externalid><![CDATA[' + this.externalId + ']]></externalid>' +
    					'\n\t<fullexternalid><![CDATA[' + this.fullExternalId + ']]></fullexternalid>' +
    					'\n\t<version><![CDATA[' + this.version + ']]></version>' +
    					'\n\t<summary><![CDATA[' + this.summary + ']]></summary>' +
    					'\n\t<preconditions><![CDATA[' + this.preConditions + ']]></preconditions>' +
    					'\n\t<execution_type><![CDATA[' + this.executionType + ']]></execution_type>' +
    					'\n\t<importance><![CDATA[' + this.importance + ']]></importance>' +
    					'\n\t<estimated_exec_duration><![CDATA[' + this.estimatedDuration + ']]></estimated_exec_duration>' +
    					'\n\t<status><![CDATA[' + this.status + ']]></status>' +
    					'\n\t<is_open><![CDATA[' + this.isOpen + ']]></is_open>' +
    					'\n\t<active><![CDATA[' + this.active + ']]></active>';
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
			this.steps += '\n<step>' +
			 			'\n\t<step_number><![CDATA[' + this.stepNumber + ']]></step_number>' +
			 			'\n\t<actions><![CDATA[' + this.actions + ']]></actions>' +
			 			'\n\t<expectedresults><![CDATA[' + this.expectedResults + ']]></expectedresults>' +
			 			'\n\t<execution_type><![CDATA[' + this.executionStepType + ']]></execution_type>' +
			 			'\n</step>';

		}
		
	},


	/*
		add Parameters to testcases tag
	*/

	addTestParameter : function(testName)
	{
		this.testName = testName;
	},

	/*
		testBuilder() return an array with the test steps
	*/

	testBuild : function()
	{
		this.test[0] = '<?xml version="1.0" encoding="UTF-8"?>' ; 
		this.test[1] = '\n\n<testcases>' + '\n<testcase name="'+ this.testName +'" >' ;
		this.test[2] = this.testHeader ;
		this.test[3] = '\n<steps>' + this.steps + '\n</steps>' ;
		this.test[4] = '\n\n</testcase>' + '\n</testcases>';

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

/*
-Test addTestParameter
-Do control layer
-Do model layer
*/

