import { createToken } from "../auth/accessToken.js";

const accessTokenController = (Client) => {
  const postAccessToken = async (req, res) => {
    const { body } = req;
    const clientDB = await Client.findOne({ clientId: body.clientId });

    if (
      clientDB &&
      clientDB.clientSecret === body.clientSecret &&
      clientDB.username === body.username &&
      clientDB.password === body.password
    ) {
      const { token, refreshToken, expiresIn } = createToken(clientDB);

      res.status(200).json({
        status: 0,
        message: "Valid credentials",
        token,
        refreshToken,
        expiresIn,
      });
    } else {
      res.status(401).json({ status: 1, message: "Invalid credentials" });
    }
  };

  const postNewClient = async (req, res) => {
    const client = new Client(req.body);
    const response = await client.save();

    if (response?.["_id"]) {
      res.status(200).json({ status: 0, client });
    } else {
      res.status(400).json({ status: 1, message: "Error creating client" });
    }
  };

  return { postAccessToken, postNewClient };
};

export default accessTokenController;
