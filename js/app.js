'use strict';

var app = angular.module('fobu',['editorUI','editorDefaults']);

// Set angular curly braces syntax to {[{}]} to avoid conflicts with twig
app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('canvas', function($scope,_defaults){

	$scope.modules = [];

	$scope.select = function(index) {
		$scope.activeElement = index;
	}

	// this method could be merged with the addquestion method
	// but is kept separated for simplicity
	$scope.addModule = function(){

		// pull module defaults
		var module = angular.copy(_defaults["module"]);

		// create unique name
		module.name = "module_" + (new Date().getTime());

		// length - 1 is the index of the last item added
		var position = $scope.modules.push(module) - 1;

		module.position = position;

		return position;
	}

	$scope.removeModule = function(){
		console.log("Removing module...");
	}

	$scope.addQuestion = function(type,moduleId,position){


		// if the element was not dropped inside a module then
		// we create it
		if (moduleId === undefined) {
			moduleId = $scope.addModule();
		}

		if (position === undefined) {
			position = $scope.modules[moduleId]["questions"].length;
		}

		// take the question default values from the editorDefaults service
		var question 	= angular.copy(_defaults[type]);

		// create a unique name
		question.name 	= type + "_" + (new Date().getTime());

		// push the question inside the modules array
		$scope.$apply(function(){
			$scope.modules[moduleId]["questions"].splice(position,0,question);
		}); 
	}

	$scope.removeQuestion = function(type){
		console.log("Removing question...");
	}

	$scope.addSelectOption = function(moduleId,questionId,input){

		if(input.value.length > 0){

			// maybe modify array prototype to add a method to add questions
			// instead of this long ugly string
			$scope.modules[moduleId]["questions"][questionId].options.push({ title: input.value });
			input.value = "";
		}
	}

	$scope.removeSelectOption = function(moduleId,questionId,index){

		// Delete element from the array. Angular automatically
		// refreshes the view
		$scope.modules[moduleId]["questions"][questionId].options.splice(index,1);
	}

	$scope.sort = function(moduleId,positions){

		angular.forEach(positions,function(index,position){
			$scope.modules[moduleId]["questions"][index].position = position;
		});

	}

});

