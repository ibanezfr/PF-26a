const { Router } = require("express");
const Stripe = require("stripe")

const stripe = new Stripe("sk_test_51LDapSLLyNiW7nbRhEOHcLQfx1muclzGM39fTvok1XgfvSbdgHF0t9tpytNGb8DgtorDUsoRtUqArlmUiNwoedu2005lvflXcg");
const router = Router();


router.post("/api/checkout", async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount } = req.body;
  
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Calzas",
        payment_method: id,
        confirm: true, //confirm the payment at the same time
      });
  
      console.log(payment);
  
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.raw.message });
    }
  });

  module.exports = router;