'use client'
import { useState } from 'react';
import { Campanha } from '@/models/campanha';
import style from './post.module.css';

function PostDB() {
  const [resultadoSalvamento, setResultadoSalvamento] = useState('');
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [historia, setHistoria] = useState('');
  const [senhaMestre, setSenhaMestre] = useState('');

  const validarSenha = () => {
    return senhaMestre.length >= 5;
  };

  const salvarCampanhaNoDB = async (e: any) => {
    e.preventDefault();

    if (!validarSenha()) {
      setResultadoSalvamento("A senha deve ter pelo menos 5 caracteres");
      return;
    }

    const camp = new Campanha(id, nome, historia, senhaMestre);
    const response = await camp.saveData();

    if ('ok' in response) {
      if (response.ok) {
        const responseData = await response.json();
        setResultadoSalvamento("status: " + responseData.status + '\n\n' + responseData.message);
      } else {
        setResultadoSalvamento("Erro ao salvar campanha");
      }
    } else {
      setResultadoSalvamento("Erro ao salvar campanha");
    }
  };

  return (
    <div className={style.post_db}>
      <form className={style.post_db_form}>
        <h1>POST</h1>
        <div>
          <label htmlFor="id">ID:</label>
          <input className="text-black" type="number" value={id} onChange={(e) => setId(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="name">Nome da campanha</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label htmlFor="name">História da campanha</label>
          <input type="text" value={historia} onChange={(e) => setHistoria(e.target.value)} />
        </div> 
        <div>        
          <label htmlFor="password">Senha do mestre</label>
          <input type="password" value={senhaMestre} onChange={(e) => setSenhaMestre(e.target.value)} />
        </div>
        <div>
          <label htmlFor="text">Resposta do banco</label>
          <textarea
            value={resultadoSalvamento}
            rows={4}
            readOnly
          />
        </div>
        <br />
        <button onClick={salvarCampanhaNoDB}>Enviar para o banco</button>        
      </form>
    </div>
  );
}

export default PostDB;