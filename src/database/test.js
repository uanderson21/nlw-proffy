const db = require('./db')
const createProffy = require('./createProffy')

// "() => " função curta dentro do db.then
db.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: 'Diego Fernandes',
        avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
        whatsapp: '19 981057444', 
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.'
    }
   
    classValue = {
        subject: "Química",
        cost: "20",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        },
    ]
    
    // linha para criar dados nas tabelas
    //await createProffy(db,{proffyValue,classValue,classScheduleValues})

    // Consultar os dados inseridos
    const selectedProffys = await db.all("SELECT * FROM proffys")
    ///console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
  
    //console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8hrs - 18hrs
    // o horário do time_from (8hrs) precisa ser antes ou igual ao horario solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT c.*
        FROM class_schedule c
        WHERE c.class_id = "1"
          AND c.weekday = "0"
          AND "1200" BETWEEN c.time_from AND c.time_to;
    `)    

  //  console.log(selectClassesSchedules)
})