package com.example.pokerecycler

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.Navigation
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.pokerecycler.databinding.FragmentHomeBinding

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding ? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        // Inflate the layout for this fragment
        return binding.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

       // val adapterpokemon = adapter(requireActivity(), pokeList)

        val adaptercategoria = adapterCat(requireActivity(), categoriasList){
            val bundle = Bundle()
            bundle.putParcelable("categoria",it)
            Navigation.findNavController(view).navigate(R.id.action_homeFragment_to_subCategoriaFragment,bundle)
        }

     //   val adapterpokemon = adapterCat(requireActivity(), categoriasList)
        binding.rvpokemon.adapter = adaptercategoria
       binding.rvpokemon.layoutManager = GridLayoutManager(requireActivity(),2,
            RecyclerView.VERTICAL,false)

       // binding.rvpokemon.layoutManager = LinearLayoutManager(requireActivity())

    }
}