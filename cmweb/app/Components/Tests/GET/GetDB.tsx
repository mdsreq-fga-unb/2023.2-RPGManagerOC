import React, { useEffect, useState } from 'react';
import { Find } from '@/models/campanha';
import style from './get.module.css'

function GetDB( { socket }: any ) {
  const [id, setId] = useState(0);
  const [resultado, setResultado] = useState('');
  const [campanhaData, setCampanhaData] = useState(null);

  useEffect(() => {
    socket.on('find-data', ({_id, status, message, result}: any) => {
      setId(_id);
      setCampanhaData(result[0]);
      setResultado("status: " + status + '\n\n' + message);
    })
  }, [socket])

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  };
  
  const buscarCampanha = async (e: any) => {    
    e.preventDefault();
    try {
      const query = await Find.findData(id);
      const data = await query.json();
      const {status, message, result} = data;
      socket.emit('find-data', ({id, status, message, result}));

      if (status === 'success') {
        setCampanhaData(result[0]);
        setResultado("status: " + status + '\n\n' + message);
      } else {
        setResultado("status: " + status + '\n\n' + message);
        setCampanhaData(null);
      }
    } catch (error) {
      setResultado('Erro ao buscar os dados da campanha');
    }
  };

  return (
    <div className={style.get_db}>
      <form className={style.get_db_form}>
        <h1>GET</h1>        
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="number"
              value={id}
              onChange={handleIdChange}
            />
          </div>                  
          <div>
              {campanhaData && (
              <div>
                <br />
                {Object.entries(campanhaData).map(([key, value]) => (
                <div>
                  <label htmlFor="text">{key}</label>
                  <input
                    value={value !== null && value !== undefined ? value.toString() : ''}
                    readOnly
                  />
                </div>
                ))}
            </div>
              )}
          </div>
          <div>
            <label htmlFor="text">Resposta do banco</label>
            <textarea
              value={resultado}
              rows={4}
              readOnly
            />
          </div>
          <br />
          <button onClick={buscarCampanha}>Buscar Campanha</button>
        </form>
    </div>
  );
}

export default GetDB;
