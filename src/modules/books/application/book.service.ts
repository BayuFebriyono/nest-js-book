import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../infrastructure/book.respository';
import { Book } from '../domain/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async borrowBook(bookCode: string, memberId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { code: bookCode },
    });
    if (!book) throw new NotFoundException('Book not found');
    if (book.stock <= 0) throw new Error('Book is currently not available');

    book.stock -= 1;
    book.borrowedCount += 1;
    return this.bookRepository.save(book);
  }

  async returnBook(
    bookCode: string,
    memberId: number,
    returnDate: Date,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { code: bookCode },
    });
    if (!book) throw new NotFoundException('Book not found');

    book.stock += 1;
    book.borrowedCount -= 1;
    return this.bookRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }
}
