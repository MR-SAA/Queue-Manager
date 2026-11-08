import { Visitor } from "./Visitor";
export class Clerk {
    public name: string;
    private busy: boolean;
    public visitorsHelped: number;
    public visitorAssigned: Visitor | null = null;

    constructor(name: string, busy: boolean, visitorsHelped: number, visitorAssigned: Visitor | null){
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