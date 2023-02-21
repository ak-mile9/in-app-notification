import React, { useState } from "react"

export const ProducerForm = () => {
    const [title, setTitle] = useState("");
    const [forRole, setForRole] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [communicationResponse, setCommunicationResponse] = useState("");

    const onRoleSetHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        let newState = forRole;

        if (e.target.checked) {
            newState.push(value)
        } else {
            newState = newState.filter(f => f !== value)
        }
        setForRole([...newState]);
    }
    const onFormClearHandler = () => {
        setTitle("");
        setMessage("");
        setForRole([]);
    }
    const onFormSubmitHandler = () => {
        fetch("http://localhost:3333/v1/notification", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "message": message,
                "for_roles": forRole
            })
        }).then(response => {
            return response.json()
        }).then(httpResponse => {

            setCommunicationResponse(httpResponse.message)

        })
    }



    return <div style={{ "marginLeft": "25%", "width": "100%", "height": "100%", top: "10%", "lineHeight": "50px" }
    }>
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
            <label htmlFor="RPROJECTA_ROLE_1">RPROJECTA_ROLE_1</label>
            <input type="checkbox" onChange={(e) => onRoleSetHandler(e, 'RPROJECTA_ROLE_1')} checked={forRole.includes('RPROJECTA_ROLE_1')} />
        </div>
        <div>
            <label>RPROJECTA_ROLE_2</label>
            <input type="checkbox" onChange={(e) => onRoleSetHandler(e, 'RPROJECTA_ROLE_2')} checked={forRole.includes('RPROJECTA_ROLE_2')} />
        </div>
        <div>
            <label htmlFor="">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <button onClick={onFormClearHandler}>Clear</button>
        <button onClick={onFormSubmitHandler}>Submit</button>

        <div> {communicationResponse}</div>
    </div >
}