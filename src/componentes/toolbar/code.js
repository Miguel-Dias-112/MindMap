import React from "react";
import ReactDOM from "react-dom";
import conect from '../imagens/conect.svg'
import conect2 from '../imagens/conect2.svg'

import reset from '../imagens/reset.svg'

import menos from '../imagens/delete.svg'
import handleMouseMove from '../workbanch/code.js'

import mais from '../imagens/mais.svg'

import './toolbar_estilo.css'
import "./nó.css"

export default class Tollbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:true,
            toolbar_mode:"select",
            click:''
        }
        this.novo = this.novo.bind(this);
        this.nova_conexão = this.nova_conexão.bind(this);
    }
    nova_conexão=function(Nó1,Nó2) {
        const workbanch =  document.getElementById("workbanch_main")

        let canvas = workbanch.firstChild
        let ctx = canvas.getContext("2d")
        ctx.beginPath();
        ctx.strokeStyle = "#4169e1";
       
        Nó1.conexões.push([Nó2.div,Nó2.id])//salva a div na conexões
        Nó2.conexões.push([Nó1.div,Nó1.id])//salva a div na conexões
                            
        let pos1= [parseInt(Nó2.div.style.left.replace('px',''))+Nó2.div.offsetWidth/2,
                                        parseInt(Nó2.div.style.top.replace('px',''))+Nó2.div.offsetHeight/2 ]
        let pos2= [parseInt(Nó1.div.style.left.replace('px',''))+Nó1.div.offsetWidth/2,
                                        parseInt(Nó1.div.style.top.replace('px',''))+Nó1.div.offsetHeight/2 ]

        console.log(Nó1.div.style.top+"|"+Nó2.div.style.top)   

        ctx.moveTo(pos1[0],pos1[1])
        ctx.lineTo(pos2[0],pos2[1])
        console.log("s")
        ctx.stroke()
            
        
        
    }
    novo=function(texto,_id,_conexões) {
        const workbanch =  document.getElementById("workbanch_main")

        if( this.props.files[this.props.projeto_sel.index]===undefined){
        }else{

        let _select_nó =this.props.select_nó
        //const novo_elemento =React.createElement(S, {select_nó:_select_nó , texto:x},'');
        let novo_nó={
            div: document.createElement("div"),
            h1: document.createElement("span"),
            conexões:_conexões,
            id:_id

        }
        let x = texto
        novo_nó.h1.innerText=x
        novo_nó.div.className='nó'
        novo_nó.div.style.left='1px'
        novo_nó.div.style.top='1px'

        novo_nó.div.onmousedown=function (params) {
            console.log(novo_nó)
            switch (this.state.toolbar_mode) {
                case 'select':
                    this.props.select_nó(novo_nó)
                    break;
                case "delete":
                    workbanch.removeChild(novo_nó.div)
                    let nós = this.props.projeto_sel.nós
                    for (let i = 0; i < nós.length; i++) {
                        const nó = nós[i];
                        for (let z = 0; z < nó.conexões.length; z++) {
                            const conexão = nó.conexões[z];
                            if(conexão[1]===novo_nó.id){
                                nó.conexões.splice(z,1)
                            }
                            
                        }
                    }
                    let canvas = workbanch.children[0]

                    console.log(nós)
                    this.props.files[this.props.projeto_sel.index].nós.splice(novo_nó.id,1)
                    this.props.cria_novoNó(this.props.files)
                    let ctx = canvas.getContext("2d")
                    ctx.clearRect(0,0,canvas.width,canvas.height)

                    let nos=this.props.projeto_sel.nós
                    for (let i = 0; i < nos.length; i++) {
                        const nó =  nos[i];
                        
                     
                        for (let x = 0; x < nó.conexões.length; x++) {
                           
                            const element2 =  nó.conexões[x][0];
                            try {
                                ctx.beginPath();
                                ctx.strokeStyle = "#4169e1";
                                let pos1=[
                                
                                    parseInt(nó.div.style.left.replace(/[^\d]+/g,''))+parseInt(nó.div.offsetWidth/2),
                                    parseInt(nó.div.style.top.replace(/[^\d]+/g,''))+parseInt(nó.div.offsetHeight/2)
                                 ]
    
                                let pos2=[parseInt(element2.style.left.replace(/[^\d]+/g,''))+parseInt(element2.offsetWidth/2),
                                        parseInt( element2.style.top.replace(/[^\d]+/g,''))+parseInt(element2.offsetHeight/2)
                                    ]
    
                                ctx.moveTo(pos1[0],pos1[1])
    
                                ctx.lineTo(pos2[0],pos2[1])
                                       
                                ctx.stroke();
                            } catch (error) {
                               
                                   
                            }
                            
    
                        }
        
                      
                    }   
                    this.setState({toolbar_mode:'select'})

                    break;
                case 'do_a_connection':
                   
                    switch (this.state.click) {
                        case '':
                            console.log(novo_nó)
                            this.setState({click:novo_nó})
                            break;
                    
                        default:
                            
                            console.log(novo_nó)
              
                            this.nova_conexão(this.state.click,novo_nó)
                            
                          

                            this.setState({click:''})
                            this.setState({toolbar_mode:'select'})

                            break;
                    }
                    break;
                default:
                    break;
            }
               


        }.bind(this)
        novo_nó.div.onmouseup=function (params) {
            this.props.select_nó('')
        }.bind(this)
        
        novo_nó.div.appendChild(novo_nó.h1)
        workbanch.appendChild(novo_nó.div)
        this.props.projeto_sel.element_id+=1
        this.props.files[this.props.projeto_sel.index].nós.push(novo_nó)
        this.props.cria_novoNó( this.props.files)
        //console.log(this.props.projeto_sel)
            
               
    }
        
          

    }
    clear=function() {
        this.props.files[this.props.projeto_sel.index].nós=[]
        let y =  document.getElementById("workbanch_main")
        let x =  y.children[0]
        let ctx=x.getContext("2d")
        ctx.clearRect(0,0,x.width,x.height)

        y.innerHTML=''
        y.appendChild(x)
        console.log(y.children)
        
       
       
      
    
    }
    conection_mode(){
        this.setState({toolbar_mode:"do_a_connection"})

    }       
        
    delete_mode(){
        this.setState({toolbar_mode:"delete"})

    }          
    mouseefect=function(e) {
        console.log(e)
        e.currentTarget.style.border='solid 1px royalblue'

    }
    mouseefect2=function(e) {
        e.currentTarget.style.border='solid 1px white'

    }
    
    componentDidMount(){
        this.props.selocina_crianó(this.novo)
        this.props.selocina_conexão(this.nova_conexão)
    }
   

    render(){
        
        
        return(
            <div class="toolbar_main" >
                <div class="toolbar_container">
                    <div class="toolbar_botão" ref='btn1' onMouseOver={this.mouseefect} onMouseOut={this.mouseefect2} onClick={() => this.novo(window.prompt("novo nó:"),this.props.projeto_sel.element_id,[])} style={{top: 10 + 'px'}}>
                        <img class= 'toolbar_img'height="28" width="30" src={mais}></img>
                    </div>
                    <div class="toolbar_botão" ref='btn2'  onMouseOver={this.mouseefect} onMouseOut={this.mouseefect2} onClick={this.clear.bind(this)} style={{top: 130 + 'px'}}>
                        <img class= 'toolbar_img'height="28" width="30" src={reset}></img>

                    </div>
                    <div class="toolbar_botão" ref='btn3' onMouseOver={this.mouseefect} onMouseOut={this.mouseefect2} onClick={this.conection_mode.bind(this)} style={{top: 90 + 'px'}}>
                        <img class= 'toolbar_img'height="28" width="30" src={conect}></img>
                    </div>
                    <div class="toolbar_botão" ref='btn4' onMouseOver={this.mouseefect} onMouseOut={this.mouseefect2} onClick={this.delete_mode.bind(this)} style={{top: 50 + 'px'}}>
                        <img class= 'toolbar_img'height="28" width="30" src={menos}></img>

                    </div>
                    
                </div>
               
            </div>
        )
        
    }
}