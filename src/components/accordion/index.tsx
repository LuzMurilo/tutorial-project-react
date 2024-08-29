import { useState } from "react";
import data from "./data"
import './styles.css'


function Accordion() {

    const [selected, setSelection] = useState("");
    const [multiSelection, setMultiSelection] = useState(false);

    function handleSelection(id: string) {
        if (!multiSelection)
        {
            if (id === selected) 
            {
                setSelection("");
                return;
            }
            setSelection(id);
            return;
        }
        
        const selectedArray = selected.split(",");
        let newString = "";
        let found = false;
        for (let i = 0; i < selectedArray.length; i++)
        {
            if (selectedArray[i] === id) found=true;
            else newString += selectedArray[i] + ",";
        }
        if (!found) newString += id + ",";
        setSelection(newString);
    }

    const checkSelected = (id: string): boolean => {
        if (!multiSelection) return (selected === id);

        const selectedArray = selected.split(",");

        for (let i = 0; i < selectedArray.length; i++)
        {
            if (selectedArray[i] === id) return true;
        }
        return false;
    }

    const handleEnableMultiSelection = () => {
        setSelection("");
        setMultiSelection(!multiSelection);
    }

    if (!data || data.length <= 0) {
        return <p>No data found!</p>
    }

    return (
        <>
        <button onClick={handleEnableMultiSelection}>Enable Multi Selection</button>
        <div className="accordion">
            {
                data.map(item => <div className="item" key={item.id}>
                    <div className="title" onClick={() => handleSelection(item.id)}>
                        <h3>{item.question}</h3>
                        <span>+</span>
                    </div>
                    {

                        checkSelected(item.id) ?
                        <div className="content">
                            <h4>{item.answer}</h4>
                        </div>
                        : null
                    }
                </div>)
            }

        </div>
        </>
    );
}

export default Accordion