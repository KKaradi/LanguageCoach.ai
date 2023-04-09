

export default ({children, clickHandler}) => {
    return (
        <div onClick={clickHandler} className="styledContainer">{children}</div>
    )
}