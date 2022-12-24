import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AwsService } from './aws/aws.service';
import { BookDtoFind, BookDtoInsert } from './interfaces/book.interface';
import { BookDoc } from './schemas/book.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('book') private livroModel: Model<BookDoc>,
    private readonly awsService: AwsService,
  ){}
  
  async insertBook(book: BookDtoInsert){
    const create = new this.livroModel(book)
    create.save()

    return 'registered'
  }

  async findBooks(){
    let booksBd = await this.livroModel.find();
    let books: Array<BookDtoFind> = []

    for(let i = 0; i < booksBd.length; i++){
        const {_id, titulo, autores, editora, foto} = booksBd[i]
        
        let book: BookDtoFind = {
          id: _id.toString(),
          titulo,
          autores,
          editora,
          foto: await this.awsService.getImage(foto)
        }

        books.push(book)
    }

    return books
  }

  async editBook(id: string, data: BookDtoInsert){
    await this.livroModel.findOneAndUpdate({"_id": id}, data);
    return "Livro editado";
  }
  
  async deleteBook(id: string){
    return await this.livroModel.deleteOne({"_id": id})
  }

  async upload(file, id){
    let image = {
      Bucket: 'libapp-1',
      Key: `images/${id}-${file.originalname}`
    }

    let res = this.awsService.uploadImageS3(file, id)

    await this.livroModel.findOneAndUpdate({"_id": id}, {"foto": image});

    return res;
  }

}
//tratar erro da busca de livros inexistentes.
//tratar erro da excluir livros inexistentes.
