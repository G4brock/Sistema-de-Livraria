export class BookDtoInsert{
    titulo: string;
    editora: string;
    foto: ImageParams;
    autores: Array<string>;
}

export class BookDtoFind{
    id: string;
    titulo: string;
    editora: string;
    foto: ImageParams;
    autores: Array<string>;
}

export class ImageParams {
    Bucket: string;
    Key: string;
}