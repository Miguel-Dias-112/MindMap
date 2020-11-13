import React from "react";
import './estilo.css'
import edit2 from '../imagens/edit.svg'
import select_edit from '../imagens/select_edit.svg'
import select_dowload from '../imagens/select_download.svg'
import select_delete from '../imagens/select_delete.svg'

import mais from '../imagens/mais2.svg'
import menos from '../imagens/delete(1).svg'
import baixar from '../imagens/download.svg'
import upload from '../imagens/upload.svg'
import reset from '../imagens/reset2.svg'

export default class Files extends React.Component{

    
    constructor(props){
        super(props);
        this.state={
            projetos:[],
            texto:"on",
        }
        this.upload=this.upload.bind(this)
        this.novo_projeto=this.novo_projeto.bind(this)

    }
    novo_projeto=function(_nome){
        console.log("ssssssss")
        if (   _nome!==null && _nome.replace(/ /g, '')!=='') {
            let Projeto={
                nome:_nome,
                nós:[],
                index:this.state.projetos.length,
                element_id:0
                
            }
            let HTML_Projeto={
                li:document.createElement('li'),
                div: document.createElement('div'),
                texto: document.createElement('span'),
                edit:document.createElement('div'),
                download:document.createElement('div'),
                delete:document.createElement('div')
            }
    
            const list = this.refs.list
            const seleciona_projeto=this.props.selocina_projeto
    
            HTML_Projeto.li.className='files_li'
            HTML_Projeto.div.className='files_div_list'
            HTML_Projeto.edit.className='files_div_list_delete'
            HTML_Projeto.download.className='files_div_list_download'
            HTML_Projeto.delete.className='files_div_list_edit'
            HTML_Projeto.texto.className='files_div_list_texto'
    
            let edit_img = document.createElement('img')
            let download_img = document.createElement('img')
    
            let delete_img = document.createElement('img')
    
            delete_img.src = menos
            edit_img.src=edit2
            download_img.src=baixar
    
            edit_img.className="files_img"
            delete_img.className="files_img"
            download_img.className="files_img"
    
            delete_img.style.height='15px'
            delete_img.style.width='15px'
    
            HTML_Projeto.edit.appendChild(edit_img)
            HTML_Projeto.delete.appendChild(delete_img)
            HTML_Projeto.download.appendChild(download_img)
    
            HTML_Projeto.download.addEventListener("click", download.bind(this), false); 
            HTML_Projeto.delete.addEventListener("click", remove.bind(this), false);
            HTML_Projeto.edit.addEventListener("click",()=> this.props.prompt(edit.bind(this),[1]), false); 

            HTML_Projeto.download.addEventListener("mouseenter", mouseefect.bind(this), false); 
            HTML_Projeto.delete.addEventListener("mouseenter", mouseefect.bind(this), false); 
            HTML_Projeto.edit.addEventListener("mouseenter", mouseefect.bind(this), false); 
            HTML_Projeto.download.addEventListener("mouseleave", mouseefect2.bind(this), false); 
            HTML_Projeto.delete.addEventListener("mouseleave", mouseefect2.bind(this), false); 
            HTML_Projeto.edit.addEventListener("mouseleave", mouseefect2.bind(this), false); 

            HTML_Projeto.texto.innerText=Projeto.nome
            
            HTML_Projeto.div.appendChild(HTML_Projeto.texto)
    
            HTML_Projeto.div.appendChild(HTML_Projeto.edit)
            HTML_Projeto.div.appendChild(HTML_Projeto.download)
            HTML_Projeto.div.appendChild(HTML_Projeto.delete)
    
            HTML_Projeto.li.appendChild(HTML_Projeto.div)
            function mouseefect(e) {
                console.log(e)
                e.currentTarget.style.border='solid 1px royalblue'
        
            }
            function mouseefect2(e) {
                e.currentTarget.style.border='solid 1px white'
        
            }
            function edit(params) {
                Projeto.nome=params
                HTML_Projeto.texto.innerText=Projeto.nome
                this.props.cria_novo_projeto(this.state.projetos,[])

            }
            function remove(params) {
                console.log('antes')

                list.removeChild(HTML_Projeto.li)
                this.state.projetos.splice(Projeto.index,1)
                this.props.cria_novo_projeto(this.state.projetos,[])



            }
            function download(params) {
                let textDoc = document.createElement('a');
                let mmd = [];
                mmd.push('|'+Projeto.nome+"|")
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    mmd.push(element.h1.innerText+"-")
                }
                mmd.push("|")
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    mmd.push(element.div.style.top+"-")
                }
                mmd.push("|")
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    mmd.push(element.div.style.left+"-")
                }
                mmd.push("|")
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    mmd.push(element.id+"-")
                }
                mmd.push("|")
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    for (let v = 0; v <  element.conexões.length; v++) {

                        mmd.push(element.conexões[v][1]+"@")
                        
                    }
                    mmd.push("-")
                }

                textDoc.href = 'data:attachment/text,' + encodeURI(mmd.join('\n'));
                textDoc.target = '_blank';
                textDoc.download = Projeto.nome+'.mmd';
                textDoc.click();
            }
            function click() {
                
                
    
    
                //console.log("projeto_selecionado trocado para:")
                console.log(Projeto)
                
                for (let i = 0; i < list.children.length; i++) {
                    const element = list.children[i];
                    console.log(element)
                    element.children[0].children[0].style='background-color:white'
                    element.children[0].children[1].children[0].src=edit2
                    element.children[0].children[2].children[0].src=baixar
                    element.children[0].children[3].children[0].src=menos
                    element.children[0].style.borderBottom='  1px solid rgba(210,210,210,2)'
                }
                
                let workbanch_main =  document.getElementById("workbanch_main")
                let canvas =  workbanch_main.children[0]
                workbanch_main.innerHTML=''
                workbanch_main.appendChild(canvas)
            
                for (let i = 0; i < Projeto.nós.length; i++) {
                    const element = Projeto.nós[i];
                    workbanch_main.appendChild(element.div)
                    

                }
    
                seleciona_projeto(Projeto)
                console.log( HTML_Projeto.div.children)
                HTML_Projeto.div.children[0].style.color=' #F99245'
                HTML_Projeto.div.style.borderBottom=' 1px solid #F99245'

                //HTML_Projeto.div.children[1].children[0].src=select_edit
                //HTML_Projeto.div.children[2].children[0].src=select_dowload
                //HTML_Projeto.div.children[3].children[0].src=select_delete

                let nos= Projeto.nós
                let ctx = canvas.getContext("2d")
    
                ctx.clearRect(0,0,canvas.width,canvas.height)
    
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
                
            }

            HTML_Projeto.div.addEventListener("click", click.bind(this), false); 
            list.appendChild(HTML_Projeto.li)
            click()
            this.state.projetos.push(Projeto)
            this.setState({files: this.state.projetos})
            this.props.cria_novo_projeto(this.state.projetos,Projeto)
            
        }
        }
        
    clear(){
        this.setState({projetos:[]})
        this.refs.list.innerHTML=""
    }
    upload(){
        console.log("s")
           console.log(this.props["cria_novoNó"])
           let cria_projeto = this.novo_projeto
           
            
            let x = document.createElement('input')
            x.type="file"
            x.click()
            x.onchange = function(event) {
                let cria_nó =this.props["cria_novoNó"]
                var fr=new FileReader(); 
                let arquivo = []
                
                console.log(this.props)

                fr.onload=function(){ 

                    let resultado = fr.result

                    arquivo.push(resultado.replace(/(\r\n|\n|\r)/gm, "").split('|'))

                    let titulo   = arquivo[0][1].split('-')
                    let nomes    = arquivo[0][2].split('-')
                    let posiçãoy = arquivo[0][3].split('-')
                    let posiçãox = arquivo[0][4].split('-')
                    let id       = arquivo[0][5].split('-')
                    let conexão       = arquivo[0][6].split('-')

                    for (let i = 0; i < conexão.length; i++) {
                      
                        conexão[i]=conexão[i].split("@")

                    }
                    
                    arquivo[0] = titulo
                    arquivo[1] = nomes
                    arquivo[2] = posiçãox
                    arquivo[3] = posiçãoy
                    arquivo[4] = id
                    arquivo[5] = conexão


                    cria_projeto(arquivo[0][0],[])
                    
                    for (let i = 0; i < arquivo[1].length; i++) {
                        //console.log("I:"+i)
                        if(arquivo[1][i]!=''){
                            let nós = this.props.projeto_selecionado.nós
                            let divs = []
                            //tem que arrumar aqui a leitura do arquivo conex~eoes,criar as divs
                            cria_nó(arquivo[1][i],arquivo[4][i],[arquivo[5][i]])
                            nós[i].div.style.left=arquivo[2][i]
                            nós[i].div.style.top=arquivo[3][i]

                            for (let z = 0; z < nós.length; z++) {
                                const element = nós[z];
                                divs.push([element,element.id])
                            }

                            console.log(divs)
                            console.log(arquivo[5])

                            const element = nós[i];
                            for (let c = 0; c < element.conexões.length; c++) {
                                const element2 = element.conexões[c];
                                //console.log("C:"+c)

                                for (let n = 0; n< divs.length ; n++) {
                                    const element3 = divs[n]
                                    if (element2[0]==element3[1]) {
                                        this.props.cria_conexão(element,element3[0])
                                    }
                                        
                                }
                            }
                               
                               
                            

                        }
                        
                    }
                    for (let i = 0; i < this.props.projeto_selecionado.nós.length; i++) {
                        this.props.projeto_selecionado.nós[i].conexões.splice(0, 1);
                        
                    }
                   

                }.bind(this)
                
                fr.readAsText(event.target.files[0]); 
           
            }.bind(this)

            

        }
        
         filtrar = function() {
             //boa sorte tentando entender isso
            console.log('sa')
            let filter, ul, li, a, i, txtValue;
    
            let input = this.refs.input
            filter = input.value.toUpperCase();
            ul =this.refs.list
            li = ul.getElementsByTagName("li")
            console.log(li)
            for (i = 0; i < li.length; i++) {
                
                let a = li[i].children[0].getElementsByTagName('span')[0]
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            } 
           
              
            
        }  
       
    
    render(){
        let x = this.novo_projeto
        return(
            <div class="files_main">
                <div class='files_div_h1'>
                    <span class='files_h1'>projetos:</span>
                </div>

                <div  class="files_explorer">
                    <ul  id='ul' ref='list' class='files_list'> 
                    </ul>
                </div>

                <div class='files_tollbar'>
                        {this.props.test}
                        <div class='files_botão'  onClick={()=>this.novo_projeto(window.prompt("nome"))}   style={{right: 0 + 'px'}}>
                            
                            <img class='files_img' src={mais}></img>
                        </div>
                        <div class='files_botão'  onClick={this.upload.bind(this)} style={{right: 40 + 'px'}}>
                            <img class='files_img' src={upload}></img>

                        </div>
                        <div class='files_botão'  onClick={this.clear.bind(this)} style={{right: 80 + 'px'}}>
                             <img class='files_img' src={reset}></img>

                        </div>
                        <input ref='input' onKeyUp={()=>this.filtrar()}  class="files_searchBar">
                        </input>
                </div>
            </div>
        )
        
    }
}