"use client";
//honestly not super sure what "use client" does, but google said to add it and it fixed an error I was having
import Image from "next/image";
import { QueueManager } from "@/models/QueueManager";
//useState will allow us to store values in between renders, so our tables are dynamic and update
import { useState } from "react"

//Initalizes queueManager
const queueManager = new QueueManager();

// //Assigns the waiting room array to a variable
// let waiting_room = queueManager.waitingRoom

// queueManager.addVisitor("Test");
// queueManager.addVisitor("Test2");

export default function Home() {

  //This allows me to use the useState() function of react to take in reasons and have react update them as the page updates
  //setReason is a function this React method gives us so that we can update the reasons in the future
  const [visitors, setVisitor] = useState([...queueManager.waitingRoom]);

  //This function calls the useState() function we just made so we can then have a html interface use this function to then update the table
  function addVisitor(reason: string){
    queueManager.addVisitor(reason);
    setVisitor([...queueManager.waitingRoom]);
  }

  //This sets up the React stuff, so you can connect the input of a text box to a React state
  const [text, setText] = useState("");

  //Using .map() allows the waiting_room array to be displayed below
  //the key stuff allows react to know that each instnce of visitor is a new entry so it will make a new line
  const reasons = visitors.map(visitors => <p key={visitors.reason}>{visitors.reason}</p>);
  const identifier = visitors.map(visitor => <p key={visitor.identifier}>{visitor.identifier}</p>)


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-8 px-16 bg-white dark:bg-black">
        {/* Display Queue Manager as the title at the top of the screen */}
        <h1 className="text-4xl font-bold text-center mb-8"> 
          Queue Manager </h1>
        <div>
          <h2 className="text-2xl text-left font-bold mb-8">Waiting Room</h2>
          {/* Use HTML Table to create an adapting table that can display the waiting room info */}
          <table>
            {/* Make the header of the table with all the catagories */}
            <thead>
              <tr>
                <th className="px-6">Identifier</th>
                <th className="px-6">Reason</th>
                <th className="px-6">Date</th>
              </tr>
            </thead>

            {/* Actual body of waiting room */}
            <tbody>
              <tr>
                <td className="px-6">{identifier}</td>
                <td className="px-6">{reasons}</td>
              </tr>
            </tbody>
          </table>

          {/* Add Visitor textbox code */}
          <input type="text" placeholder="Visitor Reason" value={text} onChange={(event) => setText(event.target.value)}>
          </input>
          {/* Have a button that then takes that input and updates the waiting room */}
          <button onClick={() => addVisitor(text)}>
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
