package com.example.pokerecycler
import com.google.gson.annotations.SerializedName

    data class UserResponse (
        @SerializedName("password") var password: String,
        @SerializedName("currentStrike") var currentStrike: Int,
        @SerializedName("profilePicture") var profilePicture: String,
        @SerializedName("achievements") var achievements: List<Int>,
        @SerializedName("daysAttended") var daysAttended: List<Int>,
        @SerializedName("admin") var admin: Boolean,
        @SerializedName("lessonsProgress") var lessonsProgress: List<Float>,
        @SerializedName("mail") var mail: String,
        @SerializedName("name") var name: String
    ){
        override fun toString() = "User(\"$name\",\"$password\",\"$admin\",\"$currentStrike\",\"$mail\",\"$achievements\",\"$profilePicture\",\"$daysAttended\",\"$lessonsProgress\")"
    }