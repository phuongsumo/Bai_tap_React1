const root = document.querySelector('#root');
console.log(root);

function App() {
    const [listReact, setListReact] = React.useState([
        { name: "Đinh Tuấn Anh", age: 20 },
        { name: "Ngụy Minh Thắng", age: 21 },
        { name: "Nguyễn Anh Thư", age: 22 },
    ]);
    const [listJava, setListJava] = React.useState([
        { name: "Bế Trọng Hiếu", age: 20 },
        { name: "Ngô Huỳnh Đức", age: 19 },
        { name: "Nguyễn Mạnh Dũng", age: 18 },
    ]);
    const [nameMember, setNameMember] = React.useState('')
    const [ageMember, setAgeMember] = React.useState('')
    const [type, setType] = React.useState('React')

    const handleTransferReact = (index) => {
        const memberTransfer = listReact.splice(index, 1)
        setListJava([
            ...listJava,
            ...memberTransfer
        ])
    }
    const handleTransferJava = (index) => {
        const memberTransfer = listJava.splice(index, 1)
        setListReact([
            ...listReact,
            ...memberTransfer
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'React') {
            setListReact([
                ...listReact,
                { name: nameMember, age: ageMember }
            ])
        } else if (type === 'Java') {
            setListJava([
                ...listJava,
                { name: nameMember, age: ageMember }
            ])
        }
        document.querySelector(".form_box").reset();
    }

    const handleChangeName = (name) => {
        setNameMember(name)
    }
    const handleChangeAge = (age) => {
        setAgeMember(age)
    }
    const handleChangeClass = (value) => {
        setType(value);
    }

    if (listReact.length == 0) {
        alert("Warning: React class is empty now")
    } else if (listJava.length == 0) {
        alert("Warning: Java class is empty now")
    }

    return (
        <div className="App">
            <div className="member_container">
                <h2>list member of React class</h2>
                <ul>
                    {listReact.length > 0 && listReact.map((member, index) => {
                        return (
                            <li key={member.name}>name: {member.name} - age: {member.age} <button onClick={() => handleTransferReact(index)}>transfer</button></li>
                        )
                    }) || <p>empty class</p>}
                </ul>
            </div>
            <div className="member_container">
                <h2>list member of Java class</h2>
                <ul>
                    {listJava.length > 0 && listJava.map((member, index) => {
                        return (
                            <li key={member.name}>name: {member.name} - age: {member.age} <button onClick={() => handleTransferJava(index)}>transfer</button></li>
                        )
                    }) || <p>empty class</p>}
                </ul>
            </div>
            <div className="form_container">
                <h2>Form add member</h2>
                <form className="form_box" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input required="required" type="text" name="name" onChange={(e) => handleChangeName(e.target.value)} />
                    </label>
                    <label>
                        Age:
                        <input required="required" type="text" name="age" onChange={(e) => handleChangeAge(e.target.value)} />
                    </label>
                    <select onChange={(e) => handleChangeClass(e.target.value)}>
                        <option value="React" key="1">React</option>
                        <option value="Java" key="2">Java</option>
                    </select>
                    <button type="submit">Add member</button>
                </form>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />, root
)