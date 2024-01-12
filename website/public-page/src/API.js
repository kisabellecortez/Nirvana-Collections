import { Component } from 'react'; 


class API extends Component{
    constuctor(props){
        super(props); 
        this.state={
            products:[]
        }
    }

    API_URL="http://localhost:5000/";

    componnentDidMount(){
        this.refreshNotes(); 
    }

    async refreshNotes(){
        fetch(this.API_URL+"api/nirvana-collections/GetProducts").then(response=>response.json()).then(data=>{
            this.setState({notes:data}); 
        })
    }
}

export default API; 