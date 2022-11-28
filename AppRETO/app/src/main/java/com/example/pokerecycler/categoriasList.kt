package com.example.pokerecycler

var categoriasList = mutableListOf(

    Categorias("Abc",mutableListOf(Palabras("A",null), Palabras("B",null),Palabras("C",null))),
    Categorias("Animales",mutableListOf(Palabras("Abeja",null), Palabras("Aguila",null),Palabras("Araña",null))),
    Categorias("Colores",mutableListOf(Palabras("Amarillo",R.raw.amarillo_web), Palabras("Azul",null),Palabras("Blanco",null))),
    Categorias("Comida",mutableListOf(Palabras("Aceite",null), Palabras("Agua",null),Palabras("Arroz",null))),
    Categorias("Dias de la Semana",mutableListOf(Palabras("Domingo",null), Palabras("Lunes",null),Palabras("Martes",null))),
    Categorias("Meses del Año",mutableListOf(Palabras("Enero",null), Palabras("Febrero",null),Palabras("Marzo",null))),
    Categorias("Personas",mutableListOf(Palabras("Abuela",null), Palabras("Abuelo",null),Palabras("Adulto",null)))
)