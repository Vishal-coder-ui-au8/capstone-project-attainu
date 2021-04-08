const Standard = require('../models/ClassSchema');
const {ObjectId} = require('mongodb');

const fees = {};


//GET /fees/defaulters
fees.defaulters = async(req,res) => {    
    
    try{
        let defaulters = await Standard.find({"feespaid":false});
        if (defaulters){
            return res.status(200).json(defaulters)
        }

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }

}

//PUT /fees/editdefaulter/:id
fees.editdefaulter = async(req,res) => { 
    
    if (!req.params.id)
    {
        console.log("Fees bad request",req.params.id)
        return res.status(400).send({message:'Bad Request'}); 
    }

    let updatefees = {};

    console.log("req.body", req.body)
    console.log("req.body.feesamt", req.body.feesamt)

    if(req.body.feesamt){
        console.log("1s")
    updatefees.feesamt = Number(req.body.feesamt);
    }

    if(req.body.feespaid)
    updatefees.feespaid = req.body.feespaid;

    if(req.body.paymentmode)
    updatefees.paymentmode = req.body.paymentmode;

    if(req.body.paymentdate)
    updatefees.paymentdate = req.body.paymentdate;

    if(req.body.firstreminder)
    updatefees.firstreminder = req.body.firstreminder;

    if(req.body.secondreminder)
    updatefees.secondreminder = req.body.secondreminder;

    console.log("updatefees", updatefees)

    
    
    try{
        await Standard.updateOne({"_id":ObjectId(req.params.id)},updatefees,(err,result) => {
            if (err){ 
                console.log(err) 
                return res.status(500).json({
                    error: `Error: ${e}`
                })
            } 
            else{ 
                console.log("Updated Docs : ", result);
                return res.status(200).json({success: true, result:result});
            } 
        });
        

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }

}

// /fees/getDetail
//GET req.query should contain std and name of student
fees.getdetail = async(req,res) => { 

    console.log(req.query)

    if (!req.query.std || !req.query.name)
    {
        console.log("Fee Detail bad request",req.params.id)
        return res.status(400).send({message:'Bad Request'}); 
    }

    const{std,name} = req.query;

    try{
        let student = await Standard.findOne({"std":std, "name":name});
        if (student){
            return res.status(200).json(student)
        }

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }





}


module.exports = fees;