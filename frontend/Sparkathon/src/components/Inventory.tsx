import React, { use } from 'react'
import { useState } from 'react';

function Inventory() {

    var EventName = "Sample Event Name";
    var EventDescription = "Sample Event Description";
    var EventVenue = "Sample Event Venue";
    var EventDate = "Sample Event Date";

    const [Items, setItems] = useState({
        "item": {quantity: 0, price: 0, description: ""}
    });

    const [ItemName, setItemName] = useState('');
    const [ItemQuantity, setItemQuantity] = useState('');
    const [ItemPrice, setItemPrice] = useState('');
    const [ItemDescription, setItemDescription] = useState('');

    let addItem = () => {
        console.log("Adding item", ItemName, ItemQuantity, ItemPrice, ItemDescription);
        if (ItemName && ItemQuantity && ItemPrice && ItemDescription) {
            setItems({
                ...Items,
                ItemName: {
                    quantity: parseInt(ItemQuantity),
                    price: parseFloat(ItemPrice),
                    description: ItemDescription
                }
            });
            setItemName('');
            setItemQuantity('');
            setItemPrice('');
            setItemDescription('');
        }

    }

    const addItemHandler = (ItemKey, field, value) => {
        console.log("ItemKey", ItemKey, "field", field, "value", value);
        setItems(prev => ({
            ...prev,
            [ItemKey]: {
                ...prev[ItemKey],
                [field]: field === 'quantity' ? parseInt(value) || 0 : value
            }
        }));
    }

    const removeItem = (ItemKey: string) => {
        setItems(prev => {
            const newItems = { ...prev };
            delete newItems[ItemKey];
            return newItems;
        });
    }



    return (

        <div className="w-[70vw] mx-[5vw] my-2 gap-4 border border-gray-300 rounded-4xl">

            <div>
                <div>

                    <div>Item Name</div>
                    <div>
                        <input name='name' type='text' value={ItemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>

                    <div>Item Description</div>
                    <div>
                        <input name='desc' type='text' value={ItemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                    </div>

                    <div>Item Price</div>
                    <div>
                        <input name='price' type='number' value={ItemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </div>

                    <div>Quantity</div>
                    <div>
                        <input name='quantuty' type='number' value={ItemPrice} onChange={(e) => setItemQuantity(e.target.value)} />
                    </div>


                    <button onClick={addItem} type='submit' className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400">Add Item</button>

                </div>
            </div>

            <div>
                <button>Add Item</button>
            </div>


            <div>
                {Object.entries(Items).map(([Item, attribute]) => (
                    <div key={Item} className="border border-gray-300 rounded-lg p-4 my-2">
                        <div>
                            <strong>{Item}</strong>
                            <button onClick={() => removeItem(Item)}>Remove</button>
                        </div>

                        <div>
                            <input type="text" value={attribute.description} onChange={(e) => addItemHandler(Item, 'description', e.target.value)} />
                        </div>

                        <div>
                            <input type="number" value={attribute.quantity} onChange={(e) => addItemHandler(Item, 'quantity', e.target.value)} />
                        </div>

                        <div>
                            <input type="number" value={attribute.price} onChange={(e) => addItemHandler(Item, 'price', e.target.value)} />
                        </div>

                    </div>
                ))}
            </div>

        </div>

    )
}

export default Inventory