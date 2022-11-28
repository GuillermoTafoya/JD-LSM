package com.example.pokerecycler

import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.MediaController
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import com.example.pokerecycler.databinding.FragmentVideoBinding


/**
 * A simple [Fragment] subclass.
 * Use the [VideoFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class VideoFragment : Fragment() {

    private var _binding: FragmentVideoBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentVideoBinding.inflate(inflater, container, false)
        // Inflate the layout for this fragment
        return binding.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mediaController = MediaController(context)
        mediaController.setAnchorView(binding.videoView)



       // val packageName = requireContext().packageName



        arguments?.let {
            val palabra = it.get("palabra") as Palabras

            val video_id = palabra.local_video_url

            if(video_id != null) {

                val offlineUrl =
                    Uri.parse("android.resource://${requireContext().packageName}/${video_id}")
                binding.textViewVideoNombre.text = palabra.nombre
                binding.videoView.setMediaController(mediaController)
                binding.videoView.setVideoURI(offlineUrl)
                binding.videoView.requestFocus()
                binding.videoView.start()

            }
            else {
                binding.videoView.isVisible = false

            Toast.makeText(context,"VIDEO NO DISPONIBLE",Toast.LENGTH_SHORT).show()

            }

        }

    }
}