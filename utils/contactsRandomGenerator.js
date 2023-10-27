const Contact = require("../models/contactSchema.js");
const User = require("../models/usersSchema.js");

const contactsRandomGenerator = async (req, res, next) => {

    const randomNumber = (max)=>{
        return Math.floor(Math.random() * max)
    };

    //createNew=quantity
    if(req.query.createNew){

        const quantity = req.query.createNew;

        const randomSource = await fetch(`https://random-data-api.com/api/v2/users?size=${quantity}`);
        const newContacts = await randomSource.json();
        
        const createdContacts = newContacts.map(async (person)=>{

            const {first_name, 
                    last_name, 
                    email, 
                    phone_number} = person;
            
            const fullName = `${first_name} ${last_name}`
            
            return await Contact.create({
                                        "name": fullName,
                                        email,
                                        "phone": phone_number 
                                    });
        }); 
        res.message = `Created ${quantity} new contacts`;
        res.newContacts = await Promise.all(createdContacts);
    }
    
    //distribute idle contacts
    if(req.query.distribute){

        const contacts = await Contact.find(
            {owner:{$exists: false}}, 
            {createdAt:0, updatedAt:0}
        );

        if(contacts.length) {

           const users = await User.find({}, {email: 1, _id: 1 });
            
           const distributedContacts =  contacts.map(async (contact)=>{

                const id = contact._id;
                const currentNumber = randomNumber(users.length);
                const {_id: owner}  = users[currentNumber];
                
                return await Contact.findByIdAndUpdate({_id: id}, {owner}, {new: true});
            });

            res.message = "all contacts are distributed";
            res.newContacts = await Promise.all(distributedContacts);

        }

    }

    if (res.newContacts && res.newContacts.length > 0){
        res.status(201).json({
            message,
            "code": 201,
            "data": res.newContacts
        });

    }else {

        res.json({message: "looks like nothing to do"});
    }
    
}

module.exports = contactsRandomGenerator;