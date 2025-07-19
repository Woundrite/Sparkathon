import React, { useState, useEffect } from "react";

interface Event {
    eventID: string;
    name: string;
    description: string;
    location: string;
    date: string;
}

function EventRoom() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No authentication token found");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    "http://localhost:8000/get_user_events",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events || []);
                } else {
                    setError(`Failed to fetch events: ${response.statusText}`);
                }
            } catch (err) {
                setError(
                    `Network error: ${
                        err instanceof Error ? err.message : "Unknown error"
                    }`
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="w-[70vw] mx-[5vw] my-2 p-4">Loading events...</div>
        );
    }

    if (error) {
        return (
            <div className="w-[70vw] mx-[5vw] my-2 p-4 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="w-[70vw] mx-[5vw] my-2 gap-4">
            <h2 className="text-2xl font-bold mb-4">Your Events</h2>
            {events.length === 0 ? (
                <div className="border border-gray-300 rounded-lg p-4">
                    No events found. Create your first event!
                </div>
            ) : (
                events.map((event) => (
                    <div
                        key={event.eventID}
                        className="border border-gray-300 rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() =>
                            (window.location.href = `/event/${event.eventID}`)
                        }
                    >
                        <h3 className="text-xl font-semibold">{event.name}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Location:</strong> {event.location}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Date:</strong>{" "}
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                            <span className="text-blue-500 hover:text-blue-700">
                                Click to manage items →
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EventRoom;
