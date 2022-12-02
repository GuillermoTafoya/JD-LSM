package com.example.pokerecycler

import android.app.ProgressDialog.show
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.pokerecycler.MainActivity
import com.example.pokerecycler.SignUpActivity
import com.example.pokerecycler.databinding.ActivitySignInBinding
//import com.example.pokerecycler.databinding.ActivitySignInBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class SignInActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySignInBinding
    private var myUser: UserResponse? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        //Toast.makeText(this, "ON CREATE", Toast.LENGTH_SHORT).show()
        Thread.sleep(2000)
        setTheme(R.style.Theme_PokeRecycler) //Tema para splash screen
        super.onCreate(savedInstanceState)
        binding = ActivitySignInBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.signtext.setOnClickListener {
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        binding.signUpButton.setOnClickListener {
            val email = binding.emailEditText.text.toString()
            val pass = binding.passwordEditText.text.toString()

            if (email.isNotEmpty() && pass.isNotEmpty()) {
                Log.d("TAG","Debug1: " + email + " " + pass)
                //Toast.makeText(this, "Espere por favor.", Toast.LENGTH_LONG).show()
                loginUser(email, pass)
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)

            }

            else {
                Toast.makeText(this, "Los campos vacios no están permitidos", Toast.LENGTH_SHORT)
                    .show()
            }
        }
    }
    private fun getRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://user-api-b5pden6qnq-uc.a.run.app/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    private fun loginUser(mail: String, password: String) {

        val us = User(mail, password);
        CoroutineScope(Dispatchers.IO).launch {
            val call = getRetrofit().create(APIService::class.java).login(us)
            call.body()?.let { updateUser(it) }
            //call.body()?.let { redirectSignIn() }
        }
    }



    private fun updateUser(resp:UserResponse) {
        myUser = resp
        Log.d("TAG","Updated: " + myUser.toString())
        runOnUiThread{
            Toast.makeText(this, "Hello " + (myUser?.name?: "Default"), Toast.LENGTH_LONG)
                .show()
        }
    }
}




