class Controller{

    constructor(){
      
        
        this.init()
    }

    init(){
        this.addConverter()
        // Adicionar evento de click.
        let btnExec = document.getElementById("btn-exec").addEventListener("click", (e)=>{
            e.preventDefault();
            this.validationUserAdd();
        })

        let btnUser = document.getElementById("btn-users").addEventListener("click", ()=>{
            this.showUsers();
        })

    }

    addConverter(){

        let inputValue = document.getElementById('input-saldo');
        inputValue.addEventListener('focus', (e)=>{
            console.log(inputValue.value)
            inputValue.value = inputValue.value.replace('R$','')
        })
        inputValue.addEventListener('blur', (e)=>{
            inputValue.value = inputValue.value.replace(',','.')
            inputValue.value = parseFloat(inputValue.value).toLocaleString('pt',{style: 'currency', currency: 'BRL'}).replace("R$ ","")
        })

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

        document.getElementById("input-username").value = '';
        document.getElementById("input-saldo").value = '';
        document.getElementById("input-username").focus();

    }

    showTable(){

        let table = document.getElementById('table-users');
        let btn = document.getElementById('btn-users');
        table.hidden = !table.hidden;

        if(!table.hidden) {
            btn.innerText = "Ocultar Usuários"
        } else{
            btn.innerText = "Exibir Usuários"
        }

    }

    async showUsers(){
        let users = await fetch("http://localhost:3000/users/").then((data) => data.json());

        this.showTable();

        let table = document.getElementById('table-users-info');

        table.innerHTML = ``;

        

        users.forEach((item, index)=>{
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <tr >
                <th scope="row" >${index+1}</th>
                <td>${users[index].user}</td>
                <td>${parseFloat(users[index].saldo).toLocaleString('pt',{style: 'currency', currency: 'BRL'})}</td>
                <td>${users[index]._id}</td>
                </tr>
            `
            tr.addEventListener('dblclick', (e)=>{
                this.deleteUser(users[index])
            })
            table.appendChild(tr);
        })
    }

    async pushUser(name, saldo){

        let user = {
            user: name,
            saldo: saldo
        };

        try {

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
                
            }).then(res => res.json()).then(res => console.log(res));
            
        } catch (error) {
            
        }

        this.showUsers();
        this.showTable();
    }

    async deleteUser(user){

        if(confirm(`Deseja deletar '${user.user}'?`)){
            await fetch(`http://localhost:3000/users/${user._id}`, {
                method: 'DELETE',
            })
        }
        this.showUsers();
        this.showTable();
    }
}