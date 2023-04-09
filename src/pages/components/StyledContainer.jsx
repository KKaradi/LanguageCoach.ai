

export default function StyledContainer({children, clickHandler}) {
    return (
        <div onClick={clickHandler} className="styledContainer">{children}</div>
    )
}