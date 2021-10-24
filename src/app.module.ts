import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Entries from './entity';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'meetingnote',
      entities: Entries,
      synchronize: true,
    }),
    UserModule,
    NoteModule,
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
