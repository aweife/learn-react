const Square = ({ colorValue, hexValue, isDarkText }) => {
    return (
        <section
            className="square"
            style={{
                backgroundColor: colorValue,
                color: isDarkText ? "#000" : "#FFF"
            }}
        >
            <p>{colorValue ? colorValue : "No Color"}</p>
            <p>{hexValue ? hexValue : null}</p>
        </section>
    )
}

Square.defaultProps = {
    colorValue: "No Color"
}

export default Square