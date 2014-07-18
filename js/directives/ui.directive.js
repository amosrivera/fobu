'use strict';

var app = angular.module('editorUI',[]);

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
					var type = ui.draggable.attr("fobu-draggable");
					var moduleId = $(this).is(".module") ? $(this).data("index") : null;

					console.log($(this));
					$scope.addQuestion(type,moduleId);
				}
			})
		}
	}
})

app.directive('fobuSortable', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
		}
	}
})