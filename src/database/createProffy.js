// "async" adicionado para permitir utilizar o "await" dentro da funcao
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // organizar os dados para inserir dados na tabela de proffys 
    // "`" crazi => chamado de templates literal
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // organizar os dados para inserir dados na tabela de classes 
    const insertedClass = await db.run(`
    INSERT INTO classes (
        subject, 
        cost,
        proffy_id
    ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
    );
`)    

const class_id = insertedClass.lastID

    // organizar os dados para inserir dados na tabela de class_schedule
const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
    INSERT INTO class_schedule (
        class_id, 
        weekday,
        time_from,
        time_to
    ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
    );
`)   
})  

    // aqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)

    // Consultando os dados


    // comando para testar a insercao de dados nas tabelas
    // node src/database/test.js
}