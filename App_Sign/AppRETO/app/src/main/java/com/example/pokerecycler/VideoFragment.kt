package com.example.pokerecycler

import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.MediaController
import android.widget.VideoView
import androidx.core.view.isVisible
import androidx.navigation.Navigation
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.pokerecycler.databinding.FragmentHomeBinding
import com.example.pokerecycler.databinding.FragmentVideoBinding
import kotlinx.coroutines.NonCancellable.start


/**
 * A simple [Fragment] subclass.
 * Use the [VideoFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class VideoFragment : Fragment() {

    private var _binding: FragmentVideoBinding? = null
    private val binding get() = _binding!!
    //lateinit var questionsList:ArrayList<VideoFragment>
    lateinit var videoView: VideoView

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

        arguments?.let {
            val palabra = it.get("palabra") as Palabras

            val video_id = palabra.mediaUrl

            if(video_id != null) {

                val offlineUrl =
                    Uri.parse("$video_id")
                binding.textViewVideoNombre.text = palabra.term
                val mediaController = null
                binding.videoView.setMediaController(mediaController)
                binding.videoView.setVideoURI(offlineUrl)
                binding.videoView.requestFocus()
                binding.videoView.start()

            }
            else {
                binding.videoView.isVisible = true

                //Toast.makeText(context,"VIDEO NO DISPONIBLE",Toast.LENGTH_SHORT).show()

            }
    }
}}

