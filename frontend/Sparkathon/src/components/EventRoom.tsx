
function EventRoom() {

    var EventName = "Sample Event Name";
    var EventDescription = "Sample Event Description";
    var EventVenue = "Sample Event Venue";
    var EventDate = "2023-10-01T12:00";

  return (
        
        <div className="w-[70vw] mx-[5vw] my-2 gap-4 border border-gray-300 rounded-4xl">

            <div>{EventName}</div>
            <div>{EventDescription}</div>
            <div>{EventVenue}</div>
            <div>{EventDate}</div>
            
        </div>
  )
}

export default EventRoom