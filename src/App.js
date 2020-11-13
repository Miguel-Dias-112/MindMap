import React from 'react';
import ReactDOM from 'react-dom';
import titulo from "./componentes/imagens/Titulo2.svg"
import Files from "./componentes/arquivos/code"
import Tollbar from "./componentes/toolbar/code"
import Workbanch from "./componentes/workbanch/code"

import "./app.css"

class App extends React.Component {

  state = { 
    projetos: [],
    projeto_selecionado:[],
    nó_selecionado:'',
    cria_nó:'',
    cria_conexão:''

    
  }
//========================================================================Metodos de atualizar
  atualiza_projetos=function(_files, ultimo_Projeto) {
    this.setState({ projetos:_files })
    this.setState({ projeto_selecionado: ultimo_Projeto})
  }.bind(this)

  atualiza_nós=function(_files) {
    this.setState({projetos:_files})
  }.bind(this)
//========================================================================Metodos de selecionar
  seleciona_projeto=function(params) {
    this.setState({ projeto_selecionado:params})
  }.bind(this)

  selocina_nó=function(_nó) {
    this.setState({ nó_selecionado:_nó})
  }.bind(this)

  selocina_crianó=function(_nó) {
    this.setState({ cria_nó:_nó})
  }.bind(this)
  selocina_conexão=function(_param) {
    this.setState({ cria_conexão:_param})
  }.bind(this)
//========================================================================Metodos de criar

  
 



  render() {

    return (
      
      <div ref="app" className="App">

      <div class="top"><img className="img" src ={titulo}></img></div>

          <div class='body2'>
              <Files 
                selocina_projeto={this.seleciona_projeto}
                projeto_selecionado={this.state.projeto_selecionado}
                cria_novo_projeto={this.atualiza_projetos}
                cria_novoNó={this.state.cria_nó}
                cria_conexão={this.state.cria_conexão}
              ></Files>
              <Workbanch 
                nó_sel={this.state.nó_selecionado}
                projeto_selecionado={this.state.projeto_selecionado}  
              ></Workbanch>
              <Tollbar  
                select_nó={this.selocina_nó}cria_novoNó={this.atualiza_nós}
                files={this.state.projetos} 
                selocina_crianó={this.selocina_crianó}
                selocina_conexão={this.selocina_conexão}

                projeto_sel={this.state.projeto_selecionado}
              ></Tollbar>
          </div>
          
        
      
      </div>
   );
  }
}
  

  


export default App;
