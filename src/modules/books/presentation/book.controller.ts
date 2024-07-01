import { Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from '../application/book.service';
import { Book } from '../domain/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Post('borrow/:bookCode/:memberId')
  borrowBook(
    @Param('bookCode') bookCode: string,
    @Param('memberId') memberId: number,
  ): Promise<Book> {
    return this.bookService.borrowBook(bookCode, memberId);
  }

  @Post('return/:bookCode/:memberId/:returnDate')
  returnBook(
    @Param('bookCode') bookCode: string,
    @Param('memberId') memberId: number,
    @Param('returnDate') returnDate: Date,
  ): Promise<Book> {
    return this.bookService.returnBook(bookCode, memberId, returnDate);
  }
}
