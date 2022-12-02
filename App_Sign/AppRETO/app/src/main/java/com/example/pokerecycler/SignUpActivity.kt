package com.example.pokerecycler

import android.app.Activity
import android.content.Intent
import android.media.session.MediaSession.Token
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import androidx.databinding.DataBindingUtil.setContentView
import com.example.pokerecycler.databinding.ActivitySignUpBinding
import com.example.pokerecycler.databinding.ActivitySignInBinding
//import com.example.pokerecycler.databinding.ActivitySignUpBinding
//import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class SignUpActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySignUpBinding
    private var myUser2: UserResponse? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        Toast.makeText(this, "SIGN UP", Toast.LENGTH_SHORT).show()
        super.onCreate(savedInstanceState)

        binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.textViewsign.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
        }

        binding.signUpButton.setOnClickListener {
            //Toast.makeText(this, "Click", Toast.LENGTH_SHORT).show()


            val name = binding.nameEditText.text.toString()
            val email = binding.emailEditText.text.toString()
            val pass = binding.passwordEditText3.text.toString()
            val token = binding.tokenEditText2.text.toString()

            if (name.isNotEmpty() && pass.isNotEmpty() && token.isNotEmpty() && email.isNotEmpty()) {
                Log.d("TAG", "Debug1: " + email + " " + pass)
                Toast.makeText(this, "Espere por favor.", Toast.LENGTH_LONG).show()
                signUpUser(name, email, pass, token)

            } else {
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

    private fun signUpUser(mail: String, password: String, name: String, token: String) {

        val us2 = User2(mail, password, name, token);
        CoroutineScope(Dispatchers.IO).launch {
            val call = getRetrofit().create(APIService::class.java).signUp(us2)

            call.body()?.let { redirectSignIn() }
        }
    }

    private fun redirectSignIn() {
        val intent = Intent(this, SignInActivity::class.java)
        startActivity(intent)
    }

    private fun updateUser(resp:UserResponse) {
        myUser2 = resp
        Log.d("TAG","Updated: " + myUser2.toString())
        runOnUiThread{
            Toast.makeText(this, "Hello " + (myUser2?.name ?: "Default"), Toast.LENGTH_LONG)
                .show()
        }
    }
}
