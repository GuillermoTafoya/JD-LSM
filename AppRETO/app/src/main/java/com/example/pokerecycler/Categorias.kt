package com.example.pokerecycler

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Categorias (
 val nombre : String,
 val sub_categoria: List<Palabras>
        ) : Parcelable