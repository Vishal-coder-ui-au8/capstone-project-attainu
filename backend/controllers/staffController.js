
const Staff = require('../models/StaffSchema');
const {ObjectId} = require('mongodb');

const staff = {};

//GET /staff/paydetail
staff.paydetail= async(req,res) => { 
    
    if (!req.query.category)
    {
        console.log("Fees bad request",req.query)
        return res.status(400).send({message:'Bad Request'}); 
    }
    
    const{category,name} = req.query;

    var query = {}
    console.log(category,name)

    if(category)
        query.category = category;
    if(name)
        query.name = name;

        console.log(query)
    
    
    try{
        let details = await Staff.find(query);
        if (details){
            console.log("found")
            return res.status(200).json(details)
        }

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }

}

staff.add = async(req,res) => { 

    const {empid, name, category, joiningdate, dept, basicsalary,bonus, deductions} = req.body;

    if(!name || !empid || !category || !joiningdate ){
        return res.status(400).send('Bad Request'); 
    }

    

    Staff.findOne({empid},(err,user) => {
        if(err) return res.status(500).send('Internal Server Error');        
        if (user) return res.status(400).send('Staff already exists');
        else {
            Staff.create({
                empid,
                name,
                category,
                joiningdate,
                dept,
                basicsalary,
                bonus,
                deductions
            },(err,staff) => {
                if(err) return res.status(500).send('Error');
                res.status(200).send({success:true, message:'Staff added successfully', staff})
            })
        }
    })

    
};


module.exports = staff;