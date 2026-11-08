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
  const [clerks, setClerk] = useState([...queueManager.clerks])

  const [selectedClerk, setSelectedClerk] = useState("");
  const [visitorID, setVisitorID] = useState("")
  //This function calls the useState() function we just made so we can then have a html interface use this function to then update the table
  function addVisitor(reason: string){
    queueManager.addVisitor(reason);
    setVisitor([...queueManager.waitingRoom]);
  }

  function assignVisitor(identifier: number, name: string){
    queueManager.assignVisitor(identifier, name);
    setVisitor([...queueManager.waitingRoom]);
    setClerk([...queueManager.clerks]);

  }


  function addClerk(name: string){
    queueManager.addClerk(name);
    setClerk([...queueManager.clerks])
  }

  function clearClerk(name: string){
    queueManager.clearClerk(name);
    setClerk([...queueManager.clerks]);

  }

  function removeClerk(name: string){
    queueManager.removeClerk(name);
    setClerk([...queueManager.clerks]);

  }



  //This sets up the React stuff, so you can connect the input of a text box to a React state
  const [reason, setText] = useState("");
  const [clerk_name, setName] = useState("");
  const [visitor_to_assign, setTheVisitor] = useState("");
  const [clerk_name_to_clear, clearName] = useState("");
  const [clerk_name_to_remove, removeName] = useState("");

  //Using .map() allows the waiting_room array to be displayed below
  //the key stuff allows react to know that each instnce of visitor is a new entry so it will make a new line
  const reasons = visitors.map(visitors => <p key={visitors.identifier}>{visitors.reason}</p>);
  const identifier = visitors.map(visitor => <p key={visitor.identifier}>{visitor.identifier}</p>)
  const date = visitors.map(visitor => <p key={visitor.identifier}>{visitor.time.toLocaleTimeString()}</p>)
  
  const name = clerks.map(clerks => <p key={clerks.name}>{clerks.name}</p>)
  const visitorsHelped = clerks.map(clerks => <p key={clerks.name}>{clerks.visitorsHelped}</p>)
  const visitorAssigned = clerks.map(clerks => <p key={clerks.name}>{clerks.visitorAssigned?.identifier}</p>)

  const dropDownNames = clerks.map(clerk => <option key={clerk.name} value={clerk.name}>{clerk.name}</option>)


return (
  <div className="flex flex-col flex-1 items-start justify-center bg-zinc-50 font-sans dark:bg-black">
    <main className="flex flex-1 w-full flex-col items-start justify-start py-8 px-16 bg-white dark:bg-black">

      {/* Display Queue Manager as the title at the top of the screen */}
      <h1 className="w-full text-4xl font-bold text-center mb-8">
        Queue Manager
      </h1>
      
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center">
          {/* Add Visitor textbox code */}
          <p className="px-3">New Visitor:</p>
          <input
            className="text-center items-center"
            type="text"
            placeholder="Visitor Reason"
            value={reason}
            onChange={(event) => setText(event.target.value)}
          />
          {/* Have a button that then takes that input and updates the waiting room */}
          <button className="px-3" onClick={() => addVisitor(reason)}>
            Submit
          </button>
        </div>

        <div className="w-full flex justify-center">
          {/* Add clerk textbox code */}
          <p className="px-3">Add Clerk:</p>
          <input
            className="text-center items-center"
            type="text"
            placeholder="Clerk Name"
            value={clerk_name}
            onChange={(event) => setName(event.target.value)}
          />
          {/* Have a button that then takes that input and updates the waiting room */}
          <button className="px-3" onClick={() => addClerk(clerk_name)}>
            Submit
          </button>
        </div>


        <div className="w-full flex justify-center">
          {/* assignVisitor textbox code */}
          <p className="px-3">Assign Visitor:</p>
          {/* HTML Drop down code, so the Manager can select the Clerks from who is already there */}
          <select
            value={selectedClerk}
            onChange={(event) => setSelectedClerk(event.target.value)}>
            {/* Makes it so you have to select a clerk first. Otherwise things dont work */}
            <option value="" disabled>Select a Clerk</option>
            {dropDownNames}
          </select>
          <input
            className="text-center items-center"
            type="text"
            placeholder="Visitor Identifier"
            value={visitor_to_assign}
            onChange={(event) => setTheVisitor(event.target.value)}
          />
          {/* Have a button that then takes that input and updates the waiting room */}
          <button className="px-3" onClick={() => assignVisitor(Number(visitor_to_assign), selectedClerk)}>
            Submit
          </button>
        </div>

        {/*Clear Clerk UI*/}
        <div className="w-full flex justify-center">
          {/* Add clerk textbox code */}
          <p className="px-3">Clear Clerk:</p>
          <input
            className="text-center items-center"
            type="text"
            placeholder="Clerk Name"
            value={clerk_name_to_clear}
            onChange={(event) => clearName(event.target.value)}
          />
          {/* Have a button that then takes that input and updates the waiting room */}
          <button className="px-3" onClick={() => clearClerk(clerk_name_to_clear)}>
            Submit
          </button>
        </div>

        {/*Remove Clerk UI*/}
        <div className="w-full flex justify-center">
          {/* Add clerk textbox code */}
          <p className="px-3">Remove Clerk:</p>
          <input
            className="text-center items-center"
            type="text"
            placeholder="Clerk Name"
            value={clerk_name_to_remove}
            onChange={(event) => removeName(event.target.value)}
          />
          {/* Have a button that then takes that input and updates clerks */}
          <button className="px-3" onClick={() => removeClerk(clerk_name_to_remove)}>
            Submit
          </button>
        </div>
      </div>
      



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
              <td className="px-6">{date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Clerk array */}
      <div>
        <h2 className="text-2xl text-left font-bold mb-8 mt-12">Clerk List</h2>

        {/* Use HTML Table to create an adapting table that can display the waiting room info */}
        <table>
          {/* Make the header of the table with all the catagories */}
          <thead>
            <tr>
              <th className="px-6">Clerk Name</th>
              <th className="px-6">Visitors Helped</th>
              <th className="px-6">Visitor Assigned</th>
            </tr>
          </thead>

          {/* Actual body of waiting room */}
          <tbody>
            <tr>
              <td className="px-6">{name}</td>
              <td className="px-6">{visitorsHelped}</td>
              <td className="px-6">{visitorAssigned}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
);
}