'use strict';

var app = angular.module('fobu',['editorUI','editorDefaults']);

// Set angular curly braces syntax to {[{}]} to avoid conflicts with twig
app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('canvas', function($scope,_defaults){

	$scope.modules = [];

	// this method could be merged with the addquestion method
	// but is kept separated for simplicity
	$scope.addModule = function(){

		// pull module defaults
		var module = angular.copy(_defaults["module"]);

		// create unique name
		module.name = "module_" + (new Date().getTime());

		// push inside the modules array
		var length = $scope.modules.push(module);

		// length - 1 is the index of the last item added
		return length - 1;
	}

	$scope.removeModule = function(){
		console.log("Removing module...");
	}

	$scope.addQuestion = function(type,moduleId){


		// if the element was not dropped inside a module then
		// we create it
		if (moduleId === null) {
			moduleId = $scope.addModule();
		}

		// take the question default values from the editorDefaults service
		var question 	= angular.copy(_defaults[type]);

		// create a unique name
		question.name 	= type + "_" + (new Date().getTime());

		// push the question inside the modules array
		$scope.$apply(function(){
			$scope.modules[moduleId]["questions"].push(question);
		}); 

	}

	$scope.removeQuestion = function(type){
		console.log("Removing question...");
	}

	$scope.select = function(index) {
		$scope.activeQuestion = index;
	}

});

