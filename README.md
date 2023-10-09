# Quer apostar quanto?
Uma API que faz o papel de banca de apostas para jogos esportivos.


## em Desenvolvimento
1 - Defina o arquivo .env, com a variavel DATABASE_URL, sendo ela um banco PostgreSQL, podendo ser usado o seguinte comando para criar um .env baseado no exemplo:
```bash
cp .env.example .env 
```

2 - Execute o seguinte comando para instalar dependencias:
```bash
npm install 
```

3 - Configure o banco de dados com o Prisma (use um banco de dados vazio):
```bash
npx prisma migrate dev
# e Depois:
npx prisma generate
```

4 - Por fim execute a aplicação com:
```bash
npm run dev
```


## em Produção
Usando Docker compose, basta entrar na pasta do projeto e executar:
```bash
docker compose up -d
```