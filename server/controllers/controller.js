import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
export async function insertQuestions(req, res) {
    try {
        const inserted = await Questions.insertMany({ questions, answers }); // fixed
        res.json({ msg: "Data Saved Successfully!", inserted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;

        // Validation check
        if (!username || !result) {
            throw new Error('Data Not Provided...!');
        }

        // Save result without callback
        const data = await Results.create({ username, result, attempts, points, achived });

        res.status(200).json({ msg: "Result Saved Successfully!", data });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


/** delete all result */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}