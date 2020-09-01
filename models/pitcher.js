const mongoose = require('mongoose');
const inputSchema = new mongoose.Schema ({
    content_type:
    {
        type:String
    },
    content:[{
        type:String
    }]
})
const sectionSchema = new mongoose.Schema({
    sectionType:{
        type: String
    }, 
    inputs:[inputSchema]
})
const pitchSchema = new mongoose.Schema({
    Email: { 
        type:String,
        required:true
    },     
    Document_name:{
        type:String,
        required:true
    },     
    Company_name: {
        type:String,
        required:true
    },     
    Company_logo: {
        type:String
    },    
    Company_tagline: {
        type:String,
        required:true
    },   
    Sector_type: {
        type:String,
        required:true
    },   
    Funding_need: {
        type:String
    },    
    Runway: {
        type:String
    },
    Fund_raised:{
        Amount_raised:{
            type:String
        },
        Date_of_started_raising_funds:{
            type:Date
        }
    },
    Sections:[sectionSchema],
    Team_images:[
        {
        type:String
    }
    ],
     Team_details:[{
        Name: {
            type:String,
        required:true
    },
        Surname: {
            type:String,
            required:true
        },
        Designation: {
            type:String,
            required:true
        }
    }]
})
mongoose.model('pitcher',pitchSchema);

// ​
// ​
// ​
// ​
// /*For Example
// ​
// Pitch object:[
//     ...
//     ...
//     ...
//     Sections:[
//         {
//             sectionType:"type2"
//             inputs:[
//                 {type:"header",content:"The problem we encountered"},
//                 {type:"text", content:"Our company aims to solve the age old problem..."}
//             ]
//         },
//         {
//             sectionType:"freeform"
//             inputs:[
//                 {type:"header",content:"The problem we encountered"},
//                 {type:"text", content:"Our company aims to solve the age old problem..."},
//                 {type:"image", content:"/uploads/media/Pitcher_280820.jpg"}
//             ]
//         }
//     ]
// ]*/

