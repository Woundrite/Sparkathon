import React, { useState, useEffect } from "react";

interface InventoryProps {
    eventID?: string;
}

interface ItemAttributes {
    quantity: number;
    price: number;
    description: string;
}

interface ItemsState {
    [itemName: string]: ItemAttributes;
}

function Inventory({ eventID: propEventID }: InventoryProps) {
    const [eventID, setEventID] = useState<string | null>(propEventID || null);

    // Extract eventID from URL if not provided as prop
    useEffect(() => {
        if (!propEventID && typeof window !== "undefined") {
            const pathParts = window.location.pathname.split("/");
            const urlEventID = pathParts[pathParts.length - 1];
            if (urlEventID && urlEventID !== "event") {
                setEventID(urlEventID);
            }
        }
    }, [propEventID]);

    var EventName = "Sample Event Name";
    var EventDescription = "Sample Event Description";
    var EventVenue = "Sample Event Venue";
    var EventDate = "Sample Event Date";

    const [Items, setItems] = useState<ItemsState>({});

    const [ItemName, setItemName] = useState("");
    const [ItemQuantity, setItemQuantity] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemDescription, setItemDescription] = useState("");

    let addItem = () => {
        if (ItemName && ItemQuantity && ItemPrice && ItemDescription) {
            fetch("http://localhost:8000/add_items_to_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    event_id: eventID,
                    items: [
                        {
                            name: ItemName,
                            quantity: parseInt(ItemQuantity),
                            price: parseFloat(ItemPrice),
                            description: ItemDescription,
                        },
                    ],
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setItems({
                        ...Items,
                        [ItemName]: {
                            quantity: parseInt(ItemQuantity),
                            price: parseFloat(ItemPrice),
                            description: ItemDescription,
                        },
                    });
                    setItemName("");
                    setItemQuantity("");
                    setItemPrice("");
                    setItemDescription("");
                })
                .catch((error) => {
                    alert("Error adding item:" + error);
                });
        }
    };

    const addItemHandler = (
        ItemKey: string,
        field: keyof ItemAttributes,
        value: string | number
    ) => {
        setItems((prev) => ({
            ...prev,
            [ItemKey]: {
                ...prev[ItemKey],
                [field]:
                    field === "quantity"
                        ? parseInt(value as string) || 0
                        : value,
            },
        }));
    };

    const removeItem = (ItemKey: string) => {
        setItems((prev) => {
            const newItems = { ...prev };
            delete newItems[ItemKey];
            return newItems;
        });
    };

    const updateItem = (ItemKey: string) => {
        console.log("Updating item", ItemKey);
        // fetch("http://localhost:8000/update-item", {
        //     method: "POST",
        // });
    };

    return (
        <div className="w-[70vw] mx-[5vw] my-2 gap-4 border border-gray-300 rounded-4xl">
            <div>
                <div>
                    <div>Item Name</div>
                    <div>
                        <input
                            name="name"
                            type="text"
                            value={ItemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>

                    <div>Item Description</div>
                    <div>
                        <input
                            name="desc"
                            type="text"
                            value={ItemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </div>

                    <div>Item Price</div>
                    <div>
                        <input
                            name="price"
                            type="number"
                            value={ItemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                    </div>

                    <div>Quantity</div>
                    <div>
                        <input
                            name="quantity"
                            type="number"
                            value={ItemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={addItem}
                        type="submit"
                        className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400"
                    >
                        Add Item
                    </button>
                </div>
            </div>

            <div>
                <button>Add Item</button>
            </div>

            <div>
                {Object.entries(Items).map(([Item, attribute]) => (
                    <div
                        key={Item}
                        className="border border-gray-300 rounded-lg p-4 my-2"
                    >
                        <div>
                            <strong>{Item}</strong>
                            <button onClick={() => removeItem(Item)}>
                                Remove
                            </button>
                            <button onClick={() => updateItem(Item)}>
                                Update
                            </button>
                        </div>

                        <div>
                            <input
                                type="text"
                                value={attribute.description}
                                onChange={(e) =>
                                    addItemHandler(
                                        Item,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                value={attribute.quantity}
                                onChange={(e) =>
                                    addItemHandler(
                                        Item,
                                        "quantity",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                value={attribute.price}
                                onChange={(e) =>
                                    addItemHandler(
                                        Item,
                                        "price",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
