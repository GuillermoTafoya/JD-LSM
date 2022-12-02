package com.example.pokerecycler

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.pokerecycler.databinding.FragmentSubCategoriaBinding


class SubCategoriaFragment : Fragment() {


    private var _binding: FragmentSubCategoriaBinding? = null
    private val binding get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentSubCategoriaBinding.inflate(inflater, container, false)
        // Inflate the layout for this fragment
        return binding.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


        arguments?.let {
            val categoria = it.get("categoria") as Categorias

            val adaptercategoria =
                adapterSubCategorias(requireActivity(), categoria.sub_categoria) {
                    val palabra = it
                    val bundle = Bundle()
                    bundle.putParcelable("palabra", palabra)
                    if (palabra.mediaIsPlayable)
                        Navigation.findNavController(view).navigate(R.id.action_subCategoriaFragment_to_videoFragment,bundle)
                    else
                        Navigation.findNavController(view).navigate(R.id.action_subCategoriaFragment_to_imageFragment,bundle)
                }

            binding.rvsubcategorias.addItemDecoration( DividerItemDecoration(activity, LinearLayoutManager.VERTICAL))
            binding.rvsubcategorias.adapter = adaptercategoria
            binding.rvsubcategorias.layoutManager = LinearLayoutManager(requireActivity())

        }
    }

}