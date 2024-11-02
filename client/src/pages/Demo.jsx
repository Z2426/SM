import { useState } from "react";
import { NoProfile } from "../assets";

export default function Demo() {
  const [list, setList] = useState([]);

  const handleAddToList = (newItem) => {
    setList([...list, newItem]); // Update the list state
  };

  return (
    <div>
      {list.length > 0 && (
        <div>
          {list.map((friend) => (
            <div
              key={friend._id}
              className="flex flex-col justify-center items-center"
            >
              <img
                src={NoProfile}
                alt=""
                className="h-16 w-full object-contain rounded-full"
              />
              <span>{friend?.firstName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Button or other trigger to add items to the list */}
      <button onClick={() => handleAddToList({ firstName: "New Friend" })}>
        Add Friend
      </button>
    </div>
  );
}
