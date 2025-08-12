import "./carrossel.css"
import { useRef, useState } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const slide = [
    {
      imagem: "/image/lixeira_amarela.png",
      titulo: "Lixeira Amarela",
      lixo: "latas de alumínio (refrigerante, cerveja), latas de aço (milho, extrato de tomate), etc",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu purus arcu. Etiam ac arcu eu augue vehicula hendrerit sit amet ut massa. Mauris luctus tempor ipsum nec efficitur. Quisque sit amet lorem id sapien ullamcorper vestibulum ut nec massa. Suspendisse in enim eget leo porta aliquet"
    },
    {
      imagem: "/image/lixeira_azul.png",
      titulo: "Lixeira Azul",
      lixo: "",
      descricao: ""
    },
    {
      imagem: "/image/lixeira_verde.png",
      titulo: "Lixeira Verde",
      lixo: "",
      descricao: ""
    },
    {
      imagem: "/image/lixeira_vermelha.png",
      titulo: "Lixeira Vermelha",
      lixo: "",
      descricao: ""
    }
  ];  

export default function Carrossel () {
    const [indice, setIndice] = useState(0);
    let comeco = useRef(0);

    const imagemEsquerda = (indice - 1 + slide.length) % slide.length;
    const imagemMeio = indice;
    const imagemDireita = (indice + 1) % slide.length;

    const proxima = () => setIndice((indice + 1) % slide.length);
    const anterior = () => setIndice((indice - 1 + slide.length) % slide.length);

    const handleToqueComeco = (e) => {
        comeco = e.touches[0].clientX;
    }

    const handleToqueFim = (e) => {
        const fim = e.changedTouches[0].clientX;
        if (comeco - fim > 50) {
            proxima();
        } else if (fim - comeco > 50) {
            anterior();
        }
    }

    return (
        <div
          className="carrossel"
          onTouchStart={handleToqueComeco}
          onTouchEnd={handleToqueFim}
        >
          <div className="card">
            <div className="img-container">
                <img src={slide[imagemEsquerda].imagem} className="imagemEsquerda" />
                <img src={slide[imagemMeio].imagem} className="imagemMeio" />
                <img src={slide[imagemDireita].imagem} className="imagemDireita" />
            </div>
            <div className="infoBox">
              <div className="navegacao">
              <button className="botaoEsquerdo" onClick={anterior}> <KeyboardArrowLeftIcon/> </button>
              <h2>{slide[indice].titulo}</h2>
              <button className="botaoDireito" onClick={proxima}> <KeyboardArrowRightIcon/> </button>
              </div>
              <h3>O que vai: {slide[indice].lixo}</h3>
              <p>{slide[indice].descricao}</p>
            </div>
          </div>
        </div>
      );      
}