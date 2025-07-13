import React from 'react'

function EventNameButton() {

    var EventName = "Sample Event Name";

  return (
    <div>
        <button className="w-70 my-1 px-2 py-1 bg-gray-100 text-gray-500 rounded-lg border-gray-300 border-1 focus:bg-gray-300 focus:text-black hover:bg-gray-200 hover:text-gray-500 cursor-pointer hover:border-gray-400">{EventName}</button>
    </div>
  )
}

export default EventNameButton