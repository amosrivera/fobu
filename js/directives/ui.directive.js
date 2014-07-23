'use strict';

var app = angular.module('editorUI',[]);

app.directive('fobuModuleInfo', function(){
	return {
		restrict:'A',
		link: function($scope,element,attr){
		},
		templateUrl:'templates/module-info.html'
	}
})

app.directive('fobuQuestion', function(){
	return {
		restrict:'A',
		link: function($scope,element,attr){
			$scope.templateUrl = "templates/"+ $scope.question.type +".html?ud="+(new Date().getTime());
		},
		template:"<div ng-include='templateUrl'></div>"
	}
})

app.directive('fobuDraggable', function(){
	return {
		restrict: 'A',
		link: function($scope,element,attr){
			element.draggable({
				connectToSortable: "#editor-canvas",
				appendTo:"body",
				handle:'.drag-handle',
				helper: "clone"
			});
		}
	}
});

app.directive('fobuDroppable', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
			element.droppable({
				greedy:true,
				drop: function(event,ui){

					// get question type
					var type 		= ui.draggable.attr("fobu-draggable");

					// if it was dropped inside a module get the module id
					// if not send null
					var moduleId 	= $(this).is(".module") ? $(this).data("index") : null;

					// if it has the ui-sortable-helper class it means it was being sorted
					// and not added. that action is taken care of in the sortable directive
					if(!ui.helper.is(".ui-sortable-helper")){
						$scope.addQuestion(type,moduleId);
					}
				}
			})
		}
	}
})

app.directive('fobuSortable', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
			element.sortable({
				placeholder:'question-placeholder',
				forcePlaceholderSize:true,
				helper:'clone',
				containment:'parent',
				items:'.question',
				handle:'.drag-handle',
				cursorAt: { 
					top: 20, 
					left: 0 
				},
				update: function(event,ui){
//					console.log("");
//					console.log($(this).sortable('toArray', {attribute: 'id'}));
				}
			});
		}
	}
})

