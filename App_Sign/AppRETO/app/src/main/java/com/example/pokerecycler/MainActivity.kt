package com.example.pokerecycler

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.Window
import android.view.WindowManager
import android.widget.Toast
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.onNavDestinationSelected
import com.example.pokerecycler.databinding.ActivityMainBinding
import com.example.pokerecycler.databinding.ActivitySignInBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class MainActivity : AppCompatActivity() {


    lateinit var binding: ActivityMainBinding
    lateinit var  navController: NavController





    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        //this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
        //getsupportActionBar().hide();
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        val navHostFragment = supportFragmentManager.findFragmentById(R.id.fragmentContainerView) as NavHostFragment
        navController = navHostFragment.navController

        binding.bottomNavigationView.setOnItemReselectedListener {


            when(it.itemId) {
                R.id.home_menu_id -> {
                    navController.navigate(R.id.AFragment)
                    true
                }

                R.id.A_menu_id -> {
                    navController.navigate(R.id.homeFragment)
                    true
                }

                R.id.B_menu_id -> {
                    navController.navigate(R.id.BFragment)
                    true
                }
                R.id.salir_menu_id -> {
                    //navController.navigate(R.id.settingFragment)


                    val intent = Intent(this, SignInActivity::class.java)
                    startActivity(intent)
                    true
                }

                else -> {false}
            }
        }
    }





    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        val inflater: MenuInflater = menuInflater
        inflater. inflate(R.menu.upper_menu, menu)
        return true
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return item.onNavDestinationSelected(navController) || super.onOptionsItemSelected(item)
    }



    }