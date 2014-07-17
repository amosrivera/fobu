'use strict';

var app = angular.module('editorUI',[]);

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
				drop: function(event,ui){
					console.log("Dropping.");
				}
			})
		}
	}
})

app.directive('fobuSortable', function($compile){
	return {
		restrict:'A',
		link: function($scope,element,attr){

			element.sortable({
				placeholder:'field-placeholder',
				containment:'#editor-canvas',
				items:'.field',
				handle:'.drag-handle',
				cursorAt: { 
					top: 20, 
					left: 0 
				},
				receive: function (event, ui) {
					console.log("Receiving...");
				},
   				update:function(event,ui) {
   					console.log("Updating...");
   				},
				start: function( event, ui ) {
					console.log("Sort start...");
				},
				stop: function(event, ui) {
					console.log("Sort stop...");
				}
			});

		}
	}
});