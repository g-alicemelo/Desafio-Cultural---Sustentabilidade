import "./carrossel.css"
import { useRef, useState} from "react"
import { gsap } from "gsap";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const slide = [
    {
      imagem: "/image/lixeira_amarela.png",
      titulo: "Lixeira Amarela",
      lixo: "latas de alumínio (refrigerante, cerveja), latas de aço (milho, extrato de tomate), etc",
      descricao: "O alumínio, por exemplo, leva mais de 200 anos para se decompor, mas é totalmente reciclável e pode ser reaproveitado inúmeras vezes. A reciclagem de metais economiza energia e reduz a extração mineral, preservando o meio ambiente. O Brasil é referência mundial na reciclagem de latas de alumínio, chegando a reaproveitar mais de 95% da produção anual."
    },
    {
      imagem: "/image/lixeira_azul.png",
      titulo: "Lixeira Azul",
      lixo: "folhas, jornais, revistas, cadernos, papel sulfite, caixas de papelão limpas, envelopes, cartolinas, embalagens longa vida (desde que limpas e secas).",
      descricao: "O papel é um dos materiais mais fáceis de reciclar e sua produção consome recursos naturais como água e árvores. Quando descartado incorretamente, pode levar de 3 a 6 meses para se decompor. A reciclagem do papel reduz a necessidade de corte de árvores e diminui o volume de lixo nos aterros. É importante que o papel esteja limpo e seco para não prejudicar o processo de reciclagem."
    },
    {
      imagem: "/image/lixeira_verde.png",
      titulo: "Lixeira Verde",
      lixo: "garrafas, copos de vidro, potes de conserva, frascos de perfumes, embalagens de remédios (sem restos de produto).",
      descricao: " O vidro é praticamente eterno na natureza, podendo levar mais de 1 milhão de anos para se decompor. Felizmente, é 100% reciclável e pode ser reutilizado infinitamente sem perder qualidade. Reciclar vidro economiza cerca de 70% de energia em comparação à fabricação a partir de matéria-prima nova. Antes do descarte, retire tampas e lave o recipiente."
    },
    {
      imagem: "/image/lixeira_vermelha.png",
      titulo: "Lixeira Vermelha",
      lixo: " garrafas PET, tampas, potes, sacolas plásticas, embalagens de produtos de limpeza, canos de PVC, baldes, brinquedos plásticos.",
      descricao: "O plástico é leve e resistente, mas é um dos maiores poluentes do planeta. Pode levar cerca de 400 anos para se decompor e muitas vezes acaba nos rios e oceanos, prejudicando a vida marinha. Quando reciclado, pode ser transformado em fibras têxteis, novas embalagens e peças de construção civil. É essencial lavar as embalagens antes do descarte."
    }
  ];  

export default function Carrossel () {
    const [indice, setIndice] = useState(0);
    const comeco = useRef(0);

    const imgEsqRef = useRef(null);
    const imgMeioRef = useRef(null);
    const imgDirRef = useRef(null);

    const imagemEsquerda = (indice - 1 + slide.length) % slide.length;
    const imagemMeio = indice;
    const imagemDireita = (indice + 1) % slide.length;

    const proxima = () => {
      // Atualiza índice
      const novoIndice = (indice + 1) % slide.length;
      setIndice(novoIndice);

      imgMeioRef.current.style.zIndex = 3;
      imgEsqRef.current.style.zIndex = 2;
      imgDirRef.current.style.zIndex = 1;
  
      // Animação estilo "próximo"
      gsap.fromTo(imgMeioRef.current,
        { x: 200, scale: 0.6},
        { x: 0, scale: 1, duration: 0.5}
      );
      gsap.fromTo(imgEsqRef.current,
        { x: 100, scale: 0.6, zIndex:2 },
        { x: 0, scale: 1, duration: 0.5}
      );
      gsap.fromTo(imgDirRef.current,
        { x: -200, scale: 0.6, zIndex:3 },
        { x: 0, scale: 1, duration: 0.5, onStart: () => { imgDirRef.current.style.zIndex = 1;}}
      );
    };
  
    const anterior = () => {
      // Atualiza índice
      const novoIndice = (indice - 1 + slide.length) % slide.length;
      setIndice(novoIndice);
  
      // Animação estilo "anterior"
      gsap.fromTo(imgMeioRef.current,
        { x: -200, scale: 0.6, zIndex:3 },
        { x: 0, scale: 1, duration: 0.5, zIndex:3 }
      );
      gsap.fromTo(imgDirRef.current,
        { x: -100, scale: 0.6, zIndex:2},
        { x: 0, scale: 1, duration: 0.5, zIndex:2 }
      );
      gsap.fromTo(imgEsqRef.current,
        { x: 200, scale: 0.6, zIndex:1},
        { x: 0, scale: 1, duration: 0.5, zIndex:1 }
      );
    };


    const handleToqueComeco = (e) => {
      comeco.current = e.touches[0].clientX;
    }

    const handleToqueFim = (e) => {
        const fim = e.changedTouches[0].clientX;
        if (comeco.current - fim > 50) {
            proxima();
        } else if (fim - comeco.current > 50) {
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
                <img ref={imgEsqRef} src={slide[imagemEsquerda].imagem} className="imagemEsquerda" alt={slide[imagemEsquerda].titulo} />
                <img ref={imgMeioRef} src={slide[imagemMeio].imagem} className="imagemMeio" alt={slide[imagemMeio].titulo}/>
                <img ref={imgDirRef} src={slide[imagemDireita].imagem} className="imagemDireita" alt={slide[imagemDireita].titulo}/>
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