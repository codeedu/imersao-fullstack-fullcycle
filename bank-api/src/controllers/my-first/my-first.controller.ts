import { Controller, Get, Post } from '@nestjs/common';

@Controller('my-first')
export class MyFirstController { 
    
    @Get('hello-world')
    index(){
      return {'key': 'value'};
    }

}
