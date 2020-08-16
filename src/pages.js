const Database = require('./database/db')

const {subjects,weekdays,getSubject,convertHoursToMinutes} = require('./utils/format')
// ou
// const format = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {     
        return res.render("study.html",{filters, subjects, weekdays});         
    }

    // converter horas em minutos
    const time = convertHoursToMinutes(filters.time);

    const query = `
        SELECT c.*, p.* 
        FROM proffys p
        JOIN classes c ON (c.proffy_id = p.id) 
        WHERE EXISTS (
            SELECT null
        FROM class_schedule ch
        WHERE ch.class_id = c.id
          AND ch.weekday = ${filters.weekday}
          AND ${time} BETWEEN ch.time_from AND ch.time_to
        ) 
        AND c.subject = '${filters.subject}'
    `;

    //inicio como vazio
    var proffys = [];

    // caso haja erro da consulta do banco de dados.
    try {
        const db = await Database;
        proffys = await db.all(query);

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });

    } catch (error) {
        console.log(error)
    }

    return res.render('study.html',{proffys,subjects,filters,weekdays});    

}

function pageGiveClasses(req, res){
    return res.render("give-classes.html",{subjects,weekdays});
}

function pageSuccessProffy(req,res){
    return res.render("success-proffy.html",{subjects,weekdays});
}

async function saveClasses(req,res) {

    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    // "map" funciona como um loop que percorre o array e organiza os dados para passar
    // para o classScheduleValues
    const classScheduleValues = req.body.weekday.map((weekday,index) => {

        return {
            weekday, 
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    });

    const db = await Database;

    try {
        await createProffy(db,{proffyValue,classValue,classScheduleValues}); 
        
        let queryString = "?subject=" + req.body.subject;
        queryString +=  "&weekday=" + req.body.weekday[0];
        queryString +=  "&time=" + req.body.time_from[0];   
        
        return res.redirect("/success-proffy" + queryString) 

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSuccessProffy
}