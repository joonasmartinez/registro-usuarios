class Controller{

    constructor(){
      
        
        this.init()
    }

    init(){

        // Adicionar evento de click.
        let btnExec = document.getElementById("btn-exec").addEventListener("click", ()=>{
            this.validationUserAdd();
        })

        let btnUser = document.getElementById("btn-users").addEventListener("click", ()=>{
            this.showUsers();
        })

    }

    requestedMethod(){



    }

    validationUserAdd(){

        let usernameField = document.getElementById("input-username").value;
        let saldoField = document.getElementById("input-saldo").value;

        if(usernameField){
            if(!saldoField) saldoField = "0";
            console.log("Cadastrando "+usernameField,"Saldo:", saldoField)
            this.pushUser(usernameField, saldoField)
        }else{
            console.log("Preencha os campos.")
        }

    }

    async showUsers(){
        console.log("Mostrar usuários.")
        let users = await fetch("http://localhost:3000/users/").then((data) => data.json());
        let userP = JSON.stringify(users)
        users.forEach((item, index)=>{
            console.log(`${index} - NOME: ${users[index]['user']} || SALDO: R$ ${users[index]['saldo']}. ID(${users[index]['_id']})`)
        })
    }

    async pushUser(name, saldo){

        let user = {
            user: name,
            saldo: saldo
        };
        
        console.log("Arquivo gerado:"+JSON.stringify(user));  

        try {

            await fetch('http://localhost:3000/users', {
                method: 'POST',
                mode:'no-cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            })//.then(res => res.json());
            
        } catch (error) {
            
        }
    }
}