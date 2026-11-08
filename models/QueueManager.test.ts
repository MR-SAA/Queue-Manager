import { test, expect } from "vitest";
import { QueueManager } from "./QueueManager";

test("Adding a visitor", () => {

    const manager = new QueueManager();

    manager.addVisitor("Renew License");

    expect(manager.waitingRoom.length).toBe(1);
});