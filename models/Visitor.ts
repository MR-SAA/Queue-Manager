export class Visitor {
    private reason: string;
    private identifier: number;
    private time: Date;

    constructor(reason: string, identifier: number, time: Date){
        this.reason = reason;
        this.identifier = identifier;
        this.time = time;
    }
}