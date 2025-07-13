import React from 'react'
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

type Inputs = {
  EventName: string
  EventDescription: string
  EventVenue: string
  EventDate: string
}

function CreateEvent() {

        const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm<Inputs>()
        
        const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        event?.preventDefault();  // optional fallback
        console.log("apple", data);
    };

  return (
    <div>
        
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <div>
                    EventName
                </div>
                <div>
                    <textarea {...register("EventName", {required: true})} />
                </div>
            </div>

            <div>
                <div>
                    EventDescription
                </div>
                <div>
                    <textarea {...register("EventDescription", {required: true})} />
                </div>
            </div>

            <div>
                <div>
                    EventVenue
                </div>
                <div>
                    <textarea {...register("EventVenue", {required: true})} />
                </div>
            </div>

            <div>
                <div>
                    EventDate
                </div>
                <div>
                    <input {...register("EventDate", {required: true})} type='datetime-local'/>
                </div>
            </div>

            <div>
                <button type="submit">Create</button>
            </div>

        </form>

    </div>


  )
}

export default CreateEvent