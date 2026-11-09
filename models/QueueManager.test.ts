import { test, expect } from "vitest";
import { QueueManager } from "./QueueManager";

//Add visitor test cases
test("Adding a visitor", () => {

    const manager = new QueueManager();

    manager.addVisitor("Renew License");

    expect(manager.waitingRoom.length).toBe(1);
});

test("Empty String Visitor", () => {

    const manager = new QueueManager();

    manager.addVisitor("");

    expect(manager.waitingRoom.length).toBe(0);
});

test("Multipler Visitors", () => {

    const manager = new QueueManager();

    manager.addVisitor("License New");
    manager.addVisitor("Registration");
});

test("Multipler Visitors", () => {

    const manager = new QueueManager();

    manager.addVisitor("License New");
    manager.addVisitor("Registration");

    expect(manager.waitingRoom.length).toBe(2);
    expect(manager.waitingRoom[0].identifier).toBe(1);
    expect(manager.waitingRoom[1].identifier).toBe(2);

});

//Add Clerk tests
test("Valid Clerk", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    expect(manager.clerks.length).toBe(1);
})

test("Duplicate Name", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addClerk("Clark");

    expect(manager.clerks.length).toBe(1);
})

test("Empty Name", () => {
    const manager = new QueueManager();
    manager.addClerk("");

    expect(manager.clerks.length).toBe(0);
})

//Assign Visitor Test
test("Valid Assignment", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("New car");

    manager.assignVisitor(1, "Clark");
    expect(manager.clerks[0].visitorAssigned?.identifier).toBe(1);
})

test("Invalid ID", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("New car");

    manager.assignVisitor(3, "Clark");
    expect(manager.clerks[0].visitorAssigned).toBeNull();
})

test("Invalid Clerk", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("New car");

    manager.assignVisitor(1, "Fred");
    expect(manager.waitingRoom.length).toBe(1);
})

test("Invalid Clerk", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("New car");
    manager.addVisitor("New License");


    manager.assignVisitor(1, "Clark");
    manager.assignVisitor(2, "Clark");

    expect(manager.waitingRoom.length).toBe(1);
    expect(manager.clerks[0].visitorAssigned?.identifier).toBe(1);

})

//Clear Clerk Tests
test("Valid Assignment", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("New car");

    manager.assignVisitor(1, "Clark");
    manager.clearClerk("Clark")
    expect(manager.clerks[0].visitorAssigned).toBeNull();
    expect(manager.clerks[0].visitorsHelped).toBe(1);
    expect(manager.waitingRoom.length).toBe(0);
})

test("Already Clear", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.clearClerk("Clark")

    expect(manager.clerks[0].visitorAssigned).toBeNull();
    expect(manager.clerks[0].visitorsHelped).toBe(0);
    expect(manager.waitingRoom.length).toBe(0);
})

test("Clerk not real", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.clearClerk("Frank")

    expect(manager.clerks[0].visitorAssigned).toBeNull();
    expect(manager.clerks[0].visitorsHelped).toBe(0);
    expect(manager.waitingRoom.length).toBe(0);
})

//Remove Clerk Test
test("Valid Removal", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.removeClerk("Clark");

    expect(manager.clerks.length).toBe(0);
})

test("Occupied Clerk", () => {
    const manager = new QueueManager();
    manager.addClerk("Clark");
    manager.addVisitor("Car on fire");
    manager.assignVisitor(1, "Clark");
    manager.removeClerk("Clark")

    expect(manager.clerks.length).toBe(1);
    expect(manager.clerks[0].name).toBe("Clark");

})

test("Not Real Clerk", () => {
    const manager = new QueueManager();
    manager.addClerk("Frank");
    manager.removeClerk("Clark")

    expect(manager.clerks.length).toBe(1);
    expect(manager.clerks[0].name).toBe("Frank");

})











