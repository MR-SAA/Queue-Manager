import { Visitor } from "./Visitor";
import { Clerk } from "./Clerk";
import { Old_Standard_TT } from "next/font/google";

class QueueManager{
    public clerks: Array<Clerk> = [];
    public waitingRoom: Array<Visitor> = [];
    public beingHelped: Array<Visitor> = [];
    public identifier_num: number = 1;

    public clearClerk(name: string): void{
        const clerk = this.clerks.find(clerk => clerk.name === name);

        if(clerk != undefined){
            const vis = clerk.visitorAssigned;
            if (vis != null)
            {
                const index = this.beingHelped.indexOf(vis);
                if (index != -1)
                {
                    this.beingHelped.splice(index, 1);
                    clerk.clearClerk();
                }
            }
        }
    }

    public addVisitor(reason: string){
        const arrivalTime = new Date();
        let newVisitor = new Visitor(reason, this.identifier_num, arrivalTime);
        this.waitingRoom.push(newVisitor);
        this.identifier_num++;
    }

    public addClerk(name: string){
       let newClerk = new Clerk(name, false, 0, null);
       this.clerks.push(newClerk);

    }

    public removeClerk(name: string){
        const clerk = this.clerks.find(clerk => clerk.name === name);

        if(clerk != undefined && clerk.visitorAssigned == null){
            let index = this.clerks.indexOf(clerk);
            this.clerks.splice(index, 1);
        }

    }

    public assignVisitor(indentifier: number, name: string)
    {
        const clerk = this.clerks.find(clerk => clerk.name === name);
        const Visitor = this.waitingRoom.find(Visitor => Visitor.identifier === indentifier);

        if(Visitor && clerk != undefined && clerk.visitorAssigned == null){
            let index = this.waitingRoom.indexOf(Visitor);
            this.waitingRoom.splice(index, 1);

            this.beingHelped.push(Visitor);
            clerk.visitorAssigned = Visitor;

        }


    }


}

const manager = new QueueManager();

manager.addVisitor("Test");
manager.addVisitor("Test2");
manager.addVisitor("Test3");
manager.addClerk("John");
manager.addClerk("Frank")

manager.assignVisitor(1, "Frank")

manager.clearClerk("Frank")

console.log(manager.beingHelped);
