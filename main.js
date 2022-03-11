const root = document.querySelector('#root');

function RenderData({ data, name, handleClick, handleEdit, handleDelete, total }) {
    return (
        <div className="member_container">
            <h2>list member of {name} class</h2>
            <p>Tổng số tuổi thành viên: {total} (Sử dụng useMemo)</p>
            <ul>
                {data.length > 0 && data.map((member, index) => {
                    return (
                        <li key={index}>
                            name: {member.name} - age: {member.age}
                            <button onClick={() => handleClick(index)}>Transfer</button>
                            <button onClick={() => handleEdit(member, index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
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

    const [searchInput, setSearchInput] = React.useState('');
    const [listSearch, setListSearch] = React.useState([]);


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

    const inputRef = React.useRef()
    const handleEditUserReact = (user, index) => {
        setData({
            ...user,
            type: 'react',
            index: index
        });
        setShowAdd(false);
        inputRef.current.focus();
    }

    const handleEditUserJava = (user, index) => {
        setData({
            ...user,
            type: 'java',
            index: index
        });
        setShowAdd(false);
        inputRef.current.focus();
    }

    // Add member
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.type === 'react') {
            setListReact([
                ...listReact,
                {
                    name: data.name,
                    age: Number(data.age)
                }
            ])
        } else if (data.type === 'java') {
            setListJava([
                ...listJava,
                {
                    name: data.name,
                    age: Number(data.age)
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
            setListReact([...listReact])
        } else if (data.type === 'java') {
            listJava[data.index] = data
            setListJava([...listJava])
        };

        setData({
            name: '',
            age: '',
            type: 'react'
        });
        setShowAdd(true);
    }

    const handleChange = (e) => {
        setData(() => {
            if (e.target.name === 'age') {
                return {
                    ...data,
                    [e.target.name]: Number(e.target.value)
                }
            }
            return {
                ...data,
                [e.target.name]: e.target.value
            }
        })
    }

    // Delete member
    const handleDeleteReactMember = (i) => {
        listReact.splice(i, 1)
        setListReact([
            ...listReact
        ])
    }
    const handleDeleteJavaMember = (i) => {
        listJava.splice(i, 1)
        setListJava([
            ...listJava
        ])
    }

    // Search member
    const handleChangeSearch = (value) => {
        setListSearch([])
        setSearchInput(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchCase = searchInput.toUpperCase();
        listReact.map(member => {
            const mem = member.name.toUpperCase();
            if (mem.includes(searchCase)) {
                listSearch.push(member);
                setListSearch(listSearch)
            }
        });
        listJava.map(member => {
            const mem = member.name.toUpperCase();
            if (mem.includes(searchCase)) {
                listSearch.push(member);
                setListSearch(listSearch)
            }
        });
        setSearchInput('')
    }

    // Sort member
    const handleSort = (e) => {
        if (e === 'big') {
            listReact.sort((a, b) => b.age - a.age)
            setListReact([...listReact])
            listJava.sort((a, b) => b.age - a.age)
            setListJava([...listJava])
        } else if (e === 'small') {
            listReact.sort((a, b) => a.age - b.age)
            setListReact([...listReact])
            listJava.sort((a, b) => a.age - b.age)
            setListJava([...listJava])
        }
    }

    // Thực hành useMemo, chức năng tìm xem đội nào già hơn, hi hi :3
    const totalJava = React.useMemo(() => {

        const result = listJava.reduce((result, item) => {
            console.log('render lai');
            return result + item.age
        }, 0);

        return result;
    }, [listJava, listReact])

    const totalReact = React.useMemo(() => {

        const result = listReact.reduce((result, item) => {
            console.log('render lai');
            return result + item.age
        }, 0);

        return result;
    }, [listReact, listJava])

    return (
        <div className="App">
            <div>Sort by age: <button onClick={() => handleSort('big')}>Từ lớn đến bé</button><button onClick={() => handleSort('small')}>Từ bé đến lớn</button></div>
            <RenderData
                data={listReact}
                name="React"
                handleClick={handleTransferReact}
                handleEdit={handleEditUserReact}
                handleDelete={handleDeleteReactMember}
                total={totalReact}
            />
            <RenderData
                data={listJava}
                name="Java"
                handleClick={handleTransferJava}
                handleEdit={handleEditUserJava}
                handleDelete={handleDeleteJavaMember}
                total={totalJava}
            />


            <div className="form_container">
                {showAdd &&
                    <h2>Form add member</h2>
                    ||
                    <h2 style={{ color: 'red' }}>Form edit member</h2>
                }
                <form className="form_box" onSubmit={(e) => { showAdd ? handleSubmit(e) : handleEdit(e) }}>
                    <label>
                        Name:
                        <input
                            onChange={(e) => handleChange(e)}
                            ref={inputRef}
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
                            type="number"
                            name="age"
                            value={data.age}
                        />
                    </label>
                    <select
                        onChange={(e) => handleChange(e)}
                        name="type"
                        value={data.type}
                        disabled={!showAdd}
                    >
                        <option value="react">React</option>
                        <option value="java">Java</option>
                    </select>
                    <button type="submit">Add member</button>
                </form>
            </div>

            <div className="form_container">
                <h2 style={{ color: 'blue' }}>Search member</h2>
                <form className="form_box" onSubmit={handleSearch}>
                    <label>
                        Search:
                        <input
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            required="required"
                            value={searchInput}
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm..."
                        />
                    </label>
                    <button type="submit">Search</button>
                </form>
            </div>
            <ul>
                {listSearch && listSearch.map((member, index) => {
                    return (
                        <li key={index}>name: {member.name} - age: {member.age}</li>
                    )
                })}
            </ul>
        </div>
    )
}

ReactDOM.render(
    <App />, root
)