import React, { useState, useEffect } from 'react'; import '../pages/styles.css'
import { Card } from '../components/Card'

export function App() {

  const [studentName, setStudentName] = useState('');

  //Estado para armazenar os estudantes que forem sendo adicionados

  const [students, setStudents] = useState([]);

  //Para preencher o perfil do professor por API

  const [user, setUser] = useState({name:'', avatar:''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  //Outro Hook Use Effect
  useEffect(() => {
    fetch('https://api.github.com/users/milenamarlim').then(response=>response.json()).then(data=>{
      setUser({
        name:data.name,
        avatar:data.avatar_url
      })
    })
  }, [])

  return (
    <div className='quadro-geral'>
      <div className='cabecalho'>
        <h1>React</h1>
        <header>
          <h2>Lista de Presença </h2>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="foto de perfil" />
          </div>
        </header>
      </div>
      <div className='container'>
        <input type="text" placeholder='Digite aqui...'
          onChange={e => setStudentName(e.target.value)} />
        <h3>Aluno(a) {studentName}</h3>
        <button onClick={handleAddStudent}>
          Clique para adicionar
        </button>
      </div>

      {
        students.map(student =>
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />)
      }
    </div>
  )
}


