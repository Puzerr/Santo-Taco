# Santo Taco 🌮

Bem-vindo ao repositório oficial do aplicativo **Santo Taco**! 

Este projeto é um aplicativo mobile criado para um restaurante mexicano (fictício) que é apaixonado por uma coisa: **tacos de verdade**. Nosso objetivo com este app é modernizar a experiência de ir a um restaurante, colocando o controle do pedido literalmente nas mãos do cliente.

Além disso, é um projeto feito exclusivamente na faculdade.

---

## 🌯 Sobre o Projeto

Imagine que o garçom está sempre ali, sentado na sua mesa, pronto para anotar seu pedido a qualquer segundo. Essa é a ideia do aplicativo **Santo Taco**. 

Ele funciona como um *gerenciador de pedidos digital* que fica disponível em um dispositivo móvel no centro de cada mesa do restaurante. Através dele, os clientes podem navegar por um cardápio recheado de delícias mexicanas, escolher o que desejam e enviar tudo direto para a cozinha, sem filas e sem espera.

## ⚙️ Como Funciona?

O aplicativo foi pensado para resolver problemas reais de um restaurante movimentado, trazendo funcionalidades especiais:

### 1. Cardápio e Fila de Pedidos
O cliente tem acesso a todo o nosso menu. Ele pode escolher *quantos pratos quiser* e ir adicionando a uma "fila" (como se fosse um carrinho de compras). Quando todos da mesa terminarem de escolher, basta enviar a fila de uma só vez para o preparo.

### 2. Controle de Mesas
Cada tablet ou smartphone do restaurante tem o seu **número de mesa** configurado no próprio app. Se a mesa 5 mudar de lugar e juntar com a mesa 6, não tem problema! *O número da mesa pode ser alterado nas configurações* do aplicativo a qualquer momento.

### 3. Comandas Separadas (Fim das brigas na hora de pagar! 💸)
Sabe aquela confusão na hora de dividir a conta no final do rolê? Aqui nós resolvemos isso!
O aplicativo possui um sistema de **comandas individuais** dentro da mesma mesa. Se há várias pessoas sentadas juntas, é possível criar *n* comandas e dar nomes a elas (por exemplo, a comanda do *João* e a comanda da *Maria*). 
Na hora de fazer o pedido, basta informar para qual comanda aquele prato vai. No final, cada um sabe exatamente o que consumiu.

---

## 📱 Telas 

### 1. Menu principal (Ofertas do dia + Todos os pratos)
<img width="402" height="868" alt="image" src="https://github.com/user-attachments/assets/a96572a2-477b-4c90-a49c-9bb19fefa141" />

### 2. Comanda Rápida
<img width="399" height="873" alt="image" src="https://github.com/user-attachments/assets/b3c66b81-3e6b-4cd2-9a56-5f0d55cfd5a2" />

### 3. Escolha de pedido (Mesa e comanda)
<img width="401" height="871" alt="image" src="https://github.com/user-attachments/assets/ea2fbcc6-8d85-44c1-9ee4-2c5bb0b65c5c" />
<img width="401" height="870" alt="image" src="https://github.com/user-attachments/assets/bf4edf53-5908-42bd-87cf-db987943a419" />

### 4. Categorias de alimentos
<img width="401" height="871" alt="image" src="https://github.com/user-attachments/assets/928b35bd-600b-47db-bca7-c39082fca960" />

### 5. Pagamento
<img width="402" height="871" alt="image" src="https://github.com/user-attachments/assets/a3293b18-de2e-4c2a-8ab4-1f798497e136" />



---

## 💻 Tecnologias Utilizadas

Para fazer essa magia gastronômica acontecer no mundo digital, utilizamos as seguintes ferramentas:

*   **React Native:** Para construir a interface do aplicativo, permitindo que ele rode de forma lisa e rápida.
*   **Expo:** O nosso fiel escudeiro que facilita (e muito!) o desenvolvimento e os testes no React Native.
*   **JavaScript:** A linguagem de programação que dá vida às interações do app.
*   **MongoDB:** Nosso banco de dados, responsável por guardar com segurança todos os pedidos, comandas e informações do menu.

---

## 📱 É possível instalar o aplicativo?

Não será possível instalar o aplicativo. O arquivo executável do projeto foi limitado ao ambiente de desenvolvimento.

---

## 🛠️ Como executar o projeto localmente

Se você é um desenvolvedor e quer rodar o **Santo Taco** na sua própria máquina para testar ou contribuir, siga o passo a passo abaixo:

**1. Clone o repositório**
Primeiro, você precisa baixar o código para o seu computador. Abra o terminal e digite:
```bash
git clone https://github.com/Puzerr/Santo-Taco.git
```

**2. Acesse a pasta do projeto**
```bash
cd santo-taco-app
```

**3. Instale as dependências**
Todas as dependências do projeto.
```bash
npm install
```
*(Se você prefere o yarn, pode usar `yarn install`)*

**4. Configure o Banco de Dados**
Crie um arquivo `.env` na raiz do projeto e adicione a sua chave de conexão do **MongoDB**. O arquivo deve ficar desse jeito:
```env
EXPO_PUBLIC_API_URL=https://santo-taco-backend.onrender.com/api
```

**5. Rode o aplicativo!**
Com tudo instalado e o banco de dados configurado, é só iniciar o servidor do Expo:
```bash
npx expo start
```
_É possível executar o projeto no navegador ao utilizar o parâmetro ```--web```, porém a experiência será comprometida._

---

Pronto! Um QR Code vai aparecer no seu terminal. Basta escaneá-lo com o aplicativo *Expo Go* no seu celular (ou usar um emulador no computador) para ver o **Santo Taco** funcionando ao vivo! 🎉

---

## ☁️ Sobre a API
Ao abrir o aplicativo, levará alguns segundos até carregar as informações. Isso acontece devido a um comportamento padrão do Render (host da API) em que o serviço hiberna após 15 minutos de atividade. Após isso  latência diminui. 

---

_Obervação: o projeto foi desenvolvido com foco nos dispositivos Android. Dispositivos iOS podem experienciar problemas técnicos._
