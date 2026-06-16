import { MongoDB } from "./common/databases/mongodb/mongo-connection";
import { AppServer } from "./server";

function main(){
    new MongoDB().connect();
    new AppServer().start();
}

main()