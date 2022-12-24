import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AwsService } from './aws/aws.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}
  
  @Post('obras')
  insertDoc(
    @Body() book
  ){
    return this.appService.insertBook(book);
  }

  @Get('obras')
  findBooks(){
    return this.appService.findBooks()
  }

  @Put('obras/:id')
  updatBook(
    @Param() params,
    @Body() data
  ){
    return this.appService.editBook(params.id, data);
  }

  @Delete('obras/:id')
  deleteBook(
    @Param() params
  ){
    return this.appService.deleteBook(params.id);
  }

  @Post('upload/:id')
  @UseInterceptors(AnyFilesInterceptor())
  upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() params
  ){
    return this.appService.upload(files[0], params.id);
  }
}
