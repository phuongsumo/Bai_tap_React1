const root = document.querySelector('#root');

function RenderData({ data, name, handleClick, handleEdit }) {
    return (
        <div className="member_container">
            <h2>list member of {name} class</h2>
            <ul>
                {data.length > 0 && data.map((member, index) => {
                    return (
                        <li key={index}>
                            name: {member.name} - age: {member.age}
                            <button onClick={() => handleClick(index)}>Transfer</button>
                            <button onClick={() => handleEdit(member, index)}>Edit</button>
                        </li>
                    )
                }) || <p>empty class</p>}
            </ul>
        </div>
    )
}

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

    const [data, setData] = React.useState({
        name: '',
        age: '',
        type: 'react'
    });

    const [showAdd, setShowAdd] = React.useState(true);

    React.useEffect(() => {
        if (listReact.length == 0) {
            alert("Warning: React class is empty now")
        } else if (listJava.length == 0) {
            alert("Warning: Java class is empty now")
        }
    }, [listReact.length, listJava.length])

    const handleTransferReact = (index) => {
        const memberTransfer = listReact.splice(index, 1)
        setListJava([
            ...listJava,
            ...memberTransfer
        ])
    };

    const handleTransferJava = (index) => {
        const memberTransfer = listJava.splice(index, 1)
        setListReact([
            ...listReact,
            ...memberTransfer
        ])
    };

    const handleEditUserReact = (user, index) => {
        setData({
            ...user,
            type: 'react',
            index: index
        });
        setShowAdd(false);
    }

    const handleEditUserJava = (user, index) => {
        setData({
            ...user,
            type: 'java',
            index: index
        });
        setShowAdd(false);
    }

    // Add member
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.type === 'react') {
            setListReact([
                ...listReact,
                {
                    name: data.name,
                    age: data.age
                }
            ])
        } else if (data.type === 'java') {
            setListJava([
                ...listJava,
                {
                    name: data.name,
                    age: data.age
                }
            ])
        }
        setData({
            name: '',
            age: '',
            type: 'react'
        });
    };

    // Edit member
    const handleEdit = (e) => {
        e.preventDefault();
        if (data.type === 'react') {
            listReact[data.index] = data
            setListReact(listReact)
        } else if (data.type === 'java') {
            listJava[data.index] = data
            setListJava(listJava)
        };

        setData({
            name: '',
            age: '',
            type: 'react'
        });
        setShowAdd(true);
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="App">
            <RenderData
                data={listReact}
                name="React"
                handleClick={handleTransferReact}
                handleEdit={handleEditUserReact}
            />
            <RenderData
                data={listJava}
                name="Java"
                handleClick={handleTransferJava}
                handleEdit={handleEditUserJava}
            />

            {showAdd &&
                <div className="form_container">
                    <h2>Form add member</h2>
                    <form className="form_box" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                onChange={(e) => handleChange(e)}
                                required="required"
                                type="text"
                                name="name"
                                value={data.name}
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                onChange={(e) => handleChange(e)}
                                required="required"
                                type="text"
                                name="age"
                                value={data.age}
                            />
                        </label>
                        <select
                            onChange={(e) => handleChange(e)}
                            name="type"
                            value={data.type}
                        >
                            <option value="react">React</option>
                            <option value="java">Java</option>
                        </select>
                        <button type="submit">Add member</button>
                    </form>
                </div>
                ||
                <div className="form_container">
                    <h2 style={{ color: 'red' }}>Form edit member</h2>
                    <form className="form_box" onSubmit={handleEdit}>
                        <label>
                            Name:
                            <input
                                onChange={(e) => handleChange(e)}
                                required="required"
                                type="text"
                                name="name"
                                value={data.name}
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                onChange={(e) => handleChange(e)}
                                required="required"
                                type="text"
                                name="age"
                                value={data.age}
                            />
                        </label>
                        <select
                            onChange={(e) => handleChange(e)}
                            name="type"
                            value={data.type}
                            disabled
                        >
                            <option value="react">React</option>
                            <option value="java">Java</option>
                        </select>
                        <button type="submit">Edit member</button>
                    </form>
                </div>
            }
        </div>
    )
}

ReactDOM.render(
    <App />, root
)