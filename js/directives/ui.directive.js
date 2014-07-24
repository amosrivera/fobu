'use strict';

var app = angular.module('editorUI',[]);

app.directive('fobuModuleInfo', function(){
	return {
		restrict:'A',
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

app.directive('fobuSortable', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
			element.sortable({
				placeholder:'question-placeholder',
				helper: function(){
					var helper = $(this).find(".selected").clone();
					helper.height('auto');

					return helper;
				},
				containment:'#editor-canvas',
				items:'.question',
				handle:'.drag-handle',
				//cancel: ".question-placeholder",
				receive:function(event,ui){

					var dropped = $(this).find(".ui-draggable");
					var position = dropped.next().attr("id");

					// remove dropped tool
					dropped.remove();

					// get type of element dropped
					var type = ui.sender.attr("fobu-draggable");

					// get id of the module where it was dropped if there is one
					// if undefined then one is created by the addQuestion function
					var moduleId = $(this).data("index");

					$scope.addQuestion(type,moduleId,position);
				},

				update:function(event,ui){
					if($(this).is(".module")) {

						var moduleId = $(this).data("index");
						var positions = $(this).sortable("toArray",{attribute:"id"});
						$scope.sort(moduleId,positions);

					}
				}
			});
		}
	}
})

