import { randomUUID } from "node:crypto"
import { serialize } from "node:v8"
import { sql } from "./db.js"
import { time } from "node:console"
import { title } from "node:process"
import { create } from "node:domain"

export class DatabasePostgres {
    async list(search){
        let videos

        if (search){
            videos = await sql `select * from videos where title ilike ${'%' + search + '%'}`
        }else{
            videos = await sql `select * from videos`
        }
        return videos
    }


     async create(video) {
        const videoId = randomUUID()
        const  { title, description, duration } = video

        await sql `insert into videos (id, title, description, duration) VALUES(${videoId}, ${title}, ${description}, ${duration})`    
}

     async update(id,video) {
        const  { title, description, duration } = video


        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }


    async delet(id){
      await sql`DELETE from videos WHERE id = ${id}`
    }
}