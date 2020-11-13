import React from "react";
import ReactDOM from "react-dom";
import './estilo.css'
export default class Workbanch extends React.Component{
    constructor(){
        super();
        this.state={
           
            screenx:window.innerWidth,
            screeny:window.innerHeight,
            down:false,
            pos:[]
        }
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }
    
    componentDidMount() {

        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        let delta = this.state.screeny-(this.state.screeny*6)/100
       
        canvas.height=delta
        function do_line(xi,yi,x,y) {
            ctx.beginPath();
            ctx.moveTo(xi, yi);
            ctx.lineTo(x, y);
            ctx.stroke(); 
        }
        this.refs.workbanch.scrollTo(0,0);
        console.log((this.state.screenx)/2)
                            
        console.log((this.state.screenx-372)/2)

        window.onresize=function(){
            let delta = (this.state.screeny*6)/100

            this.setState({   screenx:window.innerWidth,
                            screeny:window.innerHeight,})



            this.refs.workbanch.scrollTo( 0,0);
        }.bind(this)

    }
     
    
    handleMouseMove(e){
        const canvas = this.refs.canvas
       
        
        let nos= this.props.projeto_selecionado.nós
        if(this.props.nó_sel!=''){
            let delta = (this.state.screeny*6)/100
            this.props.nó_sel.div.style.left=parseInt(e.nativeEvent.clientX)-50-this.props.nó_sel.div.offsetWidth/2+'px'
            this.props.nó_sel.div.style.top=e.nativeEvent.clientY-delta-this.props.nó_sel.div.offsetHeight/2+'px'

            let nos= this.props.projeto_selecionado.nós
            
            
            for (let i = 0; i < this.props.nó_sel.conexões.length; i++) {
                
                let ctx = canvas.getContext("2d")
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.beginPath();
                

                    
                for (let i = 0; i < nos.length; i++) {
                    
                    const element = nos[i];
                    console.log(i+":::::::::::")

                    console.log( nos[i].conexões)

                    for (let x = 0; x < element.conexões.length; x++) {
                       
                        const element2 =  element.conexões[x][0];
                        try {
                            ctx.beginPath();
                            ctx.strokeStyle = "#4169e1";

                            let delta = this.props.nó_sel.div.offsetHeight

                            let posx1=parseInt(element.div.style.left)
                            let posy1=parseInt(element.div.style.top)
                            let posx2=parseInt(element2.style.left)
                            let posy2=parseInt(element2.style.top)
                            
                            let deltax1 = element.div.offsetWidth/2
                            let deltay1 = element2.offsetHeight/2

                            let deltax2 = element2.offsetWidth/2
                            let deltay2 = element2.offsetHeight/2

                            let x1 =parseInt(posx1+deltax1)
                            let y1 =parseInt(posy1+delta)
                            let x2=parseInt(posx2+deltax2)
                            let y2=parseInt(posy2+delta)

                            let pos1=[x1,y1]

                            let pos2=[x2,y2]
                            console.log(pos2)
                            console.log(pos1)

                            ctx.moveTo(pos1[0],pos1[1])

                            ctx.lineTo(pos2[0],pos2[1])
                                   
                            ctx.stroke();
                        } catch (error) {
                           
                             console.log(error)  
                        }
                        

                    }
                }
               
              

            }   

            
           
            
        }else{}
            
    }
        
   
   

    render(){
        let delta = this.state.screeny-(this.state.screeny*6)/100
        console.log(this.state.screeny-delta)
        
        return (
          
            <div ref="workbanch" id='workbanch_main' class='workbanch_main' 
            style={{height:delta,width:this.state.screenx-372+'px'}}
            
            class="workbanch_main" onMouseUp={this.up} onMouseDown={this.down} onMouseMove={this.handleMouseMove}>
                <canvas ref="canvas" id='canvas' class='workbanch_canvas' height={this.state.screeny+'px'} width={this.state.screenx-370+'px'}></canvas>
            </div>
        )
       
      
    }
   
}