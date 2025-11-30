import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('Files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @ApiOperation({ description: 'Carga la imagen segun el ID del producto.' })
  @ApiParam({ name: 'id', description: 'Id del producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe ser menor a 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg|gif)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadImage(file, id);
  }
}
