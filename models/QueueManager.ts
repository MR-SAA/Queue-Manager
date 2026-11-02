import { Visitor } from "./Visitor";
import { Clerk } from "./Clerk";
import { Old_Standard_TT } from "next/font/google";

class QueueManager{
    public clerks: Array<Clerk> = [];
    public waitingRoom: Array<Visitor> = [];
    public beingHelped: Array<Visitor> = [];
    public identifier_num: number = 0;

    public clearClerk(clerk: Clerk): void{
        clerk.clearClerk();
    }

    public addVisitor(reason: string){
        const arrivalTime = new Date();
        let newVisitor = new Visitor(reason, this.identifier_num, arrivalTime);
        this.waitingRoom.push(newVisitor);
        this.identifier_num++;
    }




}

// const manager = new QueueManager();

// manager.addVisitor("Test");
// manager.addVisitor("Test2");
// manager.addVisitor("Test3");


// console.log(manager.waitingRoom);