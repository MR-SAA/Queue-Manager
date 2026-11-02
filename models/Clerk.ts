import { Visitor } from "./Visitor";
export class Clerk {
    private name: string;
    private busy: boolean;
    private visitorsHelped: number;
    private visitorAssigned: Visitor | null = null;

    constructor(name: string, busy: boolean, visitorsHelped: number, visitorAssigned: Visitor){
        this.name = name;
        this.busy = busy;
        this.visitorsHelped = visitorsHelped;
        this.visitorAssigned = visitorAssigned;
    }

    public clearClerk(): void{
        if(this.visitorAssigned != null){
        this.busy = false;
        this.visitorsHelped++;
        this.visitorAssigned = null;

        }
    }
}