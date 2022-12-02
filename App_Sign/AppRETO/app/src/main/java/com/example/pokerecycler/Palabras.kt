package com.example.pokerecycler

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


@Parcelize
data class Palabras(
    val term: String,
    val mediaUrl: String,
    val mediaIsPlayable: Boolean,
    ) : Parcelable {

}

