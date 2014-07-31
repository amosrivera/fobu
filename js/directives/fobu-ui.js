'use strict';

var app = angular.module('editorUI',[]);

app.directive('fobuSaveBtn',function(){
	return {
		restrict: 'EA',
		templateUrl:'templates/save.html',
		link: function($scope,element){
			element.on('click',function(){
				$scope.save();
			})
		}
	}
});

app.directive('fobuModuleStyle', function(){
	return {
		restrict:'A',
		templateUrl:'templates/module-style.html'
	}
})

// Just used to abstract the html 
app.directive('fobuModuleInfo', function(){
	return {
		restrict:'A',
		templateUrl:'templates/module-info.html'
	}
})

// This directive loads the corresponding html depending on the question time
// you just use the fobu-question attribute
app.directive('fobuQuestion', function(){
	return {
		restrict:'A',
		link: function($scope,element,attr){
			$scope.templateUrl = "templates/"+ $scope.question.type +".html?ud="+(new Date().getTime());
		},
		template:"<div ng-include='templateUrl'></div>"
	}
})

// Used by the tools
app.directive('fobuDraggable', function(){
	return {
		restrict: 'A',
		link: function($scope,element,attr){
			element.draggable({
				connectToSortable: "#editor-canvas,.module",
				snap:true,
				handle:".drag-handle",
				helper:function(){
					return $("<div />").addClass("question-placeholder fobu-draggable")
				},
			});
		}
	}
});

// sorting magic
app.directive('fobuSortable', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
			element.sortable({
				placeholder:'',

				// When you drag an element you actually dragged a cloned element.
				// The original element is hidden. Helper is that cloned element.
				// You could customize it to be anything.
				helper: function(){
					var helper = $(this).find(".selected").clone();
					helper.height('auto');

					return helper;
				},
				containment:'#editor-canvas',
				items:'.question,.module',
				handle:'.drag-handle',
				// When a new element is dropped
				receive:function(event,ui){

					var dropped = $(this).find(".ui-draggable");
					var position = dropped.next().data("index");

					// Remove dropped tool
					dropped.remove();

					// Get type of element dropped
					var type = ui.sender.attr("fobu-draggable");

					// Get id of the module where it was dropped if there is one
					// if undefined then one is created by the addQuestion function
					var moduleId = $(this).data("index");

					$scope.addQuestion(type,moduleId,position);
				},

				// Whenever the list changes sort the array
				update:function(event,ui){

					if($(ui.item).is(".module")) {
						var positions = $(this).sortable("toArray",{ attribute:"data-index" });
						$scope.sortModules(positions);

					// if it is not a module, you're sorting questions
					} else {
						var moduleId = $(this).data("index");
						var positions = $(this).sortable("toArray",{ attribute:"data-index" });
						$scope.sortQuestions(moduleId,positions);
					}
				}
			});
		}
	}
})

