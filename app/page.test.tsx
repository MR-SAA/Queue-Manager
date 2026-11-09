//Imports given by the prof for this test file
import { expect, test, beforeEach } from 'vitest'
import Home from './page'
import { screen, render, fireEvent } from '@testing-library/react'

//Resets the screen before each test so the data does not persist

test("Adding a visitor through the UI", () => {
    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText("Visitor Reason"), {
        target: { value: "Renew License" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[0]);

    expect(screen.getByText("Renew License")).toBeTruthy();
});

test("Adding multiple visitor through the UI", () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText("Visitor Reason"), {
        target: { value: "Renew License" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[0]);

    fireEvent.change(screen.getByPlaceholderText("Visitor Reason"), {
        target: { value: "Car on fire" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[0]);
    expect(screen.getByText("Renew License")).toBeTruthy();
    expect(screen.getByText("Car on fire")).toBeTruthy();

});

test("Add Clerk", () => {
    render(<Home />);

    fireEvent.change(screen.getAllByPlaceholderText("Clerk Name")[0], {
        target: { value: "Clark" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[1]);

    expect(screen.getAllByText("Clark").length).toBeGreaterThan(0);
});

test("Multiple Clerks", () => {
    render(<Home />);

    fireEvent.change(screen.getAllByPlaceholderText("Clerk Name")[0], {
        target: { value: "Clark" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[1]);

    fireEvent.change(screen.getAllByPlaceholderText("Clerk Name")[0], {
        target: { value: "Frank" }
    });

    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[1]);


    expect(screen.getAllByText("Clark").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Frank").length).toBeGreaterThan(0);

});

test("Remove Clerk", () => {
    render(<Home />);

    fireEvent.change(screen.getAllByPlaceholderText("Clerk Name")[0], {
        target: { value: "Clark" }
    });
    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[1]);

    fireEvent.change(screen.getAllByPlaceholderText("Clerk Name")[2], {
        target: { value: "Clark" }
    });
    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[4]);

    expect(screen.queryByText("Clark")).toBeNull();
});

