import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from '../components/Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }

`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listadocripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar US'},
        { codigo: 'MXN', nombre: 'Peso mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'libra esterlina'}
    ]

    const [moneda, SelectMonedas] = useMoneda('Selecciona tu moneda', '', MONEDAS);

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listadocripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])


    const cotizarMoneda = e => {
        e.preventDefault();
        if(moneda === '' || criptomoneda === '' ) {           
            guardarError(true);
            return;
        }
              
        guardarError(false);        
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="todos los campos son obligatorios" /> : null }
            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />           
        </form>

     );
}
 
export default Formulario;