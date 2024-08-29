import { useState } from "react"

const RandomColor = () => {
    const [color, setColor] = useState("#FFFFFF");

    const HandleGenerateColor = (type: string) => {
        const typeL = type.toLowerCase();
        if (typeL == "rgb")
        {
            const red = Math.round(Math.random()*255);
            const green = Math.round(Math.random()*255);
            const blue = Math.round(Math.random()*255);
            let rgb = "rgb("+red+","+green+","+blue+")";
            setColor(rgb);
            return;
        }

        const hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let hex: string = "#"
        for (let i = 0; i < 6 ; i++)
        {
            hex += hexChars[Math.round(Math.random()*(hexChars.length-1))];
        }
        setColor(hex);
        return;
    }
    return (
        <div style={
            {
                width: "500px",
                minHeight: "200px",
                backgroundColor: color,
                justifyContent: "space-around"
            }
        }>
            <button onClick={() => HandleGenerateColor("rgb")}>Generate RGB Color</button>
            <button onClick={() => HandleGenerateColor("hex")}>Generate HEX Color</button>
            <h1>{color}</h1>
        </div>
    )
}

export default RandomColor