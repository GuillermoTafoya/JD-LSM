package com.example.pokerecycler

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Url

class User constructor(
    val mail: String,
    val password: String
)

class User2 constructor(
    val name: String,
    val mail: String,
    val password: String,
    val token: String,
)

interface APIService {
    @POST("login")
    suspend fun login(
        @Body body: User
    ): Response<UserResponse>
    @POST("create-user")
    suspend fun signUp(
        @Body body: User2
    ): Response<String>
}
