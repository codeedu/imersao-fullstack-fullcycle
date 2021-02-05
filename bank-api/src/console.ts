import { BootstrapConsole } from "nestjs-console";
import { AppModule } from "./app.module";

const bootstrap = new BootstrapConsole({
    module: AppModule,
    useDecorators: true
})

bootstrap.init().then(async app => {
    try{
        await app.init();
        await bootstrap.boot();
        process.exit(0);
    }catch(e){
        console.error(e);
        process.exit(1);
    }
})