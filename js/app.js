'use strict';

// Start a new angular module and require the editorUI directive and
// the editorDefaults service 
var app = angular.module('fobu',['editorUI','editorData','angularMoment','monospaced.elastic']);

// Set angular curly braces syntax to {[{}]} to avoid conflicts with twig 
// templating engine
app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.run(function(amMoment) {
    amMoment.changeLanguage('es');
});

app.config(['msdElasticConfig', function(config) {
  config.append = '\n';
}]);

app.controller('canvas', function($scope,$timeout,_defaults,_db){

	// Array that holds are module data title, text, questions, position
	$scope.modules = [];

	// Called when clicking on an element. A css class is activated based on 
	// the element selected
	$scope.select = function(index) {
		$scope.activeElement = index;
	}

	// This method could be merged with the addquestion method
	// but is kept separated for simplicity
	$scope.addModule = function(){

		// Pull module defaults
		var module = angular.copy(_defaults["module"]);

		// Create unique name
		module.name = "module_" + (new Date().getTime());

		// Length - 1 is the index of the last item added
		var position = $scope.modules.push(module) - 1;

		module.position = position;

		return position;
	}

	$scope.removeModule = function(moduleId){
		// Take it out of the array
		$scope.modules.splice(moduleId,1);
	}

	$scope.addQuestion = function(type,moduleId,position){

		// If the element was not dropped inside a module then
		// we create it
		if (moduleId === undefined) {
			moduleId = $scope.addModule();
		}

		if (position === undefined) {
			position = $scope.modules[moduleId]["questions"].length;
		}

		// Take the question default values from the editorDefaults service
		var question 	= angular.copy(_defaults[type]);

		// Create a unique name
		question.name 	= type + "_" + (new Date().getTime());

		// Push the question inside the modules array
		$scope.$apply(function(){
			$scope.modules[moduleId]["questions"].splice(position,0,question);
		}); 
	}

	$scope.removeQuestion = function(moduleId,questionId){
		// Take it out of the array
		$scope.modules[moduleId]["questions"].splice(questionId,1);
	}

	$scope.addSelectOption = function(moduleId,questionId,input){

		if(input.value.length > 0){

			console.log(moduleId,questionId,input.value)
			// Maybe modify array prototype to add a method to add questions
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

	// This function is called everytime the elements are sorted
	// @positions is an array returned by the sortable plug in (see ui directive)
	// with the elements id in the new order.
	$scope.sortQuestions = function(moduleId,positions){

		if($scope.modules[moduleId] !== undefined){
			angular.forEach(positions,function(index,position){
				$scope.modules[moduleId]["questions"][index].position = position;
			});
		}

	}

	$scope.sortModules = function(positions){

		angular.forEach(positions,function(index,position){
			$scope.modules[index].position = position;
		});

	}


	$scope.save = function(){
		$scope.message = {
			text: "Guardando ...",
			time: null
		}

		var poll = $scope.poll;

		// attach modules and questions
		poll.modules = $scope.modules;

		// Save and callback
		_db.save(poll, function(){
			$timeout($scope.save, 60 * 1000);
			$scope.message = {
				text: "Guardado por última vez",
				time: new Date()
			}
		});
	}

	$scope.get = function(id){
		_db.getById(id, function(data){

			// duda tecnica
			angular.forEach(data.modules,function(module){
				module.style = "Una columna";
			});

			// store modules in a differente variable
			$scope.modules = data["modules"];
			delete data["modules"];			

			$scope.poll = data;

			// deuda técnica
			$scope.save();
		});
	}

});

