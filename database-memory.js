import { randomUUID } from "node:crypto"
import { serialize } from "node:v8"

export class DatabaseMemory{
    #videos = new Map()

    //usando estruturas de dados para relacionar o ID do video ao ID do banco de dados
    //Set = parece um array porem nao aceita valores duplicados
    //Map = parece um objeto mas com metodos diferentes 

    //criando os metodos que vamos usar

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray) =>{
            const id = videoArray[0]
            const data = videoArray[1]

            return{
                id,
                ...data,
            }
        })
        .filter(video=>{
            if (search){
                return video.title.includes(search) 
            }
            return true
        })
    }

    create(video){
        // unique universal ID
        const videoid = randomUUID()

        //setando que todo video tera um id
        this.#videos.set(videoid, video)
    }

    update(id,video){
        this.#videos.set(id,video)
    }


    delet(id){
        this.#videos.delete(id)
    }
}