'use strict';

var app = angular.module('editorDefaults',[]);

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