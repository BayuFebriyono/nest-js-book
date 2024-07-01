import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './application/book.service';
import { BookController } from './presentation/book.controller';
import { BookRepository } from './infrastructure/book.respository';
import { Book } from './domain/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BookRepository],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
