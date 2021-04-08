const Timetable = require('../models/TimetableSchema');

const ttable = {};

//get the list of timetable items for a standard
//GET /ttable/list?std=first&day=Mon
ttable.getTables = async(req,res) => {

    var query = {};  
    
    const{std,day} = req.query;

    
    // if(std){
    //     query={"std":std}
    //     sortoption = {_id:1} 
    //     if (day){
    //         query={"std":std, "day":day}
    //     }      
    // }

    if(std)
        query.std = std;
    if(day)
        query.day = day;
    sortoption = {_id:1} 
    
    try{
        let ttableitems = await Timetable.find(query).sort(sortoption);
        if (ttableitems){
            return res.status(200).json(ttableitems)
        }

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }

}

//PUT /ttable/update/:id
ttable.editTable = async(req,res) => {

    var query = {};  

    
    if(!req.params.id) return res.status(400).json({ error:"Missing params in request"});

    const {subject, assignedto} = req.body;
    if(!subject || !assignedto ){
        return res.status(400).json({ error:"Missing key parameters"});
    } 
    
    
    try{
        let result = await Timetable.updateOne({"_id":Number(req.params.id)}, { $set: { subject: subject, assignedto: assignedto } });
        return res.status(200).json({status:result})
        

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }

}


module.exports = ttable;


