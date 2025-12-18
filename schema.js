const Joi = require("joi");
const review = require("./models/review");
// const joi = require("joi");

module.exports.listeningSchema = Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
         price:Joi.number().required().min(0),
        //  image:Joi.string().allow("",null),
        image: Joi.object({
            url:Joi.string().allow("",null),
    // url: Joi.string().uri().required(),
    filename: Joi.string().allow("", null),
})

    }).required()
});

module.exports.reviewsSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})