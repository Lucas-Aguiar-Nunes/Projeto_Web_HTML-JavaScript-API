function validar_dados(){
    let name = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    let birthday = document.getElementById("birthday").value;
    let password = document.getElementById("password").value;
    let terms = document.getElementById("terms");

    if (!name || !email || !cpf_cnpj || !birthday || !password){
        alert("Preencha Todos os Campos");
    }
    else if (password.length < 6){
        alert("Senha deve Conter no Minimo 6 Digitos!");
    }
    else if (!terms.checked){
        alert("Aceite os Termos de Condição");
    }
    else{
        enviar_cadastro(name, email, cpf_cnpj, birthday, password);
    }
}

async function enviar_cadastro(name, email, cpf_cnpj, birthday, password){    
    let userType = 1;
    let terms = 1;
    let dados = {
        "name": name,
        "email": email,
        "user_type_id": userType,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": terms,
        "birthday": birthday
    }

    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/user",{
                method:"POST",
                body:JSON.stringify(dados),                
                headers:{
                    'Content-Type':'application/json'
                }                    
            }
        );

        let resposta = await request.json();                    
        
        if (!request.ok){
            console.log(resposta);
            if (resposta.data.errors.cpf_cnpj){
                throw new Error("CPF ou CNPJ Já Cadastrado");
            }
            else if (resposta.data.errors.email){
                throw new Error("Email Já Cadastrado!");
            }
            else{
                throw new Error("Sistema Fora do Ar!");
            }
        }
        alert("Enviamos um link de ativação de conta no email:\n"+email+" -> clique e ative sua conta");
        window.location.href = "../Login/index.html";
    }
    catch (error){
        alert(error.message);
    }
}