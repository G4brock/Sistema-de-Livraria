import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ImageParams } from "src/interfaces/book.interface";

export type BookDoc = BookClass & Document;

@Schema()
export class BookClass{
    @Prop({required:true})
    titulo: string;

    @Prop({required:true})
    editora: string;

    @Prop({required:true})
    foto: ImageParams;

    @Prop({required:true})
    autores: Array<string>;
}

export const BookSchema = SchemaFactory.createForClass(BookClass);