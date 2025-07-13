import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
type Inputs = {
    EventName: string;
    EventDescription: string;
    EventVenue: string;
    EventDate: string;
};

function CreateEvent() {
    const [eventData, setEventData] = useState<Inputs>({
        EventName: "",
        EventDescription: "",
        EventVenue: "",
        EventDate: "",
    });

    const onSubmit = () => {
        const { EventName, EventDescription, EventVenue, EventDate } =
            eventData;

        console.log(eventData);

        fetch("http://localhost:8000/create_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name: EventName,
                description: EventDescription,
                location: EventVenue,
                date: EventDate,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Event created successfully:", data);
                // Optionally redirect or reset form
            })
            .catch((error) => {
                console.error("Error creating event:", error);
            });
    };

    return (
        <div>
            <div>
                <div>
                    <div>EventName</div>
                    <div>
                        <textarea
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    EventName: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <div>EventDescription</div>
                    <div>
                        <textarea
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    EventDescription: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <div>EventVenue</div>
                    <div>
                        <textarea
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    EventVenue: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <div>EventDate</div>
                    <div>
                        <input
                            onChange={(e) => {
                                setEventData({
                                    ...eventData,
                                    EventDate: e.target.value,
                                });
                            }}
                            required
                            type="datetime-local"
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={onSubmit}
                        className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1
                        active:bg-gray-400 active:text-white hover:bg-gray-300 
                        hover:text-white cursor-pointer hover:border-gray-400"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
