package com.example.pokerecycler


import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding
import com.bumptech.glide.Glide
import com.example.pokerecycler.databinding.ItemSubcategoriasBinding


class adapterSubCategorias (var context: Context, var data: List<Palabras>, private val funcionX: (Palabras) ->Unit) : RecyclerView.Adapter<adapterSubCategorias.ViewHolder>()     {

    class ViewHolder (val binding: ItemSubcategoriasBinding, funcionZ: (Int) -> Unit) : RecyclerView.ViewHolder(binding.root)  {


        //Registrando el evento de click y retornando una funcion con el indice del elemento
        init {
            itemView.setOnClickListener {
                funcionZ(adapterPosition)
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = ItemSubcategoriasBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return ViewHolder(view) {
            funcionX(data[it])
        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        holder.binding.apply {
            textView2.text = data[position].term


        }
        //Glide.with(context)
           // .load(data[position].imagen_url)
           // .into(holder.binding.imageView3)


    }

    override fun getItemCount(): Int {
        return data.size
    }
}