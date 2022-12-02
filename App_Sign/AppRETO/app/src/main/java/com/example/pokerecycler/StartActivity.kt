package com.example.pokerecycler

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.example.pokerecycler.MainActivity2
import com.example.pokerecycler.R

class StartActivity : AppCompatActivity() {

    lateinit var start:Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start)
        supportActionBar?.hide()

        start=findViewById(R.id.start)
        start.setOnClickListener {
            var intent= Intent(this, MainActivity2::class.java)
            startActivity(intent)
        }

    }

    override fun onBackPressed() {
        super.onBackPressed()
    }
}