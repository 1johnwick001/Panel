import Client from "../../models/Customer.models.js";
import AddBet from "../../models/Bet.model.js"
import mongoose from "mongoose";

const createBet = async (req, res) => {
    try {

        const { userId } = req.params;
        console.log("userid:", userId);
        const { gameType, amount, transactionId } = req.body;

        if (!mongoose.isValidObjectId(userId)) {
            console.log(userId);

            return res.status(400).json({
                code: 400,
                status: false,
                message: "Invalid userId format",
                data: {}
            })
        }

        const data = new AddBet({
            userId,
            gameType,
            amount,
            transactionId,
        })

        await data.save();

        return res.status(201).send({
            code: 201,
            status: true,
            message: "Bet created successfully",
            data
        })

    } catch (error) {
        console.error("error while adding Bet Amount", error);
        return res.status(500).json({
            code: 500,
            status: false,
            message: "Error while adding bet amount",
            data: {}
        })
    }
}

const betHistory = async (req, res) => {
    try {
        const { gameType } = req.params
        console.log(gameType);

        // Query AddBet collection to find bets with the specified gameType
        const bets = await AddBet.find({ gameType })
      .populate('userId', '_id username'); // Populate only _id and username fields of the client
;
        console.log(bets);

        if (!bets) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: `No bet history found for game type '${gameType}'`,
                data: []
            })
        }

        const data = bets.map((bet) => ({
            gameType: bet.gameType,
            amount: bet.amount,
            createdAt: bet.createdAt,
            client:bet.userId
        }))

        

        return res.status(200).json({
            code: 200,
            status: true,
            message: "Bet history retrieved successfully",
            data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Internal server error while retrieving bet history',
            data: []
        });
    }
}

export { createBet, betHistory }