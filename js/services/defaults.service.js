'use strict';

var app = angular.module('editorDefaults',[]);

app.factory('_defaults',function($http){
	return {
		text:{
			title:'Texto corto',
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
			options:[]
		},
		radio:{
			title:'Opciones',
			type:'radio',
			help:'Seleccione una opción',
			options:[]
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