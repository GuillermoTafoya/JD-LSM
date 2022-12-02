package com.example.pokerecycler

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.example.pokerecycler.databinding.FragmentImageBinding
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ImageFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ImageFragment : Fragment() {
    //private var _binding: FragmentImageBinding? = null
    //private val binding get() = _binding!!
    lateinit var titleTextView: TextView
    lateinit var imageView: ImageView
    lateinit var executor : ExecutorService

    val handler = Handler(Looper.getMainLooper())
    var image: Bitmap? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_image, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        executor = Executors.newSingleThreadExecutor()
        titleTextView = view.findViewById(R.id.textView_video_nombre)
        imageView = view.findViewById(R.id.imageView2)

        arguments?.let {
            val palabra = it.get("palabra") as Palabras

            val imageUrl = palabra.mediaUrl

            if (imageUrl != null) {
                titleTextView.setText(palabra.term)

                executor.execute {
                    try {
                        val `in` = java.net.URL(imageUrl).openStream()
                        image = BitmapFactory.decodeStream(`in`)

                        // Only for making changes in UI
                        handler.post {
                            imageView.setImageBitmap(image)
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            }
        }
    }


}