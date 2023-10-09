# Quer apostar quanto?
Uma API que faz o papel de banca de apostas para jogos esportivos.


## em Desenvolvimento
1 - Defina os arquivos .env, com a variável DATABASE_URL, sendo ela uma url PostgreSQL funcional, podendo ser usado o seguinte comando para criar um .env baseado no arquivo exemplo:
```bash
cp .env.example .env.development && cp .env.example .env.test
```

2 - Execute o seguinte comando para instalar dependências e configurar o banco de desenvolvimento:
```bash
npm run dev:firstrun
```

3 - Por fim execute a aplicação em desenvolvimento com:
```bash
npm run dev
```


## em Produção
Usando Docker compose, na pasta do projeto execute:
```bash
docker compose up
```