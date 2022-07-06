import NavBar from "../modules/NavBar"

const base = (props) => {
  return (
    <div className="d-flex ">
        <NavBar></NavBar>
        <main className="bg-very-light-orange col-12 pl-40 pr-40">
            {props.children}
        </main>
    </div>
  )
}

export default base