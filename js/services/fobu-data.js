'use strict';

var app = angular.module('editorData',[]);

// Default values to start the elements
app.factory('_defaults',function($http){
	return {
		text:{
			title:'Texto',
			type:'text',
			help:'',
		},
		date:{
			title:'Fecha',
			type:'date',
			help:'',
		},
		number:{
			title:'Número',
			type:'number',
			help:'',
		},
		select:{
			title:'Opciones',
			type:'select',
			help:'Seleccione una opción',
			options:[{title:"Opcion 1"}]
		},
		radio:{
			title:'Opciones',
			type:'radio',
			help:'Seleccione una opción',
			options:[{title:"Opcion 1"}]
		},
		textarea:{
			title:'Pregunta abierta',
			type:'textarea',
		},
		checkbox:{
			title:'Opción de verificación',
			type:'checkbox',
			help:'',
		},
		module:{
			title:"Módulo",
			description: "Espacio para incluir una descripción "
					+ "corta sobre un campo o una introducción a una " 
					+ "sección diferente en la encuesta.",
			type:"module",
			questions: []
		}
	}
});

app.factory('_db',function($http){
	var factory = {}

	factory.save = function(data, callback) {

		var req = $http({
		    method: 'POST',
		    url: "http://localhost/pilote/web/encuesta/save/" + data.id,
		    data: angular.toJson(data)
		});

		//when 200
		req.success(callback);

		req.error(function(){
			console.log("Error saving!");
		});
		
	}

	factory.getById = function(id,callback) {
				
		//ajax request to get poll json
		var req = $http.get("http://localhost/pilote/web/encuesta/"+id);
		var tempArray = [];

		//when 200
		req.success(callback);

		req.error(function(){
			console.log("Error fetching!", id);
		});
	}

	return factory;
});